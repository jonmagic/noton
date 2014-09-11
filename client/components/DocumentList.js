var React = require("react-atom-fork");
var DocumentListItem = require("./DocumentListItem");

var DocumentList = React.createClass({
  displayName: "DocumentList",

  render: function() {
    var documents = this.props.documents,
        documentListItems = [];

    for (var id in documents) {
      var d = documents[id];
      documentListItems.push(DocumentListItem({title: d.title, checksum: d.checksum}));
    }

    return React.DOM.ul({className: "nav document-list"}, documentListItems);
  }
});

module.exports = DocumentList;
