import ErrorPage from "../errorPage";
import React from "react";
import { expect, test } from "@jest/globals";
import { FOOTER_ID, HEADER_ID } from "../../../constants/componentIds";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";

test("It renders the expected ErrorPage layout", () => {
	// Arrange: prepare the environment, render the component.
	renderWithProvidersAndRouter(<ErrorPage />);
	// Act: Get the elements.
	const header = document.getElementById(HEADER_ID);
	const footer = document.getElementById(FOOTER_ID);
	// Assert: Elements are present.
	expect(footer).toBeFalsy();
	expect(header).toBeTruthy();
});
