import { describe, expect, test } from "@jest/globals";
import { authSlice, initialState } from "../authSlice";

describe("tests for authSlice", () => {
	test("User signs in", () => {
		// Arrange - set up the initial state
		const newInitialState = initialState;
		const action = {
			type: "signIn",
			payload: { email: "test", password: "test" },
		};
		// Act - run the reducer
		const newState = authSlice.reducer(newInitialState, action);
		// Assert - check the result
		expect(newState.isLoggedIn).toBe(true);
	});

	test("User signs out", () => {
		// Arrange - set up the initial state
		const newInitialState = { isLoggedIn: true };
		const action = {
			type: "signOut",
			payload: { email: "test", password: "test" },
		};
		// Act - run the reducer
		const newState = authSlice.reducer(newInitialState, action);
		// Assert - check the result
		expect(newState.isLoggedIn).toBe(false);
	});
});
