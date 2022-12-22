import { expect, test } from "@jest/globals";
import { AuthConfig } from "../config";

// Test to check the environment is setup correctly
test("Auth Config has correct values", () => {
	// Assert
	expect(AuthConfig).toStrictEqual({
		// Values set in setupTests.ts
		ClientId: "test",
		UserPoolId: "eu-west-2_test",
	});
});
