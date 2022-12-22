export const AuthConfig = {
	UserPoolId: process.env.REACT_APP_USER_POOL_ID as string,
	ClientId: process.env.REACT_APP_CLIENT_ID as string,
};

export const skipEmailVerification =
	process.env.REACT_APP_SKIP_EMAIL_VERIFICATION === "true";
