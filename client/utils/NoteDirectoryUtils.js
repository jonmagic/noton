var NoteActions = require("../actions/NoteActions");
var ipc = require("ipc");

module.exports = {
  watchNotePath: function(path) {
    ipc.on("loadedNoteTitles", function(noteTitles) {
      NoteActions.receiveNoteTitles(noteTitles);
    });

    ipc.send("loadNoteTitles", path);
  }
}
