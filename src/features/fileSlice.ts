import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


export interface FileState{
	fileUrl: string
	fileName:string
	mimeType:string
	selected: boolean
	errors:string
	uploading:boolean
	loading:boolean
	uuid:string
	key:string
}

const initialState:FileState = {
	fileUrl : "",
	fileName:"",
	mimeType:"",
	selected:false,
	errors:"",
	uploading:false,
	loading:false,
	uuid:"",
	key:""
}

const fileSlice = createSlice({
	name:"file",
	initialState,
	reducers:{
		setSelected:(state, {payload}:PayloadAction<boolean>)=>{
			state.selected=payload;
		},
		setErrors:(state, {payload}:PayloadAction<string>)=>{
			state.errors=payload;
		},
		setFileUrl:(state, {payload}:PayloadAction<string>)=>{
			state.fileUrl=payload;
		},
		setFileName:(state, {payload}:PayloadAction<string>)=>{
			state.fileName=payload;
		},
		setMime:(state, {payload}:PayloadAction<string>)=>{
			state.mimeType=payload;
		},
		setUploading:(state, {payload}:PayloadAction<boolean>)=>{
			state.uploading=payload;
		},
		setLoading:(state, {payload}:PayloadAction<boolean>)=>{
			state.loading=payload;
		},
		setUuid:(state, {payload}:PayloadAction<string>)=>{
			state.uuid=payload;
		},
		setKey:(state, {payload}:PayloadAction<string>)=>{
			state.key=payload;
		},
	},
});

export const { setSelected, setErrors, setFileUrl, setFileName, setMime, setUploading, setUuid, setKey, setLoading } = fileSlice.actions;
export default fileSlice.reducer
export const fileSelector = (state: { fileState: FileState }) =>
  state.fileState;
