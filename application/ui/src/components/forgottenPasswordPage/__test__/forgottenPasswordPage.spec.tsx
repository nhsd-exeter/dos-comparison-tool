import { describe, expect, test } from "@jest/globals";
import { act, fireEvent, screen } from "@testing-library/react";
import { CognitoUser } from "amazon-cognito-identity-js";
import sinon from "sinon";
import {
	AUTH_FORGOTTEN_PASSWORD_USERNAME_INPUT,
	AUTH_RESET_PASSWORD_NEW_PASSWORD_INPUT,
	FOOTER_ID,
	HEADER_ID,
	NEXT_BUTTON,
} from "../../../constants/componentIds";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import ForgottenPasswordPage from "../forgottenPasswordPage";

test("It renders the expected ForgottenPasswordPage layout", () => {
	// Arrange
	renderWithProvidersAndRouter(<ForgottenPasswordPage />);
	// Act: Get the elements.
	const header = document.getElementById(HEADER_ID);
	const footer = document.getElementById(FOOTER_ID);
	// Assert: Elements are present.
	expect(footer).toBeTruthy();
	expect(header).toBeTruthy();
});

describe("It renders the ForgottenPasswordPage Content", () => {
	test("By default it renders the forgottenPassword form", () => {
		// Arrange
		renderWithProvidersAndRouter(<ForgottenPasswordPage />);
		// Act
		const usernameInput = document.getElementById(
			AUTH_FORGOTTEN_PASSWORD_USERNAME_INPUT
		);
		const forgottenPasswordButton = document.getElementById(NEXT_BUTTON);
		// Assert
		expect(usernameInput).toBeTruthy();
		expect(forgottenPasswordButton).toBeTruthy();
	});

	test("When the forgottenPassword form is submitted it renders the newPassword form", () => {
		// Arrange
		sinon
			.stub(CognitoUser.prototype, "forgotPassword")
			.callsFake(({ onSuccess }) => {
				onSuccess({ name: "Success" });
			});
		renderWithProvidersAndRouter(<ForgottenPasswordPage />);
		// Act
		const usernameInput = screen.getByLabelText("Username") as HTMLInputElement;
		fireEvent.change(usernameInput, { target: { value: "test" } });
		const form = screen.getByRole("form") as HTMLButtonElement;
		act(() => fireEvent.submit(form));
		const newPasswordInput = document.getElementById(
			AUTH_RESET_PASSWORD_NEW_PASSWORD_INPUT
		);
		const resetPasswordButton = document.getElementById(NEXT_BUTTON);
		// Assert
		expect(newPasswordInput).toBeTruthy();
		expect(resetPasswordButton).toBeTruthy();
	});
});
