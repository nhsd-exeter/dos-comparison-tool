import App from "./components/app";
import { BrowserRouter } from "react-router-dom";
import { getPageTitle, setPageTitle } from "./utils/pageTitles";
import { pageMeta, siteTitle } from "./interfaces/pageMeta";
import { Provider } from "react-redux";
import { store } from "./store";

setPageTitle(getPageTitle(pageMeta, window.location.pathname, siteTitle));

const DoSComparisonTool = () => (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

export default DoSComparisonTool;
