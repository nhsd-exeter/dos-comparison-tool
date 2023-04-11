import React from "react";
import { BASE_PATH } from "../../constants/paths";
import Layout from "../common/Layout";

export class PageNotFound extends React.Component {
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

export default PageNotFound;
