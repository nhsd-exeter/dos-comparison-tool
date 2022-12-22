import { expect, test } from "@jest/globals";
import { screen } from "@testing-library/react";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import Error from "../Error";

test("Error box displays correctly", () => {
	// Arrange: prepare the environment, render the component.
	const testErrorMessage = "TestErrorMessage";
	const testErrorHeader = "TestErrorHeader";
	renderWithProvidersAndRouter(Error(testErrorMessage, testErrorHeader));
	// Act: try to find the expected links.
	const testErrorMessageElement = screen.getByText(testErrorMessage);
	const testErrorHeaderElement = screen.getByText(testErrorHeader);
	// Assert: check that required links are indeed links.
	expect(testErrorMessageElement).toBeDefined();
	expect(testErrorHeaderElement).toBeDefined();
});

test("Error box displays correctly with default header", () => {
	// Arrange: prepare the environment, render the component.
	const testErrorMessage = "TestErrorMessage";
	const expectedDefaultErrorHeader = "There is a problem";
	renderWithProvidersAndRouter(Error(testErrorMessage));
	// Act: try to find the expected links.
	const testErrorMessageElement = screen.getByText(testErrorMessage);
	const testErrorHeaderElement = screen.getByText(expectedDefaultErrorHeader);
	// Assert: check that required links are indeed links.
	expect(testErrorMessageElement).toBeDefined();
	expect(testErrorHeaderElement).toBeDefined();
});
