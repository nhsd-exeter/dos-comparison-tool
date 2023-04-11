import { describe, expect, it } from "@jest/globals";
import { fireEvent } from "@testing-library/react";
import axios, * as dep from "axios";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import {
	FOOTER_ID,
	HEADER_ID,
	SEARCH_BUTTON,
} from "../../../constants/componentIds";
import CCSComparisonSearch from "../ccsComparisonSearch";

jest.mock("axios");
const mockedDependency = (jest.Mock as typeof dep.default) >> dep.default;

test("It renders the expected CCSComparisonSearch layout", () => {
	// Arrange
	renderWithProvidersAndRouter(<CCSComparisonSearch />);
	// Act: Get the elements.
	const header = document.getElementById(HEADER_ID);
	const footer = document.getElementById(FOOTER_ID);
	// Assert: Elements are present.
	expect(footer).toBeTruthy();
	expect(header).toBeTruthy();
});

describe("CCSComparisonSearch works as expected", () => {
	it("On submit it sends a ccsComparisonSearchRequest", () => {
		// Arrange
		axios.post.mockImplementationOnce(() => Promise.resolve({ data: {} }));
		// Act
		renderWithProvidersAndRouter(<CCSComparisonSearch />);
		const submitButton = document.getElementById(SEARCH_BUTTON) as HTMLElement;
		fireEvent(submitButton, new MouseEvent("click"));
		// Assert
		expect(axios.post).toHaveBeenCalledTimes(1);
	});
});
