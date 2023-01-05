import { ActionLink } from "nhsuk-react-components";
import { useAppSelector } from "../../app/hooks";
import {
	AUTH_FORGOTTEN_PASSWORD_ACTION_LINK,
	AUTH_SIGN_UP_ACTION_LINK,
} from "../../constants/componentIds";
import { FORGOTTEN_PASSWORD_PATH, REGISTER_PATH } from "../../constants/paths";
import { selectError } from "../../slices/loginErrorSlice";
import { Layout } from "../common";
import LoginForm from "./loginForm";

function LoginPage(): JSX.Element {
	const error = useAppSelector(selectError);
	return (
		<Layout>
			<div>
				<h1>Login</h1>
				<p>Log in to the DoS Comparison Tool</p>
				{error ? error : null}
				<LoginForm />
				<ActionLink id={AUTH_SIGN_UP_ACTION_LINK} href={REGISTER_PATH}>
					Create an account
				</ActionLink>
				<ActionLink
					id={AUTH_FORGOTTEN_PASSWORD_ACTION_LINK}
					href={FORGOTTEN_PASSWORD_PATH}
				>
					Forgotten your password?
				</ActionLink>
			</div>
		</Layout>
	);
}

export default LoginPage;
