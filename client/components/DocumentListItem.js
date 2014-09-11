var React = require("react-atom-fork");
var DocumentListActions = require("../actions/DocumentListActions");

var DocumentListItem = React.createClass({
  displayName: "DocumentListItem",

  render: function() {
    var linkOptions = {
      key: this.props.title,
      onClick: this._onClick
    }

    return React.DOM.li(null,
      React.DOM.a(linkOptions, this.props.title)
    );
  },

  _onClick: function(event) {
    var title = event.target.text;

    DocumentListActions.selectDocumentByTitle(title);
  }
});

module.exports = DocumentListItem;
