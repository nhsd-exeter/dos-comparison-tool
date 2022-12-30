import { describe, expect, test } from "@jest/globals";
import { fireEvent, screen } from "@testing-library/react";
import { CognitoUser } from "amazon-cognito-identity-js";
import sinon from "sinon";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import { ErrorBox } from "../../common";
import LoginForm from "../loginForm";

const testUsername = "test";
const testPassword = "testPassword";

describe("All LoginPage Content is covered", () => {
	test("The login process is initiated when the login button is clicked", () => {
		// Arrange
		sinon
			.stub(CognitoUser.prototype, "authenticateUser")
			.callsFake((authDetails, callbacks) => {
				callbacks.onSuccess();
			});
		renderWithProvidersAndRouter(<LoginForm />);
		const usernameInput = screen.getByLabelText("Username") as HTMLInputElement;
		const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
		const form = screen.getByRole("form") as HTMLButtonElement;
		// Act
		fireEvent.change(usernameInput, { target: { value: testUsername } });
		fireEvent.change(passwordInput, { target: { value: testPassword } });
		fireEvent.submit(form);
		// Assert
		expect(CognitoUser.prototype.authenticateUser.calledOnce).toBe(true);
		// Cleanup
		sinon.restore();
	});

	test("Error message is stored when the login process fails", () => {
		// Arrange
		const error = Error("Extensive Error Message on Login Page");
		sinon
			.stub(CognitoUser.prototype, "authenticateUser")
			.callsFake((authDetails, callbacks) => {
				callbacks.onFailure(error);
			});
		const { store } = renderWithProvidersAndRouter(<LoginForm />);
		const usernameInput = screen.getByLabelText("Username") as HTMLInputElement;
		const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
		const form = screen.getByRole("form") as HTMLButtonElement;
		// Act
		fireEvent.change(usernameInput, { target: { value: testUsername } });
		fireEvent.change(passwordInput, { target: { value: testPassword } });
		fireEvent.submit(form);
		// Assert
		const expectedErrorBox = ErrorBox(error.message, error.name);
		expect(CognitoUser.prototype.authenticateUser.calledOnce).toBe(true);
		expect(store.getState().loginError.error).toEqual(expectedErrorBox);
		// Cleanup
		sinon.restore();
	});

	test("New Password Required error message is stored when the login process fails", () => {
		// Arrange
		sinon
			.stub(CognitoUser.prototype, "authenticateUser")
			.callsFake((authDetails, callbacks) => {
				callbacks.newPasswordRequired(undefined, undefined);
			});
		const { store } = renderWithProvidersAndRouter(<LoginForm />);
		const usernameInput = screen.getByLabelText("Username") as HTMLInputElement;
		const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
		const form = screen.getByRole("form") as HTMLButtonElement;
		// Act
		fireEvent.change(usernameInput, { target: { value: testUsername } });
		fireEvent.change(passwordInput, { target: { value: testPassword } });
		fireEvent.submit(form);
		// Assert
		const expectedErrorBox = ErrorBox("New password required", "Login failed");
		expect(CognitoUser.prototype.authenticateUser.calledOnce).toBe(true);
		expect(store.getState().loginError.error).toEqual(expectedErrorBox);
		// Cleanup
		sinon.restore();
	});
});
