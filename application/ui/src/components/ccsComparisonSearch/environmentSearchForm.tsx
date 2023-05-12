import axios from "axios";
import { Hint, Input, Label } from "nhsuk-react-components";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { AGE_INPUT_SUFFIX } from "../../constants/componentIds";
import { Role } from "../../interfaces/dtos";
import { selectToken } from "../../slices/authSlice";
import { DataLambda, SetupDefaultHeaders } from "../../utils/api";
import {
	AgeUnitsDropDown,
	EnvironmentDropDown,
	RoleDropDown,
} from "./dropDowns";
import "./search.css";

function EnvironmentSearchForm({ searchName }: { searchName: string }) {
	const idToken = useAppSelector(selectToken) as string;
	const [roles, setsRoles] = useState([
		{
			RoleUserName: "",
			ReferralRoleName: "Role not found",
		},
	] as Role[]);

	const fetchRoles = async () => {
		try {
			SetupDefaultHeaders(idToken);
			const response = await axios.post(`${DataLambda}/roles`);
			setsRoles(response.data as Role[]);
			return {
				success: true,
				data: response.data as Role[],
			};
		} catch (error) {
			return;
		}
	};

	useEffect(() => {
		(async () => {
			await fetchRoles();
		})();
	}, []);

	return (
		<div>
			<Hint>Select details for this specific search</Hint>
			<EnvironmentDropDown searchName={searchName} />
			<RoleDropDown searchName={searchName} roles={roles} />
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
