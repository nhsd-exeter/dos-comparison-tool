import { expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Layout from "../index";

const baseUrl = "http://localhost";

test("It renders the Footer", () => {
	// Arrange: prepare the environment, render the component.
	render(<Layout children={undefined} />);
	// Act: try to find the expected links.
	const homepageLinkElement = screen.getByText("Homepage");
	// Assert: check that required links are indeed links.
	expect(homepageLinkElement).toHaveProperty("href", baseUrl + "/");
});
