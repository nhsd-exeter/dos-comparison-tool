import { describe, expect, test } from "@jest/globals";
import { ErrorBox } from "../../components/common";
import {
	clearError,
	initialState,
	loginErrorSlice,
	setError,
} from "../loginErrorSlice";

describe("tests for loginErrorSlice", () => {
	test("An error occurs during login", () => {
		// Arrange - set up the initial state
		const newInitialState = initialState;
		const expectedErrorMessage = "example";
		const expectedErrorName = "example";
		const error = new Error(expectedErrorMessage);
		error.name = expectedErrorName;
		const action = {
			type: setError,
			payload: error,
		};
		// Act - run the reducer
		const newState = loginErrorSlice.reducer(newInitialState, action);
		// Assert - check the result
		expect(newState.error).toStrictEqual(
			ErrorBox(expectedErrorMessage, expectedErrorName)
		);
	});

	test("Error is cleared ", () => {
		// Arrange - set up the initial state
		const newInitialState = { error: ErrorBox("example") };
		// Act - run the reducer
		const newState = loginErrorSlice.reducer(newInitialState, clearError);
		// Assert - check the result
		expect(newState.error).toBe(undefined);
	});
});
