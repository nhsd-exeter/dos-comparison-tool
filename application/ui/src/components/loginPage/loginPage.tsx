import Layout from "../layout";
import React from "react";
import { Button, Input } from "nhsuk-react-components";
import { RouteComponentProps } from "wouter";
import { MENU_PATH } from "../../constants/paths";
export class LoginPage extends React.Component<RouteComponentProps> {
	render(): JSX.Element {
		return (
			<Layout>
				<div>
					<h1>Login</h1>
					<p>Log in to the DoS Comparison Tool</p>
					<Input label="Username" type="username" />
					<Input label="Password" type="password" />

					<Button href={MENU_PATH}>Log in</Button>
				</div>
			</Layout>
		);
	}
}

export default LoginPage;
