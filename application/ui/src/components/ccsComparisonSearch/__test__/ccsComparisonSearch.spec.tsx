import { describe, expect, it } from "@jest/globals";
import { fireEvent } from "@testing-library/react";
import axios from "axios";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import {
	FOOTER_ID,
	HEADER_ID,
	SEARCH_BUTTON,
} from "../../../constants/componentIds";
import CCSComparisonSearch from "../ccsComparisonSearch";

jest.mock("axios");

test("It renders the expected CCSComparisonSearch layout", () => {
	// Arrange
	// axios.post.mockImplementationOnce(() =>
	// 	Promise.resolve({
	// 		data: [
	// 			{
	// 				DispositionCode: "1",
	// 				DispositionName: "Disposition 1",
	// 				DispositionId: 1,
	// 			},
	// 			{
	// 				DispositionCode: "2",
	// 				DispositionName: "Disposition 2",
	// 				DispositionId: 2,
	// 			},
	// 		] as unknown as disposition[],
	// 	})
	// );
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
		// axios.post.mockImplementationOnce(() =>
		// 	Promise.resolve({
		// 		data: [
		// 			{
		// 				DispositionCode: "1",
		// 				DispositionName: "Disposition 1",
		// 				DispositionId: 1,
		// 			},
		// 			{
		// 				DispositionCode: "2",
		// 				DispositionName: "Disposition 2",
		// 				DispositionId: 2,
		// 			},
		// 		] as unknown as disposition[],
		// 	})
		// );

		// Act
		renderWithProvidersAndRouter(<CCSComparisonSearch />);
		const submitButton = document.getElementById(SEARCH_BUTTON) as HTMLElement;
		fireEvent(submitButton, new MouseEvent("click"));
		// Assert
		expect(axios.post).toHaveBeenCalledTimes(2);
	});
});
