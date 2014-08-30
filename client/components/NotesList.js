var React = require("react-atom-fork");
var NotesListItem = require("./NotesListItem");

var NotesList = React.createClass({
  displayName: "NotesList",

  render: function() {
    var noteTitles = this.props.noteTitles,
        noteListItems = [];

    for (var id in noteTitles) {
      noteListItems.push(NotesListItem({key: noteTitles[id], noteTitle: noteTitles[id]}));
    }

    return React.DOM.ul(null, noteListItems);
  }
});

module.exports = NotesList;
