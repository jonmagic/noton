var React = require("react-atom-fork");
var NoteStore = require("../stores/NoteStore");
var NotePathInput = require("./NotePathInput");
var NoteList = require("./NoteList");
var SearchForm = require("./SearchForm");

function getNoteState() {
  return {
    notePath: NoteStore.notePath(),
    noteTitles: NoteStore.noteTitles(),
    selectedNoteText: "Hello World",
    searchQuery: "Find me all of the things!"
  };
}

var Noton = React.createClass({
  displayName: "Noton",

  getInitialState: function() {
    return getNoteState();
  },

  componentDidMount: function() {
    NoteStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    NoteStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return React.DOM.div(null,
      React.DOM.div({className: "navbar navbar-inverse navbar-fixed-top"},
        React.DOM.div({className: "container-fluid"},
          SearchForm({searchQuery: this.state.searchQuery})
        )
      ),
      React.DOM.div({className: "container-fluid content-wrapper"},
        React.DOM.div({className: "notelist-resizer"},
          React.DOM.div({className: "notelist-scroller"},
            NoteList({noteTitles: this.state.noteTitles})
          )
        ),
        React.DOM.div({className: "workspace-resizer"},
          React.DOM.div({className: "workspace-scroller"},
            React.DOM.div({className: "note"}, this.state.selectedNoteText)
          )
        )
      )
    );
  },

  _onChange: function() {
    this.setState(getNoteState());
  }
});

module.exports = Noton;
