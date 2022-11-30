import { AuthenticatedRoutes, UnAuthenticatedRoutes } from "./routes";

export interface ApplicationProps {
	authenticated: boolean;
}

function Application(props: ApplicationProps): JSX.Element {
	return props.authenticated ? AuthenticatedRoutes() : UnAuthenticatedRoutes();
}

export default Application;
