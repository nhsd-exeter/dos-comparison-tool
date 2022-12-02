import Layout from "../layout";
import { Button } from "nhsuk-react-components";
import { LOGIN_PATH } from "../../constants/paths";
import { selectLoggedIn } from "../../slices/authSlice";
import { useAppSelector } from "../../hooks";

const HomePage = () => {
	const loggedIn = useAppSelector(selectLoggedIn);

	return (
		<Layout>
			<div>
				<h1 id="pageTitle">DoS Comparison Tool</h1>
				<h3>Compare results from between NHS Directory of Services searches</h3>
				{renderNextStepButton(loggedIn)}
			</div>
		</Layout>
	);
};

function renderNextStepButton(launched: boolean | null) {
	const text = launched ? "Start now" : "Log in";
	return <Button href={LOGIN_PATH}>{text}</Button>;
}

export default HomePage;
