// This file is loaded before running tests

// Stryker disable all
// Fixes bug with aws-cognito-identity-js
global.crypto = {
	getRandomValues: (arr) => require("crypto").randomBytes(arr.length),
};
// Stryker enable all

// Set up environment variables
process.env.REACT_APP_CLIENT_ID = "test";
process.env.REACT_APP_USER_POOL_ID = "eu-west-2_test";
