import { Form, Input } from "nhsuk-react-components";
import { AgeUnitsDropDown, RoleDropDown } from "./dropDowns";
function SearchForm() {
	const handleSearchForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<Form role="form" onSubmit={handleSearchForm}>
			<RoleDropDown />
			<Input type="text" required autoComplete="off" label="Age" width="10" />
			<AgeUnitsDropDown />
		</Form>
	);
}

export default SearchForm;
