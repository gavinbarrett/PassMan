import React, {useEffect, useState} from 'react';

const CiphertextController = ({domain, ciphertext}) => {
	
	const [check, toggleCheck] = useState(false);

	useEffect(() => {
		if (check) {
			console.log('pulling data');
		}

	}, [check]);

	const toggle = () => { (check) ? toggleCheck(false) : toggleCheck(true) };

	return (<div id='ctextctrl'>
		<input type='checkbox' id='ctextcheck' checked={check} onChange={() => { (check) ? toggleCheck(false) : toggleCheck(true) }}/>
		<div>Domain: {domain}</div>
		<div>Password: {ciphertext}</div>
	</div>);
}

export default CiphertextController;
