import { describe, expect, test } from "@jest/globals";
import { screen } from "@testing-library/react";
import { renderWithProvidersAndRouter } from "../../__test__/utils-for-tests";
import { App } from "../App";
import { expectedPageText } from "../homePage/__test__/homePage.spec";

describe("App Public Routes Tests", () => {
	test("Application by default renders homepage", () => {
		// Arrange: prepare the environment, render the component.
		renderWithProvidersAndRouter(<App />);
		// Act: Get the elements.
		const pageTextValue = screen.getByText(expectedPageText).textContent;
		// Assert: Elements are present.
		expect(pageTextValue).toBeTruthy();
	});

	test("/login loads the login page", () => {
		// Arrange: prepare the environment, render the component.
		window.history.pushState({}, "", "/login");
		// Act: Get the elements.
		const expectedLoginText = "Login";
		renderWithProvidersAndRouter(<App />);
		const pageTextValue = screen.getByText(expectedLoginText).textContent;
		// Assert: Elements are present.
		expect(pageTextValue).toBeTruthy();
	});
});

describe("App Private Routes Tests", () => {
	test("/menu loads the menu page", () => {
		// Arrange: prepare the environment, render the component.
		const preloadedState = { auth: { isLoggedIn: true } };
		const expectedMenuPageText = "Select a search to compare";
		window.history.pushState({}, "", "/menu");
		renderWithProvidersAndRouter(<App />, { preloadedState: preloadedState });
		// Act: Get the elements.
		const pageTextValue = screen.getByText(expectedMenuPageText)?.textContent;
		// Assert: Elements are present.
		expect(pageTextValue).toBeTruthy();
	});
});

describe("App Public Routes doesn't load Private Routes Tests", () => {
	test("/menu loads the error page when not signed in", () => {
		// Arrange: prepare the environment, render the component.
		const preloadedState = { auth: { isLoggedIn: false } };
		renderWithProvidersAndRouter(<App />, { preloadedState: preloadedState });
		window.history.pushState({}, "", "/menu");
		// Assert: Elements are present.
		expect(screen.getByText("Page Not Found")).toBeTruthy();
	});
});

describe("App Private Routes doesn't load Public Routes Tests", () => {
	test("/menu loads the error page when not signed in", () => {
		// Arrange: prepare the environment, render the component.
		const preloadedState = { auth: { isLoggedIn: false } };
		renderWithProvidersAndRouter(<App />, { preloadedState: preloadedState });
		window.history.pushState({}, "", "/menu");
		// Assert: Elements are present.
		expect(screen.getByText("Page Not Found")).toBeTruthy();
	});
});
