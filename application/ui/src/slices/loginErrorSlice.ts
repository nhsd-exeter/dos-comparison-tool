import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ErrorBox } from "../components/common";
import { RootState } from "../store";

export interface LoginErrorState {
	error?: JSX.Element;
}

export const initialState = { isError: false } as LoginErrorState;
// Slice to handle errors during login
export const loginErrorSlice = createSlice({
	name: "loginError",
	initialState,
	reducers: {
		setError(state: LoginErrorState, action: PayloadAction<Error>) {
			state.error = ErrorBox(action.payload.message, action.payload.name);
		},
		clearError(state: LoginErrorState) {
			state.error = undefined;
		},
	},
});

export const selectError = (state: RootState) => state.loginError.error;

export const { clearError, setError } = loginErrorSlice.actions;
export default loginErrorSlice.reducer;
