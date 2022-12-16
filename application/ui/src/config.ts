export const AuthConfig = {
	UserPoolId: process.env.REACT_APP_USER_POOL_ID
		? process.env.REACT_APP_USER_POOL_ID
		: "",
	ClientId: process.env.REACT_APP_CLIENT_ID
		? process.env.REACT_APP_CLIENT_ID
		: "",
};
