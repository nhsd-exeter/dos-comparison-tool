import { FOOTER_ID, MAIN_ID, HEADER_ID } from "../ids";
import { expect, test } from "@jest/globals";

const expectedHeaderId = "DoSComparisonToolHeader";
const expectedFooterId = "DoSComparisonToolFooter";
const expectedMainId = "DoSComparisonToolMain";

test("Assert ids are as expected", () => {
	// Assert: ids are as expected
	expect(FOOTER_ID).toBe(expectedFooterId);
	expect(MAIN_ID).toBe(expectedMainId);
	expect(HEADER_ID).toBe(expectedHeaderId);
});
