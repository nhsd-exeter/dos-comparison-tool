import Layout from "../layout";
import React from "react";
import { BASE_PATH } from "../../constants/paths";
import { RouteComponentProps } from "wouter";

export class ErrorPage extends React.Component<RouteComponentProps> {
	render(): JSX.Element {
		return (
			<Layout hideFooter={true}>
				<h2>Page Not Found</h2>
				<p className="nhsuk-u-margin-bottom-0">
					Return back to <a href={BASE_PATH}>DoS Comparison Tool homepage</a>
				</p>
			</Layout>
		);
	}
}

export default ErrorPage;
