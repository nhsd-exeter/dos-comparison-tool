import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { ErrorBox } from "../components/common";

/**
 * The login error state.
 */
export interface LoginErrorState {
	error?: React.JSX.Element;
}

/**
 * The initial state of the login error slice.
 */
export const initialState = { isError: undefined } as LoginErrorState;

/**
 * The login error slice.
 */
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

/**
 * Selects the error from the login error state.
 * @param state The login error state.
 * @returns The error.
 */
export const selectError = (state: RootState) => state.loginError.error;

export const { clearError, setError } = loginErrorSlice.actions;
export default loginErrorSlice.reducer;
