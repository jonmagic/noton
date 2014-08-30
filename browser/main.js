var fs = require("fs");
var ipc = require("ipc");
var app = require("app");
var PathWatcher = require("pathwatcher");
var BrowserWindow = require("browser-window");

var mainWindow = null;

app.on("window-all-closed", function() {
  if (process.platform != "darwin")
    app.quit();
});

app.on("ready", function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadUrl("file://" + __dirname + "/index.html");

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

var PATH = null;

function loadNoteTitles(path) {
  var files = fs.readdirSync(path);

  mainWindow.webContents.send("loadedNoteTitles", files);
}

function watchedPathListener(event, path) {
  console.log(event, path);
  loadNoteTitles(PATH);
}

ipc.on("loadNoteTitles", function(event, path) {
  if(PATH != path)
    PathWatcher.closeAllWatchers();
    PathWatcher.watch(path, watchedPathListener);
    console.log(PathWatcher.getWatchedPaths());
    PATH = path;

  loadNoteTitles(path);
});
