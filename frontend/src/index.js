import React, {Component} from 'react';
import App from "./components/App"
import ReactDOM from 'react-dom'
import cartReducer from './components/reducers/cartReducer';
import authReducer from './components/reducers/authReducer';
import addressReducer from './components/reducers/addressReducer';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from "redux-thunk";
import {fetchProducts} from './components/actions/cartActions';
import {Provider} from 'react-redux';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({auth: authReducer, cart:cartReducer, address:addressReducer})
const store = createStore(rootReducer,composeEnhances(applyMiddleware(thunk)))

store.dispatch(fetchProducts())


const appDiv = document.getElementById("app");
ReactDOM.render(<Provider store={store}><App/></Provider>, appDiv);

