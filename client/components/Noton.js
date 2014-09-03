var React = require("react-atom-fork");
var NoteStore = require("../stores/NoteStore");
var NotePathInput = require("./NotePathInput");
var NoteList = require("./NoteList");

function getNoteState() {
  return {
    notePath: NoteStore.notePath(),
    noteTitles: NoteStore.noteTitles(),
    selectedNoteText: "Hello World"
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
          React.DOM.form({className: "navbar-form search-form"},
            React.DOM.input({id: "search", placeholder: "enter search query", autoFocus: true, className: "form-control search-box"})
          )
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
