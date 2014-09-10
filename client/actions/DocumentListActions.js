var AppDispatcher = require('../dispatchers/AppDispatcher');
var DocumentConstants = require('../constants/DocumentConstants');

var DocumentListActions = {
  setNotePath: function(notePath) {
    AppDispatcher.handleViewAction({
      actionType: DocumentConstants.SET_DOCUMENTS_PATH,
      notePath: notePath
    });
  },

  selectDocumentByTitle: function(title) {
    AppDispatcher.handleViewAction({
      actionType: DocumentConstants.SELECT_DOCUMENT_BY_TITLE,
      title: title
    });
  }
}

module.exports = DocumentListActions;
