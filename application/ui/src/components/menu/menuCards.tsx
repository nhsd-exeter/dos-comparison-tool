import { Card } from "nhsuk-react-components";
import { useNavigate } from "react-router-dom";
import { CCS_COMPARISON_SEARCH_PATH } from "../../constants/paths";

const MenuCards = (): JSX.Element => {
	const navigate = useNavigate();
	return (
		<Card.Group>
			<Card.GroupItem width="one-half">
				<Card id="ccsSearchCard" clickable>
					<Card.Content>
						<Card.Heading id="ccsSearchCardHeading" className="nhsuk-heading-m">
							<Card.Link
								onClick={() =>
									navigate(CCS_COMPARISON_SEARCH_PATH, { replace: true })
								}
							>
								Check Capacity Summary Search
							</Card.Link>
						</Card.Heading>
						<Card.Description id="ccsSearchCardDescription">
							Compare results from multiple Check Capacity Summary (CCS)
							searches across Directory of Services environments
						</Card.Description>
					</Card.Content>
				</Card>
			</Card.GroupItem>
		</Card.Group>
	);
};

export default MenuCards;
