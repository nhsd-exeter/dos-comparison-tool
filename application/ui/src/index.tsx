import "nhsuk-frontend/packages/nhsuk.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";

export const containerElement = document.querySelector(".react-container");

if (!containerElement) {
	throw new Error("Failed to find the react-container element");
}

export const root = ReactDOM.createRoot(containerElement);

root.render(
	<React.StrictMode>
		{/* Redux Provider */}
		<Provider store={store}>
			{/* React Router DOM */}
			<BrowserRouter>
				{/* Application */}
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
