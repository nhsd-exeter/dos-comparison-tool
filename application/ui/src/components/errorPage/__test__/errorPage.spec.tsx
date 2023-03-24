import { expect, test } from "@jest/globals";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import { FOOTER_ID, HEADER_ID } from "../../../constants/componentIds";
import ErrorPage from "../errorPage";

test("It renders the expected ErrorPage layout", () => {
	// Arrange
	renderWithProvidersAndRouter(<ErrorPage />);
	// Act: Get the elements.
	const header = document.getElementById(HEADER_ID);
	const footer = document.getElementById(FOOTER_ID);
	// Assert: Elements are present.
	expect(footer).toBeFalsy();
	expect(header).toBeTruthy();
});
