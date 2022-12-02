import ErrorPage from "./errorPage/errorPage";
import Homepage from "./homePage/homePage";
import LoginPage from "./loginPage/loginPage";
import MenuPage from "./menuPage/menuPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

export class App extends React.Component {
	render(): JSX.Element {
		return (
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="menu" element={<MenuPage />} />
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		);
	}
}

export default App;
