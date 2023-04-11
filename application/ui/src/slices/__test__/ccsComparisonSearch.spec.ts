import { beforeEach, describe, expect, it } from "@jest/globals";
import axios, * as dep from "axios";
import { store } from "../../app/store";
import { CCSSearchData } from "../../interfaces/dtos";
import { search } from "../ccsComparisonSearchSlice";

jest.mock("axios");
const mockedDependency = <jest.Mock<typeof dep.default>>dep.default;

const age = 2;
const ageFormat = "Years";
const disposition = 9001;
const gender = "M";
const searchEnvironment = "test";
const symptomDiscriminatorList = [4003];
const symptomGroup = 1011;

const searchDetails: CCSSearchData = {
	authToken: "test",
	search_one: {
		age,
		age_format: ageFormat,
		disposition,
		gender,
		search_environment: searchEnvironment,
		symptom_discriminator_list: symptomDiscriminatorList,
		symptom_group: symptomGroup,
	},
	search_two: {
		age,
		age_format: ageFormat,
		disposition,
		gender,
		search_environment: searchEnvironment,
		symptom_discriminator_list: symptomDiscriminatorList,
		symptom_group: symptomGroup,
	},
};

describe("tests for ccsComparisonSearch slice", () => {
	beforeEach(() => {
		mockedDependency.mockClear();
	});

	it("Should be able to post to API successfully", async () => {
		// Arrange - set up the initial state
		axios.post.mockImplementationOnce(() => Promise.resolve({ data: {} }));
		// Act - run the action
		store.dispatch(search(searchDetails));
		// Assert - check the result
		expect(axios.post).toHaveBeenCalledTimes(1);
		expect(axios.post).toHaveBeenCalledWith("test/search", {
			search_one: {
				age: age,
				age_format: ageFormat,
				disposition: disposition,
				gender: gender,
				search_environment: searchEnvironment,
				symptom_discriminator_list: symptomDiscriminatorList,
				symptom_group: symptomGroup,
			},
			search_two: {
				age: age,
				age_format: ageFormat,
				disposition: disposition,
				gender: gender,
				search_environment: searchEnvironment,
				symptom_discriminator_list: symptomDiscriminatorList,
				symptom_group: symptomGroup,
			},
		});
	});

	it("Should be handle when API fails", async () => {
		// Arrange - set up the initial state
		axios.post.mockImplementationOnce(() => Promise.reject({}));
		// Act - run the action
		store.dispatch(search(searchDetails));
		// Assert - check the result
		expect(axios.post).toHaveBeenCalledTimes(1);
		expect(axios.post).toHaveBeenCalledWith("test/search", {
			search_one: {
				age: age,
				age_format: ageFormat,
				disposition: disposition,
				gender: gender,
				search_environment: searchEnvironment,
				symptom_discriminator_list: symptomDiscriminatorList,
				symptom_group: symptomGroup,
			},
			search_two: {
				age: age,
				age_format: ageFormat,
				disposition: disposition,
				gender: gender,
				search_environment: searchEnvironment,
				symptom_discriminator_list: symptomDiscriminatorList,
				symptom_group: symptomGroup,
			},
		});
	});
});
