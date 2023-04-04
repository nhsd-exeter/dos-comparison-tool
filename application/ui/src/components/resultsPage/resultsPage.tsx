import { Col, Container, Pagination, Row } from "nhsuk-react-components";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { SEARCH_PATH } from "../../constants/paths";
import {
	selectCCSAPIResponseSuccessStatus,
	selectCCSComparisonSearchOne,
	selectCCSComparisonSearchTwo,
} from "../../slices/ccsComparisonSearch";
import { Layout } from "../common";
import ResultsCard from "./resultCard";

function ResultsPage() {
	const navigate = useNavigate();
	const requestSuccess = useAppSelector(selectCCSAPIResponseSuccessStatus);
	const searchOne = useAppSelector(selectCCSComparisonSearchOne);
	const searchTwo = useAppSelector(selectCCSComparisonSearchTwo);

	const handleResultsFromSearch = (search: string[]) => {
		const ResultsListOne: JSX.Element[] = [];
		search?.map((searchResult: string) => {
			const searchResultObject = Object(searchResult);
			ResultsListOne.push(
				<ResultsCard
					serviceName={searchResultObject.name}
					serviceType={searchResultObject.service_type}
					serviceUid={searchResultObject.uid}
					serviceAddress={searchResultObject.address}
					distance={searchResultObject.distance}
					equalResults={true}
				/>
			);
		});
		return ResultsListOne;
	};

	const resultsPage = (
		<div>
			<h1>Search Results</h1>
			<div>
				<Container>
					<Row>
						<Col width="one-half" label="left-column">
							<h2>Search 1 - UAT1</h2>
							{handleResultsFromSearch(searchOne)}
						</Col>
						<Col width="one-half" label="right-column">
							<h2>Search 2 - Live</h2>
							{handleResultsFromSearch(searchTwo)}
						</Col>
					</Row>
				</Container>
				<Pagination>
					<Pagination.Link
						previous
						onClick={() => navigate(SEARCH_PATH, { replace: true })}
					>
						Search
					</Pagination.Link>
				</Pagination>
			</div>
		</div>
	);

	const pageLoading = (
		<Oval
			height={80}
			width={80}
			color="#005eb8"
			secondaryColor="#005eb8"
			visible={true}
			ariaLabel="oval-loading"
			strokeWidth={4}
			strokeWidthSecondary={3}
		/>
	);

	return <Layout>{requestSuccess ? resultsPage : pageLoading}</Layout>;
}

export default ResultsPage;
