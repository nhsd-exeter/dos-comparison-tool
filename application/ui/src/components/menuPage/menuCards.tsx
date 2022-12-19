import { Card } from "nhsuk-react-components";

const MenuCards = (): JSX.Element => {
	return (
		<Card.Group>
			<Card.GroupItem width="one-half">
				<Card id="ccsSearchCard" clickable>
					<Card.Content>
						<Card.Heading id="ccsSearchCardHeading" className="nhsuk-heading-m">
							<Card.Link href="/">
								{/* TODO: Add link to next page */}
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
