import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


export interface FileState{
	file:File | null
	selected: boolean
	errors:string
}

const initialState:FileState = {
	file : null,
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
		setFile:(state, {payload}:PayloadAction<File>)=>{
			state.file=payload;
		},
	},
});

export const { setSelected, setErrors, setFile } = fileSlice.actions;
export default fileSlice.reducer
export const fileSelector = (state: { fileStore: FileState }) =>
  state.fileStore;
