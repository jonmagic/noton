var AppDispatcher = require('../dispatchers/AppDispatcher');
var DocumentConstants = require('../constants/DocumentConstants');

var DocumentListActions = {
  setNotePath: function(notePath) {
    AppDispatcher.handleViewAction({
      actionType: DocumentConstants.SET_DOCUMENTS_PATH,
      notePath: notePath
    });
  }
}

module.exports = DocumentListActions;
