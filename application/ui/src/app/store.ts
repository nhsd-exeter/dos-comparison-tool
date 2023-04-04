import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import ccsComparisonSearchReducer from "../slices/ccsComparisonSearchSlice";
import loginErrorReducer from "../slices/loginErrorSlice";

export function devTools(): boolean {
	return process.env.NODE_ENV === "development" ? true : false;
}
export const rootReducer = {
	auth: authReducer,
	loginError: loginErrorReducer,
	ccsComparisonSearch: ccsComparisonSearchReducer,
};

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	devTools: devTools(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
