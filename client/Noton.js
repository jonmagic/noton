var React = require("react-atom-fork");
var App = require("../client/components/App");
var DocumentsPathStore = require("../client/stores/DocumentsPathStore");

DocumentsPathStore.init();

React.renderComponent(App(), document.getElementById('react'));
