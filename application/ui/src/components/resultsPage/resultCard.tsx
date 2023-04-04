import { SummaryList } from "nhsuk-react-components";
import "./results.css";

type ResultsCardProps = {
	serviceName: string;
	distance: string;
	serviceType: string;
	serviceUid: string;
	serviceAddress: string;
	equalResults: boolean;
};

function ResultsCard(Props: ResultsCardProps) {
	// const resultsIcon = Props.equalResults ? <Icons.Tick /> : <Icons.Cross />;

	return (
		<div className="results_card">
			<div className="results-card__header">
				<h3 className="results-card__header__title">{Props.serviceName}</h3>
				{/* <Fragment>{resultsIcon}</Fragment> */}
			</div>
			<SummaryList className="results-card__summary_list">
				<SummaryList.Row>
					<SummaryList.Key>Distance Away</SummaryList.Key>
					<SummaryList.Value>{Props.distance}</SummaryList.Value>
				</SummaryList.Row>
				<SummaryList.Row>
					<SummaryList.Key>Service Type</SummaryList.Key>
					<SummaryList.Value>{Props.serviceType}</SummaryList.Value>
				</SummaryList.Row>
				<SummaryList.Row>
					<SummaryList.Key>Service Uid</SummaryList.Key>
					<SummaryList.Value>{Props.serviceUid}</SummaryList.Value>
				</SummaryList.Row>
				<SummaryList.Row>
					<SummaryList.Key>Address</SummaryList.Key>
					<SummaryList.Value>{Props.serviceAddress}</SummaryList.Value>
				</SummaryList.Row>
			</SummaryList>
		</div>
	);
}

export default ResultsCard;
