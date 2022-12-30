import { describe, expect, test } from "@jest/globals";
import { fireEvent, screen } from "@testing-library/react";
import { CognitoUser } from "amazon-cognito-identity-js";
import sinon from "sinon";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import LoginPage from "../loginPage";

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
