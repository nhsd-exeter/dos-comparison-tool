import { expect, test } from "@jest/globals";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import { FOOTER_ID, HEADER_ID } from "../../../constants/componentIds";
import Menu from "../menu";

test("It renders the expected Menu layout", () => {
	// Arrange
	renderWithProvidersAndRouter(<Menu />);
	// Act: Get the elements.
	const header = document.getElementById(HEADER_ID);
	const footer = document.getElementById(FOOTER_ID);
	// Assert: Elements are present.
	expect(footer).toBeTruthy();
	expect(header).toBeTruthy();
});

test("It renders the Menu Content", () => {
	// Arrange
	renderWithProvidersAndRouter(<Menu />);
	// Act
	const ccsSearchCardHeadingText = document.getElementById(
		"ccsSearchCardHeading"
	)?.textContent;
	const ccsSearchCardDescriptionText = document.getElementById(
		"ccsSearchCardDescription"
	)?.textContent;
	// Assert
	expect(ccsSearchCardHeadingText).toStrictEqual(
		"Check Capacity Summary Search"
	);
	expect(ccsSearchCardDescriptionText).toStrictEqual(
		"Compare results from multiple Check Capacity Summary (CCS) searches across Directory of Services environments"
	);
});
