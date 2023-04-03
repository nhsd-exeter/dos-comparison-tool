import { Input, Label } from "nhsuk-react-components";
import { AgeUnitsDropDown, RoleDropDown } from "./dropDowns";
import "./search.css";

function SearchForm() {
	return (
		<div>
			<RoleDropDown />
			<Label>Age</Label>
			<div className="age-row">
				<Input
					type="text"
					required
					autoComplete="off"
					width="10"
					className="AgeInput"
				/>
				<AgeUnitsDropDown />
			</div>
		</div>
	);
}

export default SearchForm;
