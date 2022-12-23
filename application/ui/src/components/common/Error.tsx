import { ErrorSummary } from "nhsuk-react-components";

const Error = (message: string, title = "There is a problem"): JSX.Element => {
	return (
		<ErrorSummary
			aria-labelledby="error-summary-title"
			role="alert"
			tabIndex={-1}
		>
			<ErrorSummary.Title id="error-summary-title">{title}</ErrorSummary.Title>
			<ErrorSummary.Body>{message}</ErrorSummary.Body>
		</ErrorSummary>
	);
};

export default Error;
