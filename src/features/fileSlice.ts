import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


export interface FileState{
	fileUrl: string
	fileName:string
	selected: boolean
	errors:string
}

const initialState:FileState = {
	fileUrl : "",
	fileName:"",
	selected:false,
	errors:""
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
	},
});

export const { setSelected, setErrors, setFileUrl, setFileName } = fileSlice.actions;
export default fileSlice.reducer
export const fileSelector = (state: { fileStore: FileState }) =>
  state.fileStore;
