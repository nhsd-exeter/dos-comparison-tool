import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { ApiEndpoint } from "../config";

export interface CCSComparisonSearchState {
	loading?: "pending" | "fulfilled" | "rejected" | "idle";
	data?: any;
	error?: string;
}

export const initialState = {} as CCSComparisonSearchState;

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
		console.log(response.data);
		console.log(response.status);
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
				state.data = action.payload;
				state.loading = "idle";
			}
		});
		builder.addCase(search.rejected, (state, action) => {
			if (state.loading === "pending") {
				state.loading = "idle";
				state.error = "Error occurred";
				console.log(action.error.message);
				console.log(action.error.name);
			}
		});
	},
});

export default ccsComparisonSearch.reducer;
