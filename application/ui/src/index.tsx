import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

const containerElement = document.querySelector(".react-container");
if (!containerElement) {
	throw new Error("Failed to find the react-container element");
}
const root = ReactDOM.createRoot(containerElement);

root.render(<React.StrictMode></React.StrictMode>);

reportWebVitals();
