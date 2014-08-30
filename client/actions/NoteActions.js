var AppDispatcher = require('../AppDispatcher');
var NoteConstants = require('../constants/NoteConstants');

var NoteActions = {
  receiveNoteTitles: function(noteTitles) {
    AppDispatcher.handleBrowserAction({
      actionType: NoteConstants.RECEIVE_NOTE_TITLES,
      noteTitles: noteTitles
    });
  },
}

module.exports = NoteActions;
