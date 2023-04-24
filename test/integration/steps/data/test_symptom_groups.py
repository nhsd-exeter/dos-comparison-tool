from pytest_bdd import scenarios, then, when
from requests.models import Response

from integration.utils.constants import SYMPTOM_GROUPS_URL
from integration.utils.utils import api_gateway_request

scenarios("../../features/data/symptom_groups.feature")


@when("I search for a symptom groups", target_fixture="response")
def _() -> Response:
    """Search for a symptom groups.

    Returns:
        Response: Response from the API Gateway.
    """
    return api_gateway_request(path=SYMPTOM_GROUPS_URL)


@then("I should see the symptom group search results")
def _(response: Response) -> None:
    """I should see the symptom group search results.

    Args:
        response (Response): Response from the API Gateway.
    """
    expected_symptom_group_id = 1000
    response_json: list[dict] = response.json()
    assert response_json[0]["SymptomGroupId"] ==expected_symptom_group_id , "Expected SymptomGroupId to be 1000"
    assert (
        response_json[0]["SymptomGroupName"] == "Abdominal or Flank Injury, Blunt"
    ), "Expected SymptomGroupName to be 'Abdominal or Flank Injury, Blunt'"
