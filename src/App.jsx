import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import SideBar from './SideBar';
import Locker from './Locker';
import MasterGenerator from './MasterGenerator';

const App = () => {
	
	const [page, updatePage] = useState(<MasterGenerator/>);

	return (<div id='appwrap'>
	<SideBar updatePage={updatePage}/>
	{page}
	</div>);
}

ReactDOM.render(<App/>, document.getElementById('root'));
