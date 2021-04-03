import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk, {ThunkMiddleware} from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"
import {createLogger} from 'redux-logger';
import fileSliceReducer from './features/fileSlice'
import { configureStore, Action } from "@reduxjs/toolkit";



const logger = createLogger();

const store = configureStore({
  reducer: {
    fileState: fileSliceReducer,
    // anyOtherStore: anyOtherSlice,
    // middleware: ['array of middlewares'],
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type
export type AppDispatch = typeof store.dispatch

export default store;