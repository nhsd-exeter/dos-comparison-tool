import axios from "axios";
import { Hint, Input } from "nhsuk-react-components";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { POSTCODE_INPUT } from "../../constants/componentIds";
import { disposition } from "../../interfaces/dtos";
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
	const [dispositions, setDispositions] = useState([] as disposition[]);

	const fetchDispositions = async () => {
		try {
			SetupDefaultHeaders(idToken);
			const response = await axios.post(`${DataLambda}/dispositions`);
			setDispositions(response.data as disposition[]);
			return {
				success: true,
				data: response.data as disposition[],
			};
		} catch (error) {
			console.log(error);
			return {
				success: false,
				data: error,
			};
		}
	};

	useEffect(() => {
		(async () => {
			const dispositionResponse = await fetchDispositions();
			if (!dispositionResponse.success) {
				console.log("Failed to fetch dispositions");
			}
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
			<SymptomGroupDropDown />
			<SymptomDiscriminatorDropDown />
			<DispositionDropDown dispositions={dispositions} />
			<SexDropDown />
		</div>
	);
}

export default SharedSearchForm;
