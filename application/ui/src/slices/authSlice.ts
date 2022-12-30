import { createAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
	isLoggedIn: boolean;
}

export const signIn = createAction("signIn");
export const signOut = createAction("signOut");

export const initialState = { isLoggedIn: false } as AuthState;

// Slice to handle user authentication
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(signIn, (state: AuthState) => {
			state.isLoggedIn = true;
			return state;
		});
		builder.addCase(signOut, (state: AuthState) => {
			state.isLoggedIn = false;
			return state;
		});
	},
});

export const selectLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
