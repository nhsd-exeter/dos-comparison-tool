import { test } from "@jest/globals";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import ResultsPage from "../resultsPage";

test("It renders the expected ResultsPage component", () => {
	// Arrange
	renderWithProvidersAndRouter(<ResultsPage />);
});
