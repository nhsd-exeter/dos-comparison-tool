import axios from "axios";
import { Hint, Input } from "nhsuk-react-components";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { POSTCODE_INPUT } from "../../constants/componentIds";
import { Disposition, SymptomGroup } from "../../interfaces/dtos";
import { selectToken } from "../../slices/authSlice";
import { DataLambda, SetupDefaultHeaders } from "../../utils/api";
import {
	DispositionDropDown,
	SexDropDown,
	SymptomDiscriminatorDropDown,
	SymptomGroupDropDown,
} from "./dropDowns";

function SharedSearchForm() {
	const idToken = useAppSelector(selectToken) as string;
	const [dispositions, setDispositions] = useState([
		{
			DispositionCode: "0",
			DispositionId: "0",
			DispositionName: "Unable to find dispositions",
		},
	] as Disposition[]);
	const [symptomGroups, setSymptomGroups] = useState([
		{
			SymptomGroupId: "0",
			SymptomGroupName: "Unable to find symptom groups",
		},
	]);

	const fetchDispositions = async () => {
		try {
			SetupDefaultHeaders(idToken);
			const response = await axios.post(`${DataLambda}/dispositions`);
			setDispositions(response.data as Disposition[]);
			return {
				success: true,
				data: response.data as Disposition[],
			};
		} catch (error) {
			return;
		}
	};

	const fetchSymptomGroups = async () => {
		try {
			SetupDefaultHeaders(idToken);
			const response = await axios.post(`${DataLambda}/symptom_groups`);
			setSymptomGroups(response.data as SymptomGroup[]);
			return {
				success: true,
				data: response.data as SymptomGroup[],
			};
		} catch (error) {
			return;
		}
	};

	useEffect(() => {
		(async () => {
			await fetchDispositions();
			await fetchSymptomGroups();
		})();
	}, []);

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
			<SymptomGroupDropDown symptomGroups={symptomGroups} />
			<SymptomDiscriminatorDropDown />
			<DispositionDropDown dispositions={dispositions} />
			<SexDropDown />
		</div>
	);
}

export default SharedSearchForm;
