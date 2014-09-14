var React = require("react-atom-fork");
var ReactPropTypes = React.PropTypes;
var CodeMirror = require("CodeMirror");

var _editor = null;

function setupEditor() {
  _editor = CodeMirror.fromTextArea(document.getElementById("workspace"));
  _editor.on("change", function(editor, event) {
    // console.log("editor change event", editor, event);
  });
}

function teardownEditor() {
  _editor.toTextArea();
  _editor = null;
}

window.editor = _editor;

var Editor = React.createClass({
  displayName: "Editor",

  componentDidMount: function() {
    setupEditor();
  },

  componentWillUnmount: function() {
    teardownEditor();
  },

  componentWillReceiveProps: function(newProps) {
    _editor.setValue(newProps.initialDocumentBody);
  },

  render: function() {
    return React.DOM.form({action: "#", className: "workspace"},
      React.DOM.textarea({id: "workspace", defaultValue: this.props.initialDocumentBody})
    );
  },

  _save: function() {
    console.log("_save")
    // take textarea contents and save them to
  }
});

module.exports = Editor;
