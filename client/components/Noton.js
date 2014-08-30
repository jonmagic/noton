var React = require("react-atom-fork");
var NoteStore = require("../stores/NoteStore");
var NotesList = require("./NotesList");

function getNoteState() {
  return {
    noteTitles: NoteStore.getAll()
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
      NotesList({noteTitles: this.state.noteTitles})
    );
  },

  _onChange: function() {
    this.setState(getNoteState());
  }
});

module.exports = Noton;
