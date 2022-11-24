import { Footer as NHSFooter } from "nhsuk-react-components";

const Footer = (): JSX.Element => {
	return (
		<NHSFooter>
			<NHSFooter.List>
				<NHSFooter.ListItem href="/">Homepage</NHSFooter.ListItem>
			</NHSFooter.List>
			<NHSFooter.Copyright>&copy; Crown copyright</NHSFooter.Copyright>
		</NHSFooter>
	);
};

export default Footer;
