import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import App from "./App"
import store from './store'

//Ad App viene passato lo store con tutti i reducers
ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//DOM connected to store whic is connected to rootReducer that combines reducers

//Action creators create objects → 
//objects are dispatched to the store → 
//the store invokes reducers → 
//reducers generate new state → 
//listeners are notified of state updates

//Redux does not dictate how effects should be handles,
//for that there are middleware (redux-thunx is one)