import { Button } from "nhsuk-react-components";
import { useAppSelector } from "../../app/hooks";
import { LOGIN_PATH, MENU_PATH } from "../../constants/paths";
import { selectLoggedIn } from "../../slices/authSlice";
import Layout from "../common/Layout";

/**
 * The home page.
 * @returns A home page.
 */
const Home = () => {
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

/**
 * Renders the next step button.
 * @param launched - Whether the tool has been launched.
 * @returns A next step button.
 */
function renderNextStepButton(launched: boolean | null) {
	const text = launched ? "Start now" : "Log in";
	const path = launched ? MENU_PATH : LOGIN_PATH;
	return <Button href={path}>{text}</Button>;
}

export default Home;
