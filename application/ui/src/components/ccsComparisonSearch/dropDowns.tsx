import { Select } from "nhsuk-react-components";
import {
	AGE_UNITS_DROP_DOWN_SUFFIX,
	ENVIRONMENT_DROP_DOWN_SUFFIX,
	ROLE_DROP_DOWN_SUFFIX,
	SEX_DROP_DOWN,
} from "../../constants/componentIds";
import { Role } from "../../interfaces/dtos";

/**
 * The sex drop down component.
 * @returns The sex drop down component.
 */
export function SexDropDown() {
	return (
		<Select label="Sex" id={SEX_DROP_DOWN}>
			<Select.Option value="I">Unknown</Select.Option>
			<Select.Option value="M">Male</Select.Option>
			<Select.Option value="F">Female</Select.Option>
		</Select>
	);
}

/**
 * The age units drop down component.
 * @param root0 - The props.
 * @param root0.searchName - The name of the search.
 * @returns The age units drop down component.
 */
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

/**
 * Generates the role options.
 * @param root0 - The props.
 * @param root0.searchName - The name of the search.
 * @returns The role options.
 */
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

/**
 * The role drop down component.
 * @param root0 - The props.
 * @param root0.searchName - The name of the search.
 * @param root0.roles - The roles.
 * @returns The role drop down component.
 */
export function RoleDropDown({
	searchName,
	roles,
}: {
	searchName: string;
	roles: Role[];
}) {
	return (
		<Select label="Role" id={`${searchName}${ROLE_DROP_DOWN_SUFFIX}`}>
			<Select.Option value="0">Select a Role</Select.Option>
			{GenerateRoleOptions(roles)}
		</Select>
	);
}

/**
 * Generates the role options.
 * @param roles - The roles.
 * @returns The role options.
 */
export function GenerateRoleOptions(roles: Role[]) {
	return roles.map((role) => (
		<Select.Option key={role.RoleUserName} value={role.RoleUserName}>
			{role.ReferralRoleName}
		</Select.Option>
	));
}
