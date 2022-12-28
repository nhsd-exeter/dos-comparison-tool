import { expect, test } from "@jest/globals";
import { screen } from "@testing-library/react";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import Error from "../Error";

test("Error box displays correctly", () => {
	// Arrange
	const testErrorMessage = "TestErrorMessage";
	const testErrorHeader = "TestErrorHeader";
	renderWithProvidersAndRouter(Error(testErrorMessage, testErrorHeader));
	// Act
	const testErrorMessageElement = screen.getByText(testErrorMessage);
	const testErrorHeaderElement = screen.getByText(testErrorHeader);
	// Assert
	expect(testErrorMessageElement).toBeDefined();
	expect(testErrorHeaderElement).toBeDefined();
});

test("Error box displays correctly with default header", () => {
	// Arrange
	const testErrorMessage = "TestErrorMessage";
	const expectedDefaultErrorHeader = "There is a problem";
	renderWithProvidersAndRouter(Error(testErrorMessage));
	// Act
	const testErrorMessageElement = screen.getByText(testErrorMessage);
	const testErrorHeaderElement = screen.getByText(expectedDefaultErrorHeader);
	// Assert
	expect(testErrorMessageElement).toBeDefined();
	expect(testErrorHeaderElement).toBeDefined();
});
