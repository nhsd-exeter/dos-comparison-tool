import { Select } from "nhsuk-react-components";
import {
	AGE_UNITS_DROP_DOWN_SUFFIX,
	DISPOSITION_DROP_DOWN,
	ENVIRONMENT_DROP_DOWN_SUFFIX,
	ROLE_DROP_DOWN_SUFFIX,
	SEX_DROP_DOWN,
	SYMPTOM_DISCRIMINATOR_DROP_DOWN,
	SYMPTOM_GROUP_DROP_DOWN,
} from "../../constants/componentIds";
import { Disposition, Role, SymptomGroup } from "../../interfaces/dtos";

export function SymptomGroupDropDown({
	symptomGroups,
}: {
	symptomGroups: SymptomGroup[];
}) {
	return (
		<Select label="Symptom Group" id={SYMPTOM_GROUP_DROP_DOWN}>
			<Select.Option value="0"></Select.Option>
			{GenerateSymptomGroupOptions(symptomGroups)}
		</Select>
	);
}

export function GenerateSymptomGroupOptions(symptomGroups: SymptomGroup[]) {
	return symptomGroups.map((symptomGroup) => (
		<Select.Option
			key={symptomGroup.SymptomGroupName}
			value={symptomGroup.SymptomGroupId}
		>
			{symptomGroup.SymptomGroupName}
		</Select.Option>
	));
}

export function SymptomDiscriminatorDropDown() {
	return (
		<Select label="Symptom Discriminator" id={SYMPTOM_DISCRIMINATOR_DROP_DOWN}>
			<Select.Option value="0"></Select.Option>
			<Select.Option value="4003">AMB Bleeding, significant</Select.Option>
			<Select.Option value="4003">AMB Bleeding</Select.Option>
		</Select>
	);
}

export function DispositionDropDown({
	dispositions,
}: {
	dispositions: Disposition[];
}) {
	return (
		<Select label="Disposition" id={DISPOSITION_DROP_DOWN}>
			<Select.Option value="0"></Select.Option>
			{GenerateDispositionOptions(dispositions)}
		</Select>
	);
}

export function GenerateDispositionOptions(dispositions: Disposition[]) {
	return dispositions.map((disposition) => (
		<Select.Option
			key={disposition.DispositionCode}
			value={disposition.DispositionId}
		>
			{disposition.DispositionName}
		</Select.Option>
	));
}

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
