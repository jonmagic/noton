var AppDispatcher = require("../dispatchers/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var merge = require("react-atom-fork/lib/merge");
var DocumentConstants = require("../constants/DocumentConstants");
var DocumentListActions = require("../actions/DocumentListActions");
var remote = require("remote");
var fs = remote.require("fs-plus");
var ipc = require("ipc");
var _ = require("underscore-plus");

var DOCUMENTS_PATH_KEY = "documentsPath";
var CHANGE_EVENT = "DOCUMENTS_CHANGED";

var _documentsPath = null,
    _documents = [],
    _selectedDocument = null;

function getDocumentsPath() {
  var path = window.localStorage.getItem(DOCUMENTS_PATH_KEY);

  if(!path)
    path = fs.getHomeDirectory();

  return path;
}

function setDocumentsPath(documentsPath) {
  if(!documentsPath)
    return;

  window.localStorage.setItem(DOCUMENTS_PATH_KEY, documentsPath);

  ipc.send("setPathAndBindToChanges", documentsPath);

  _documentsPath = documentsPath;
}

function selectDocumentByTitle(title) {
  var documentDetails = _.find(_documents, function(documentDetails) {
    return documentDetails.title == title;
  })

  _selectedDocument = documentDetails;
  _selectedDocument.text = fs.readFileSync(documentDetails.path, "utf8");
}

var DocumentsStore = merge(EventEmitter.prototype, {
  init: function() {
    var path = getDocumentsPath();

    // It's a little weird having a store call an action, but really it's the
    // browser that calls the action when it sees a file added, updated, or
    // or removed in the documents path.
    ipc.on("loadAllDocumentDetails", function(allDocumentDetails) {
      _documents = allDocumentDetails;

      DocumentsStore.emitChange();
    });

    setDocumentsPath(path);
  },

  documentsPath: function() {
    return _documentsPath;
  },

  allDocuments: function() {
    return _documents;
  },

  selectedDocument: function() {
    return _selectedDocument;
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
      setDocumentsPath(action.documentsPath);
      break;

    case DocumentConstants.SELECT_DOCUMENT_BY_TITLE:
      selectDocumentByTitle(action.title);
      break;

    default:
      return true;
  }

  DocumentsStore.emitChange();
  return true;
});

module.exports = DocumentsStore;
