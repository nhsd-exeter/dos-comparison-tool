import React from "react";
import { App } from "../App";
import { expect, test } from "@jest/globals";
import { expectedPageText } from "../homePage/__test__/homePage.spec";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../__test__/utils-for-tests";
import { screen } from "@testing-library/react";

test("Application by default renders homepage", () => {
	// Arrange: prepare the environment, render the component.
	renderWithProviders(
		<MemoryRouter initialEntries={["/"]}>
			<App />
		</MemoryRouter>
	);
	// Act: Get the elements.
	const pageTextValue = screen.getByText(expectedPageText).textContent;
	// Assert: Elements are present.
	expect(pageTextValue).toBeTruthy();
});

test("/login loads the login page", () => {
	// Arrange: prepare the environment, render the component.
	const expectedLoginText = "Login";
	renderWithProviders(
		<MemoryRouter initialEntries={["/login"]}>
			<App />
		</MemoryRouter>
	);
	// Act: Get the elements.
	const pageTextValue = screen.getByText(expectedLoginText).textContent;
	// Assert: Elements are present.
	expect(pageTextValue).toBeTruthy();
});

test("/menu loads the menu page", () => {
	// Arrange: prepare the environment, render the component.
	const expectedMenuPageText = "Select a search to compare";
	renderWithProviders(
		<MemoryRouter initialEntries={["/menu"]}>
			<App />
		</MemoryRouter>
	);
	// Act: Get the elements.
	const pageTextValue = screen.getByText(expectedMenuPageText).textContent;
	// Assert: Elements are present.
	expect(pageTextValue).toBeTruthy();
});
