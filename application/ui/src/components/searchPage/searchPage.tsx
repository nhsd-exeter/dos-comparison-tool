// import { useAppDispatch } from "../../app/hooks";
import { Layout } from "../common";
import SearchForm from "./searchForm";
import SharedSearchForm from "./sharedSearchForm";

function SearchPage() {
	// const dispatch = useAppDispatch();

	// const handleSearchForm = async (event: React.FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();
	// 	await dispatch(runCompareSearches());
	// };

	return (
		<Layout>
			<div>
				<h1>Compare CCS Search</h1>
				<p>Make a search to compare results from multiple environments</p>
			</div>

			<h2>Search Details</h2>
			<SharedSearchForm />
			<h2>Search 1 Details</h2>
			<SearchForm />
			<h2>Search 2 Details</h2>
			<SearchForm />
		</Layout>
	);
}

export default SearchPage;
