import { createSlice, createAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
	isLoggedIn: boolean;
}

export const signIn = createAction<{ email: string; password: string }>(
	"signIn"
);
export const signOut = createAction("signOut");

export const initialState = { isLoggedIn: false } as AuthState;

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(signIn, (state) => {
			state.isLoggedIn = true;
			return state;
		});
		builder.addCase(signOut, (state) => {
			state.isLoggedIn = false;
			return state;
		});
	},
});

export const selectLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
