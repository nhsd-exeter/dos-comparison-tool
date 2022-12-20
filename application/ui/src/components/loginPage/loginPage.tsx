import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { ActionLink, Button, Form, Input } from "nhsuk-react-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
	AUTH_PASSWORD_INPUT,
	AUTH_SUBMIT_BUTTON,
	AUTH_USERNAME_INPUT,
	NEXT_BUTTON,
} from "../../constants/componentIds";
import { MENU_PATH, REGISTER_PATH } from "../../constants/paths";
import { useAppDispatch } from "../../hooks";
import { signIn } from "../../slices/authSlice";
import { userPool } from "../../utils/auth";
import Layout from "../layout";

export class LoginPage extends React.Component {
	render(): JSX.Element {
		return (
			<Layout>
				<LoginForm />
			</Layout>
		);
	}
}

function LoginForm(): JSX.Element {
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
			onSuccess: (result: unknown) => {
				console.log("login success", result);
				dispatch(signIn());
				navigate(MENU_PATH);
			},
			onFailure: (err: unknown) => {
				console.log("login failure", err);
			},
			newPasswordRequired: (data: unknown) => {
				console.log("new password required", data);
			},
		});
	};

	return (
		<div>
			<h1>Login</h1>
			<p>Log in to the DoS Comparison Tool</p>
			<Form onSubmit={handleFormSubmit}>
				<Input
					id={AUTH_USERNAME_INPUT}
					label="Username"
					name="username"
					autoComplete="username"
					width="20"
				/>
				<Input
					id={AUTH_PASSWORD_INPUT}
					label="Password"
					name="password"
					type="password"
					autoComplete="current-password"
					width="20"
				/>
				<Button type="submit" id={NEXT_BUTTON}>
					Log in
				</Button>
			</Form>
			<ActionLink href={REGISTER_PATH}>Create an account</ActionLink>
		</div>
	);
}

export default LoginPage;
