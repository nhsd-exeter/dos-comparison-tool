import { Form, Input } from "nhsuk-react-components";
import {
	DispositionDropDown,
	SexDropDown,
	SymptomDiscriminatorDropDown,
	SymptomGroupDropDown,
} from "./dropDowns";

function SharedSearchForm() {
	const handleSearchForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<Form role="form" onSubmit={handleSearchForm}>
			<Input type="text" required autoComplete="off" label="Postcode" />
			<Input type="text" required autoComplete="off" label="Surgery Code" />
			<SymptomGroupDropDown />
			<SymptomDiscriminatorDropDown />
			<DispositionDropDown />
			<SexDropDown />
		</Form>
	);
}

export default SharedSearchForm;
