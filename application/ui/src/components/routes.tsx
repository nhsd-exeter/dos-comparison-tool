// import { Suspense } from "react";
import { Route, Switch } from "wouter";
import HomePage from "./homePage/homePage";
import LoginPage from "./loginPage/loginPage";
import { BASE_PATH, LOGIN_PATH } from "../constants/paths";

const UnAuthenticatedRoutes = () => {
	return (
		// <Suspense fallback={}>
		<Switch>
			<Route path={BASE_PATH} component={HomePage} />
			<Route path={LOGIN_PATH} component={LoginPage}></Route>
			<Route>Page Not Found</Route>
		</Switch>
		// </Suspense>
		// TODO: Add loading spinner
	);
};

export default UnAuthenticatedRoutes;
