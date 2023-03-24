import { describe, expect, test } from "@jest/globals";
import { act, fireEvent, screen } from "@testing-library/react";
import { CognitoUser } from "amazon-cognito-identity-js";
import sinon from "sinon";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import {
	AUTH_FORGOTTEN_PASSWORD_USERNAME_INPUT,
	AUTH_RESET_PASSWORD_NEW_PASSWORD_INPUT,
	FOOTER_ID,
	HEADER_ID,
	NEXT_BUTTON,
} from "../../../constants/componentIds";
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
		// Cleanup
		sinon.restore();
	});
});

describe("It renders the ForgottenPasswordForm Errors", () => {
	test("Error renders when the forgottenPassword request occurs", () => {
		// Arrange
		sinon
			.stub(CognitoUser.prototype, "forgotPassword")
			.callsFake(({ onFailure }) => {
				onFailure(Error("Failure"));
			});
		renderWithProvidersAndRouter(<ForgottenPasswordPage />);
		// Act
		const usernameInput = screen.getByLabelText("Username") as HTMLInputElement;
		fireEvent.change(usernameInput, { target: { value: "test" } });
		const form = screen.getByRole("form") as HTMLButtonElement;
		act(() => fireEvent.submit(form));
		const error = screen.getByText(
			"An unknown error occurred while requesting a password reset: Error"
		);
		// Assert
		expect(error).toBeDefined();
		// Cleanup
		sinon.restore();
	});

	test("InvalidParameterException renders when the forgottenPassword request occurs", () => {
		// Arrange
		const responseError = new Error("Error");
		responseError.name = "InvalidParameterException";
		sinon
			.stub(CognitoUser.prototype, "forgotPassword")
			.callsFake(({ onFailure }) => {
				onFailure(responseError);
			});
		renderWithProvidersAndRouter(<ForgottenPasswordPage />);
		// Act
		const usernameInput = screen.getByLabelText("Username") as HTMLInputElement;
		fireEvent.change(usernameInput, { target: { value: "test" } });
		const form = screen.getByRole("form") as HTMLButtonElement;
		act(() => fireEvent.submit(form));
		const error = screen.getByText("Invalid username");
		// Assert
		expect(error).toBeDefined();
		// Cleanup
		sinon.restore();
	});

	test("UserNotFoundException renders when the forgottenPassword request occurs", () => {
		// Arrange
		const responseError = new Error("Error");
		responseError.name = "UserNotFoundException";
		sinon
			.stub(CognitoUser.prototype, "forgotPassword")
			.callsFake(({ onFailure }) => {
				onFailure(responseError);
			});
		renderWithProvidersAndRouter(<ForgottenPasswordPage />);
		// Act
		const usernameInput = screen.getByLabelText("Username") as HTMLInputElement;
		fireEvent.change(usernameInput, { target: { value: "test" } });
		const form = screen.getByRole("form") as HTMLButtonElement;
		act(() => fireEvent.submit(form));
		const error = screen.getByText("User not found");
		// Assert
		expect(error).toBeDefined();
		// Cleanup
		sinon.restore();
	});
});

test("Error from newPasswordForm renders correctly", async () => {
	// Arrange
	sinon
		.stub(CognitoUser.prototype, "forgotPassword")
		.callsFake(({ onSuccess }) => {
			onSuccess({ name: "Success" });
		});
	sinon
		.stub(CognitoUser.prototype, "confirmPassword")
		.callsFake((_confirmCode, _newPassword, callback) => {
			callback.onFailure(Error("Failure"));
		});
	renderWithProvidersAndRouter(<ForgottenPasswordPage />);
	// Act
	const usernameInput = screen.getByLabelText("Username") as HTMLInputElement;
	fireEvent.change(usernameInput, { target: { value: "test" } });
	const form = screen.getByRole("form") as HTMLButtonElement;
	fireEvent.submit(form);
	const confirmCodeInput = screen.getByLabelText(
		"Confirmation Code"
	) as HTMLInputElement;
	fireEvent.change(confirmCodeInput, { target: { value: "test" } });
	const newPasswordInput = screen.getByLabelText(
		"New Password"
	) as HTMLInputElement;
	fireEvent.change(newPasswordInput, { target: { value: "test" } });
	const resetButton = screen.getByText("Reset");
	fireEvent.click(resetButton);
	// Assert
	const errorHeading = await screen.findByText("New Password Error");
	const error = screen.getByText("Failure");
	expect(errorHeading).toBeDefined();
	expect(error).toBeDefined();
	// Cleanup
	sinon.restore();
});
