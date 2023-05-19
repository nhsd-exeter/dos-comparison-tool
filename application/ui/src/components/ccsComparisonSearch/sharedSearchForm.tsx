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

/**
 * The shared search form component.
 * @returns A shared search form.
 */
export default function SharedSearchForm() {
	const idToken = useAppSelector(selectToken) as string;
	const [symptomGroups, setSymptomGroups] = useState([
		{
			SymptomGroupId: "0",
			SymptomGroupName: "Loading Symptom Groups",
		} as SymptomGroup,
	]);
	const [symptomDiscriminators, setSymptomDiscriminators] = useState([
		{
			SymptomDiscriminatorId: "0",
			SymptomDiscriminatorName: "Loading Symptom Discriminators",
		} as SymptomDiscriminator,
	]);
	const [dispositions, setDispositions] = useState([
		{
			DispositionCode: "0",
			DispositionId: "0",
			DispositionName: "Loading Dispositions",
		},
	] as Disposition[]);
	const [isSymptomGroupSelected, setIsSymptomGroupSelected] = useState(false);
	const [disableSymptomGroupDropDown, setDisableSymptomGroupDropDown] =
		useState(true);
	const [disableDispositionDropDown, setDisableDispositionDropDown] =
		useState(true);

	const fetchSymptomGroups = async () => {
		SetupDefaultHeaders(idToken);
		setDisableSymptomGroupDropDown(true);
		await axios
			.post(`${DataLambda}/symptom_groups`, {}, { timeout: 10000 })
			.then((response) => setSymptomGroups(response.data as SymptomGroup[]))
			.catch((error) => error);
		setDisableSymptomGroupDropDown(false);
	};

	const fetchDispositions = async () => {
		SetupDefaultHeaders(idToken);
		setDisableDispositionDropDown(true);
		await axios
			.post(`${DataLambda}/dispositions`, {}, { timeout: 10000 })
			.then((response) => setDispositions(response.data as Disposition[]))
			.catch((error) => error);
		setDisableDispositionDropDown(false);
	};

	const handleSymptomGroupChange = async (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedSymptomGroupId = parseInt(event.target.value);
		await fetchSymptomDiscriminators(selectedSymptomGroupId);
	};

	const fetchSymptomDiscriminators = async (symptomGroupId: number) => {
		SetupDefaultHeaders(idToken);
		setIsSymptomGroupSelected(false);
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
		setIsSymptomGroupSelected(true);
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
			disabled={disableSymptomGroupDropDown}
		>
			<Select.Option value="0">Select a Symptom Group</Select.Option>
			{GenerateSymptomGroupOptions(symptomGroups)}
		</Select>
	);

	const symptomDiscriminatorsDropDown = (
		<Select
			label="Symptom Discriminator"
			id={SYMPTOM_DISCRIMINATOR_DROP_DOWN}
			disabled={!isSymptomGroupSelected}
			hint="Select a Symptom Group to enable Symptom Discriminator"
		>
			{isSymptomGroupSelected ? (
				<Select.Option value="0">Select a Symptom Discriminator</Select.Option>
			) : null}
			{GenerateSymptomDiscriminatorOptions(symptomDiscriminators)}
		</Select>
	);

	const dispositionsDropDown = (
		<Select
			label="Disposition"
			id={DISPOSITION_DROP_DOWN}
			disabled={disableDispositionDropDown}
		>
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

/**
 * Generate the options for the disposition drop down.
 * @param symptomGroups The symptom groups to generate the options for.
 * @returns The options for the disposition drop down.
 */
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

/**
 * Generate the options for the symptom discriminator drop down.
 * @param symptomDiscriminators The symptom discriminators to generate the options for.
 * @returns The options for the symptom discriminator drop down.
 */
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

/**
 * Generate the options for the disposition drop down.
 * @param dispositions The dispositions to generate the options for.
 * @returns The options for the disposition drop down.
 */
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
