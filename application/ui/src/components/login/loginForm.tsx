import {
	AuthenticationDetails,
	CognitoUser,
	CognitoUserSession,
} from "amazon-cognito-identity-js";
import { Button, Form, Input } from "nhsuk-react-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import {
	AUTH_PASSWORD_INPUT,
	AUTH_USERNAME_INPUT,
	NEXT_BUTTON,
} from "../../constants/componentIds";
import { MENU_PATH } from "../../constants/paths";
import { signIn } from "../../slices/authSlice";
import { setError } from "../../slices/loginErrorSlice";
import { userPool } from "../../utils/auth";

/**
 * The login form component.
 * @returns A login form.
 */
export default function LoginForm() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formElements = event.currentTarget.elements;
		const username = formElements.namedItem("username") as HTMLInputElement;
		const password = formElements.namedItem("password") as HTMLInputElement;
		const user = new CognitoUser({
			Username: username.value,
			Pool: userPool,
		});
		const authDetails = new AuthenticationDetails({
			Username: username.value,
			Password: password.value,
		});
		user.authenticateUser(authDetails, {
			onSuccess: (session: CognitoUserSession) => {
				dispatch(signIn(session));
				navigate(MENU_PATH);
			},
			onFailure: (error: Error) => {
				error.name = "Login failed";
				dispatch(setError(error));
			},
			newPasswordRequired: () => {
				const error = new Error("New password required");
				error.name = "Login failed";
				dispatch(setError(error));
			},
		});
	};
	return (
		<Form role="form" onSubmit={handleFormSubmit}>
			<Input
				id={AUTH_USERNAME_INPUT}
				label="Username"
				name="username"
				autoComplete="username"
				required={true}
				width="20"
			/>
			<Input
				id={AUTH_PASSWORD_INPUT}
				label="Password"
				name="password"
				type="password"
				autoComplete="current-password"
				required={true}
				width="20"
			/>
			<Button type="submit" id={NEXT_BUTTON}>
				Log in
			</Button>
		</Form>
	);
}
