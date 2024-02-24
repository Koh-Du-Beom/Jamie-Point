import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ActivityType from "../../types/ActivityType.type";
import UserInfoType from "../../types/UserInfoType.type";

interface TotalActivity{
	activityCount : number;
	totalPoint : number;
}

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

  activities: ActivityType[];
	swCoreInfo : TotalActivity;
	swCooperationInfo : TotalActivity;
	swValueInfo : TotalActivity;
	swConvergenceInfo : TotalActivity;
	totalAwards : number;
	totalPoint : number;
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
  activities: [],
	swCoreInfo : {activityCount: 0, totalPoint: 0},
	swCooperationInfo : {activityCount: 0, totalPoint: 0},
	swValueInfo : {activityCount: 0, totalPoint: 0},
	swConvergenceInfo : {activityCount: 0, totalPoint: 0},
	totalAwards : 0,
	totalPoint : 0,
};

export const userSlice = createSlice({
	name : 'user',
	initialState,
	reducers: {
		updateUserInfo: (state, action: PayloadAction<UserInfoType>) => {
			return { ...state, ...action.payload};
		},
		updateActivity: (state, action: PayloadAction<{ id: string, activity: ActivityType }>) => {
			const { id, activity } = action.payload;

			// activities 배열에서 주어진 id를 가진 항목 찾기
			const activityIndex = state.activities.findIndex(a => a.id === id);		

			// 검색된 자료가 있으면 그 항목 업데이트, 없으면 새로 push
			if (activityIndex !== -1) {
				state.activities[activityIndex] = activity;
			} else {
				state.activities.push(activity);
			}
					
		},
		removeActivity: (state, action : PayloadAction<{id : string }>) => {
			state.activities = state.activities.filter(activity => activity.id !== action.payload.id)
		},
		updateSWCoreInfo: (state, action: PayloadAction<{activityCount : number, totalPoint : number}>) => {
			state.swCoreInfo.activityCount = action.payload.activityCount;
			state.swCoreInfo.totalPoint = action.payload.totalPoint;
		},
		updateSWCooperationInfo: (state, action: PayloadAction<{activityCount : number, totalPoint : number}>) => {
			state.swCooperationInfo.activityCount = action.payload.activityCount;
			state.swCooperationInfo.totalPoint = action.payload.totalPoint;
		},
		updateSWValueInfo: (state, action: PayloadAction<{activityCount : number, totalPoint : number}>) => {
			state.swValueInfo.activityCount = action.payload.activityCount;
			state.swValueInfo.totalPoint = action.payload.totalPoint;
		},
		updateSWConvergenceInfo: (state, action: PayloadAction<{activityCount : number, totalPoint : number}>) => {
			state.swConvergenceInfo.activityCount = action.payload.activityCount;
			state.swConvergenceInfo.totalPoint = action.payload.totalPoint;
		},
		updateTotals: (state) => {
			state.totalAwards = state.swCoreInfo.activityCount
				+ state.swCooperationInfo.activityCount
				+ state.swValueInfo.activityCount
				+ state.swConvergenceInfo.activityCount;

			state.totalPoint = state.swCoreInfo.totalPoint
				+ state.swCooperationInfo.totalPoint
				+ state.swValueInfo.totalPoint
				+ state.swConvergenceInfo.totalPoint;
	},
	},
});

export const { updateUserInfo, updateActivity, removeActivity, updateSWCoreInfo, updateSWCooperationInfo, updateSWValueInfo, updateSWConvergenceInfo, updateTotals } = userSlice.actions;
export default userSlice.reducer;



