var React = require("react-atom-fork");
var ReactPropTypes = React.PropTypes;
var DocumentListActions = require("../actions/DocumentListActions");

var ENTER_KEY_CODE = 13;
var element = null;

function keyDownListener(event) {

}

var SearchForm = React.createClass({
  displayName: "SearchForm",

  propTypes: {
    value: ReactPropTypes.string
  },

  getInitialState: function() {
    return {
      searchQuery: this.props.searchQuery || ''
    };
  },

  componentDidMount: function() {
    window.addEventListener("keydown", function(event) {
      if(event.keyCode == 76 && event.metaKey){
        document.getElementById("search").select();
      }
    });
  },

  render: function() {
    var options = {
      autoFocus: true,
      className: "form-control search-box",
      defaultValue: this.state.searchQuery,
      id: "search",
      key: "search",
      onFocus: this._onFocus,
      // onClick: this._onClick,
      onChange: this._onChange,
      onKeyDown: this._onKeyDown,
      placeholder: "enter filename or search query",
      ref: "searchBox"
    }

    return React.DOM.form({action: "#", className: "navbar-form search-form"},
      React.DOM.input(options)
    );
  },

  _onChange: function(event) {
    this.setState({
      searchQuery: event.target.value
    });

    DocumentListActions.searchDocuments(event.target.value);
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      console.log("open or create file: " + event.target.value);
    }
  },

  // _onClick: function(event) {
  //   event.target.select();
  // },

  _onFocus: function(event) {
    event.target.select();
  }
});

module.exports = SearchForm;
