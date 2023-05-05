import { expect, test } from "@jest/globals";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import { CCS_COMPARISON_SEARCH_PATH } from "../../../constants/paths";
import CCSComparisonResults from "../ccsComparisonResults";

const preloadedState = {
	ccsComparisonSearch: {
		searchOne: [
			{
				name: "Service Name",
				service_type: "Service Type",
				uid: "1",
				address: "Service Address",
				distance: "0.0",
			},
			{
				name: "Service Name",
				service_type: "Service Type",
				uid: "2",
				address: "Service Address",
				distance: "0.0",
			},
		],
		searchTwo: [
			{
				name: "Service Name",
				service_type: "Service Type",
				uid: "1",
				address: "Service Address",
				distance: "0.0",
			},
			{
				name: "Service Name",
				service_type: "Service Type",
				uid: "2",
				address: "Service Address",
				distance: "0.0",
			},
		],
		successStatus: true,
	},
};

test("It renders the expected CCSComparisonResults component", () => {
	// Act
	renderWithProvidersAndRouter(<CCSComparisonResults />, {
		preloadedState: preloadedState,
	});
	// Assert
});

test("It renders the expected CCSComparisonResults component", () => {
	// Arrange
	// Act
	renderWithProvidersAndRouter(<CCSComparisonResults />, {
		preloadedState: preloadedState,
	});
	fireEvent.click(screen.getByText("Previous"));
	// Assert
	expect(window.location.pathname).toBe(CCS_COMPARISON_SEARCH_PATH);
});
