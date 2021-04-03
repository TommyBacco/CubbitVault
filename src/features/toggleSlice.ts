import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


export interface ToggleState{
	plain:boolean
}

const initialState:ToggleState = {
	plain:false
}

const toggleSlice = createSlice({
	name:"file",
	initialState,
	reducers:{
		setPlain:(state, {payload}:PayloadAction<boolean>)=>{
			state.plain=payload;
		},
		
	},
});

export const { setPlain } = toggleSlice.actions;
export default toggleSlice.reducer
export const toggleSelector = (state: { fileState: ToggleState }) =>
  state.fileState;
