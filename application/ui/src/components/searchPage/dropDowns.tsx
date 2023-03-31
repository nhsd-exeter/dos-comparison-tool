import { Select } from "nhsuk-react-components";

export function SymptomGroupDropDown() {
	return (
		<Select label="Symptom Group">
			<Select.Option value="Abdominal Pain">Abdominal Pain</Select.Option>
			<Select.Option value="Acne, Spots and Pimples">
				Acne, Spots and Pimples
			</Select.Option>
			<Select.Option value="Arm, Pain or Swelling">
				Arm, Pain or Swelling
			</Select.Option>
		</Select>
	);
}

export function SymptomDiscriminatorDropDown() {
	return (
		<Select label="Disposition">
			<Select.Option value="1">Option 1</Select.Option>
			<Select.Option value="2">Option 2</Select.Option>
			<Select.Option value="3">Option 3</Select.Option>
		</Select>
	);
}

export function DispositionDropDown() {
	return (
		<Select label="Symptom Discriminator">
			<Select.Option value="To contact a Primary Care Service with 2 hours">
				To contact a Primary Care Service with 2 hours
			</Select.Option>
			<Select.Option value="To contact a Primary Care Service with 6 hours">
				To contact a Primary Care Service with 6 hours
			</Select.Option>
			<Select.Option value="To contact a Primary Care Service with 12 hours">
				To contact a Primary Care Service with 12 hours
			</Select.Option>
		</Select>
	);
}

export function SexDropDown() {
	return (
		<Select label="Sex">
			<Select.Option value="Male">Male</Select.Option>
			<Select.Option value="Female">Female</Select.Option>
			<Select.Option value="Unknown">Unknown</Select.Option>
		</Select>
	);
}

export function RoleDropDown() {
	return (
		<Select label="Role">
			<Select.Option value="111 Telephony">111 Telephony</Select.Option>
			<Select.Option value="Digital Referral">Digital Referral</Select.Option>
			<Select.Option value="999">999</Select.Option>
		</Select>
	);
}
export function AgeUnitsDropDown() {
	return (
		<Select>
			<Select.Option value="Years">Years</Select.Option>
			<Select.Option value="Months">Months</Select.Option>
			<Select.Option value="Days">Days</Select.Option>
		</Select>
	);
}

export function EnvironmentDropDown() {
	return (
		<Select label="Environment">
			<Select.Option value="Live">Cloud - Live</Select.Option>
			<Select.Option value="UserTest">Cloud - UserTest</Select.Option>
			<Select.Option value="UAT1">Cloud - UAT1</Select.Option>
			<Select.Option value="UAT2">Cloud - UAT2</Select.Option>
		</Select>
	);
}
