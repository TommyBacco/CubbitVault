import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


export interface FileDownloadState{

	downloadPressed:boolean
	uuid:string
	key:string
	name:string
	mime:string
}

const initialState:FileDownloadState = {

	uuid:"",
	key:"",
	name:"",
	mime:"",
	downloadPressed:false
}

const fileUploadSlice = createSlice({

	name:"file",
	initialState,
	reducers:{
		
		setUuid:(state, {payload}:PayloadAction<string>)=>{
			state.uuid=payload;
		},
		setKey:(state, {payload}:PayloadAction<string>)=>{
			state.key=payload;
		},
		setDownloadPressed:(state, {payload}:PayloadAction<boolean>)=>{
			state.downloadPressed=payload;
		},
		setName:(state, {payload}:PayloadAction<string>)=>{
			state.name=payload;
		},
		setMime:(state, {payload}:PayloadAction<string>)=>{
			state.mime=payload;
		},
	},
});

export const { setUuid, setKey, setDownloadPressed, setMime, setName} = fileUploadSlice.actions;
export default fileUploadSlice.reducer
export const fileSelector = (state: { fileState: FileDownloadState }) =>
  state.fileState;
