import { expect, test } from "@jest/globals";
import { screen } from "@testing-library/react";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import SearchForm from "../searchForm";

test("It renders the expected SearchForm layout", () => {
	// Arrange
	renderWithProvidersAndRouter(<SearchForm />);
	// Act: Get the elements.
	const roleDropDown = screen.getByLabelText("Role");
	const ageUnitsDropDown = document.getElementsByClassName("AgeUnits");
	const ageInput = document.getElementsByClassName("AgeInput");
	// Assert: Elements are present.
	expect(roleDropDown).toBeDefined();
	expect(ageUnitsDropDown).toBeDefined();
	expect(ageInput).toBeDefined();
});
