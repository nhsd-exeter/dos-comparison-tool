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
	gender: string;
	role: string;
	postcode: string;
	search_environment: string;
	symptom_discriminator_list: number[];
	symptom_group: number;
	search_date_time: string;
}

export type Disposition = {
	DispositionId: string;
	DispositionCode: string;
	DispositionName: string;
};

export type SymptomGroup = {
	SymptomGroupId: string;
	SymptomGroupName: string;
};
