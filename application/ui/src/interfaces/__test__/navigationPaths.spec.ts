import { basePath, loginPath } from "../navigationPaths";
import { expect, test } from "@jest/globals";

const expectedBasePath = "/";
const expectedLoginPath = "/login";

test("Assert links are as expected", () => {
	// Assert: Paths are as expected
	expect(basePath).toBe(expectedBasePath);
	expect(loginPath).toBe(expectedLoginPath);
});
