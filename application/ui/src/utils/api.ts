import axios from "axios";
import { ApiEndpoint } from "../config";
import { DATA_API_PATH, SEARCH_API_PATH } from "../constants/constants";

export function SetupDefaultHeaders(idToken: string | undefined) {
	axios.defaults.headers.common["Authorization"] = idToken as string;
	axios.defaults.headers.common["Content-Type"] =
		"application/json;charset=utf-8";
}

export const SearchLambda = `${ApiEndpoint}/${SEARCH_API_PATH}`;
export const DataLambda = `${ApiEndpoint}/${DATA_API_PATH}`;
