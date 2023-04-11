import { expect, test } from "@jest/globals";
import { screen } from "@testing-library/react";
import { renderWithProvidersAndRouter } from "../../../__test__/utils-for-tests";
import ResultsCard from "../resultCard";

test("It renders the expected ResultsCard component", () => {
	// Arrange
	const serviceNameInput = "Service Name";
	const serviceTypeInput = "Service Type";
	const distanceInput = "0.0";
	const serviceAddressInput = "Service Address";
	const serviceUidInput = "123456789";
	const equalResultsInput = true;

	renderWithProvidersAndRouter(
		<ResultsCard
			serviceName={serviceNameInput}
			serviceType={serviceTypeInput}
			serviceUid={serviceUidInput}
			serviceAddress={serviceAddressInput}
			distance={distanceInput}
			equalResults={equalResultsInput}
		/>
	);
	// Act: Get the elements.
	const distanceAway = screen.getByText("Distance Away");
	const distanceAwayValue = screen.getByText(distanceInput);
	const serviceType = screen.getAllByText("Service Type");
	const serviceTypeValue = screen.getAllByText(serviceTypeInput);
	const serviceName = screen.getByText("Service Name");
	const serviceNameValue = screen.getByText(serviceNameInput);
	const serviceAddress = screen.getByText("Address");
	const serviceAddressValue = screen.getByText(serviceAddressInput);
	const serviceUid = screen.getByText("Service Uid");
	const serviceUidValue = screen.getByText(serviceUidInput);
	// Assert: Elements are present.
	expect(distanceAway).toBeDefined();
	expect(distanceAwayValue).toBeDefined();
	expect(serviceType).toBeDefined();
	expect(serviceTypeValue).toBeDefined();
	expect(serviceName).toBeDefined();
	expect(serviceNameValue).toBeDefined();
	expect(serviceAddress).toBeDefined();
	expect(serviceAddressValue).toBeDefined();
	expect(serviceUid).toBeDefined();
	expect(serviceUidValue).toBeDefined();
});
