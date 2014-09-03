var React = require("react-atom-fork");
var DocumentListItem = require("./DocumentListItem");

var DocumentList = React.createClass({
  displayName: "DocumentList",

  render: function() {
    var noteTitles = this.props.noteTitles,
        noteListItems = [];

    for (var id in noteTitles) {
      noteListItems.push(DocumentListItem({key: noteTitles[id], noteTitle: noteTitles[id]}));
    }

    return React.DOM.ul({className: "nav notelist"}, noteListItems);
  }
});

module.exports = DocumentList;
