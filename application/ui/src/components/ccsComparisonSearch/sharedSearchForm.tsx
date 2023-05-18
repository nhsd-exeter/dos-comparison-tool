import axios from "axios";
import { Hint, Input, Select } from "nhsuk-react-components";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
	DISPOSITION_DROP_DOWN,
	POSTCODE_INPUT,
	SYMPTOM_DISCRIMINATOR_DROP_DOWN,
	SYMPTOM_GROUP_DROP_DOWN,
} from "../../constants/componentIds";
import {
	Disposition,
	SymptomDiscriminator,
	SymptomGroup,
} from "../../interfaces/dtos";
import { selectToken } from "../../slices/authSlice";
import { DataLambda, SetupDefaultHeaders } from "../../utils/api";
import { SexDropDown } from "./dropDowns";

function SharedSearchForm() {
	const idToken = useAppSelector(selectToken) as string;
	const [symptomGroups, setSymptomGroups] = useState([
		{
			SymptomGroupId: "0",
			SymptomGroupName: "Loading Symptom Groups",
		},
	]);
	const [symptomDiscriminators, setSymptomDiscriminators] = useState([
		{
			SymptomDiscriminatorId: "0",
			SymptomDiscriminatorName: "Loading Symptom Discriminators",
		},
	]);
	const [dispositions, setDispositions] = useState([
		{
			DispositionCode: "0",
			DispositionId: "0",
			DispositionName: "Loading Dispositions",
		},
	] as Disposition[]);

	const fetchSymptomGroups = async () => {
		SetupDefaultHeaders(idToken);
		await axios
			.post(`${DataLambda}/symptom_groups`, {}, { timeout: 10000 })
			.then((response) => setSymptomGroups(response.data as SymptomGroup[]))
			.catch((error) => error);
	};

	const fetchDispositions = async () => {
		SetupDefaultHeaders(idToken);
		await axios
			.post(`${DataLambda}/dispositions`, {}, { timeout: 10000 })
			.then((response) => setDispositions(response.data as Disposition[]))
			.catch((error) => error);
	};

	const handleSymptomGroupChange = async (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedSymptomGroupId = parseInt(event.target.value);
		await fetchSymptomDiscriminators(selectedSymptomGroupId);
	};

	const fetchSymptomDiscriminators = async (symptomGroupId: number) => {
		SetupDefaultHeaders(idToken);
		await axios
			.post(
				`${DataLambda}/symptom_discriminators/${symptomGroupId}`,
				{},
				{ timeout: 10000 }
			)
			.then((response) =>
				setSymptomDiscriminators(response.data as SymptomDiscriminator[])
			)
			.catch((error) => error);
	};

	useEffect(() => {
		(async () => {
			await fetchSymptomGroups();
			await fetchDispositions();
		})();
	}, []);

	const symptomGroupsDropDown = (
		<Select
			label="Symptom Group"
			id={SYMPTOM_GROUP_DROP_DOWN}
			onChange={handleSymptomGroupChange}
		>
			<Select.Option value="0">Select a Symptom Group</Select.Option>
			{GenerateSymptomGroupOptions(symptomGroups)}
		</Select>
	);

	const symptomDiscriminatorsDropDown = (
		<Select label="Symptom Discriminator" id={SYMPTOM_DISCRIMINATOR_DROP_DOWN}>
			<Select.Option value="0">Select a Symptom Discriminator</Select.Option>
			{GenerateSymptomDiscriminatorOptions(symptomDiscriminators)}
		</Select>
	);

	const dispositionsDropDown = (
		<Select label="Disposition" id={DISPOSITION_DROP_DOWN}>
			<Select.Option value="0">Select a Disposition</Select.Option>
			{GenerateDispositionOptions(dispositions)}
		</Select>
	);

	return (
		<div>
			<Hint>Select shared details for searches</Hint>
			<Input
				type="text"
				required
				autoComplete="off"
				label="Postcode"
				id={POSTCODE_INPUT}
				width="10"
			/>
			{symptomGroupsDropDown}
			{symptomDiscriminatorsDropDown}
			{dispositionsDropDown}
			<SexDropDown />
		</div>
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

export function GenerateSymptomDiscriminatorOptions(
	symptomDiscriminators: SymptomDiscriminator[]
) {
	return symptomDiscriminators.map((symptomDiscriminator) => (
		<Select.Option
			key={symptomDiscriminator.SymptomDiscriminatorId}
			value={symptomDiscriminator.SymptomDiscriminatorId}
		>
			{symptomDiscriminator.SymptomDiscriminatorName}
		</Select.Option>
	));
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

export default SharedSearchForm;
