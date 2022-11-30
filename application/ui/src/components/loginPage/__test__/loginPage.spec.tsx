import LoginPage from "../loginPage";
import React from "react";
import { expect, test } from "@jest/globals";
import { FOOTER_ID, HEADER_ID } from "../../../constants/componentIds";
import { render, screen } from "@testing-library/react";

test("It renders the expected LoginPage layout", () => {
	// Arrange: prepare the environment, render the component.
	render(<LoginPage />);
	// Act: Get the elements.
	const header = document.getElementById(HEADER_ID);
	const footer = document.getElementById(FOOTER_ID);
	// Assert: Elements are present.
	expect(footer).toBeTruthy();
	expect(header).toBeTruthy();
});

test("It renders the LoginPage Content", () => {
	// Arrange: prepare the environment, render the component.
	render(<LoginPage />);
	// Act: try to find the expected links.
	const nextButton = screen.getByRole("button");
	// Assert: check that required links are indeed links.
	expect(nextButton).toHaveProperty("href", "http://localhost/menu");
	expect(nextButton).toHaveProperty("text", "Log in");
});
