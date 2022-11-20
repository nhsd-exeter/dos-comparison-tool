import React from "react";
import ReactDOM from "react-dom/client";

const containerElement = document.querySelector("body > div");
if (!containerElement) {
	throw new Error("Failed to find the react-container element");
}
const root = ReactDOM.createRoot(containerElement);

root.render(
	<React.StrictMode>
		<p>Hello World</p>
	</React.StrictMode>,
);
