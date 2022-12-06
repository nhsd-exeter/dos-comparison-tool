import React from "react";
import { authSlice } from "../slices/authSlice";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

export function renderWithProvidersAndRouter(
	ui,
	{
		preloadedState = {},
		// Automatically create a store instance if no store was passed in
		store = configureStore({
			reducer: { auth: authSlice.reducer },
			preloadedState,
		}),
		...renderOptions
	} = {}
) {
	function Wrapper({ children }) {
		return (
			<Provider store={store}>
				<BrowserRouter>{children}</BrowserRouter>
			</Provider>
		);
	}

	// Return an object with the store and all of RTL's query functions
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
