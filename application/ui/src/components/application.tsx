import Layout from "./layout";
import UnAuthenticatedRoutes from "./routes";

function Application() {
	return <Layout>{UnAuthenticatedRoutes()}</Layout>;
}

export default Application;
