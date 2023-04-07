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

export interface CCSSearchData {
	authToken: string;
	search_one: Search;
	search_two: Search;
}

export interface Search {
	age: number;
	age_format: string;
	disposition: number;
	symptom_group: number;
	symptom_discriminator_list: number[];
	gender: string;
	search_environment: string;
}
