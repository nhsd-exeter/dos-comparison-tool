import LoginPage from "../loginPage";
import React from "react";
import { AUTH_SUBMIT_BUTTON } from "../../../constants/componentIds";
import { expect, test } from "@jest/globals";
import { FOOTER_ID, HEADER_ID } from "../../../constants/componentIds";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";

test("It renders the expected LoginPage layout", () => {
	// Arrange: prepare the environment, render the component.
	renderWithProvidersAndRouter(<LoginPage />);
	// Act: Get the elements.
	const header = document.getElementById(HEADER_ID);
	const footer = document.getElementById(FOOTER_ID);
	// Assert: Elements are present.
	expect(footer).toBeTruthy();
	expect(header).toBeTruthy();
});

test("It renders the LoginPage Content", () => {
	// Arrange: prepare the environment, render the component.
	renderWithProvidersAndRouter(<LoginPage />);
	// Act: try to find the expected links.
	const nextButton = document.getElementById(AUTH_SUBMIT_BUTTON)?.textContent;
	// Assert: check that required links are indeed links.
	expect(nextButton).toEqual("Log in");
});
