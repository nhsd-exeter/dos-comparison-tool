import {
	AUTH_REGISTER_EMAIL_INPUT,
	AUTH_REGISTER_PASSWORD_INPUT,
	AUTH_REGISTER_USERNAME_INPUT,
	NEXT_BUTTON,
} from "../../constants/componentIds";
import Layout from "../layout";
import { Button, Form, Input } from "nhsuk-react-components";
import React from "react";

// import { CognitoUserAttribute } from "amazon-cognito-identity-js";
// import { userPool } from "../../utils/auth";
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
		// const username = event.currentTarget.elements.namedItem(
		// 	"username"
		// ) as HTMLInputElement;
		// const email = event.currentTarget.elements.namedItem(
		// 	"email"
		// ) as HTMLInputElement;
		// const password = event.currentTarget.elements.namedItem(
		// 	"password"
		// ) as HTMLInputElement;
		// userPool.signUp(
		// 	email.value,
		// 	password.value,
		// 	[],
		// 	[],
		// 	(err: unknown, result: unknown) => {}
		// );
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
