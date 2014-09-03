var AppDispatcher = require('../dispatchers/AppDispatcher');
var NoteConstants = require('../constants/NoteConstants');

var NoteActions = {
  receiveNoteTitles: function(noteTitles) {
    AppDispatcher.handleBrowserAction({
      actionType: NoteConstants.RECEIVE_NOTE_TITLES,
      noteTitles: noteTitles
    });
  },

  setNotePath: function(notePath) {
    AppDispatcher.handleViewAction({
      actionType: NoteConstants.SET_NOTE_PATH,
      notePath: notePath
    });
  }
}

module.exports = NoteActions;
