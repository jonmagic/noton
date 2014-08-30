var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react-atom-fork/lib/merge');
var NoteConstants = require('../constants/NoteConstants');

var CHANGE_EVENT = "NOTES_CHANGED";

var _noteTitles = [];

var NoteStore = merge(EventEmitter.prototype, {
  getAll: function() {
    return _noteTitles;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case NoteConstants.RECEIVE_NOTE_TITLES:
      _noteTitles = action.noteTitles;
      break;

    default:
      return true;
  }

  // This often goes in each case that should trigger a UI change. This store
  // needs to trigger a UI change after every view action, so we can make the
  // code less repetitive by putting it here.  We need the default case,
  // however, to make sure this only gets called after one of the cases above.
  NoteStore.emitChange();

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = NoteStore;
