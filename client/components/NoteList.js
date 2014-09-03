var React = require("react-atom-fork");
var NoteListItem = require("./NoteListItem");

var NoteList = React.createClass({
  displayName: "NoteList",

  render: function() {
    var noteTitles = this.props.noteTitles,
        noteListItems = [];

    for (var id in noteTitles) {
      noteListItems.push(NoteListItem({key: noteTitles[id], noteTitle: noteTitles[id]}));
    }

    return React.DOM.ul({className: "nav notelist"}, noteListItems);
  }
});

module.exports = NoteList;
