import { expect } from "@jest/globals";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import { FOOTER_ID, HEADER_ID } from "../../../constants/componentIds";
import PageNotFound from "../pageNotFound";

test("It renders the expected PageNotFound layout", () => {
	// Arrange
	renderWithProvidersAndRouter(<PageNotFound />);
	// Act: Get the elements.
	const header = document.getElementById(HEADER_ID);
	const footer = document.getElementById(FOOTER_ID);
	// Assert: Elements are present.
	expect(footer).toBeFalsy();
	expect(header).toBeTruthy();
});
