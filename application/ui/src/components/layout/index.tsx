import Main from "./Main";
import Footer from "./Footer";
import Header from "./Header";
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
			<Main>
				<Container>{children}</Container>
			</Main>
			{!hideFooter && <Footer />}
		</Fragment>
	);
};

export default Layout;
