import React from 'react';
import "./index.css"
import ReactDOM from 'react-dom';
import App from './App';
import { Provider, teamsTheme } from '@fluentui/react-northstar'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
	<Provider theme={teamsTheme}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root'),
)
