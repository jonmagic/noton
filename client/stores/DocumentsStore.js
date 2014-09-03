var AppDispatcher = require("../dispatchers/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var merge = require("react-atom-fork/lib/merge");
var DocumentConstants = require("../constants/DocumentConstants");
var DocumentListActions = require("../actions/DocumentListActions");
var remote = require("remote");
var ipc = require("ipc");

var NOTE_PATH_KEY = "notePath";
var CHANGE_EVENT = "NOTES_CHANGED";

var _noteTitles = [],
    _notePath = null;


function getNoteTitles(path) {
  return remote.require("fs").readdirSync(path);
}

function setNoteTitles(noteTitles) {
  _noteTitles = noteTitles;
}

function getNotePath() {
  var path = window.localStorage.getItem(NOTE_PATH_KEY);

  if(!path)
    path = remote.require("fs-plus").getHomeDirectory();

  return path;
}

function setNotePath(notePath) {
  if(!notePath)
    return;

  window.localStorage.setItem(NOTE_PATH_KEY, notePath);

  ipc.send("setPathAndBindToChanges", notePath);

  _notePath = notePath;
}

var DocumentsStore = merge(EventEmitter.prototype, {
  init: function() {
    var path = getNotePath(),
        noteTitles = getNoteTitles(path);

    // It's a little weird having a store call an action, but really it's the
    // browser that calls the action when it sees a file added, updated, or
    // or removed in the note path.
    ipc.on("loadAllDocumentDetails", function(allDocumentDetails) {
      var titles = allDocumentDetails.map(function(documentDetails) {
        return documentDetails.title;
      })

      DocumentListActions.receiveNoteTitles(titles);
    });

    setNotePath(path);
    setNoteTitles(noteTitles);
  },

  notePath: function() {
    return _notePath;
  },

  noteTitles: function() {
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
    case DocumentConstants.RECEIVE_NOTE_TITLES:
      setNoteTitles(action.noteTitles);
      break;

    case DocumentConstants.SET_NOTE_PATH:
      var path = action.notePath,
          noteTitles = getNoteTitles(path);

      setNotePath(path);
      setNoteTitles(noteTitles);
      break;

    default:
      return true;
  }

  DocumentsStore.emitChange();
  return true;
});

module.exports = DocumentsStore;
