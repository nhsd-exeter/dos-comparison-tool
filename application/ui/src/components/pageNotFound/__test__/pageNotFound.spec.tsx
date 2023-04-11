import { describe, expect, it } from "@jest/globals";
import { fireEvent } from "@testing-library/react";
import axios, * as dep from "axios";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import { FOOTER_ID, HEADER_ID } from "../../../constants/componentIds";
import PageNotFound from "../pageNotFound";

test("It renders the expected ErrorPage layout", () => {
	// Arrange
	renderWithProvidersAndRouter(<PageNotFound />);
	// Act: Get the elements.
	const header = document.getElementById(HEADER_ID);
	const footer = document.getElementById(FOOTER_ID);
	// Assert: Elements are present.
	expect(footer).toBeFalsy();
	expect(header).toBeTruthy();
});

describe("SearchPage works as expected", () => {
	it("On submit it sends a ccsComparisonSearchRequest", () => {
		// Arrange
		axios.post.mockImplementationOnce(() => Promise.resolve({ data: {} }));
		// Act
		renderWithProvidersAndRouter(<SearchPage />);
		const submitButton = document.getElementById(SEARCH_BUTTON) as HTMLElement;
		fireEvent(submitButton, new MouseEvent("click"));
		// Assert
		expect(axios.post).toHaveBeenCalledTimes(1);
	});
});
