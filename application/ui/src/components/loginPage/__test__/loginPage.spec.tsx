import LoginPage from "../loginPage";
import React from "react";
import { AUTH_SUBMIT_BUTTON } from "../../../constants/componentIds";
import { describe, expect, test } from "@jest/globals";
import { fireEvent } from "@testing-library/react";
import { FOOTER_ID, HEADER_ID } from "../../../constants/componentIds";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import AWS from "aws-sdk-mock";

import { stub } from "sinon";
import * as Cognito from "amazon-cognito-identity-js";

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

describe("All LoginPage Content is covered", () => {
	test("It renders the default LoginPage Content", () => {
		// Arrange: prepare the environment, render the component.
		renderWithProvidersAndRouter(<LoginPage />);
		// Act: try to find the expected links.
		const nextButtonValue =
			document.getElementById(AUTH_SUBMIT_BUTTON)?.textContent;
		const nextButton = document.getElementById(AUTH_SUBMIT_BUTTON);
		// Assert: check that required links are indeed links.
		expect(nextButtonValue).toEqual("Log in");
		expect(nextButton).toBeTruthy();
	});

	test("The login process is initiated when the login button is clicked", () => {
		// Arrange: prepare the environment, render the component.
		AWS.mock(
			"CognitoIdentityServiceProvider",
			"initiateAuth",
			(params, callback) => {
				callback(null, "success");
			}
		);
		renderWithProvidersAndRouter(<LoginPage />);
		// Act: try to find the expected links.
		const nextButton = document.getElementById(AUTH_SUBMIT_BUTTON);
		fireEvent(nextButton, new MouseEvent("click"));
		// Assert: check that required links are indeed links.

		// Clean up.
		AWS.restore("CognitoIdentityServiceProvider");
	});
});
