import Layout from "../layout";
import React from "react";
import { Button } from "nhsuk-react-components";
import { RouteComponentProps } from "wouter";
import { LOGIN_PATH } from "../../constants/paths";

export class HomePage extends React.Component<RouteComponentProps> {
	renderNextStepButton = (launched: boolean | null): JSX.Element => {
		const text = launched ? "Start now" : "Log in";
		return <Button href={LOGIN_PATH}>{text}</Button>;
	};

	render(): JSX.Element {
		return (
			<Layout>
				<div>
					<h1 id="pageTitle">DoS Comparison Tool</h1>
					<h3>
						Compare results from between NHS Directory of Services searches
					</h3>
					{this.renderNextStepButton(false)}
				</div>
			</Layout>
		);
	}
}

export default HomePage;
