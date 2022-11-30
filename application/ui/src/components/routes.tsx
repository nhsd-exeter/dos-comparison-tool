import ErrorPage from "./errorPage/errorPage";
import HomePage from "./homePage/homePage";
import LoginPage from "./loginPage/loginPage";
import MenuPage from "./menuPage/menuPage";
import { Route, Switch } from "wouter";
// import { Suspense } from "react";

export const UnAuthenticatedRoutes = () => {
	return (
		// <Suspense fallback={}>
		<Switch>
			<Route path="/" component={HomePage} />
			<Route path="/login" component={LoginPage} />
			<Route path="/menu" component={MenuPage} />
			{/* Move /menu route to AuthenticatedRoutes */}
			<Route component={ErrorPage} />
		</Switch>
		// </Suspense>
		// TODO: Add loading spinner
	);
};

export const AuthenticatedRoutes = () => {
	return (
		// <Suspense fallback={}>
		<Switch>
			<Route component={ErrorPage} />
		</Switch>
		// </Suspense>
		// TODO: Add loading spinner
	);
};
