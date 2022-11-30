import ErrorPage from "../errorPage";
import React from "react";
import { expect, test } from "@jest/globals";
import { FOOTER_ID, HEADER_ID } from "../../../constants/componentIds";
import { render } from "@testing-library/react";

test("It renders the expected ErrorPage layout", () => {
	// Arrange: prepare the environment, render the component.
	render(<ErrorPage />);
	// Act: Get the elements.
	const header = document.getElementById(HEADER_ID);
	const footer = document.getElementById(FOOTER_ID);
	// Assert: Elements are present.
	expect(footer).toBeFalsy();
	expect(header).toBeTruthy();
});
