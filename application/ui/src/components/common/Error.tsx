import { ErrorSummary } from "nhsuk-react-components";

const Error = (): JSX.Element => {
	return (
		<ErrorSummary
			aria-labelledby="error-summary-title"
			role="alert"
			tabIndex={-1}
		>
			<ErrorSummary.Title id="error-summary-title">
				There is a problem
			</ErrorSummary.Title>
			<ErrorSummary.Body>
				<p>Optional description of the errors and how to correct them</p>
			</ErrorSummary.Body>
		</ErrorSummary>
	);
};

export default Error;
