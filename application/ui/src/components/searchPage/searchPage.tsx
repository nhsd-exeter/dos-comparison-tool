import { Button, Container, Form } from "nhsuk-react-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	AGE_INPUT_SUFFIX,
	AGE_UNITS_DROP_DOWN_SUFFIX,
	DISPOSITION_DROP_DOWN,
	ENVIRONMENT_DROP_DOWN_SUFFIX,
	SEARCH_ONE,
	SEARCH_TWO,
	SEX_DROP_DOWN,
	SYMPTOM_DISCRIMINATOR_DROP_DOWN,
	SYMPTOM_GROUP_DROP_DOWN,
} from "../../constants/componentIds";
import { CCSSearchData } from "../../interfaces/dtos";
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
		function getElementById(inputName: string) {
			const value = (document.getElementById(inputName) as HTMLInputElement)
				.value;
			return value;
		}
		event.preventDefault();
		navigate("/search-results");

		const disposition = getElementById(DISPOSITION_DROP_DOWN);
		const symptomGroup = getElementById(SYMPTOM_GROUP_DROP_DOWN);
		const symptomDiscriminator = getElementById(
			SYMPTOM_DISCRIMINATOR_DROP_DOWN
		);
		const sex = getElementById(SEX_DROP_DOWN);

		const searchOneEnvironment = getElementById(
			`${SEARCH_ONE}${ENVIRONMENT_DROP_DOWN_SUFFIX}`
		);
		const searchOneAge = getElementById(`${SEARCH_ONE}${AGE_INPUT_SUFFIX}`);
		const searchOneAgeFormat = getElementById(
			`${SEARCH_ONE}${AGE_UNITS_DROP_DOWN_SUFFIX}`
		);

		const searchTwoEnvironment = getElementById(
			`${SEARCH_ONE}${ENVIRONMENT_DROP_DOWN_SUFFIX}`
		);
		const searchTwoAge = getElementById(`${SEARCH_TWO}${AGE_INPUT_SUFFIX}`);
		const searchTwoAgeFormat = getElementById(
			`${SEARCH_TWO}${AGE_UNITS_DROP_DOWN_SUFFIX}`
		);

		const searchData: CCSSearchData = {
			authToken: idToken,
			search_one: {
				age: parseInt(searchOneAge),
				age_format: searchOneAgeFormat,
				disposition: parseInt(disposition),
				symptom_group: parseInt(symptomGroup),
				symptom_discriminator_list: [parseInt(symptomDiscriminator)],
				gender: sex,
				search_environment: searchOneEnvironment,
			},
			search_two: {
				age: parseInt(searchTwoAge),
				age_format: searchTwoAgeFormat,
				disposition: parseInt(disposition),
				symptom_group: parseInt(symptomGroup),
				symptom_discriminator_list: [parseInt(symptomDiscriminator)],
				gender: sex,
				search_environment: searchTwoEnvironment,
			},
		};
		await dispatch(search(searchData));
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
					<SearchForm searchName={SEARCH_ONE} />
					<h2>Search 2 Details</h2>
					<SearchForm searchName={SEARCH_TWO} />
					<br />
					<Button>{"Search"}</Button>
				</Form>
			</Container>
		</Layout>
	);
}

export default SearchPage;
