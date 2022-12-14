export interface ApplicationState {
	user: Partial<AuthState>;
}

export interface Action<T> {
	type: string;
	hideError?: boolean;
	payload?: T;
	requestParams?: unknown;
	meta?: unknown;
}

export interface Data<T> {
	data: T;
}

export interface Auth {
	emailAddress: string;
	name: string;
}

export interface AuthPayload {
	data: Partial<Auth>;
}

export interface AuthCredentials {
	emailAddress: string;
	password: string;
}

export interface AuthState extends Partial<Auth> {
	failedLogin: boolean;
	loggedIn: boolean;
}
