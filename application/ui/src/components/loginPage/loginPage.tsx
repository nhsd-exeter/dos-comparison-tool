import { ActionLink } from "nhsuk-react-components";
import { FORGOTTEN_PASSWORD_PATH, REGISTER_PATH } from "../../constants/paths";
import { useAppSelector } from "../../hooks";
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
				<ActionLink href={REGISTER_PATH}>Create an account</ActionLink>
				<ActionLink href={FORGOTTEN_PASSWORD_PATH}>
					Forgotten your password?
				</ActionLink>
			</div>
		</Layout>
	);
}

export default LoginPage;
