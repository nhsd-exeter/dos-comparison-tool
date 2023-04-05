import { test } from "@jest/globals";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import ResultsPage from "../resultsPage";

test("It renders the expected ResultsPage component", () => {
	// Arrange
	const preloadedState = {
		ccsComparisonSearch: {
			searchOne: [
				{
					name: "Service Name",
					service_type: "Service Type",
					uid: "123456789",
					address: "Service Address",
					distance: "0.0",
				},
				{
					name: "Service Name",
					service_type: "Service Type",
					uid: "123456789",
					address: "Service Address",
					distance: "0.0",
				},
			],
			searchTwo: [
				{
					name: "Service Name",
					service_type: "Service Type",
					uid: "123456789",
					address: "Service Address",
					distance: "0.0",
				},
				{
					name: "Service Name",
					service_type: "Service Type",
					uid: "123456789",
					address: "Service Address",
					distance: "0.0",
				},
			],
			successStatus: false,
		},
	};
	// Act
	renderWithProvidersAndRouter(<ResultsPage />, {
		preloadedState: preloadedState,
	});
	// Assert
});
