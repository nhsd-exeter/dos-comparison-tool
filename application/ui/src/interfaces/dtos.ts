export interface ApplicationState {
	user: Partial<UserState>;
}

export interface UserPayload {
	data: Partial<User>;
}

export interface User {
	emailAddress: string;
	name: string;
}

export interface Action<T> {
	type: string;
	hideError?: boolean;
	payload?: T;
	requestParams?: unknown;
	meta?: unknown;
}

export interface UserState extends Partial<User> {
	failedLogin: boolean;
	loggedIn: boolean;
}

export interface AxiosRequestObject {
	axiosRequest: AxiosRequestContent;
}

export interface AxiosRequestContent {
	method: string;
	partialUrl: string;
	data?: unknown;

	[propName: string]: unknown;
}
