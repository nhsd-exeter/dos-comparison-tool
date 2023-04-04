import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";
import { ApiEndpoint } from "../config";
// import { CCSSearchResponse } from "../interfaces/dtos";

export interface CCSComparisonSearchState {
	loading: "pending" | "fulfilled" | "rejected" | "idle";
	searchOne: Array<string>;
	searchTwo: Array<string>;
	successStatus: boolean;
	error?: string;
}

export const initialState = {
	successStatus: false,
	loading: "idle",
} as CCSComparisonSearchState;

export const search = createAsyncThunk(
	"ccsComparisonSearch/search",
	async (authToken: string) => {
		axios.defaults.headers.common["Authorization"] = authToken;
		axios.defaults.headers.common["Content-Type"] =
			"application/json;charset=utf-8";
		const response = await axios.post(ApiEndpoint + "/search", {
			search_one: {
				age: 2,
				age_format: "Years",
				disposition: 9001,
				symptom_group: 1011,
				symptom_discriminator_list: [4003],
				gender: "M",
				search_environment: "test",
			},
			search_two: {
				age: 2,
				age_format: "Years",
				disposition: 9001,
				symptom_group: 1011,
				symptom_discriminator_list: [4003],
				gender: "M",
				search_environment: "test",
			},
		});
		return response.data;
	}
);

export const ccsComparisonSearch = createSlice({
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

export default ccsComparisonSearch.reducer;
