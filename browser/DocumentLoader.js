var PathWatcher = require("pathwatcher");
var fs = require("fs-plus");
var ipc = require("ipc");
var path = require("path");
var _ = require("underscore-plus");

var MARKDOWN_EXTENSIONS = ["md", "markdown"];
var currentPath = null,
    targetBrowser = null;

function sendDocumentDetailsToApp(files) {
  targetBrowser.webContents.send("loadAllDocumentDetails", files);
}

var DocumentLoader = {
  initWithBrowser: function(browser) {
    targetBrowser = browser;

    ipc.on("setPathAndBindToChanges", function(event, rootPath) {
      if(currentPath != rootPath)
        PathWatcher.closeAllWatchers();
        PathWatcher.watch(rootPath, function(eventType) {
          sendDocumentDetailsToApp(DocumentLoader.loadFromPath(currentPath));
        });
        currentPath = rootPath;

      sendDocumentDetailsToApp(DocumentLoader.loadFromPath(rootPath));
    });
  },

  loadFromPath: function(rootPath) {
    var documents = [];

    fs.listSync(rootPath, MARKDOWN_EXTENSIONS).forEach(function(documentPath) {
      var filename = path.basename(documentPath),
          title = filename.replace(/\.(md|markdown)$/, ""),
          checksum = fs.md5ForPath(documentPath),
          fileStats = fs.statSync(documentPath),
          modifiedAtEpoch = fileStats.mtime.getTime();

      // build hash of details
      var documentDetails = {
        path: documentPath,
        filename: filename,
        title: title,
        checksum: checksum,
        modifiedAtEpoch: modifiedAtEpoch
      }

      // add details to array
      documents.push(documentDetails);
    });

    var sortedDocuments = _.sortBy(documents, function(documentDetails) {
      return -documentDetails.modifiedAtEpoch;
    });

    return sortedDocuments;
  }
}

module.exports = DocumentLoader
