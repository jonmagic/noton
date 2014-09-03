var PathWatcher = require("pathwatcher");
var fs = require("fs-plus");
var ipc = require("ipc");
var path = require("path");

var MARKDOWN_EXTENSIONS = ["md", "markdown"];
var currentPath = null,
    targetBrowser = null;

function watchedPathListener(event, path) {
  sendDocumentDetailsToApp(DocumentLoader.loadFromPath(currentPath));
}

function sendDocumentDetailsToApp(files) {
  targetBrowser.webContents.send("loadAllDocumentDetails", files);
}

var DocumentLoader = {
  initWithBrowser: function(browser) {
    targetBrowser = browser;

    ipc.on("setPathAndBindToChanges", function(event, rootPath) {
      if(currentPath != rootPath)
        PathWatcher.closeAllWatchers();
        PathWatcher.watch(rootPath, watchedPathListener);
        currentPath = rootPath;

      sendDocumentDetailsToApp(DocumentLoader.loadFromPath(rootPath));
    });
  },

  loadFromPath: function(rootPath) {
    var files = [];

    fs.listSync(rootPath, MARKDOWN_EXTENSIONS).forEach(function(documentPath) {
      var filename = path.basename(documentPath),
          title = filename.replace(/\.(md|markdown)$/, "");

      var documentDetails = {
        title: title
      }

      files.push(documentDetails);
    });

    return files;
  }
}

module.exports = DocumentLoader
