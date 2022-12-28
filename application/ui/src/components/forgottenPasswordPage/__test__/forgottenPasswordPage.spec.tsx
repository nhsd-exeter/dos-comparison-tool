import { expect, test } from "@jest/globals";

import { FOOTER_ID, HEADER_ID } from "../../../constants/componentIds";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import ForgottenPasswordPage from "../forgottenPasswordPage";

test("It renders the expected ForgottenPasswordPage layout", () => {
	// Arrange: prepare the environment, render the component.
	renderWithProvidersAndRouter(<ForgottenPasswordPage />);
	// Act: Get the elements.
	const header = document.getElementById(HEADER_ID);
	const footer = document.getElementById(FOOTER_ID);
	// Assert: Elements are present.
	expect(footer).toBeTruthy();
	expect(header).toBeTruthy();
});
