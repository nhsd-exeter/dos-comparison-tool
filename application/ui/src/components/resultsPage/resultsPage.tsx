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
								serviceType="Pharmacy"
								serviceUid="123456789"
								serviceAddress="64-65 High St: Taunton: Somerset: TA1 3PT"
								distance="1.2 miles"
								equalResults={true}
							/>
							<ResultsCard
								serviceName="Superdrug Pharmacy - Taunton"
								serviceType="Pharmacy"
								serviceUid="123456781"
								serviceAddress="1-10 Paul Street &, 9 Cheapside, Taunton TA1 3PF"
								distance="1.8 miles"
								equalResults={true}
							/>
							<ResultsCard
								serviceName="JP Pharmacy - Taunton"
								serviceType="Pharmacy"
								serviceUid="123456782"
								serviceAddress="High St: Taunton: Somerset: TA1 3PT"
								distance="2.0 miles"
								equalResults={false}
							/>
						</Col>
						<Col width="one-half" label="right-column">
							<h2>Search 2 - Live</h2>
							<ResultsCard
								serviceName="Boots Pharmacy - Taunton"
								serviceType="Pharmacy"
								serviceUid="123456789"
								serviceAddress="64-65 High St: Taunton: Somerset: TA1 3PT"
								distance="1.2 miles"
								equalResults={true}
							/>
							<ResultsCard
								serviceName="Superdrug Pharmacy - Taunton"
								serviceType="Pharmacy"
								serviceUid="123456781"
								serviceAddress="1-10 Paul Street &, 9 Cheapside, Taunton TA1 3PF"
								distance="1.8 miles"
								equalResults={true}
							/>
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
		</Layout>
	);
}

export default ResultsPage;
