import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import {
	ErrorPage,
	ForgottenPasswordPage,
	HomePage,
	LoginPage,
	MenuPage,
	RegisterPage,
} from "./components";
import {
	BASE_PATH,
	FORGOTTEN_PASSWORD_PATH,
	LOGIN_PATH,
	MENU_PATH,
	REGISTER_PATH,
} from "./constants/paths";
import { selectLoggedIn } from "./slices/authSlice";

export class App extends React.Component {
	render(): JSX.Element {
		return <ApplicationRouting />;
	}
}

function ApplicationRouting(): JSX.Element {
	const isLoggedIn = useAppSelector(selectLoggedIn);
	const publicRoutes = (
		<Routes>
			<Route path={BASE_PATH} element={<HomePage />} />
			<Route path={LOGIN_PATH} element={<LoginPage />} />
			<Route path={REGISTER_PATH} element={<RegisterPage />} />
			<Route
				path={FORGOTTEN_PASSWORD_PATH}
				element={<ForgottenPasswordPage />}
			/>
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
	const privateRoutes = (
		<Routes>
			<Route path={BASE_PATH} element={<HomePage />} />
			<Route path={LOGIN_PATH} element={<MenuPage />} />
			<Route path={MENU_PATH} element={<MenuPage />} />
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
	return isLoggedIn ? privateRoutes : publicRoutes;
}
export default App;
