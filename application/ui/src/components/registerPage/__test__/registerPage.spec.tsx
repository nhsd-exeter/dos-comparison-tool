import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import {
	AUTH_REGISTER_EMAIL_INPUT,
	AUTH_REGISTER_PASSWORD_INPUT,
	AUTH_REGISTER_USERNAME_INPUT,
	FOOTER_ID,
	HEADER_ID,
	NEXT_BUTTON,
} from "../../../constants/componentIds";
import RegisterPage from "../registerPage";
import { expect, test } from "@jest/globals";
import React from "react";

test("It renders the expected RegisterPage layout", () => {
	// Arrange: prepare the environment, render the component.
	renderWithProvidersAndRouter(<RegisterPage />);
	// Act: Get the elements.
	const header = document.getElementById(HEADER_ID);
	const footer = document.getElementById(FOOTER_ID);
	// Assert: Elements are present.
	expect(footer).toBeTruthy();
	expect(header).toBeTruthy();
});

test("It renders the RegisterPage Content", () => {
	// Arrange: prepare the environment, render the component.
	renderWithProvidersAndRouter(<RegisterPage />);
	// Act: try to find the expected links.
	const usernameInput = document.getElementById(AUTH_REGISTER_USERNAME_INPUT);
	const emailInput = document.getElementById(AUTH_REGISTER_EMAIL_INPUT);
	const passwordInput = document.getElementById(AUTH_REGISTER_PASSWORD_INPUT);
	const registerButton = document.getElementById(NEXT_BUTTON);
	// Assert: check that required links are indeed links.
	expect(usernameInput).toBeTruthy();
	expect(emailInput).toBeTruthy();
	expect(passwordInput).toBeTruthy();
	expect(registerButton).toBeTruthy();
});
