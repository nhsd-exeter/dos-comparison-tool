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
			<Input
				type="text"
				required
				autoComplete="off"
				label="Postcode"
				width="10"
			/>
			<Input
				type="text"
				required
				autoComplete="off"
				label="Surgery Code"
				width="10"
			/>
			<SymptomGroupDropDown />
			<SymptomDiscriminatorDropDown />
			<DispositionDropDown />
			<SexDropDown />
		</Form>
	);
}

export default SharedSearchForm;
