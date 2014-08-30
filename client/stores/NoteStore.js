var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react-atom-fork/lib/merge');
var ipc = require("ipc");

var CHANGE_EVENT = 'change';
var PATH = "/Users/jonmagic/Notes";

var _noteTitles = [];

function loadNoteTitles(path) {
  _noteTitles = ipc.sendSync("noteTitlesRequest", path);
}

var NoteStore = merge(EventEmitter.prototype, {
  getAll: function() {
    if(_noteTitles.length == 0)
      loadNoteTitles(PATH);
    return _noteTitles;
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

module.exports = NoteStore;
