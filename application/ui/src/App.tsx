import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import {
	CCSComparisonResults,
	CCSComparisonSearch,
	ForgottenPassword,
	Home,
	Login,
	Menu,
	PageNotFound,
	Register,
} from "./components";
import {
	BASE_PATH,
	CCS_COMPARISON_RESULTS_PATH,
	CCS_COMPARISON_SEARCH_PATH,
	FORGOTTEN_PASSWORD_PATH,
	LOGIN_PATH,
	MENU_PATH,
	REGISTER_PATH,
} from "./constants/paths";
import { selectLoggedIn } from "./slices/authSlice";

/**
 * The main application component.
 */
export default class App extends React.Component {
	/**
	 * Renders the application.
	 * @returns The rendered application.
	 */
	render(): React.JSX.Element {
		return <ApplicationRouting />;
	}
}

/**
 * The routing component for the application.
 * @returns The rendered routes.
 */
function ApplicationRouting(): React.JSX.Element {
	const isLoggedIn = useAppSelector(selectLoggedIn);

	const publicRoutes = (
		<Routes>
			<Route path={BASE_PATH} element={<Home />} />
			<Route path={LOGIN_PATH} element={<Login />} />
			<Route path={REGISTER_PATH} element={<Register />} />
			<Route path={FORGOTTEN_PASSWORD_PATH} element={<ForgottenPassword />} />

			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);

	const privateRoutes = (
		<Routes>
			<Route path={BASE_PATH} element={<Home />} />
			<Route path={LOGIN_PATH} element={<Login />} />
			<Route path={MENU_PATH} element={<Menu />} />
			<Route
				path={CCS_COMPARISON_SEARCH_PATH}
				element={<CCSComparisonSearch />}
			/>
			<Route
				path={CCS_COMPARISON_RESULTS_PATH}
				element={<CCSComparisonResults />}
			/>
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
	return isLoggedIn ? privateRoutes : publicRoutes;
}
