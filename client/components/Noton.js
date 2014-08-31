var React = require("react-atom-fork");
var NoteStore = require("../stores/NoteStore");
var NotePathInput = require("./NotePathInput");
var NoteList = require("./NoteList");

function getNoteState() {
  return {
    notePath: NoteStore.notePath(),
    noteTitles: NoteStore.noteTitles()
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
      React.DOM.h1(null, "Notes List"),
      NotePathInput({id: "notePath", placeholder: "Enter path to your notes.", value: this.state.notePath}),
      NoteList({noteTitles: this.state.noteTitles})
    );
  },

  _onChange: function() {
    this.setState(getNoteState());
  }
});

module.exports = Noton;
