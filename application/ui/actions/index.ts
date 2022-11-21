import * as Dtos from "../interfaces/dtos";
import * as Enums from "../interfaces/enums";
import * as _ from "../utils/lodash-sf";

export function locationChange(route): Dtos.Action<RouteComponentProps> {
	return {
		type: Enums.actionTypes.LOCATION_CHANGE,
		payload: route,
	};
}
