import Footer from "./Footer";
import Header from "./Header";
import Body from "./Main";
import React, { Fragment } from "react";
import { Container } from "nhsuk-react-components";

interface Props {
	children: React.ReactNode;
	hideFooter?: boolean;
}

const Layout = ({ children, hideFooter }: Props) => {
	return (
		<Fragment>
			<Header />
			<Body>
				<Container>{children}</Container>
			</Body>
			{!hideFooter && <Footer />}
		</Fragment>
	);
};

export default Layout;
