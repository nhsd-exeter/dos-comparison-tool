import { test } from "@jest/globals";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import CCSComparisonResults from "../ccsComparisonResults";

test("It renders the expected CCSComparisonResults component", () => {
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
	renderWithProvidersAndRouter(<CCSComparisonResults />, {
		preloadedState: preloadedState,
	});
	// Assert
});
