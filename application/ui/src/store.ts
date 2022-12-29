import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import loginErrorReducer from "./slices/loginErrorSlice";

export function devTools(): boolean {
	return process.env.NODE_ENV === "development" ? true : false;
}

export const store = configureStore({
	reducer: {
		auth: authReducer,
		loginError: loginErrorReducer,
	},
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
	devTools: devTools(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
