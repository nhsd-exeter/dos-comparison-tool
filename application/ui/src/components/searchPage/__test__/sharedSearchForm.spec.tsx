import { expect, test } from "@jest/globals";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import {
	DISPOSITION_DROP_DOWN,
	POSTCODE_INPUT,
	SEX_DROP_DOWN,
	SYMPTOM_DISCRIMINATOR_DROP_DOWN,
	SYMPTOM_GROUP_DROP_DOWN,
} from "../../../constants/componentIds";
import SharedSearchForm from "../sharedSearchForm";

test("It renders the expected SharedSearchForm layout", () => {
	// Arrange
	renderWithProvidersAndRouter(<SharedSearchForm />);
	// Act: Get the elements.
	const postcodeInput = document.getElementById(POSTCODE_INPUT);
	const postcodeInputLabel = document.getElementById(
		`${POSTCODE_INPUT}--label`
	);
	const symptomGroupDropDown = document.getElementById(SYMPTOM_GROUP_DROP_DOWN);
	const symptomGroupLabel = document.getElementById(
		`${SYMPTOM_GROUP_DROP_DOWN}--label`
	);
	const symptomDiscriminatorDropDown = document.getElementById(
		SYMPTOM_DISCRIMINATOR_DROP_DOWN
	);
	const symptomDiscriminatorLabel = document.getElementById(
		`${SYMPTOM_DISCRIMINATOR_DROP_DOWN}--label`
	);
	const dispositionDropDown = document.getElementById(DISPOSITION_DROP_DOWN);
	const dispositionLabel = document.getElementById(
		`${DISPOSITION_DROP_DOWN}--label`
	);
	const sexDropDown = document.getElementById(SEX_DROP_DOWN);
	const sexLabel = document.getElementById(`${SEX_DROP_DOWN}--label`);
	// Assert: Elements are present.
	expect(postcodeInput).toBeDefined();
	expect(postcodeInputLabel).toBeDefined();
	expect(postcodeInputLabel).toHaveProperty("innerHTML", "Postcode");
	expect(symptomGroupDropDown).toBeDefined();
	expect(symptomGroupLabel).toBeDefined();
	expect(symptomGroupLabel).toHaveProperty("innerHTML", "Symptom Group");
	expect(symptomDiscriminatorDropDown).toBeDefined();
	expect(symptomDiscriminatorLabel).toBeDefined();
	expect(symptomDiscriminatorLabel).toHaveProperty(
		"innerHTML",
		"Symptom Discriminator"
	);
	expect(dispositionDropDown).toBeDefined();
	expect(dispositionLabel).toBeDefined();
	expect(dispositionLabel).toHaveProperty("innerHTML", "Disposition");
	expect(sexDropDown).toBeDefined();
	expect(sexLabel).toBeDefined();
	expect(sexLabel).toHaveProperty("innerHTML", "Sex");
});
