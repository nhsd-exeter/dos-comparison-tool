import Layout from "..";
import React from "react";
import { expect, test, describe } from "@jest/globals";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import { fireEvent, screen } from "@testing-library/react";

const baseUrl = "http://localhost";

describe("Header looks and works correctly", () => {
	test("It renders the Header as part of the default layout", () => {
		// Arrange: prepare the environment, render the component.
		renderWithProvidersAndRouter(<Layout children={undefined} />);
		// Act: try to find the expected links.
		const nameLinkElement = screen.getByText("DoS Comparison Tool");
		// Assert: check that required links are indeed links.
		expect(nameLinkElement).toBeDefined();
	});

	test("Header Button links back to homepage", () => {
		// Arrange: prepare the environment, render the component.
		window.history.pushState({}, "", "/login");
		const preloadedState = { auth: { isLoggedIn: true } };
		renderWithProvidersAndRouter(<Layout children={undefined} />, {
			preloadedState: preloadedState,
		});
		// Act: try to find the expected links.
		const logoButtonElement = screen.getByRole("img");
		fireEvent.click(logoButtonElement);
		// Assert: check that required links are indeed links.
		expect(window.location.href).toEqual(baseUrl + "/");
	});

	test("Header 'DoS Comparison Tool' links back to homepage", () => {
		// Arrange: prepare the environment, render the component.
		window.history.pushState({}, "", "/login");
		const preloadedState = { auth: { isLoggedIn: true } };
		renderWithProvidersAndRouter(<Layout children={undefined} />, {
			preloadedState: preloadedState,
		});
		// Act: try to find the expected links.
		const HeaderTextButtonElement = screen.getByText("DoS Comparison Tool");
		fireEvent.click(HeaderTextButtonElement);
		// Assert: check that required links are indeed links.
		expect(window.location.href).toEqual(baseUrl + "/");
	});
});

test("It renders the Footer as part of the default layout", () => {
	// Arrange: prepare the environment, render the component.
	renderWithProvidersAndRouter(<Layout children={undefined} />);
	// Act: try to find the expected links.
	const homepageLinkElement = screen.getByText("Homepage");
	// Assert: check that required links are indeed links.
	expect(homepageLinkElement).toHaveProperty("href", baseUrl + "/");
});

test("Children elements render inside Body as part of the default layout", () => {
	// Arrange: prepare the environment, render the component.
	const children = <div>Test</div>;
	renderWithProvidersAndRouter(<Layout children={children} />);
	// Act: Get the main element.
	const mainElement = document.querySelector("main");
	// Assert: Main element contains the children.
	expect(mainElement).not.toBeNull();
});
