var React = require("react-atom-fork");
var App = require("../client/components/App");
var NoteStore = require("../client/stores/NoteStore");

NoteStore.init();

React.renderComponent(App(), document.getElementById('react'));
