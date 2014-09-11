var AppDispatcher = require("../dispatchers/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var merge = require("react-atom-fork/lib/merge");
var DocumentConstants = require("../constants/DocumentConstants");
var remote = require("remote");
var fs = remote.require("fs-plus");
var ipc = require("ipc");

var CHANGE_EVENT = "CHANGE";
var DOCUMENTS_PATH_KEY = "documentsPath";

var _path;

function getPath() {
  var path = window.localStorage.getItem(DOCUMENTS_PATH_KEY);

  if(!path)
    path = fs.getHomeDirectory();

  return path;
}

function setPath(path) {
  if(!path)
    return;

  window.localStorage.setItem(DOCUMENTS_PATH_KEY, path);

  ipc.send("setPathAndBindToChanges", path);

  _path = path;
}

var DocumentsPathStore = merge(EventEmitter.prototype, {
  init: function() {
    var path = getPath();

    setPath(path);
  },

  getPath: function() {
    return _path;
  },

  setPath: function(path) {
    setPath(path);
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
    case DocumentConstants.SET_DOCUMENTS_PATH:
      setPath(action.documentsPath);
      break;

    default:
      return true;
  }

  DocumentsPathStore.emitChange();
  return true;
});

module.exports = DocumentsPathStore;
