var React = require("react-atom-fork");
var Noton = require("../client/components/Noton");
var NoteDirectoryUtils = require("../client/utils/NoteDirectoryUtils");

var PATH = "/Users/jonmagic/Notes";

NoteDirectoryUtils.watchNotePath(PATH);

React.renderComponent(Noton(), document.getElementById('react'));
