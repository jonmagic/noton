var AppDispatcher = require("../dispatchers/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var merge = require("react-atom-fork/lib/merge");
var DocumentConstants = require("../constants/DocumentConstants");
var remote = require("remote");
var fs = remote.require("fs-plus");
var ipc = require("ipc");
var _ = require("underscore-plus");
var lunr = require("lunr");

var idx = lunr(function () {
    this.field('title', { boost: 10 });
    this.field('body');
});

var CHANGE_EVENT = "CHANGE";

var _documents = [],
    _selectedDocument = null,
    _results = [];

ipc.on("loadAllDocumentDetails", function(allDocumentDetails) {
  _documents = allDocumentDetails;

  _documents.forEach(function(documentDetails) {
    idx.add({
      title: documentDetails.title,
      body: documentDetails.body,
      id: documentDetails.filename
    });
  });

  DocumentsStore.emitChange();
});

var DocumentsStore = merge(EventEmitter.prototype, {
  allDocuments: function() {
    if(_results.length > 0) {
      return _results;
    } else {
      return _documents;
    }
  },

  search: function(query) {
    if(!query || query == "") {
      _results = [];
      return;
    }

    var results = [];

    idx.search(query).forEach(function(r) {
      var documentDetails = _.find(_documents, function(documentDetails) {
        return documentDetails.filename == r.ref;
      });

      if(!!documentDetails)
        results.push(documentDetails);
    });

    _results = results;
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
      var documentDetails = _.find(_documents, function(documentDetails) {
        return documentDetails.title == action.title;
      })

      _selectedDocument = documentDetails;
      break;

    case DocumentConstants.SEARCH_DOCUMENTS:
      DocumentsStore.search(action.query);
      break;

    default:
      return true;
  }

  DocumentsStore.emitChange();
  return true;
});

window.DocumentsStore = DocumentsStore;
module.exports = DocumentsStore;
