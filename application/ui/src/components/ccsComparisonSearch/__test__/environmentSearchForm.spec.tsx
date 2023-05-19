import { afterEach, describe, expect, test } from "@jest/globals";
import { getByTestId, waitFor } from "@testing-library/react";
import axios from "axios";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import { ROLE_DROP_DOWN_SUFFIX } from "../../../constants/componentIds";
import EnvironmentSearchForm from "../environmentSearchForm";

describe("tests for environmentSearchForm", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	test("It renders the expected EnvironmentSearchForm layout when request successful", () => {
		// Arrange
		const roles = [{ RoleId: 1, RoleName: "Role 1" }];
		jest.spyOn(axios, "post").mockResolvedValueOnce({ data: roles });
		const searchName = "searchOne";
		renderWithProvidersAndRouter(
			<EnvironmentSearchForm searchName={searchName} />
		);
		waitFor(
			() =>
				getByTestId(
					document.documentElement,
					`${searchName}${ROLE_DROP_DOWN_SUFFIX}`
				) as HTMLElement
		);
		// Act: Get the elements.
		const environmentDropDown = document.getElementsByClassName("Environment");
		const ageUnitsDropDown = document.getElementsByClassName("AgeUnits");
		const ageInput = document.getElementsByClassName("AgeInput");
		// Assert: Elements are present.
		expect(environmentDropDown).toBeDefined();
		expect(ageUnitsDropDown).toBeDefined();
		expect(ageInput).toBeDefined();
	});

	test("It renders the expected EnvironmentSearchForm layout handles errors", () => {
		// Arrange
		jest.spyOn(axios, "post").mockRejectedValueOnce({
			response: { data: { message: "Error" } },
		});
		const searchName = "searchOne";
		renderWithProvidersAndRouter(
			<EnvironmentSearchForm searchName={searchName} />
		);
		waitFor(
			() =>
				getByTestId(
					document.documentElement,
					`${searchName}${ROLE_DROP_DOWN_SUFFIX}`
				) as HTMLElement
		);
		// Act: Get the elements.
		const environmentDropDown = document.getElementsByClassName("Environment");
		const ageUnitsDropDown = document.getElementsByClassName("AgeUnits");
		const ageInput = document.getElementsByClassName("AgeInput");
		// Assert: Elements are present.
		expect(environmentDropDown).toBeDefined();
		expect(ageUnitsDropDown).toBeDefined();
		expect(ageInput).toBeDefined();
	});
});
