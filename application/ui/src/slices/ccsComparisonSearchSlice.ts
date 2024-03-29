import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";
import { CCSSearchData } from "../interfaces/dtos";
import { SearchLambda, SetupDefaultHeaders } from "../utils/api";
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
		SetupDefaultHeaders(requestData.authToken);
		const response = await axios
			.post(
				`${SearchLambda}/CCSComparisonSearch`,
				{
					search_one: requestData.search_one,
					search_two: requestData.search_two,
				},
				{
					timeout: 7000,
				}
			)
			.catch((error) => {
				return Promise.reject(error.response.data);
			});
		return response.data;
	}
);

export const ccsComparisonSearchSlice = createSlice({
	name: "ccsComparisonSearch",
	initialState,
	reducers: {
		resetCCSComparisonSearch: (state) => {
			state.searchOne = [];
			state.searchTwo = [];
			state.searchOneEnvironment = "";
			state.searchTwoEnvironment = "";
			state.successStatus = false;
			state.error = undefined;
		},
		setCCSComparisonSearchError: (state, action) => {
			state.error = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(search.pending, (state) => {
			state.loading = "pending";
		});
		builder.addCase(search.fulfilled, (state, action) => {
			if (state.loading === "pending") {
				state.error = undefined;
				const response = Object(action.payload);
				state.searchOne = response["search_one"];
				state.searchTwo = response["search_two"];
				state.searchOneEnvironment = response["search_one_environment"];
				state.searchTwoEnvironment = response["search_two_environment"];
				state.successStatus = true;
				state.loading = "idle";
			}
		});
		builder.addCase(search.rejected, (state, action) => {
			if (state.loading === "pending") {
				state.loading = "idle";
				state.error = `${action.error.message}, Please try again later or contact support`;
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

export const { setCCSComparisonSearchError, resetCCSComparisonSearch } =
	ccsComparisonSearchSlice.actions;
export default ccsComparisonSearchSlice.reducer;
