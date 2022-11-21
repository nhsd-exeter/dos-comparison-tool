import { Action, UserPayload, UserState } from "../interfaces/dtos";

export default function (
	state = {},
	action: Action<UserPayload>,
): Partial<UserState> {
	switch (action.type) {
		default:
			return state;
	}
}
