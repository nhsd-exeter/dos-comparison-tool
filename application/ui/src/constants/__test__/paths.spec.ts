import { expect, test } from "@jest/globals";
import { BASE_PATH, LOGIN_PATH, MENU_PATH } from "../paths";

const expectedBasePath = "/";
const expectedLoginPath = "/login";
const expectedMenuPath = "/menu";

test("Assert paths are as expected", () => {
	// Assert: Paths are as expected
	expect(BASE_PATH).toBe(expectedBasePath);
	expect(LOGIN_PATH).toBe(expectedLoginPath);
	expect(MENU_PATH).toBe(expectedMenuPath);
});
