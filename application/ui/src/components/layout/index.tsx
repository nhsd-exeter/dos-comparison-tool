import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import React, { Fragment } from 'react';
import { Container } from 'nhsuk-react-components';

type Props = {
	children: React.ReactNode;
	hideFooter?: Boolean;
};

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
