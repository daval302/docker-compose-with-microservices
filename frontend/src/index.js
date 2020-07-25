import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux";
import { combineReducers } from "redux";
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer'
import paymentRequestReducer from './reducers/paymentRequestReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// SOTRE
const store =  createStore(
    combineReducers({ 
      user: userReducer,
      payment: paymentRequestReducer
    }),
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

// RENDER
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
