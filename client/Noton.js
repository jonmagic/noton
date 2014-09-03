var React = require("react-atom-fork");
var App = require("../client/components/App");
var DocumentsStore = require("../client/stores/DocumentsStore");

DocumentsStore.init();

React.renderComponent(App(), document.getElementById('react'));
