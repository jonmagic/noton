var React = require("react-atom-fork");
var Noton = require("../client/components/Noton");
var NoteStore = require("../client/stores/NoteStore");

NoteStore.init();

React.renderComponent(Noton(), document.getElementById('react'));
