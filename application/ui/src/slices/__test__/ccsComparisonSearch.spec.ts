import { beforeEach, describe, expect, it } from "@jest/globals";
import axios, * as dep from "axios";
import { store } from "../../app/store";
import { search } from "../ccsComparisonSearch";

jest.mock("axios");
const mockedDependency = <jest.Mock<typeof dep.default>>dep.default;

describe("tests for ccsComparisonSearch slice", () => {
	beforeEach(() => {
		mockedDependency.mockClear();
	});

	it("Should be able to post to API successfully", async () => {
		// Arrange - set up the initial state
		axios.post.mockImplementationOnce(() => Promise.resolve({ data: {} }));
		// Act - run the action
		store.dispatch(search(""));
		// Assert - check the result
		expect(axios.post).toHaveBeenCalledTimes(1);
		expect(axios.post).toHaveBeenCalledWith("test/search", {
			search_one: {
				age: 2,
				age_format: "Years",
				disposition: 9001,
				gender: "M",
				search_environment: "test",
				symptom_discriminator_list: [4003],
				symptom_group: 1011,
			},
			search_two: {
				age: 2,
				age_format: "Years",
				disposition: 9001,
				gender: "M",
				search_environment: "test",
				symptom_discriminator_list: [4003],
				symptom_group: 1011,
			},
		});
	});

	it("Should be handle when API fails", async () => {
		// Arrange - set up the initial state
		axios.post.mockImplementationOnce(() => Promise.reject({}));
		// Act - run the action
		store.dispatch(search(""));
		// Assert - check the result
		expect(axios.post).toHaveBeenCalledTimes(1);
	});
});
