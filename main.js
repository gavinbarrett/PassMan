const bcrypt = require('bcrypt');
const mysql = require('mysql');
const { app, BrowserWindow, ipcMain } = require('electron')

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
}

const computeMasterHash = async (password) => {
	const rounds = 10;
	return await new Promise((resolve, reject) => {
		bcrypt.genSalt(rounds, (err, salt) => {
			if (err) throw err;
			bcrypt.hash(password, salt, (err, hash) => {
				if (err) throw err;
				resolve(hash);
			});
		});
	});
}

ipcMain.on('hello', (event, args) => {
	console.log(args);
	event.sender.send('there', 'snake');
});

ipcMain.on('hashMaster', async (event, args) => {
	const hashed = await computeMasterHash(args);
	console.log(hashed);
});

app.whenReady().then(createWindow)
