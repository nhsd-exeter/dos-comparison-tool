import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

export function devTools(): boolean {
	return process.env.NODE_ENV === "development" ? true : false;
}

export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
	devTools: devTools(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
