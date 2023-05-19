import { CognitoUserPool } from "amazon-cognito-identity-js";
import { AuthConfig } from "../config";

/**
 * The user pool configuration options.
 */
const poolData = {
	UserPoolId: AuthConfig.UserPoolId,
	ClientId: AuthConfig.ClientId,
};

/**
 * The user pool class.
 */
export const userPool = new CognitoUserPool(poolData);
