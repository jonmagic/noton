var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react-atom-fork/lib/merge');
var ipc = require("ipc");

var CHANGE_EVENT = "NOTES_CHANGED";
var PATH = "/Users/jonmagic/Notes";

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

ipc.on("loadedNoteTitles", function(noteTitles) {
  _noteTitles = noteTitles;
  NoteStore.emitChange();
});

ipc.send("loadNoteTitles", PATH);

module.exports = NoteStore;
