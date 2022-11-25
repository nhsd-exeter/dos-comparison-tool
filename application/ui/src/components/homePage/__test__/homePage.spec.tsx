import Homepage from "../homePage";
import React from "react";
import { expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";

export const expectedHeader = "Welcome";
export const expectedPageText = "The DoS Comparison Tool is available here";
export const expectedButtonText = "Log in";

test("It renders the HomePage", () => {
	// Arrange: prepare the environment, render the component.
	render(<Homepage />);
	// Act: Get the elements.
	const headerValue = screen.getByRole("heading").textContent;
	const pageTextValue = screen.getByText(expectedPageText).textContent;
	const nextButton = screen.getByRole("button");
	// Assert: Elements are present.
	expect(headerValue).toStrictEqual(expectedHeader);
	expect(pageTextValue).toStrictEqual(expectedPageText);
	expect(nextButton).toHaveProperty("href", "http://localhost/login");
	expect(nextButton).toHaveProperty("text", expectedButtonText);
});
