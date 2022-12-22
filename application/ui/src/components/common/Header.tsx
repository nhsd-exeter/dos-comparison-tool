import { Header as NHSHeader } from "nhsuk-react-components";
import { useNavigate } from "react-router-dom";
import { HEADER_ID } from "../../constants/componentIds";
import { BASE_PATH } from "../../constants/paths";

function Header() {
	const navigate = useNavigate();
	return (
		<NHSHeader id={HEADER_ID}>
			<NHSHeader.Container>
				<NHSHeader.Logo
					onClick={() => navigate(BASE_PATH, { replace: true })}
				/>
				<NHSHeader.ServiceName
					onClick={() => navigate(BASE_PATH, { replace: true })}
				>
					DoS Comparison Tool
				</NHSHeader.ServiceName>
			</NHSHeader.Container>
		</NHSHeader>
	);
}

export default Header;
