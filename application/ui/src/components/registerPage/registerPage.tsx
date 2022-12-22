import {
	CognitoUserAttribute,
	ISignUpResult,
} from "amazon-cognito-identity-js";
import { Button, Form, Input } from "nhsuk-react-components";
import React from "react";
import { Navigate } from "react-router-dom";
import {
	AUTH_REGISTER_EMAIL_INPUT,
	AUTH_REGISTER_PASSWORD_INPUT,
	AUTH_REGISTER_USERNAME_INPUT,
	NEXT_BUTTON,
} from "../../constants/componentIds";
import { LOGIN_PATH } from "../../constants/paths";
import { userPool } from "../../utils/auth";
import { Error, Layout } from "../common";

type RegisterPageProps = Record<string, never>;
type RegisterPageState = { error?: JSX.Element; registered?: boolean };

class RegisterPage extends React.Component<
	RegisterPageProps,
	RegisterPageState
> {
	constructor(props: RegisterPageProps) {
		super(props);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}
	state: RegisterPageState = { error: undefined };

	private handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
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
			(err: Error | undefined, _result: ISignUpResult | undefined) => {
				if (err) {
					this.setState({ error: Error(err.message, "Sign Up Error") });
					return;
				}
				this.setState({ registered: true });
			}
		);
	}

	render() {
		return (
			<Layout>
				{this.state.registered && <Navigate to={LOGIN_PATH} replace={true} />}
				<div>
					<h1>Register an account</h1>
					<p>Register an account for the DoS Comparison Tool</p>
					{this.state.error}
					<Form onSubmit={this.handleFormSubmit}>
						<Input
							id={AUTH_REGISTER_USERNAME_INPUT}
							label="Username"
							name="username"
							autoComplete="username"
							width="20"
							hint="Please enter a username"
						/>
						<Input
							id={AUTH_REGISTER_EMAIL_INPUT}
							label="Email"
							name="email"
							type="email"
							autoComplete="email"
							width="20"
							hint="Please enter a valid email address"
						/>
						<Input
							id={AUTH_REGISTER_PASSWORD_INPUT}
							label="Password"
							name="password"
							type="password"
							autoComplete="new-password"
							width="20"
							hint="Please enter a password"
						/>

						<Button type="submit" id={NEXT_BUTTON}>
							Register
						</Button>
					</Form>
				</div>
			</Layout>
		);
	}
}
export default RegisterPage;
