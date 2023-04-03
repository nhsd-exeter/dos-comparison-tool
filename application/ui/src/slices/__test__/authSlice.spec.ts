import { describe, expect, test } from "@jest/globals";
import { RootState } from "../../app/store";
import {
	authSlice,
	initialState,
	selectLoggedIn,
	selectToken,
	signIn,
	signOut,
} from "../authSlice";

describe("tests for authSlice", () => {
	test("User signs in", () => {
		// Arrange - set up the initial state
		const newInitialState = initialState;
		const action = {
			type: signIn,
			payload: { email: "test", password: "test" },
		};
		// Act - run the reducer
		const newState = authSlice.reducer(newInitialState, action);
		// Assert - check the result
		expect(newState.isLoggedIn).toBe(true);
	});

	test("User signs out", () => {
		// Arrange - set up the initial state
		const newInitialState = { isLoggedIn: true, session: null };
		const action = {
			type: signOut,
			payload: { email: "test", password: "test" },
		};
		// Act - run the reducer
		const newState = authSlice.reducer(newInitialState, action);
		// Assert - check the result
		expect(newState.isLoggedIn).toBe(false);
	});
});

describe("tests for auth state selectors", () => {
	test("Test selectLoggedIn", () => {
		// Arrange - set up the initial state
		const newInitialState = {
			auth: { isLoggedIn: true, session: null },
		} as RootState;
		// Act - run the selector
		const isLoggedIn = selectLoggedIn(newInitialState);
		// Assert - check the result
		expect(isLoggedIn).toBe(true);
	});

	test("Test selectToken", () => {
		// Arrange - set up the initial state
		const newInitialState = {
			auth: { isLoggedIn: false, session: null },
		} as RootState;
		// Act - run the selector
		const token = selectToken(newInitialState);
		// Assert - check the result
		expect(token).toBe("");
	});
});
