const fs = require('fs');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3');
const AES = require('crypto-js/aes');
const { app, BrowserWindow, ipcMain } = require('electron');

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

const createDB = (dbName) => {
	// create db instance
	const db = new sqlite3.Database(dbName);
	// create the local ciphertext table
	db.run("CREATE TABLE ciphertexts(domain TEXT, password TEXT)", (err) => {
		if (err) console.log("Table creation error.");
		else {
			console.log('Database created.');
			db.close();
		}
	});
}

const establishDB = () => {
	const dbName = './database/pm_ctexts.db';
	try {
		if (fs.existsSync(dbName)) return;
		else {
			createDB(dbName);
		}
	} catch(err) {
		console.log("DB could not be established.");
	}
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

ipcMain.on('hashMaster', async (event, args) => {
	const hashed = await computeMasterHash(args);
	console.log(hashed);
});

ipcMain.on('pass', (event, args) => {
	// encrypt the password
	const domain = args[0];
	const ctext = AES.encrypt(args[1], 'this is a bad key').toString();
	// insert the ciphertext into the database
	const cmd = "INSERT INTO ciphertexts(domain, password) VALUES (@0, @1)";
	db.run(cmd, domain, ctext);
	// send the ciphertext to the client 
	event.reply('enc_pass', ctext);
});

ipcMain.on('getCipherSet', (event, args) => {
	const cmd = 'SELECT * FROM ciphertexts';
	db.all(cmd, (err, ctexts) => {
		if (err) event.reply('cipherset', JSON.stringify({"error":"database query failed"}));
		event.reply('cipherset', JSON.stringify(ctexts));
	});
});


// establish the local database
establishDB();
// set up runtime connection to the local db
const db = new sqlite3.Database('./database/pm_ctexts.db');
// run the electron app
app.whenReady().then(createWindow)
