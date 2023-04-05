import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { authSlice } from "../slices/authSlice";
import { ccsComparisonSearchSlice } from "../slices/ccsComparisonSearchSlice";
import { loginErrorSlice } from "../slices/loginErrorSlice";

export function renderWithProvidersAndRouter(
	ui,
	{
		preloadedState = {},
		// Automatically create a store instance if no store was passed in
		store = configureStore({
			reducer: {
				auth: authSlice.reducer,
				loginError: loginErrorSlice.reducer,
				ccsComparisonSearch: ccsComparisonSearchSlice.reducer,
			},
			preloadedState,
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware({
					serializableCheck: false,
				}),
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
