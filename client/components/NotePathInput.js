var React = require("react-atom-fork");
var ReactPropTypes = React.PropTypes;
var NoteActions = require("../actions/NoteActions.js");

var ENTER_KEY_CODE = 13;

var NotePathInput = React.createClass({

  propTypes: {
    id: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    value: ReactPropTypes.string
  },

  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },

  render: function() {
    return React.DOM.input({
      id: this.props.id,
      placeholder: this.props.placeholder,
      onBlur: this._save,
      onChange: this._onChange,
      onKeyDown: this._onKeyDown,
      value: this.state.value,
      autoFocus: false
    });
  },

  _save: function() {
    NoteActions.setNotePath(this.state.value);
  },

  _onChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }

});

module.exports = NotePathInput;
