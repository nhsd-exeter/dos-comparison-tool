import Layout from "../layout";
import React from "react";
import { Button, Form, Input } from "nhsuk-react-components";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../slices/authSlice";
import { useAppDispatch } from "../../hooks";
// import { MENU_PATH } from "../../constants/paths";
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
		dispatch(signIn({ email: "Test", password: "Test" }));
		navigate("/menu", { replace: true, state: { from: "/login" } });
	};

	// const password = event.target[1].value;
	// console.log("Form submitted");
	// console.log(email);
	// console.log(password);
	// dispatch(signIn({ email, password }));

	//

	return (
		<div>
			<h1>Login</h1>
			<p>Log in to the DoS Comparison Tool</p>
			<Form onSubmit={handleFormSubmit}>
				<Input label="Email" type="email" id={AUTH_EMAIL_INPUT} />
				<Input label="Password" type="password" id={AUTH_PASSWORD_INPUT} />
				<Button type="submit" id={AUTH_SUBMIT_BUTTON}>
					Log in
				</Button>
			</Form>
		</div>
	);
}

export default LoginPage;
