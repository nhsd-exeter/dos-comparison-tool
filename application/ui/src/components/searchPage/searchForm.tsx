import { Form, Input, Label } from "nhsuk-react-components";
import { AgeUnitsDropDown, RoleDropDown } from "./dropDowns";
import "./search.css";

function SearchForm() {
	const handleSearchForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<Form role="form" onSubmit={handleSearchForm}>
			<RoleDropDown />
			<Label>Age</Label>
			<div className="age-row">
				<Input type="text" required autoComplete="off" width="10" />
				<AgeUnitsDropDown />
			</div>
		</Form>
	);
}

export default SearchForm;
