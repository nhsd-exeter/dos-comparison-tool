import { expect, test } from "@jest/globals";
import { devTools, store } from "../store";

test("DevTools is setup in development", () => {
	// Arrange
	process.env.NODE_ENV = "development";
	// Act
	const result = devTools();
	// Assert
	expect(result).toBeTruthy();
	// Cleanup
	delete process.env.NODE_ENV;
});

test("DevTools is not setup in production", () => {
	// Arrange
	process.env.NODE_ENV = "production";
	// Act
	const result = devTools();
	// Assert
	expect(result).toBeFalsy();
	// Cleanup
	delete process.env.NODE_ENV;
});

test("Store contains expected state", () => {
	// Assert
	expect(store.getState().auth).toStrictEqual({ isLoggedIn: false });
});
