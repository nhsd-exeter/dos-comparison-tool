import React from "react";
import { Button } from "nhsuk-react-components";
import { RouteComponentProps } from "wouter";

export class LoginPage extends React.Component<RouteComponentProps> {
	render(): JSX.Element {
		return (
			<div>
				<h1>Login</h1>
				<p></p>
				<Button href="/select-search">Login in</Button>
			</div>
		);
	}
}

export default LoginPage;
