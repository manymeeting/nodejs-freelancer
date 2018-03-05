import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/bootstrap.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

ReactDOM.render(
	<Router>
    	<App />
 	</Router>
 	, document.getElementById('root'));