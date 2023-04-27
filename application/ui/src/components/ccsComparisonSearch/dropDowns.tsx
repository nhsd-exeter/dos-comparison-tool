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

export function SymptomGroupDropDown() {
	return (
		<Select label="Symptom Group" id={SYMPTOM_GROUP_DROP_DOWN}>
			<Select.Option value="1004">Abdominal Pain</Select.Option>
			<Select.Option value="1004">Acne, Spots and Pimples</Select.Option>
			<Select.Option value="1004">Arm, Pain or Swelling</Select.Option>
		</Select>
	);
}

export function SymptomDiscriminatorDropDown() {
	return (
		<Select label="Symptom Discriminator" id={SYMPTOM_DISCRIMINATOR_DROP_DOWN}>
			<Select.Option value="4153">AMB Bleeding, significant</Select.Option>
			<Select.Option value="4153">AMB Bleeding</Select.Option>
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
			<Select.Option value="Regression">Regression</Select.Option>
			<Select.Option value="RegressionDI">Regression DI</Select.Option>
			<Select.Option value="RegressionSF">Regression SF</Select.Option>
		</Select>
	);
}

export function RoleDropDown({ searchName }: { searchName: string }) {
	return (
		<Select label="Role" id={`${searchName}${ROLE_DROP_DOWN_SUFFIX}`}>
			<Select.Option value="TTOOL_IOW_WS">111 Telephony</Select.Option>
			<Select.Option value="TTOOL_IOW_WS">Digital Referral</Select.Option>
			<Select.Option value="TTOOL_IOW_WS">999</Select.Option>
			<Select.Option value="TTOOL_IOW_WS">ED Streaming Referral</Select.Option>
			<Select.Option value="TTOOL_IOW_WS">CAS Referral</Select.Option>
			<Select.Option value="TTOOL_IOW_WS">111 Telephony DHU</Select.Option>
			<Select.Option value="TTOOL_IOW_WS">111 Telephony IOW</Select.Option>
			<Select.Option value="TTOOL_IOW_WS">111 Telephony LAS</Select.Option>
			<Select.Option value="TTOOL_IOW_WS">111 Telephony NWAS</Select.Option>
			<Select.Option value="TTOOL_IOW_WS">111 Telephony WMAS</Select.Option>
			<Select.Option value="TTOOL_IOW_WS">111 Telephony SCAS</Select.Option>
		</Select>
	);
}
