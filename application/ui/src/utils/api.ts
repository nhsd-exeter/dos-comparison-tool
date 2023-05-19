import axios from "axios";
import { ApiEndpoint } from "../config";
import { DATA_API_PATH, SEARCH_API_PATH } from "../constants/constants";

/**
 * Sets up the default headers for the API calls.
 * @param idToken The ID token.
 * @throws Error if the ID token is undefined.
 */
export function SetupDefaultHeaders(idToken: string | undefined) {
	axios.defaults.headers.common["Authorization"] = idToken as string;
	axios.defaults.headers.common["Content-Type"] =
		"application/json;charset=utf-8";
}

/**
 * The search	API endpoint.
 */
export const SearchLambda = `${ApiEndpoint}/${SEARCH_API_PATH}`;

/**
 * The data API endpoint.
 */
export const DataLambda = `${ApiEndpoint}/${DATA_API_PATH}`;
