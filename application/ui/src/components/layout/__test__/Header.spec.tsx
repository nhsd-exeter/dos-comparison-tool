import { expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Layout from "../index";

const baseUrl = "http://localhost";

test("It renders the Header", () => {
	// Arrange: prepare the environment, render the component.
	render(<Layout children={undefined} />);
	// Act: try to find the expected links.
	const nameLinkElement = screen.getByText("DoS Comparison Tool");
	const nhsLogoElement = document.querySelector(
		"body > div > header > div > div.nhsuk-header__logo.nhsuk-header__logo--only > a > svg > image"
	);
	// Assert: check that required links are indeed links.
	expect(nameLinkElement).toHaveProperty("href", baseUrl + "/");
	expect(nhsLogoElement).toHaveProperty(
		"href",
		'<image src="https://assets.nhs.uk/images/nhs-logo.png" xlink:href="" />'
	);
});
