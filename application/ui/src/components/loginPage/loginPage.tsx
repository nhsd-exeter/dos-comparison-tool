import Layout from "../layout";
import React from "react";
import { Button, Form, Input } from "nhsuk-react-components";
// import { MENU_PATH } from "../../constants/paths";
// import { signIn } from "../../slices/authSlice";
// import { useAppDispatch } from "../../hooks";
import {
	AUTH_PASSWORD_INPUT,
	AUTH_EMAIL_INPUT,
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
	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// const email = event.target[0].value;
		// const password = event.target[1].value;
		// console.log("Form submitted");
		// console.log(email);
		// console.log(password);
		// dispatch(signIn({ email, password }));
	};

	// const dispatch = useAppDispatch();
	return (
		<div>
			<h1>Login</h1>
			<p>Log in to the DoS Comparison Tool</p>
			<Form onSubmit={handleFormSubmit}>
				<Input label="Email" type="email" id={AUTH_EMAIL_INPUT} />
				<Input label="Password" type="password" id={AUTH_PASSWORD_INPUT} />

				<Button type="submit">Log in</Button>
			</Form>
		</div>
	);
}

export default LoginPage;
