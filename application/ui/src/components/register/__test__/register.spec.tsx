import { describe, expect, test } from "@jest/globals";
import { act, fireEvent, screen } from "@testing-library/react";

import { CognitoUserPool } from "amazon-cognito-identity-js";
import sinon from "sinon";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import {
	AUTH_REGISTER_EMAIL_INPUT,
	AUTH_REGISTER_PASSWORD_INPUT,
	AUTH_REGISTER_USERNAME_INPUT,
	FOOTER_ID,
	HEADER_ID,
	NEXT_BUTTON,
} from "../../../constants/componentIds";
import Register from "../register";

const testEmail = "test@test.com";
const testPassword = "testPassword";

test("It renders the expected Register layout", () => {
	// Arrange
	renderWithProvidersAndRouter(<Register />);
	// Act: Get the elements.
	const header = document.getElementById(HEADER_ID);
	const footer = document.getElementById(FOOTER_ID);
	// Assert: Elements are present.
	expect(footer).toBeTruthy();
	expect(header).toBeTruthy();
});

describe("It renders the Register Content", () => {
	test("By default it renders the register form", () => {
		// Arrange
		renderWithProvidersAndRouter(<Register />);
		// Act
		const usernameInput = document.getElementById(AUTH_REGISTER_USERNAME_INPUT);
		const emailInput = document.getElementById(AUTH_REGISTER_EMAIL_INPUT);
		const passwordInput = document.getElementById(AUTH_REGISTER_PASSWORD_INPUT);
		const registerButton = document.getElementById(NEXT_BUTTON);
		// Assert
		expect(usernameInput).toBeTruthy();
		expect(emailInput).toBeTruthy();
		expect(passwordInput).toBeTruthy();
		expect(registerButton).toBeTruthy();
	});

	test("When the user has registered it renders the confirm code form", async () => {
		// Arrange
		sinon
			.stub(CognitoUserPool.prototype, "signUp")
			.callsFake(
				(username, password, attributeList, validationData, callback) => {
					callback(null, "test");
				}
			);
		renderWithProvidersAndRouter(<Register />);
		const usernameInput = screen.getByLabelText("Username") as HTMLInputElement;
		const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
		const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
		const form = screen.getByRole("form") as HTMLButtonElement;
		fireEvent.change(usernameInput, { target: { value: "test" } });
		fireEvent.change(emailInput, { target: { value: testEmail } });
		fireEvent.change(passwordInput, { target: { value: testPassword } });
		// Act
		act(() => fireEvent.submit(form));
		// Assert
		const confirmCodeInput = await screen.findByText("Confirm Code");
		expect(confirmCodeInput).toBeDefined();
		// Cleanup
		sinon.restore();
	});

	test("Error renders when register user fails", async () => {
		// Arrange
		const expectedErrorText = "Error has occurred";
		sinon
			.stub(CognitoUserPool.prototype, "signUp")
			.callsFake(
				(username, password, attributeList, validationData, callback) => {
					callback(Error(expectedErrorText), null);
				}
			);
		renderWithProvidersAndRouter(<Register />);
		const usernameInput = screen.getByLabelText("Username") as HTMLInputElement;
		const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
		const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
		const form = screen.getByRole("form") as HTMLButtonElement;
		fireEvent.change(usernameInput, { target: { value: "test" } });
		fireEvent.change(emailInput, { target: { value: testEmail } });
		fireEvent.change(passwordInput, { target: { value: testPassword } });
		// Act
		act(() => fireEvent.submit(form));
		// Assert
		const errorHeading = screen.findByText("Sign Up Error");
		const errorText = screen.findByText(expectedErrorText);
		expect(errorHeading).toBeDefined();
		expect(errorText).toBeDefined();
		// Cleanup
		sinon.restore();
	});
});
