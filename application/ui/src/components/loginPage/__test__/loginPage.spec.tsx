import { describe, expect, test } from "@jest/globals";
import { fireEvent, screen } from "@testing-library/react";
import { CognitoUser } from "amazon-cognito-identity-js";
import sinon from "sinon";
import {
	FOOTER_ID,
	HEADER_ID,
	NEXT_BUTTON,
} from "../../../constants/componentIds";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import LoginPage from "../loginPage";

const testUsername = "test";
const testPassword = "testPassword";

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
		const nextButtonValue = document.getElementById(NEXT_BUTTON)?.textContent;
		const nextButton = document.getElementById(NEXT_BUTTON);
		// Assert: check that required links are indeed links.
		expect(nextButtonValue).toEqual("Log in");
		expect(nextButton).toBeTruthy();
	});

	test("The login process is initiated when the login button is clicked", () => {
		// Arrange
		sinon
			.stub(CognitoUser.prototype, "authenticateUser")
			.callsFake((authDetails, callbacks) => {
				callbacks.onSuccess();
			});
		renderWithProvidersAndRouter(<LoginPage />);
		const usernameInput = screen.getByLabelText("Username") as HTMLInputElement;
		const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
		const form = screen.getByRole("form") as HTMLButtonElement;
		// Act
		fireEvent.change(usernameInput, { target: { value: testUsername } });
		fireEvent.change(passwordInput, { target: { value: testPassword } });
		fireEvent.submit(form);
		// Assert
		expect(CognitoUser.prototype.authenticateUser.calledOnce).toBe(true);
	});
});
