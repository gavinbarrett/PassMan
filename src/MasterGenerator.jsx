import React from 'react';
const {ipcRenderer} = require('electron');

const MasterGenerator = () => {
	
	const strongpass = "Please enter a strong master password."
	
	const hashPass = () => {
		const password = document.getElementById('password').value;
		console.log(password);
		ipcRenderer.send('hashMaster', password);
	}
	
	return (<div id='mastergenerator'>
	<p id='strongpass'>{strongpass}</p>
	<div id='passentry'>
	<input id='password' placeholder="enter password here"/>
	<input id='submit' type="submit" onClick={() => hashPass()}/>
	</div>
	</div>);
}

export default MasterGenerator;
