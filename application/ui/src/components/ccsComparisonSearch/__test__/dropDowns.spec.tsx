import { expect, test } from "@jest/globals";
import { screen } from "@testing-library/react";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import { disposition } from "../../../interfaces/dtos";
import {
	AgeUnitsDropDown,
	DispositionDropDown,
	EnvironmentDropDown,
	SexDropDown,
	SymptomDiscriminatorDropDown,
	SymptomGroupDropDown,
} from "../dropDowns";

test("It renders the expected SymptomGroupDropDown component", () => {
	// Arrange
	const symptomGroups = [
		{
			SymptomGroupId: 1,
			SymptomGroupName: "Symptom Group 1",
		},
	] as unknown as SymptomGroup[];
	renderWithProvidersAndRouter(
		<SymptomGroupDropDown symptomGroups={symptomGroups} />
	);
	// Act: Get the elements.
	const SymptomGroup = screen.getByLabelText("Symptom Group");
	// Assert: Elements are present.
	expect(SymptomGroup).toBeTruthy();
});

test("It renders the expected SymptomDiscriminatorDropDown component", () => {
	// Arrange
	renderWithProvidersAndRouter(<SymptomDiscriminatorDropDown />);
	// Act: Get the elements.
	const SymptomDiscriminator = screen.getByLabelText("Symptom Discriminator");
	// Assert: Elements are present.
	expect(SymptomDiscriminator).toBeTruthy();
});

test("It renders the expected DispositionDropDown component", () => {
	// Arrange
	const dispositions = [
		{
			DispositionCode: "1",
			DispositionName: "Disposition 1",
			DispositionId: 1,
		},
		{
			DispositionCode: "2",
			DispositionName: "Disposition 2",
			DispositionId: 2,
		},
	] as unknown as disposition[];
	renderWithProvidersAndRouter(
		<DispositionDropDown dispositions={dispositions} />
	);
	// Act: Get the elements.
	const Disposition = screen.getByLabelText("Disposition");
	// Assert: Elements are present.
	expect(Disposition).toBeTruthy();
});

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
