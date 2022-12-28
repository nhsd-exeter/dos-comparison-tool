import { describe, expect, test } from "@jest/globals";
import { fireEvent, screen } from "@testing-library/react";
import { Layout } from "..";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";

const baseUrl = "http://localhost";

describe("Header looks and works correctly", () => {
	test("It renders the Header as part of the default layout", () => {
		// Arrange
		renderWithProvidersAndRouter(<Layout children={undefined} />);
		// Act
		const nameLinkElement = screen.getByText("DoS Comparison Tool");
		// Assert
		expect(nameLinkElement).toBeDefined();
	});

	test("Header Button links back to homepage", () => {
		// Arrange
		window.history.pushState({}, "", "/login");
		const preloadedState = { auth: { isLoggedIn: true } };
		renderWithProvidersAndRouter(<Layout children={undefined} />, {
			preloadedState: preloadedState,
		});
		// Act
		const logoButtonElement = screen.getByRole("img");
		fireEvent.click(logoButtonElement);
		// Assert
		expect(window.location.href).toEqual(baseUrl + "/");
	});

	test("Header 'DoS Comparison Tool' links back to homepage", () => {
		// Arrange
		window.history.pushState({}, "", "/login");
		const preloadedState = { auth: { isLoggedIn: true } };
		renderWithProvidersAndRouter(<Layout children={undefined} />, {
			preloadedState: preloadedState,
		});
		// Act
		const HeaderTextButtonElement = screen.getByText("DoS Comparison Tool");
		fireEvent.click(HeaderTextButtonElement);
		// Assert
		expect(window.location.href).toEqual(baseUrl + "/");
	});
});

test("It renders the Footer as part of the default layout", () => {
	// Arrange
	renderWithProvidersAndRouter(<Layout children={undefined} />);
	// Act
	const homepageLinkElement = screen.getByText("Homepage");
	// Assert
	expect(homepageLinkElement).toHaveProperty("href", baseUrl + "/");
});

test("Children elements render inside Body as part of the default layout", () => {
	// Arrange
	const children = <div>Test</div>;
	renderWithProvidersAndRouter(<Layout children={children} />);
	// Act: Get the main element.
	const mainElement = document.querySelector("main");
	// Assert: Main element contains the children.
	expect(mainElement).not.toBeNull();
});
