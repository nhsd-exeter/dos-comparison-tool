import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {},
});

const DoSComparisonTool = () => (
	// <Provider store={store}>
	//   <div>DoS Comparison Tool</div>
	// </Provider>

	<div className="App">
		<header className="App-header">
			<p>
				Edit <code>src/App.tsx</code> and save to reload.hahh
			</p>
			<a
				className="App-link"
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer"
			>
				Learn React
			</a>
		</header>
	</div>
);

export default DoSComparisonTool;
