import Homepage from "../homePage";
import React from "react";
import { expect, test } from "@jest/globals";
import { FOOTER_ID, HEADER_ID } from "../../../constants/componentIds";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import { screen } from "@testing-library/react";

export const expectedHeader = "DoS Comparison Tool";
export const expectedPageText =
	"Compare results from between NHS Directory of Services searches";

test("It renders the expected HomePage layout", () => {
	// Arrange: prepare the environment, render the component.
	renderWithProvidersAndRouter(<Homepage />);
	// Act: Get the elements.
	const header = document.getElementById(HEADER_ID);
	const footer = document.getElementById(FOOTER_ID);
	// Assert: Elements are present.
	expect(footer).toBeTruthy();
	expect(header).toBeTruthy();
});

test("It renders the HomePage content while not being logged in", () => {
	// Arrange: prepare the environment, render the component.
	const expectedButtonText = "Log in";
	renderWithProvidersAndRouter(<Homepage />);
	// Act: Get the elements.
	const headerValue = document.getElementById("pageTitle")?.textContent;
	const pageTextValue = screen.getByText(expectedPageText).textContent;
	const nextButton = screen.getByRole("button");
	// Assert: Elements are present.
	expect(headerValue).toStrictEqual(expectedHeader);
	expect(pageTextValue).toStrictEqual(expectedPageText);
	expect(nextButton).toHaveProperty("href", "http://localhost/login");
	expect(nextButton).toHaveProperty("text", expectedButtonText);
});

test("It renders the HomePage content while being logged in", () => {
	// Arrange: prepare the environment, render the component.
	const expectedButtonText = "Start now";
	renderWithProvidersAndRouter(<Homepage />, {
		preloadedState: { auth: { isLoggedIn: true } },
	});
	// Act: Get the elements.
	const headerValue = document.getElementById("pageTitle")?.textContent;
	const pageTextValue = screen.getByText(expectedPageText).textContent;
	const nextButton = screen.getByRole("button");
	// Assert: Elements are present.
	expect(headerValue).toStrictEqual(expectedHeader);
	expect(pageTextValue).toStrictEqual(expectedPageText);
	expect(nextButton).toHaveProperty("href", "http://localhost/menu");
	expect(nextButton).toHaveProperty("text", expectedButtonText);
});
