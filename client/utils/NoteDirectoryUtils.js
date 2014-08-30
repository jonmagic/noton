var NoteActions = require("../actions/NoteActions");
var ipc = require("ipc");

module.exports = {
  setPathAndBindToChanges: function(path) {
    ipc.on("loadedNoteTitles", function(noteTitles) {
      NoteActions.receiveNoteTitles(noteTitles);
    });

    ipc.send("setPathAndBindToChanges", path);
  }
}
