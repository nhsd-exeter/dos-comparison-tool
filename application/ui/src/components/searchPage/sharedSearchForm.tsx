import { Input } from "nhsuk-react-components";
import {
	DispositionDropDown,
	SexDropDown,
	SymptomDiscriminatorDropDown,
	SymptomGroupDropDown,
} from "./dropDowns";

function SharedSearchForm() {
	return (
		<div>
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
		</div>
	);
}

export default SharedSearchForm;
