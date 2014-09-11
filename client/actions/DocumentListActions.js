var AppDispatcher = require('../dispatchers/AppDispatcher');
var DocumentConstants = require('../constants/DocumentConstants');

var DocumentListActions = {
  setNotePath: function(documentsPath) {
    AppDispatcher.handleViewAction({
      actionType: DocumentConstants.SET_DOCUMENTS_PATH,
      documentsPath: documentsPath
    });
  },

  selectDocumentByTitle: function(title) {
    AppDispatcher.handleViewAction({
      actionType: DocumentConstants.SELECT_DOCUMENT_BY_TITLE,
      title: title
    });
  },

  searchDocuments: function(query) {
    AppDispatcher.handleViewAction({
      actionType: DocumentConstants.SEARCH_DOCUMENTS,
      query: query
    });
  }
}

module.exports = DocumentListActions;
