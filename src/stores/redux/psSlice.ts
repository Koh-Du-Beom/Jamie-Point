import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PsState {
	type : string;
	psID : string;
	detail : string;
	psImage : string;
}


const initialState: PsState = {
	type : '',
	psID : '',
	detail : '',
	psImage : '',
};

export const psSlice = createSlice({
	name : 'coding problem solving',
	initialState,
	reducers: {
		updatePS : (state, action : PayloadAction<PsState>) =>{
			state.type = action.payload.type;
			state.psID = action.payload.psID;
			state.detail = action.payload.detail;
			state.psImage = action.payload.psImage;
		},
	},
});

export const { updatePS } = psSlice.actions;

export default psSlice.reducer;