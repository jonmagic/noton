var remote = require('remote');
var ipc = require('ipc');
var React = require("react-atom-fork");

var Noton = React.createClass({
  displayName: "Noton",

  render: function() {
    return React.DOM.div(null,
      React.DOM.h1(null, "Notes List"),
      NotesList()
    );
  }
})

var NotesList = React.createClass({
  displayName: "NotesList",

  getInitialState: function() {
    return {noteTitles: []}
  },

  componentDidMount: function() {
    var that = this,
        path = "/Users/jonmagic/Notes";

    ipc.on('noteTitlesReply', function(noteTitles) {
      that.setState({noteTitles: noteTitles});
    });

    ipc.send('noteTitlesRequest', path);
  },

  render: function() {
    var createNotesListItem = function(noteTitle) {
      return NotesListItem({key: noteTitle, noteTitle: noteTitle});
    }

    return React.DOM.ul(null, this.state.noteTitles.map(createNotesListItem));
  }
});

var NotesListItem = React.createClass({
  displayName: "NotesListItem",

  render: function() {
    return React.DOM.li(null, this.props.noteTitle);
  }
})

React.renderComponent(Noton(), document.getElementById('react'));
