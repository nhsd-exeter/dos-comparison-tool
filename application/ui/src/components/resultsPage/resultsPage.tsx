import { Col, Container, Pagination, Row } from "nhsuk-react-components";
import { useNavigate } from "react-router-dom";
import { SEARCH_PATH } from "../../constants/paths";
import { Layout } from "../common";
import ResultsCard from "./resultCard";

function ResultsPage() {
	const navigate = useNavigate();
	return (
		<Layout>
			<h1>Search Results</h1>
			<div>
				<Container>
					<Row>
						<Col width="one-half" label="left-column">
							<h2>Search 1 - UAT1</h2>
							<ResultsCard
								serviceName="Boots Pharmacy - Taunton"
								serviceType="Emergency Department (ED) Catch-All"
								serviceUid="123456789"
								serviceAddress="MPH Emergency Department, Parkfield Drive, Taunton, Somerset, TA15DA"
								distance="1.2 miles"
								equalResults={true}
							/>
						</Col>
						<Col width="one-half" label="right-column">
							<h2>Search 2 - Live</h2>
							<ResultsCard
								serviceName="Boots Pharmacy - Taunton"
								serviceType="Emergency Department (ED) Catch-All"
								serviceUid="123456789"
								serviceAddress="MPH Emergency Department, Parkfield Drive, Taunton, Somerset, TA15DA"
								distance="1.2 miles"
								equalResults={true}
							/>
							<ResultsCard
								serviceName="Boots Pharmacy - Taunton"
								serviceType="Emergency Department (ED) Catch-All"
								serviceUid="123456789"
								serviceAddress="MPH Emergency Department, Parkfield Drive, Taunton, Somerset, TA15DA"
								distance="1.2 miles"
								equalResults={false}
							/>
							<ResultsCard
								serviceName="Boots Pharmacy - Taunton"
								serviceType="Emergency Department (ED) Catch-All"
								serviceUid="123456789"
								serviceAddress="MPH Emergency Department, Parkfield Drive, Taunton, Somerset, TA15DA"
								distance="1.2 miles"
								equalResults={false}
							/>
						</Col>
					</Row>
				</Container>
				<Pagination>
					<Pagination.Link
						previous
						onClick={() => navigate(SEARCH_PATH, { replace: true })}
					>
						Search 2
					</Pagination.Link>
				</Pagination>
			</div>
		</Layout>
	);
}

export default ResultsPage;
