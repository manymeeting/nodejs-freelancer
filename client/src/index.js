import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/bootstrap.css';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/RootReducer';


const store = createStore(reducer, {});

console.log(store.getState())

ReactDOM.render(
	<Provider store={store}>
		<Router>
	    	<App />
	 	</Router>
 	</Provider>
 	, document.getElementById('root'));