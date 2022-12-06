// This file is loaded before running tests

// Fixes bug with aws-cognito-identity-js
global.crypto = {
	getRandomValues: (arr) => require("crypto").randomBytes(arr.length),
};
