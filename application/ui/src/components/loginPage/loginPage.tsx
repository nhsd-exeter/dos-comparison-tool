import AppConfig from "../../config.json";
import Layout from "../layout";
import React from "react";
import { Button, Form, Input } from "nhsuk-react-components";
import { MENU_PATH } from "../../constants/paths";
import { signIn } from "../../slices/authSlice";
import { useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import {
	AUTH_PASSWORD_INPUT,
	AUTH_USERNAME_INPUT,
	AUTH_SUBMIT_BUTTON,
} from "../../constants/componentIds";
import {
	CognitoUserPool,
	CognitoUser,
	AuthenticationDetails,
} from "amazon-cognito-identity-js";

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
		const username = event.currentTarget.elements.namedItem(
			"username"
		) as HTMLInputElement;
		const password = event.currentTarget.elements.namedItem(
			"password"
		) as HTMLInputElement;
		const poolData = {
			UserPoolId: AppConfig.AUTH_USER_POOL_ID,
			ClientId: AppConfig.AUTH_USER_POOL_WEB_CLIENT_ID,
		};
		const userPool = new CognitoUserPool(poolData);
		const user = new CognitoUser({
			Username: username.value,
			Pool: userPool,
		});
		const authDetails = new AuthenticationDetails({
			Username: username.value,
			Password: password.value,
		});
		user.authenticateUser(authDetails, {
			onSuccess: (result) => {
				console.log("login success", result);
				dispatch(signIn());
				navigate(MENU_PATH);
			},
			onFailure: (err) => {
				console.log("login failure", err);
			},
			newPasswordRequired: (data) => {
				console.log("new password required", data);
			},
		});
	};

	return (
		<div>
			<h1>Login</h1>
			<p>Log in to the DoS Comparison Tool</p>
			<Form onSubmit={handleFormSubmit}>
				<Input name="username" id={AUTH_USERNAME_INPUT} />
				<Input name="password" type="password" id={AUTH_PASSWORD_INPUT} />
				<Button type="submit" id={AUTH_SUBMIT_BUTTON}>
					Log in
				</Button>
			</Form>
		</div>
	);
}

export default LoginPage;
