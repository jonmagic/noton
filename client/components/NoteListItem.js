var React = require("react-atom-fork");

var NoteListItem = React.createClass({
  displayName: "NoteListItem",

  render: function() {
    return React.DOM.li(null,
      React.DOM.a({href: "#"}, this.props.noteTitle)
    );
  }
});

module.exports = NoteListItem;
