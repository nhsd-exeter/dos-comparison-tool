import { expect, test } from "@jest/globals";
import { FOOTER_ID, HEADER_ID } from "../../../constants/componentIds";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import MenuPage from "../menuPage";

test("It renders the expected MenuPage layout", () => {
	// Arrange
	renderWithProvidersAndRouter(<MenuPage />);
	// Act: Get the elements.
	const header = document.getElementById(HEADER_ID);
	const footer = document.getElementById(FOOTER_ID);
	// Assert: Elements are present.
	expect(footer).toBeTruthy();
	expect(header).toBeTruthy();
});

test("It renders the MenuPage Content", () => {
	// Arrange
	renderWithProvidersAndRouter(<MenuPage />);
	// Act
	const ccsSearchCardHeading = document
		.getElementById("ccsSearchCardHeading")
		?.getElementsByClassName("nhsuk-card__link")[0];
	const ccsSearchCardHeadingText = document.getElementById(
		"ccsSearchCardHeading"
	)?.textContent;
	const ccsSearchCardDescriptionText = document.getElementById(
		"ccsSearchCardDescription"
	)?.textContent;
	// Assert
	expect(ccsSearchCardHeading).toHaveProperty("href", "http://localhost/");
	expect(ccsSearchCardHeadingText).toStrictEqual(
		"Check Capacity Summary Search"
	);
	expect(ccsSearchCardDescriptionText).toStrictEqual(
		"Compare results from multiple Check Capacity Summary (CCS) searches across Directory of Services environments"
	);
});
