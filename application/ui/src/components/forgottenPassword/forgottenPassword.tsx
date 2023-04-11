import { CognitoUser } from "amazon-cognito-identity-js";
import { Button, Form, Input } from "nhsuk-react-components";
import React from "react";
import { Navigate } from "react-router-dom";
import {
	AUTH_FORGOTTEN_PASSWORD_USERNAME_INPUT,
	AUTH_RESET_PASSWORD_CONFIRM_CODE_INPUT,
	AUTH_RESET_PASSWORD_NEW_PASSWORD_INPUT,
	AUTH_RESET_PASSWORD_USERNAME_INPUT,
	NEXT_BUTTON,
} from "../../constants/componentIds";
import { LOGIN_PATH } from "../../constants/paths";
import { userPool } from "../../utils/auth";
import { ErrorBox, Layout } from "../common";

type ForgottenPasswordProps = Record<string, never>;
type ForgottenPasswordState = {
	error?: JSX.Element;
	requested_reset: boolean;
	password_reset: boolean;
	username?: string;
};

class ForgottenPassword extends React.Component<
	ForgottenPasswordProps,
	ForgottenPasswordState
> {
	constructor(props: ForgottenPasswordProps) {
		super(props);
		this.handleForgottenPasswordForm =
			this.handleForgottenPasswordForm.bind(this);
		this.handleNewPasswordForm = this.handleNewPasswordForm.bind(this);
	}
	state: ForgottenPasswordState = {
		requested_reset: false,
		password_reset: false,
	};

	private handleForgottenPasswordForm(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const username = event.currentTarget.elements.namedItem(
			"username"
		) as HTMLInputElement;
		const cognitoUser = new CognitoUser({
			Username: username.value,
			Pool: userPool,
		});
		cognitoUser.forgotPassword({
			onSuccess: () => {
				this.setState({ requested_reset: true });
			},
			onFailure: (error: Error) => {
				let error_message =
					"An unknown error occurred while requesting a password reset: " +
					error.name;
				if (error.name === "InvalidParameterException") {
					error_message = "Invalid username";
				} else if (error.name === "UserNotFoundException") {
					error_message = "User not found";
				}

				this.setState({
					error: ErrorBox(error_message, "Forgotten Password Error"),
				});
			},
		});
	}

	private ForgottenPasswordForm() {
		return (
			<Form role="form" onSubmit={this.handleForgottenPasswordForm}>
				<Input
					id={AUTH_FORGOTTEN_PASSWORD_USERNAME_INPUT}
					label="Username"
					name="username"
					autoComplete="username"
					width="20"
					required={true}
					hint="Please enter your username"
				/>
				<Button type="submit" id={NEXT_BUTTON}>
					Reset
				</Button>
			</Form>
		);
	}

	private handleNewPasswordForm(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formElements = event.currentTarget.elements;
		const confirmCode = formElements.namedItem(
			"confirmCode"
		) as HTMLInputElement;
		const username = formElements.namedItem("username") as HTMLInputElement;
		const newPassword = formElements.namedItem(
			"newPassword"
		) as HTMLInputElement;
		const cognitoUser = new CognitoUser({
			Username: username.value,
			Pool: userPool,
		});
		cognitoUser.confirmPassword(confirmCode.value, newPassword.value, {
			onSuccess: () => {
				this.setState({ password_reset: true });
			},
			onFailure: (err: Error) => {
				this.setState({ error: ErrorBox(err.message, "New Password Error") });
			},
		});
	}

	private NewPasswordForm() {
		return (
			<Form role="form" onSubmit={this.handleNewPasswordForm}>
				<Input
					id={AUTH_RESET_PASSWORD_USERNAME_INPUT}
					name="username"
					width="20"
					required={true}
					hidden={true}
					value={this.state.username}
					autoComplete="username"
				/>
				<Input
					id={AUTH_RESET_PASSWORD_CONFIRM_CODE_INPUT}
					label="Confirmation Code"
					name="confirmCode"
					width="20"
					required={true}
					hint="Please enter the confirmation code sent to your email address"
				/>
				<Input
					id={AUTH_RESET_PASSWORD_NEW_PASSWORD_INPUT}
					label="New Password"
					name="newPassword"
					width="20"
					required={true}
					type="password"
					autoComplete="new-password"
					hint="Please enter your new password"
				/>
				<Button type="submit" id={NEXT_BUTTON}>
					Reset
				</Button>
			</Form>
		);
	}

	render() {
		return (
			<Layout>
				{this.state.requested_reset && this.state.password_reset ? (
					<Navigate to={LOGIN_PATH} replace={true} />
				) : null}
				<div>
					<h1>Forgotten Password</h1>
					<p>Reset your password</p>
					{this.state.error}
					{this.state.requested_reset
						? this.NewPasswordForm()
						: this.ForgottenPasswordForm()}
				</div>
			</Layout>
		);
	}
}
export default ForgottenPassword;
