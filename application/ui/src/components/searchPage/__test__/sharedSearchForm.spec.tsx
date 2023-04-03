import { expect, test } from "@jest/globals";
import { screen } from "@testing-library/react";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import SharedSearchForm from "../sharedSearchForm";

test("It renders the expected SharedSearchForm layout", () => {
	// Arrange
	renderWithProvidersAndRouter(<SharedSearchForm />);
	// Act: Get the elements.
	const postcodeInput = screen.getByLabelText("Postcode");
	const surgeryCodeInput = screen.getByLabelText("Surgery Code");
	const symptomGroupDropDown = screen.getByLabelText("Symptom Group");
	const symptomDiscriminatorDropDown = screen.getByLabelText(
		"Symptom Discriminator"
	);
	const dispositionDropDown = screen.getByLabelText("Disposition");
	const sexDropDown = screen.getByLabelText("Sex");
	// Assert: Elements are present.
	expect(postcodeInput).toBeDefined();
	expect(surgeryCodeInput).toBeDefined();
	expect(symptomGroupDropDown).toBeDefined();
	expect(symptomDiscriminatorDropDown).toBeDefined();
	expect(dispositionDropDown).toBeDefined();
	expect(sexDropDown).toBeDefined();
});
