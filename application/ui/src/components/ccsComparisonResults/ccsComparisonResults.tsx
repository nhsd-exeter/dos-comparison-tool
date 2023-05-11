import { Col, Container, Label, Pagination, Row } from "nhsuk-react-components";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	CCS_COMPARISON_RESULTS_PAGE,
	PREVIOUS_BUTTON,
	RESULTS_TABLE,
} from "../../constants/componentIds";
import { CCS_COMPARISON_SEARCH_PATH } from "../../constants/paths";
import {
	resetCCSComparisonSearch,
	selectCCSAPIResponseSuccessStatus,
	selectCCSComparisonSearchOne,
	selectCCSComparisonSearchOneEnvironment,
	selectCCSComparisonSearchTwo,
	selectCCSComparisonSearchTwoEnvironment,
	selectError,
} from "../../slices/ccsComparisonSearchSlice";
import { ErrorBox, Layout } from "../common";
import ResultsCard from "./resultCard";

function CCSComparisonResults() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const error = useAppSelector(selectError);
	const requestSuccess = useAppSelector(selectCCSAPIResponseSuccessStatus);
	const searchOne = useAppSelector(selectCCSComparisonSearchOne);
	const searchTwo = useAppSelector(selectCCSComparisonSearchTwo);
	const searchOneEnvironment = useAppSelector(
		selectCCSComparisonSearchOneEnvironment
	);
	const searchTwoEnvironment = useAppSelector(
		selectCCSComparisonSearchTwoEnvironment
	);

	const handleResultsFromSearch = (search: string[]) => {
		const ResultsListOne: JSX.Element[] = [];
		search?.map((searchResult: string) => {
			const searchResultObject = Object(searchResult);
			ResultsListOne.push(
				<ResultsCard
					key={searchResultObject.uid}
					serviceName={searchResultObject.name}
					serviceType={searchResultObject.service_type}
					serviceUid={searchResultObject.uid}
					serviceAddress={searchResultObject.address}
					distance={searchResultObject.distance}
					equalResults={searchResultObject.equal_results}
				/>
			);
		});
		return ResultsListOne;
	};

	const resultsPage = (
		<div>
			<Container id={RESULTS_TABLE}>
				<Row>
					<Col width="one-half" label="left-column">
						<h2>Search 1 - {searchOneEnvironment}</h2>
						{handleResultsFromSearch(searchOne)}
					</Col>
					<Col width="one-half" label="right-column">
						<h2>Search 2 - {searchTwoEnvironment}</h2>
						{handleResultsFromSearch(searchTwo)}
					</Col>
				</Row>
			</Container>
		</div>
	);

	const pageLoading = (
		<div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Oval
					height={80}
					width={80}
					color="#005eb8"
					secondaryColor="#005eb8"
					visible={true}
					ariaLabel="oval-loading"
					strokeWidth={5}
					strokeWidthSecondary={4}
				/>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Label size="l">Loading Results...</Label>
			</div>
		</div>
	);

	const searchError = error ? ErrorBox(error, "Search Failed") : null;

	return (
		<Layout>
			<div id={CCS_COMPARISON_RESULTS_PAGE}>
				<h1>Search Results</h1>
				{searchError}
				{!searchError ? (requestSuccess ? resultsPage : pageLoading) : null}
			</div>
			<Pagination id={PREVIOUS_BUTTON}>
				<Pagination.Link
					previous
					onClick={() => {
						dispatch(resetCCSComparisonSearch());
						navigate(CCS_COMPARISON_SEARCH_PATH, { replace: true });
					}}
				>
					Search
				</Pagination.Link>
			</Pagination>
		</Layout>
	);
}

export default CCSComparisonResults;
