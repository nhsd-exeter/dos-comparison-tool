import Layout from "../layout";
import React from "react";
import { Button, Form, Input } from "nhsuk-react-components";
import { MENU_PATH } from "../../constants/paths";
import { signIn } from "../../slices/authSlice";
import { useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import {
	AUTH_PASSWORD_INPUT,
	AUTH_EMAIL_INPUT,
	AUTH_SUBMIT_BUTTON,
} from "../../constants/componentIds";

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
		const email = event.currentTarget.elements.namedItem(
			"email"
		) as HTMLInputElement;
		const password = event.currentTarget.elements.namedItem(
			"password"
		) as HTMLInputElement;
		dispatch(signIn({ email: email.value, password: password.value }));
		navigate(MENU_PATH, { replace: true });
	};

	return (
		<div>
			<h1>Login</h1>
			<p>Log in to the DoS Comparison Tool</p>
			<Form onSubmit={handleFormSubmit}>
				<Input name="email" id={AUTH_EMAIL_INPUT} />
				<Input name="password" type="password" id={AUTH_PASSWORD_INPUT} />
				<Button type="submit" id={AUTH_SUBMIT_BUTTON}>
					Log in
				</Button>
			</Form>
		</div>
	);
}

export default LoginPage;
