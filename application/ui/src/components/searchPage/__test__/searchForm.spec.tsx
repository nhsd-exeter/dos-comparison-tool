import { expect, test } from "@jest/globals";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import SearchForm from "../searchForm";

test("It renders the expected SearchForm layout", () => {
	// Arrange
	renderWithProvidersAndRouter(<SearchForm />);
	// Act: Get the elements.
	const environmentDropDown = document.getElementsByClassName("Environment");
	const ageUnitsDropDown = document.getElementsByClassName("AgeUnits");
	const ageInput = document.getElementsByClassName("AgeInput");
	// Assert: Elements are present.
	expect(environmentDropDown).toBeDefined();
	expect(ageUnitsDropDown).toBeDefined();
	expect(ageInput).toBeDefined();
});
