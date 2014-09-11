var React = require("react-atom-fork");
var DocumentsStore = require("../stores/DocumentsStore");
var DocumentList = require("./DocumentList");
var SearchForm = require("./SearchForm");

function getAppState() {
  return {
    documentsPath: DocumentsPathStore.getPath(),
    documents: DocumentsStore.allDocuments(),
    selectedDocument: DocumentsStore.selectedDocument(),
    searchQuery: "Find me all of the things!"
  };
}

var App = React.createClass({
  displayName: "App",

  getInitialState: function() {
    return getAppState();
  },

  componentDidMount: function() {
    DocumentsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DocumentsStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var documentBody = "";

    if(!!this.state.selectedDocument)
      documentBody = this.state.selectedDocument.body;

    return React.DOM.div(null,
      React.DOM.div({className: "navbar navbar-inverse navbar-fixed-top"},
        React.DOM.div({className: "container-fluid"},
          SearchForm({searchQuery: this.state.searchQuery})
        )
      ),
      React.DOM.div({className: "container-fluid content-wrapper"},
        React.DOM.div({className: "document-list-resizer"},
          React.DOM.div({className: "document-list-scroller"},
            DocumentList({documents: this.state.documents})
          )
        ),
        React.DOM.div({className: "workspace-resizer"},
          React.DOM.div({className: "workspace-scroller"},
            React.DOM.div({className: "workspace"}, documentBody)
          )
        )
      )
    );
  },

  _onChange: function() {
    this.setState(getAppState());
  }
});

module.exports = App;
