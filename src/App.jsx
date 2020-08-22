import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Locker from './Locker';

const App = () => {
	return (<>
	<Header/>
	<Locker/>
	</>);
}

ReactDOM.render(<App/>, document.getElementById('root'));
