var AppDispatcher = require("../dispatchers/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var merge = require("react-atom-fork/lib/merge");
var DocumentConstants = require("../constants/DocumentConstants");
var remote = require("remote");
var fs = remote.require("fs-plus");
var ipc = require("ipc");
var _ = require("underscore-plus");

var CHANGE_EVENT = "CHANGE";

var _documents = [],
    _selectedDocument = null;

function selectDocumentByTitle(title) {
  var documentDetails = _.find(_documents, function(documentDetails) {
    return documentDetails.title == title;
  })

  _selectedDocument = documentDetails;
  _selectedDocument.text = fs.readFileSync(documentDetails.path, "utf8");
}

ipc.on("loadAllDocumentDetails", function(allDocumentDetails) {
  _documents = allDocumentDetails;

  DocumentsStore.emitChange();
});

var DocumentsStore = merge(EventEmitter.prototype, {
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
