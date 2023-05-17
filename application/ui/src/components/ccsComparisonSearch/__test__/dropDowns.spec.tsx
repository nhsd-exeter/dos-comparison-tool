import { expect, test } from "@jest/globals";
import { screen } from "@testing-library/react";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import {
	AgeUnitsDropDown,
	EnvironmentDropDown,
	SexDropDown,
} from "../dropDowns";

test("It renders the expected SexDropDown component", () => {
	// Arrange
	renderWithProvidersAndRouter(<SexDropDown />);
	// Act: Get the elements.
	const sex = screen.getByLabelText("Sex");
	// Assert: Elements are present.
	expect(sex).toBeTruthy();
});

test("It renders the expected AgeUnitsDropDown component", () => {
	// Arrange
	renderWithProvidersAndRouter(<AgeUnitsDropDown />);
	// Act: Get the elements.
	const AgeUnits = document.getElementsByClassName("AgeUnits");
	// Assert: Elements are present.
	expect(AgeUnits).toBeTruthy();
});

test("It renders the expected EnvironmentDropDown component", () => {
	// Arrange
	renderWithProvidersAndRouter(<EnvironmentDropDown />);
	// Act: Get the elements.
	const Environment = screen.getByLabelText("Environment");
	// Assert: Elements are present.
	expect(Environment).toBeTruthy();
});
