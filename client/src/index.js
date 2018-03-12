import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/bootstrap.css';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers/RootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer, 
	composeEnhancers(
		applyMiddleware(thunk)
	));

ReactDOM.render(
	<Provider store={store}>
		<Router>
	    	<App />
	 	</Router>
 	</Provider>
 	, document.getElementById('root'));