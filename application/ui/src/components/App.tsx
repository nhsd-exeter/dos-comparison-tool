import ErrorPage from "./errorPage/errorPage";
import Homepage from "./homePage/homePage";
import LoginPage from "./loginPage/loginPage";
import MenuPage from "./menuPage/menuPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { selectLoggedIn } from "../slices/authSlice";
import { useAppSelector } from "../hooks";

export class App extends React.Component {
	render(): JSX.Element {
		return <ApplicationRouting />;
	}
}

function ApplicationRouting(): JSX.Element {
	const isLoggedIn = useAppSelector(selectLoggedIn);
	const publicRoutes = (
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
	const privateRoutes = (
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="/menu" element={<MenuPage />} />
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
	return isLoggedIn ? privateRoutes : publicRoutes;
}
export default App;
