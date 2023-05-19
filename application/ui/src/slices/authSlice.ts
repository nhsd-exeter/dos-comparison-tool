import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import { RootState } from "../app/store";

/**
 * The auth state.
 * isLoggedIn Whether the user is logged in.
 * session The session.
 */
export interface AuthState {
	isLoggedIn: boolean;
	session: CognitoUserSession | null;
}

/**
 * The initial state.
 */
export const initialState = { isLoggedIn: false, session: null } as AuthState;

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		signIn: (state, action: PayloadAction<CognitoUserSession>) => {
			state.session = action.payload;
			state.isLoggedIn = true;
		},
		signOut: (state) => {
			state.session = null;
			state.isLoggedIn = false;
		},
	},
});

export const selectLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectToken = (state: RootState) =>
	state.auth.isLoggedIn ? state.auth.session?.getIdToken().getJwtToken() : "";

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
