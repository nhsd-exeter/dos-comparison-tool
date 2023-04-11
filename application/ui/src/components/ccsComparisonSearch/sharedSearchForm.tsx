import { Input } from "nhsuk-react-components";
import { POSTCODE_INPUT } from "../../constants/componentIds";
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
				id={POSTCODE_INPUT}
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
