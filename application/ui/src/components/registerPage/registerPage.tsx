import {
	CognitoUserAttribute,
	ISignUpResult,
} from "amazon-cognito-identity-js";
import { Button, Form, Input } from "nhsuk-react-components";
import React from "react";
import {
	AUTH_REGISTER_EMAIL_INPUT,
	AUTH_REGISTER_PASSWORD_INPUT,
	AUTH_REGISTER_USERNAME_INPUT,
	NEXT_BUTTON,
} from "../../constants/componentIds";
import { userPool } from "../../utils/auth";
import Layout from "../layout";
export class RegisterPage extends React.Component {
	render(): JSX.Element {
		return (
			<Layout>
				<RegisterForm />
			</Layout>
		);
	}
}

function RegisterForm(): JSX.Element {
	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formElements = event.currentTarget.elements;
		const username = formElements.namedItem("username") as HTMLInputElement;
		const email = formElements.namedItem("email") as HTMLInputElement;
		const password = formElements.namedItem("password") as HTMLInputElement;
		const attributeEmail = new CognitoUserAttribute({
			Name: "email",
			Value: email.value,
		});
		const attributeUserName = new CognitoUserAttribute({
			Name: "nickname",
			Value: username.value,
		});
		userPool.signUp(
			email.value,
			password.value,
			[attributeEmail, attributeUserName],
			[],
			(err: Error | undefined, result: ISignUpResult | undefined) => {
				if (err) {
					console.log(err);
					return;
				}
				const signUpResult = result as ISignUpResult;
				const cognitoUser = signUpResult.user;
				console.log("user name is " + cognitoUser.getUsername());
			}
		);
	};

	return (
		<div>
			<h1>Register an account</h1>
			<p>Register an account for the DoS Comparison Tool</p>
			<Form onSubmit={handleFormSubmit}>
				<Input
					id={AUTH_REGISTER_USERNAME_INPUT}
					label="Username"
					name="username"
					autoComplete="username"
					width="20"
				/>
				<Input
					id={AUTH_REGISTER_EMAIL_INPUT}
					label="Email"
					name="email"
					type="email"
					autoComplete="email"
					width="20"
				/>
				<Input
					id={AUTH_REGISTER_PASSWORD_INPUT}
					label="Password"
					name="password"
					type="password"
					autoComplete="new-password"
					width="20"
				/>
				<Button type="submit" id={NEXT_BUTTON}>
					Register
				</Button>
			</Form>
		</div>
	);
}

export default RegisterPage;
