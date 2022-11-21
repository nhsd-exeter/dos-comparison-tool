import { Header as NhsHeader } from 'nhsuk-react-components';

const Header = () => {
	return (
		<NhsHeader transactional={true}>
			<NhsHeader.Container>
				<NhsHeader.Logo href="/" />
				<NhsHeader.ServiceName href="/">
					DoS Comparison Tool
				</NhsHeader.ServiceName>
				<NhsHeader.Content>
					<NhsHeader.MenuToggle />
				</NhsHeader.Content>
			</NhsHeader.Container>
		</NhsHeader>
	);
};

export default Header;
