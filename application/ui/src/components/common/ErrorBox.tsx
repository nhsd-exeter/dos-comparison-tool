import { ErrorSummary } from "nhsuk-react-components";
import {
	ERROR_SUMMARY,
	ERROR_SUMMARY_TITLE,
	ERROR_SUMMARY_VALUE,
} from "../../constants/componentIds";

const ErrorBox = (
	message: string,
	title = "There is a problem",
	id = ERROR_SUMMARY
): React.JSX.Element => {
	return (
		<ErrorSummary id={id} role="alert" tabIndex={-1}>
			<ErrorSummary.Title id={ERROR_SUMMARY_TITLE}>{title}</ErrorSummary.Title>
			<ErrorSummary.Body id={ERROR_SUMMARY_VALUE}>{message}</ErrorSummary.Body>
		</ErrorSummary>
	);
};

export default ErrorBox;
