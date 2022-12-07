import App from "./components/App";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import "nhsuk-frontend/packages/nhsuk.scss";

// Stryker disable all
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

// TODO: Add in web vitals
// Stryker restore all
