import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PsState {
	type : string;
	psID : string;
	detail : string;
	psImage : string;
}


const initialState: PsState[] = [];

export const psSlice = createSlice({
	name : 'coding problem solving',
	initialState,
	reducers: {
		updatePS : (state, action : PayloadAction<PsState>) =>{
			const index = state.findIndex(ps => ps.type === action.payload.type);

			if(index !== -1){
				state[index] = action.payload;
			}else{
				state.push(action.payload);
			}
		},
		removePs : (state, action: PayloadAction<{ type : string }>) => {
			const index = state.findIndex(ps => ps.type === action.payload.type);
			if (index !== -1){
				state.splice(index, 1);
			}
		}
	},
});

export const { updatePS, removePs } = psSlice.actions;

export default psSlice.reducer;