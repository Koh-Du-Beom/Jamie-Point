import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PsState {
	type : string;
	psID : string;
	detail : string;
	psImage : string;
}


const initialState: PsState[] = [
	{
		type : '백준 Bronze/Silver/Gold/Platinum/Diamond/Ruby',
		psID : '',
		detail : '',
		psImage : '',
	},
	{
		type : '프로그래머스 1레벨/2레벨/3레벨 이상',
		psID : '',
		detail : '',
		psImage : '',
	},
];

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
	},
});

export const { updatePS } = psSlice.actions;

export default psSlice.reducer;