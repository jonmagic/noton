var app = require("app");
var BrowserWindow = require("browser-window");
var DocumentLoader = require("./DocumentLoader");

// App setup, creates window and loads index in the new window. Handles close
// events to ensure the app closes and gets unreferenced.
var browser = null;

app.on("window-all-closed", function() {
  if (process.platform != "darwin")
    app.quit();
});

app.on("ready", function() {
  // Create the browser window.
  browser = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  browser.loadUrl("file://" + __dirname + "/index.html");

  DocumentLoader.initWithBrowser(browser);

  // Emitted when the window is closed.
  browser.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
