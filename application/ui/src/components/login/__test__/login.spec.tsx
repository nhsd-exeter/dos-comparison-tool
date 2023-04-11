import { describe, expect, test } from "@jest/globals";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import {
	AUTH_FORGOTTEN_PASSWORD_ACTION_LINK,
	AUTH_SIGN_UP_ACTION_LINK,
	FOOTER_ID,
	HEADER_ID,
} from "../../../constants/componentIds";
import {
	FORGOTTEN_PASSWORD_PATH,
	REGISTER_PATH,
} from "../../../constants/paths";
import Login from "../login";

const testBaseUrl = "http://localhost";

test("It renders the expected Login layout", () => {
	// Arrange
	renderWithProvidersAndRouter(<Login />);
	// Act: Get the elements.
	const header = document.getElementById(HEADER_ID);
	const footer = document.getElementById(FOOTER_ID);
	// Assert: Elements are present.
	expect(footer).toBeTruthy();
	expect(header).toBeTruthy();
});

describe("All Login Content is covered", () => {
	test("It renders the default Login Content", () => {
		// Arrange
		renderWithProvidersAndRouter(<Login />);
		// Act
		const signUpActionLink = document.getElementById(AUTH_SIGN_UP_ACTION_LINK);
		const signUpActionLinkText = signUpActionLink?.textContent;
		const forgottenPasswordActionLink = document.getElementById(
			AUTH_FORGOTTEN_PASSWORD_ACTION_LINK
		);
		const forgottenPasswordActionLinkText =
			forgottenPasswordActionLink?.textContent;
		// Assert
		expect(signUpActionLink).toBeDefined();
		expect(forgottenPasswordActionLink).toBeDefined();
		expect(signUpActionLink).toHaveProperty(
			"href",
			testBaseUrl + REGISTER_PATH
		);
		expect(forgottenPasswordActionLink).toHaveProperty(
			"href",
			testBaseUrl + FORGOTTEN_PASSWORD_PATH
		);
		expect(signUpActionLinkText).toEqual("Create an account");
		expect(forgottenPasswordActionLinkText).toEqual("Forgotten your password?");
	});

	test("When an error occurs it renders the error message", () => {
		// Arrange
		const errorMessage = "Extensive Error Message on Login Page";
		const testId = "login-error-message";
		const errorElement = <p id={testId}>{errorMessage}</p>;
		const preloadedState = {
			auth: { isLoggedIn: false },
			loginError: { error: errorElement },
		};

		renderWithProvidersAndRouter(<Login />, { preloadedState });
		// Act
		const errorMessageElement = document.getElementById(testId);
		// Assert
		expect(errorMessageElement).toBeDefined();
		expect(errorMessageElement?.textContent).toEqual(errorMessage);
	});
});
