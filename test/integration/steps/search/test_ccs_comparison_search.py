from pytest_bdd import scenarios, then, when
from requests.models import Response

from ...utils.constants import CCS_COMPARISON_SEARCH_URL
from ...utils.utils import api_gateway_request

scenarios("../../features/search/ccs_comparison_search.feature")


@when("I send an authenticated CCS Comparison Search request", target_fixture="response")
def _(payload: dict) -> Response:
    """Sends a CCS Comparison Search request to the API and returns the response.

    Args:
        payload (dict): CCS Comparison Search request.

    Returns:
        Response: Response from the API Gateway.
    """
    return api_gateway_request(path=CCS_COMPARISON_SEARCH_URL, payload=payload)


@then("I should receive a CCS Comparison Search response", target_fixture="response")
def _(response: Response) -> None:
    """Checks the response from the CCS Comparison Search request.

    Args:
        response (Response): response to check.
    """
    json_response = response.json()
    assert json_response["search_one"] is not None, "Expected search_one to be not None"
    assert isinstance(json_response["search_one"][0], dict), "Expected search_one to be a list of dicts"
    assert json_response["search_one_environment"] == "test", "Expected search_one_environment to be 'test'"
    assert json_response["search_two"] is not None, "Expected search_two to be not None"
    assert isinstance(json_response["search_two"][0], dict), "Expected search_two to be a list of dicts"
    assert json_response["search_two_environment"] == "test", "Expected search_two_environment to be 'test'"
