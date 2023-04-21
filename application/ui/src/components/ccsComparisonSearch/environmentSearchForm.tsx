import { Hint, Input, Label } from "nhsuk-react-components";
import { AGE_INPUT_SUFFIX } from "../../constants/componentIds";
import {
	AgeUnitsDropDown,
	EnvironmentDropDown,
	RoleDropDown,
} from "./dropDowns";
import "./search.css";

function EnvironmentSearchForm({ searchName }: { searchName: string }) {
	return (
		<div>
			<Hint>Select details for this specific search</Hint>
			<EnvironmentDropDown searchName={searchName} />
			<RoleDropDown searchName={searchName} />
			<Label>Age</Label>
			<div className={"AgeRow"}>
				<Input
					autoComplete="off"
					id={`${searchName}${AGE_INPUT_SUFFIX}`}
					required
					type="text"
					width="10"
				/>
				<AgeUnitsDropDown searchName={searchName} />
			</div>
		</div>
	);
}

export default EnvironmentSearchForm;
