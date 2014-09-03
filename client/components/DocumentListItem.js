var React = require("react-atom-fork");

var DocumentListItem = React.createClass({
  displayName: "DocumentListItem",

  render: function() {
    return React.DOM.li(null,
      React.DOM.a({href: "#"}, this.props.noteTitle)
    );
  }
});

module.exports = DocumentListItem;
