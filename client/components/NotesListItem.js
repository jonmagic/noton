var React = require("react-atom-fork");

var NotesListItem = React.createClass({
  displayName: "NotesListItem",

  render: function() {
    return React.DOM.li(null, this.props.noteTitle);
  }
});

module.exports = NotesListItem;
