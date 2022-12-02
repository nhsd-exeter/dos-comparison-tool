import Layout from "..";
import React from "react";
import { expect, test } from "@jest/globals";
import { renderWithProviders } from "../../../__test__/utils-for-tests";
import { screen } from "@testing-library/react";

const baseUrl = "http://localhost";

test("It renders the Header", () => {
	// Arrange: prepare the environment, render the component.
	renderWithProviders(<Layout children={undefined} />);
	// Act: try to find the expected links.
	const nameLinkElement = screen.getByText("DoS Comparison Tool");
	// Assert: check that required links are indeed links.
	expect(nameLinkElement).toHaveProperty("href", baseUrl + "/");
});

test("It renders the Footer", () => {
	// Arrange: prepare the environment, render the component.
	renderWithProviders(<Layout children={undefined} />);
	// Act: try to find the expected links.
	const homepageLinkElement = screen.getByText("Homepage");
	// Assert: check that required links are indeed links.
	expect(homepageLinkElement).toHaveProperty("href", baseUrl + "/");
});

test("Children elements render inside Body", () => {
	// Arrange: prepare the environment, render the component.
	const children = <div>Test</div>;
	renderWithProviders(<Layout children={children} />);
	// Act: Get the main element.
	const mainElement = document.querySelector("main");
	// Assert: Main element contains the children.
	expect(mainElement).not.toBeNull();
});
