const bcrypt = require('bcrypt');
const { app, BrowserWindow, remote } = require('electron')

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  const proc = remote.require('./enc.js');
  proc.enc();

}

app.whenReady().then(createWindow)
