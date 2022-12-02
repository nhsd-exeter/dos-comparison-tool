import { expect, test } from "@jest/globals";
import { store } from "../store";

test("Store contains expected state", () => {
	// Assert
	expect(store.getState().auth).toStrictEqual({ isLoggedIn: false });
});
