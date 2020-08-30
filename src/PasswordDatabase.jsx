import React, {useEffect, useState} from 'react';
import CiphertextController from './CiphertextController';
const {ipcRenderer} = require('electron');

const PasswordDatabase = () => {
	
	const [keys, updateKeys] = useState(null);

	const extractCtexts = (args) => {
		let arr = [];
		let index = 0;
		const data = JSON.parse(args);
		console.log('DATA' + data);
		for (const [key, value] of Object.entries(data)) {
			let domain = value["domain"];
			let password = value["password"];
			arr.push(<CiphertextController key={index} domain={domain} ciphertext={password}/>);
			index++;
		}
		return arr;
	}

	useEffect(() => {
		// update the displayed ciphertexts
		ipcRenderer.on('cipherset', (event, args) => {
			const ctexts = extractCtexts(args);
			updateKeys(ctexts);
		});
		// request the ciphertexts
		ipcRenderer.send('getCipherSet');
	}, [keys]);

	const enc = () => {
		const val = document.getElementById('keyadd').value;
		const domain = document.getElementById('domain').value;
		// retrieve encrypted password
		ipcRenderer.on('enc_pass', (event, args) => {
			updateKeys(args);
		});
		// send password to the main process
		ipcRenderer.send('pass', [domain, val]);
	}

	return (<div id='passworddb'>
	<div id='keylist'>
	<div id='keys'>{keys}</div>
	</div>
	<div id='keyadder'>
	<input type='text' id='keyadd' placerholder='Add your password here'/>
	<input type='text' id='domain' placeholder='Enter the domain description here.'/>
	<button type='sumbit' id='keyaddsub' onClick={() => enc()}>Add Password</button>
	</div>
	</div>);
}

export default PasswordDatabase;
