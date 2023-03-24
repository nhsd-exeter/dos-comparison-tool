// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import api from "../utils/api";

// export interface SearchState {
// 	results: null | [];
// }

// export const initialState = { results: [] } as SearchState;

// export const runCompareSearches = createAsyncThunk(
// 	"compareSearches/runCompareSearches",
// 	async (initialPost: void) => {
// 		const response = await api.post("test", initialPost);
// 		return response.data;
// 	}
// );

// export const compareSearches = createSlice({
// 	name: "compareSearches",
// 	initialState,
// 	reducers: {},
// 	extraReducers: (builder) => {
// 		builder.addCase(
// 			runCompareSearches.fulfilled,
// 			(state, action: PayloadAction<unknown, string>) => {
// 				state.results = action.payload;
// 			}
// 		);
// 	},
// });

// export default compareSearches.reducer;
