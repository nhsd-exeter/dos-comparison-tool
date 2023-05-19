import { expect, test } from "@jest/globals";
import { fireEvent } from "@testing-library/react";
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

test("The Menu Content links to the CCS Comparison Search page", () => {
	// Arrange
	renderWithProvidersAndRouter(<Menu />);
	// Act
	fireEvent.click(document.getElementById("ccsSearchCardLink") as HTMLElement);
	// Assert
	expect(window.location.pathname).toStrictEqual("/ccs-comparison-search");
});
