import React, {useState} from 'react';
const {ipcRenderer} = require('electron');

const Locker = () => {

	const hashPass = () => {
		const password = document.getElementById('password').value;
		console.log(password);
		ipcRenderer.send('hashMaster', password);
	}

	return (<div id='locker'>
	<input id='password' placeholder="enter password here"/>
	<input id='submit' type="submit" onClick={() => hashPass()}/>
	</div>);
}

export default Locker;
