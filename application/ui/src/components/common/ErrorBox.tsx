import { ErrorSummary } from "nhsuk-react-components";

const ErrorBox = (
	message: string,
	title = "There is a problem",
	id = "error-summary"
): JSX.Element => {
	return (
		<ErrorSummary
			id={id}
			aria-labelledby="error-summary-title"
			role="alert"
			tabIndex={-1}
		>
			<ErrorSummary.Title id="error-summary-title">{title}</ErrorSummary.Title>
			<ErrorSummary.Body>{message}</ErrorSummary.Body>
		</ErrorSummary>
	);
};

export default ErrorBox;
