import { Container } from "nhsuk-react-components";
import React, { Fragment } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

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
