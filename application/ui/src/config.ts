/**
 * Configuration options for authentication.
 */
export const AuthConfig = {
	/**
	 * The ID of the user pool.
	 */
	UserPoolId: process.env.REACT_APP_USER_POOL_ID as string,
	/**
	 * The ID of the client.
	 */
	ClientId: process.env.REACT_APP_CLIENT_ID as string,
};

/**
 * The API endpoint.
 */
export const ApiEndpoint = process.env.REACT_APP_API_ENDPOINT as string;
