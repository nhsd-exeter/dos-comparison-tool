import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Application from "./components/application";

const DoSComparisonTool = () => (
	<Provider store={store}>
		<BrowserRouter>
			<Application authenticated={false} />
		</BrowserRouter>
	</Provider>
);

export default DoSComparisonTool;
