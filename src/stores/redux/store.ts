import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import psReducer from './psSlice';
import activityReducer from './activitySlice';

export const store = configureStore({
	reducer: {
		userInfo : userReducer,
		psInfo : psReducer,
		activityInfo : activityReducer,
	}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;