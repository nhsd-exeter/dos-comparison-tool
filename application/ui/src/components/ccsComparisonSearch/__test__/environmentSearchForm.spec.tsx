import { expect, test } from "@jest/globals";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import EnvironmentSearchForm from "../environmentSearchForm";

test("It renders the expected EnvironmentSearchForm layout", () => {
	// Arrange
	renderWithProvidersAndRouter(<EnvironmentSearchForm />);
	// Act: Get the elements.
	const environmentDropDown = document.getElementsByClassName("Environment");
	const ageUnitsDropDown = document.getElementsByClassName("AgeUnits");
	const ageInput = document.getElementsByClassName("AgeInput");
	// Assert: Elements are present.
	expect(environmentDropDown).toBeDefined();
	expect(ageUnitsDropDown).toBeDefined();
	expect(ageInput).toBeDefined();
});
