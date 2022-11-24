// import { Suspense } from "react";
import { Route, Switch } from "wouter";
import HomePage from "./homePage/homePage";
import LoginPage from "./loginPage/loginPage";

const UnAuthenticatedRoutes = () => {
	return (
		// <Suspense fallback={}>
		<Switch>
			<Route path="/" component={HomePage} />
			<Route path="/login" component={LoginPage}></Route>
			<Route>Page Not Found</Route>
		</Switch>
		// </Suspense>
		// TODO: Add loading spinner
	);
};

export default UnAuthenticatedRoutes;
