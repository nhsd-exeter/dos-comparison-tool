import { SummaryList } from "nhsuk-react-components";
import "./resultCard.css";

type ResultsCardProps = {
	serviceName: string;
	distance: string;
	serviceType: string;
	serviceUid: string;
	serviceAddress: string;
	equalResults: boolean;
};

function ResultsCard(Props: ResultsCardProps) {
	const ranking_colour_class = Props.equalResults
		? "results-card__ranking__green"
		: "results-card__ranking__amber";
	const ranking_text = Props.equalResults
		? "Service/Ranking Same"
		: "Service/Ranking Different";

	return (
		<div className="results_card">
			<div className="results-card__header">
				<h3 className="results-card__header__title">{Props.serviceName}</h3>
			</div>
			<SummaryList className="results-card__summary_list">
				<SummaryList.Row className={ranking_colour_class}>
					<SummaryList.Key>Ranking</SummaryList.Key>
					<SummaryList.Value>{ranking_text}</SummaryList.Value>
				</SummaryList.Row>
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
