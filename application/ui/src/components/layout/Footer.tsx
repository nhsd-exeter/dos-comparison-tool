import { Footer as NHSFooter } from "nhsuk-react-components";

const Footer = (): JSX.Element => {
	return (
		<NHSFooter>
			<NHSFooter.List>
				<NHSFooter.ListItem href="https://www.nhs.uk/nhs-sites/">
					NHS sites
				</NHSFooter.ListItem>
				<NHSFooter.ListItem href="https://www.nhs.uk/about-us/">
					About us
				</NHSFooter.ListItem>
				<NHSFooter.ListItem href="https://www.nhs.uk/contact-us/">
					Contact us
				</NHSFooter.ListItem>
				<NHSFooter.ListItem href="https://www.nhs.uk/about-us/sitemap/">
					Sitemap
				</NHSFooter.ListItem>
				<NHSFooter.ListItem href="https://www.nhs.uk/our-policies/">
					Our policies
				</NHSFooter.ListItem>
			</NHSFooter.List>
			<NHSFooter.Copyright>&copy; Crown copyright</NHSFooter.Copyright>
		</NHSFooter>
	);
};

export default Footer;
