import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";
import { ApiEndpoint } from "../config";
import { CCSSearchData } from "../interfaces/dtos";
export interface CCSComparisonSearchState {
	loading: "pending" | "fulfilled" | "rejected" | "idle";
	searchOne: Array<string>;
	searchOneEnvironment: string;
	searchTwo: Array<string>;
	searchTwoEnvironment: string;
	successStatus: boolean;
	error?: string;
}

export const initialState = {
	successStatus: false,
	loading: "idle",
} as CCSComparisonSearchState;

export const search = createAsyncThunk(
	"ccsComparisonSearch/search",
	async (requestData: CCSSearchData) => {
		axios.defaults.headers.common["Authorization"] = requestData.authToken;
		axios.defaults.headers.common["Content-Type"] =
			"application/json;charset=utf-8";
		const response = await axios.post(
			ApiEndpoint + "/search/CCSComparisonSearch",
			{
				search_one: requestData.search_one,
				search_two: requestData.search_two,
			}
		);
		return response.data;
	}
);

export const ccsComparisonSearchSlice = createSlice({
	name: "ccsComparisonSearch",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(search.pending, (state) => {
			state.loading = "pending";
		});
		builder.addCase(search.fulfilled, (state, action) => {
			if (state.loading === "pending") {
				state.searchOne = Object(action.payload)["search_one"];
				state.searchTwo = Object(action.payload)["search_two"];
				state.searchOneEnvironment = Object(action.payload)[
					"search_one_environment"
				];
				state.searchTwoEnvironment = Object(action.payload)[
					"search_two_environment"
				];
				state.successStatus = true;
				state.loading = "idle";
			}
		});
		builder.addCase(search.rejected, (state) => {
			if (state.loading === "pending") {
				state.loading = "idle";
				state.error = "Error occurred";
			}
		});
	},
});

export const selectError = (state: RootState) =>
	state.ccsComparisonSearch.error;
export const selectCCSAPIResponseSuccessStatus = (state: RootState) =>
	state.ccsComparisonSearch.successStatus;

export const selectCCSComparisonSearchOne = (state: RootState) =>
	state.ccsComparisonSearch.searchOne;
export const selectCCSComparisonSearchTwo = (state: RootState) =>
	state.ccsComparisonSearch.searchTwo;

export const selectCCSComparisonSearchOneEnvironment = (state: RootState) =>
	state.ccsComparisonSearch.searchOneEnvironment;
export const selectCCSComparisonSearchTwoEnvironment = (state: RootState) =>
	state.ccsComparisonSearch.searchTwoEnvironment;

export default ccsComparisonSearchSlice.reducer;
