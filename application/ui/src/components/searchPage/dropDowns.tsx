import { Select } from "nhsuk-react-components";
import {
	AGE_UNITS_DROP_DOWN_SUFFIX,
	DISPOSITION_DROP_DOWN,
	ENVIRONMENT_DROP_DOWN_SUFFIX,
	SEX_DROP_DOWN,
	SYMPTOM_DISCRIMINATOR_DROP_DOWN,
	SYMPTOM_GROUP_DROP_DOWN,
} from "../../constants/componentIds";

export function SymptomGroupDropDown() {
	return (
		<Select label="Symptom Group" id={SYMPTOM_GROUP_DROP_DOWN}>
			<Select.Option value="1011">Abdominal Pain</Select.Option>
			<Select.Option value="1011">Acne, Spots and Pimples</Select.Option>
			<Select.Option value="1011">Arm, Pain or Swelling</Select.Option>
		</Select>
	);
}

export function SymptomDiscriminatorDropDown() {
	return (
		<Select label="Symptom Discriminator" id={SYMPTOM_DISCRIMINATOR_DROP_DOWN}>
			<Select.Option value="4003">Option 1</Select.Option>
			<Select.Option value="4003">Option 2</Select.Option>
			<Select.Option value="4003">Option 3</Select.Option>
		</Select>
	);
}

export function DispositionDropDown() {
	return (
		<Select label="Disposition" id={DISPOSITION_DROP_DOWN}>
			<Select.Option value="9001">
				To contact a Primary Care Service with 2 hours
			</Select.Option>
			<Select.Option value="9001">
				To contact a Primary Care Service with 6 hours
			</Select.Option>
			<Select.Option value="9001">
				To contact a Primary Care Service with 12 hours
			</Select.Option>
		</Select>
	);
}

export function SexDropDown() {
	return (
		<Select label="Sex" id={SEX_DROP_DOWN}>
			<Select.Option value="M">Male</Select.Option>
			<Select.Option value="F">Female</Select.Option>
			<Select.Option value="I">Unknown</Select.Option>
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
			<Select.Option value="Live">Cloud - Live</Select.Option>
			<Select.Option value="UserTest">Cloud - UserTest</Select.Option>
			<Select.Option value="UAT1">Cloud - UAT1</Select.Option>
			<Select.Option value="UAT2">Cloud - UAT2</Select.Option>
		</Select>
	);
}
