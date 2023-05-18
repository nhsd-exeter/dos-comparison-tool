import { Select } from "nhsuk-react-components";
import {
	AGE_UNITS_DROP_DOWN_SUFFIX,
	ENVIRONMENT_DROP_DOWN_SUFFIX,
	ROLE_DROP_DOWN_SUFFIX,
	SEX_DROP_DOWN,
} from "../../constants/componentIds";
import { Role } from "../../interfaces/dtos";

export function SexDropDown() {
	return (
		<Select label="Sex" id={SEX_DROP_DOWN}>
			<Select.Option value="I">Unknown</Select.Option>
			<Select.Option value="M">Male</Select.Option>
			<Select.Option value="F">Female</Select.Option>
		</Select>
	);
}

export function AgeUnitsDropDown({ searchName }: { searchName: string }) {
	return (
		<Select
			className="AgeUnits"
			id={`${searchName}${AGE_UNITS_DROP_DOWN_SUFFIX}`}
		>
			<Select.Option value="Years">Years</Select.Option>
			<Select.Option value="Months">Months</Select.Option>
			<Select.Option value="Days">Days</Select.Option>
		</Select>
	);
}

export function EnvironmentDropDown({ searchName }: { searchName: string }) {
	return (
		<Select
			label="Environment"
			id={`${searchName}${ENVIRONMENT_DROP_DOWN_SUFFIX}`}
		>
			<Select.Option value="Regression">Regression</Select.Option>
			<Select.Option value="RegressionDI">Regression DI</Select.Option>
			<Select.Option value="RegressionSF">Regression SF</Select.Option>
		</Select>
	);
}

export function RoleDropDown({
	searchName,
	roles,
}: {
	searchName: string;
	roles: Role[];
}) {
	return (
		<Select label="Role" id={`${searchName}${ROLE_DROP_DOWN_SUFFIX}`}>
			<Select.Option value="0"></Select.Option>
			{GenerateRoleOptions(roles)}
		</Select>
	);
}

export function GenerateRoleOptions(roles: Role[]) {
	return roles.map((role) => (
		<Select.Option key={role.RoleUserName} value={role.RoleUserName}>
			{role.ReferralRoleName}
		</Select.Option>
	));
}
