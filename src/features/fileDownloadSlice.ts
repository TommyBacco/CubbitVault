import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface FileDownloadState{

	downloadPressed:boolean
	fileidInserted:boolean
	uuid:string
	key:string
	name:string
	mime:string
	size:number
}

const initialState:FileDownloadState = {

	uuid:"",
	key:"",
	name:"",
	mime:"",
	fileidInserted:false,
	downloadPressed:false,
	size:0
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
		setSize:(state, {payload}:PayloadAction<number>)=>{
			state.size=payload;
		},
		setFileidInserted:(state, {payload}:PayloadAction<boolean>)=>{
			state.fileidInserted=payload;
		},
	},
});

export const { setUuid, setKey, setDownloadPressed, setMime, setName, setSize, setFileidInserted} = fileUploadSlice.actions;
export default fileUploadSlice.reducer
export const fileSelector = (state: { fileState: FileDownloadState }) =>
  state.fileState;
