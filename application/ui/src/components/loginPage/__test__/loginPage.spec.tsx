import LoginPage from "../loginPage";
import React from "react";
import { expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";

test("It renders the LoginPage", () => {
	// Arrange: prepare the environment, render the component.
	render(<LoginPage />);
	// Act: try to find the expected links.
	const nextButton = screen.getByRole("button");
	// Assert: check that required links are indeed links.
	expect(nextButton).toHaveProperty("href", "http://localhost/select-search");
	expect(nextButton).toHaveProperty("text", "Log in");
});
