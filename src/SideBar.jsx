import React from 'react';
import MasterGenerator from './MasterGenerator';
import PasswordDatabase from './PasswordDatabase';
import AppSettings from './AppSettings';

const SideBar = ({updatePage}) => {

	const renderMasterGenerator = () => {
		console.log('Rendering master generator page');
		updatePage(<MasterGenerator/>);
	}
	const renderPasswordDatabase = () => {
		console.log('Rendering password database page');
		updatePage(<PasswordDatabase/>);
	}
	const renderAppSettings = () => {
		console.log('Rendering app settings page');
		updatePage(<AppSettings/>);
	}

	return (<div id='sidebar'>
	<div className='icons' onClick={() => renderMasterGenerator()}><img src="./src/icons/open-iconic-master/svg/beaker.svg" width="30px" height="30px"/></div>
	<div className='icons' onClick={() => renderPasswordDatabase()}><img src="./src/icons/open-iconic-master/svg/box.svg" width="30px" height="30px"/></div>
	<div className='icons' onClick={() => renderAppSettings()}><img src="./src/icons/open-iconic-master/svg/list.svg" width="30px" height="30px"/></div>
	</div>);
}

export default SideBar;
