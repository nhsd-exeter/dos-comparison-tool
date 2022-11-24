import React from "react";
import { Button } from "nhsuk-react-components";
import { RouteComponentProps } from "wouter";

export class HomePage extends React.Component<RouteComponentProps> {
	renderNextStepButton = (launched: boolean | null): JSX.Element => {
		const text = launched ? "Start now" : "Log in";
		return <Button href="/login">{text}</Button>;
	};

	render(): JSX.Element {
		return (
			<div>
				<h1>Welcome</h1>
				<p>The DoS Comparison Tool is available here</p>
				{this.renderNextStepButton(false)}
			</div>
		);
	}
}

export default HomePage;
