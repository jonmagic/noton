var React = require("react-atom-fork");
var DocumentListActions = require("../actions/DocumentListActions");

var DocumentListItem = React.createClass({
  displayName: "DocumentListItem",

  render: function() {
    var linkOptions = {
      href: "#",
      dataFilename: "foo",
      onClick: this._onClick
    }

    return React.DOM.li(null,
      React.DOM.a(linkOptions, this.props.noteTitle)
    );
  },

  _onClick: function(event) {
    var title = event.target.text;

    DocumentListActions.selectDocumentByTitle(title);
  }
});

module.exports = DocumentListItem;
