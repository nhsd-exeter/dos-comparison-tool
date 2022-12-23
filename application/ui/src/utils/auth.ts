import { CognitoUserPool } from "amazon-cognito-identity-js";
import { AuthConfig } from "../config";

const poolData = {
	UserPoolId: AuthConfig.UserPoolId,
	ClientId: AuthConfig.ClientId,
};
export const userPool = new CognitoUserPool(poolData);
