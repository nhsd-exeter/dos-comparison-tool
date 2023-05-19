import { afterEach, describe, expect, test } from "@jest/globals";
import { fireEvent, getByTestId, waitFor } from "@testing-library/react";
import axios from "axios";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import { store } from "../../../app/store";
import {
	DISPOSITION_DROP_DOWN,
	POSTCODE_INPUT,
	SEX_DROP_DOWN,
	SYMPTOM_DISCRIMINATOR_DROP_DOWN,
	SYMPTOM_GROUP_DROP_DOWN,
} from "../../../constants/componentIds";
import SharedSearchForm from "../sharedSearchForm";

jest.mock("axios");

describe("tests for ccsComparisonSearch slice", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	test("It renders the expected SharedSearchForm layout", () => {
		// Arrange
		const symptomGroups = [
			{ SymptomGroupId: 1, SymptomGroupName: "Symptom Group 1" },
			{ SymptomGroupId: 2, SymptomGroupName: "Symptom Group 2" },
		];
		const dispositions = [
			{
				DispositionId: 1,
				DispositionName: "Disposition 1",
				DispositionCode: "1",
			},
			{
				DispositionId: 2,
				DispositionName: "Disposition 2",
				DispositionCode: "2",
			},
		];
		jest
			.spyOn(axios, "post")
			.mockResolvedValueOnce({ data: symptomGroups })
			.mockResolvedValueOnce({ data: dispositions });
		renderWithProvidersAndRouter(<SharedSearchForm />, { store: store });
		// Act: Get the elements.
		waitFor(
			() =>
				getByTestId(
					document.documentElement,
					SYMPTOM_GROUP_DROP_DOWN
				) as HTMLElement
		);
		const postcodeInput = document.getElementById(POSTCODE_INPUT);
		const postcodeInputLabel = document.getElementById(
			`${POSTCODE_INPUT}--label`
		);
		const symptomGroupDropDown = document.getElementById(
			SYMPTOM_GROUP_DROP_DOWN
		);
		const symptomGroupLabel = document.getElementById(
			`${SYMPTOM_GROUP_DROP_DOWN}--label`
		);
		const symptomDiscriminatorDropDown = document.getElementById(
			SYMPTOM_DISCRIMINATOR_DROP_DOWN
		);
		const symptomDiscriminatorLabel = document.getElementById(
			`${SYMPTOM_DISCRIMINATOR_DROP_DOWN}--label`
		);
		const dispositionDropDown = document.getElementById(DISPOSITION_DROP_DOWN);
		const dispositionLabel = document.getElementById(
			`${DISPOSITION_DROP_DOWN}--label`
		);
		const sexDropDown = document.getElementById(SEX_DROP_DOWN);
		const sexLabel = document.getElementById(`${SEX_DROP_DOWN}--label`);
		// Assert: Elements are present.
		expect(postcodeInput).toBeDefined();
		expect(postcodeInputLabel).toBeDefined();
		expect(postcodeInputLabel).toHaveProperty("innerHTML", "Postcode");
		expect(symptomGroupDropDown).toBeDefined();
		expect(symptomGroupLabel).toBeDefined();
		expect(symptomGroupLabel).toHaveProperty("innerHTML", "Symptom Group");
		expect(symptomDiscriminatorDropDown).toBeDefined();
		expect(symptomDiscriminatorLabel).toBeDefined();
		expect(symptomDiscriminatorLabel).toHaveProperty(
			"innerHTML",
			"Symptom Discriminator"
		);
		expect(dispositionDropDown).toBeDefined();
		expect(dispositionLabel).toBeDefined();
		expect(dispositionLabel).toHaveProperty("innerHTML", "Disposition");
		expect(sexDropDown).toBeDefined();
		expect(sexLabel).toBeDefined();
		expect(sexLabel).toHaveProperty("innerHTML", "Sex");
	});

	test("It renders the expected SharedSearchForm layout when errors are returned", () => {
		// Arrange
		jest
			.spyOn(axios, "post")
			.mockRejectedValueOnce({
				response: { status: 500 },
				error: { message: "Error" },
			})
			.mockRejectedValueOnce({
				response: { status: 500 },
				error: { message: "Error" },
			});

		// Act
		renderWithProvidersAndRouter(<SharedSearchForm />, { store: store });
		// Assert: Elements are present.
		waitFor(
			() =>
				getByTestId(
					document.documentElement,
					SYMPTOM_GROUP_DROP_DOWN
				) as HTMLElement
		);
		const error = document.getElementById("Error");
		expect(error).toBeDefined();
	});

	test("It renders the expected SharedSearchForm layout after symptom_group set", () => {
		// Arrange
		const symptomGroups = [
			{ SymptomGroupId: 1, SymptomGroupName: "Symptom Group 1" },
			{ SymptomGroupId: 2, SymptomGroupName: "Symptom Group 2" },
		];
		const dispositions = [
			{
				DispositionId: 1,
				DispositionName: "Disposition 1",
				DispositionCode: "1",
			},
			{
				DispositionId: 2,
				DispositionName: "Disposition 2",
				DispositionCode: "2",
			},
		];
		const symptomDiscriminators = [
			{
				SymptomDiscriminatorId: 1,
				SymptomDiscriminatorName: "Symptom Discriminator 1",
			},
		];
		jest
			.spyOn(axios, "post")
			.mockResolvedValueOnce({ data: symptomGroups })
			.mockResolvedValueOnce({ data: dispositions })
			.mockResolvedValueOnce({ data: symptomDiscriminators });
		renderWithProvidersAndRouter(<SharedSearchForm />, { store: store });
		waitFor(
			() =>
				getByTestId(
					document.documentElement,
					SYMPTOM_GROUP_DROP_DOWN
				) as HTMLElement
		);
		// Act: Get the elements.
		fireEvent.change(document.getElementById(SYMPTOM_GROUP_DROP_DOWN), {
			target: { value: "0" },
		});
		waitFor(
			() =>
				getByTestId(
					document.documentElement,
					SYMPTOM_DISCRIMINATOR_DROP_DOWN
				) as HTMLElement
		);
		// Assert: Elements are present.
		const symptomDiscriminatorDropDown = document.getElementById(
			SYMPTOM_DISCRIMINATOR_DROP_DOWN
		);
		expect(symptomDiscriminatorDropDown).toBeDefined();
	});
});
