import { expect, test } from "@jest/globals";
import { getByTestId, waitFor } from "@testing-library/react";
import axios from "axios";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import { store } from "../../../app/store";
import {
	FOOTER_ID,
	HEADER_ID,
	SYMPTOM_GROUP_DROP_DOWN,
} from "../../../constants/componentIds";
import CCSComparisonSearch from "../ccsComparisonSearch";

test("It renders the expected CCSComparisonSearch layout", () => {
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
	// Act: Get the elements.
	renderWithProvidersAndRouter(<CCSComparisonSearch />, { store: store });
	waitFor(
		() =>
			getByTestId(
				document.documentElement,
				SYMPTOM_GROUP_DROP_DOWN
			) as HTMLElement
	);
	const header = document.getElementById(HEADER_ID);
	const footer = document.getElementById(FOOTER_ID);
	// Assert: Elements are present.
	expect(footer).toBeTruthy();
	expect(header).toBeTruthy();
});
