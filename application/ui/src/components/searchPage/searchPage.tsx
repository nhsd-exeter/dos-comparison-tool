import { Button, Container, Form } from "nhsuk-react-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectToken } from "../../slices/authSlice";
import { search } from "../../slices/ccsComparisonSearchSlice";
import { Layout } from "../common";
import SearchForm from "./searchForm";
import SharedSearchForm from "./sharedSearchForm";

function SearchPage() {
	const dispatch = useAppDispatch();
	const idToken = useAppSelector(selectToken) as string;
	const navigate = useNavigate();

	const handleSearchForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		navigate("/search-results");
		await dispatch(search(idToken));
	};

	return (
		<Layout>
			<Container>
				<div>
					<h1>CCS Comparison Search</h1>
					<p>Make a search to compare results from multiple environments</p>
				</div>
				<Form role="form" onSubmit={handleSearchForm}>
					<h2>Search Details</h2>
					<SharedSearchForm />
					<h2>Search 1 Details</h2>
					<SearchForm />
					<h2>Search 2 Details</h2>
					<SearchForm />
					<br />
					<Button>{"Search"}</Button>
				</Form>
			</Container>
		</Layout>
	);
}

export default SearchPage;
