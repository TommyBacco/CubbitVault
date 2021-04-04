import fileSliceReducer from './features/fileSlice'
import fileDownloadReducer from './features/fileDownloadSlice'
import toggleReducer from './features/toggleSlice'
import { configureStore } from "@reduxjs/toolkit";




const store = configureStore({
  reducer: {
    fileState: fileSliceReducer,
    fileDownloadState : fileDownloadReducer,
    toggleState: toggleReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type
export type AppDispatch = typeof store.dispatch

export default store;