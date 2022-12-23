import { expect, test } from "@jest/globals";
import {
	AUTH_PASSWORD_INPUT,
	AUTH_REGISTER_EMAIL_INPUT,
	AUTH_REGISTER_PASSWORD_INPUT,
	AUTH_REGISTER_USERNAME_INPUT,
	AUTH_USERNAME_INPUT,
	FOOTER_ID,
	HEADER_ID,
	MAIN_ID,
	NEXT_BUTTON,
} from "../componentIds";

const expectedHeaderId = "DoSComparisonToolHeader";
const expectedFooterId = "DoSComparisonToolFooter";
const expectedMainId = "DoSComparisonToolMain";
const expectedAuthUsernameInput = "authUsernameInput";
const expectedAuthPasswordInput = "authPasswordInput";
const expectedNextButton = "next-button";
const expectedAuthRegisterUsernameInput = "authRegisterUsernameInput";
const expectedAuthRegisterEmailInput = "authRegisterEmailInput";
const expectedAuthRegisterPasswordInput = "authRegisterPasswordInput";

test("Component ids are as expected", () => {
	// Assert: Layout component ids are as expected
	expect(FOOTER_ID).toBe(expectedFooterId);
	expect(MAIN_ID).toBe(expectedMainId);
	expect(HEADER_ID).toBe(expectedHeaderId);
	// Assert: Common component ids are as expected
	expect(NEXT_BUTTON).toBe(expectedNextButton);
	// Assert: Auth login component ids are as expected
	expect(AUTH_USERNAME_INPUT).toBe(expectedAuthUsernameInput);
	expect(AUTH_PASSWORD_INPUT).toBe(expectedAuthPasswordInput);
	// Assert: Auth register component ids are as expected
	expect(AUTH_REGISTER_USERNAME_INPUT).toBe(expectedAuthRegisterUsernameInput);
	expect(AUTH_REGISTER_EMAIL_INPUT).toBe(expectedAuthRegisterEmailInput);
	expect(AUTH_REGISTER_PASSWORD_INPUT).toBe(expectedAuthRegisterPasswordInput);
});
