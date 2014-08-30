var AppDispatcher = require('../AppDispatcher');
var NoteConstants = require('../constants/NoteConstants');

var NoteActions = {
  reloadList: function() {
    AppDispatcher.handleBrowserAction({
      actionType: NoteConstants.FOLDER_CHANGED
    });
  },
}
