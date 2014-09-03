var React = require("react-atom-fork");
var DocumentsStore = require("../stores/DocumentsStore");
var DocumentList = require("./DocumentList");
var SearchForm = require("./SearchForm");

function getNoteState() {
  return {
    notePath: DocumentsStore.notePath(),
    noteTitles: DocumentsStore.noteTitles(),
    selectedNoteText: "Hello World",
    searchQuery: "Find me all of the things!"
  };
}

var App = React.createClass({
  displayName: "App",

  getInitialState: function() {
    return getNoteState();
  },

  componentDidMount: function() {
    DocumentsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DocumentsStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return React.DOM.div(null,
      React.DOM.div({className: "navbar navbar-inverse navbar-fixed-top"},
        React.DOM.div({className: "container-fluid"},
          SearchForm({searchQuery: this.state.searchQuery})
        )
      ),
      React.DOM.div({className: "container-fluid content-wrapper"},
        React.DOM.div({className: "notelist-resizer"},
          React.DOM.div({className: "notelist-scroller"},
            DocumentList({noteTitles: this.state.noteTitles})
          )
        ),
        React.DOM.div({className: "workspace-resizer"},
          React.DOM.div({className: "workspace-scroller"},
            React.DOM.div({className: "note"}, this.state.selectedNoteText)
          )
        )
      )
    );
  },

  _onChange: function() {
    this.setState(getNoteState());
  }
});

module.exports = App;
