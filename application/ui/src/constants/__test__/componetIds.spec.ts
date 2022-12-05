import {
	AUTH_EMAIL_INPUT,
	AUTH_PASSWORD_INPUT,
	AUTH_SUBMIT_BUTTON,
	FOOTER_ID,
	HEADER_ID,
	MAIN_ID,
} from "../componentIds";
import { expect, test } from "@jest/globals";

const expectedHeaderId = "DoSComparisonToolHeader";
const expectedFooterId = "DoSComparisonToolFooter";
const expectedMainId = "DoSComparisonToolMain";
const expectedAuthEmailInput = "authEmailInput";
const expectedAuthPasswordInput = "authPasswordInput";
const expectedAuthSubmitButton = "authSubmitButton";

test("Component ids are as expected", () => {
	// Assert: Layout component ids are as expected
	expect(FOOTER_ID).toBe(expectedFooterId);
	expect(MAIN_ID).toBe(expectedMainId);
	expect(HEADER_ID).toBe(expectedHeaderId);
	// Assert: Auth component ids are as expected
	expect(AUTH_EMAIL_INPUT).toBe(expectedAuthEmailInput);
	expect(AUTH_PASSWORD_INPUT).toBe(expectedAuthPasswordInput);
	expect(AUTH_SUBMIT_BUTTON).toBe(expectedAuthSubmitButton);
});
