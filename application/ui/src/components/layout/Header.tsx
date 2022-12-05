import { Header as NHSHeader } from "nhsuk-react-components";
import { HEADER_ID } from "../../constants/componentIds";
import { BASE_PATH } from "../../constants/paths";

const Header = (): JSX.Element => {
	return (
		<NHSHeader id={HEADER_ID}>
			<NHSHeader.Container>
				<NHSHeader.Logo href={BASE_PATH} />
				<NHSHeader.ServiceName href={BASE_PATH}>
					DoS Comparison Tool
				</NHSHeader.ServiceName>
			</NHSHeader.Container>
		</NHSHeader>
	);
};

export default Header;
