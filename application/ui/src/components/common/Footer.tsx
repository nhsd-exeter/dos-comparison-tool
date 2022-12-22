import { Footer as NHSFooter } from "nhsuk-react-components";
import { FOOTER_ID } from "../../constants/componentIds";
import { BASE_PATH } from "../../constants/paths";

const Footer = (): JSX.Element => {
	return (
		<NHSFooter id={FOOTER_ID}>
			<NHSFooter.List>
				<NHSFooter.ListItem href={BASE_PATH}>Homepage</NHSFooter.ListItem>
			</NHSFooter.List>
			<NHSFooter.Copyright>&copy; Crown copyright</NHSFooter.Copyright>
		</NHSFooter>
	);
};

export default Footer;
