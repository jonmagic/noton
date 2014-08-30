var fs = require("fs");
var ipc = require("ipc");
var app = require("app");
var PathWatcher = require("pathwatcher");
var BrowserWindow = require("browser-window");

// App setup, creates window and loads index in the new window. Handles close
// events to ensure the app closes and gets unreferenced.
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

// Functions for getting note titles and setup to bind to directory changes
// in order to notify the client when a note is added, removed, or renamed.
var PATH = null;

function loadNoteTitles(path) {
  var files = fs.readdirSync(path);

  mainWindow.webContents.send("loadedNoteTitles", files);
}

function watchedPathListener(event, path) {
  loadNoteTitles(PATH);
}

ipc.on("setPathAndBindToChanges", function(event, path) {
  if(PATH != path)
    PathWatcher.closeAllWatchers();
    PathWatcher.watch(path, watchedPathListener);
    PATH = path;

  loadNoteTitles(path);
});
