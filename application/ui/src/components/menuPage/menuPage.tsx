import Layout from "../layout";
import React from "react";
import MenuCards from "./menuCards";

export class MenuPage extends React.Component {
	render(): JSX.Element {
		return (
			<Layout>
				<div>
					<h1> Select a Search </h1>
					<p> Select a search to compare </p>
				</div>
				<MenuCards />
			</Layout>
		);
	}
}

export default MenuPage;
