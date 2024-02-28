import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserInfoType from "../../types/UserInfoType.type";

interface UserState{
	name: string;
  grade: string;
  major: string;
  studentNumber: string;
  phoneNumber: string;
  email: string;
  bankAccount: string;
  bankName: string;
  bankBookImg: string;
  idCardImg: string;
  signImg: string;
}

const initialState: UserState = {
	name : '',
	grade : '',
	major : '',
	studentNumber: '',
	phoneNumber: '',
  email: '',
  bankAccount: '',
  bankName: '',
  bankBookImg: '',
  idCardImg: '',
  signImg: '',
	
};

export const userSlice = createSlice({
	name : 'user',
	initialState,
	reducers: {
		updateUserInfo: (state, action: PayloadAction<UserInfoType>) => {
			return { ...state, ...action.payload};
		},
	},
});

export const { updateUserInfo,  } = userSlice.actions;
export default userSlice.reducer;



