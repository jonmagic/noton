var AppDispatcher = require('../dispatchers/AppDispatcher');
var DocumentConstants = require('../constants/DocumentConstants');

var DocumentListActions = {
  receiveNoteTitles: function(noteTitles) {
    AppDispatcher.handleBrowserAction({
      actionType: DocumentConstants.RECEIVE_NOTE_TITLES,
      noteTitles: noteTitles
    });
  },

  setNotePath: function(notePath) {
    AppDispatcher.handleViewAction({
      actionType: DocumentConstants.SET_NOTE_PATH,
      notePath: notePath
    });
  }
}

module.exports = DocumentListActions;
