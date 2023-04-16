from json import load

from pytest_bdd import given, scenarios, then, when
from pytest_bdd.parsers import parse
from requests.models import Response

from ...utils.constants import CCS_COMPARISON_SEARCH_URL
from ...utils.utils import api_gateway_request

scenarios("../../features/search/ccs_comparison_search.feature")


@given("I have a CCS Comparison Search request", target_fixture="payload")
def _() -> dict:
    """Builds a CCS Comparison Search request.

    Returns:
        dict: CCS Comparison Search request.
    """
    with open("resources/ccs_comparison_search_one.json") as file:
        return load(file)


@when("I send an authenticated CCS Comparison Search request", target_fixture="response")
def _(payload: dict) -> Response:
    """Sends a CCS Comparison Search request to the API and returns the response.

    Args:
        payload (dict): CCS Comparison Search request.

    Returns:
        Response: Response from the API Gateway.
    """
    return api_gateway_request(path=CCS_COMPARISON_SEARCH_URL, payload=payload)


@then(parse('the response should have status code "{status_code}"'), target_fixture="response")
def _(status_code: str, response: Response) -> Response:
    """Checks that the response has the correct status code.

    Args:
        status_code (str): Expected status code of the response.
        response (Response): response to check.
    """
    assert response.status_code == int(status_code)
    return response


@then("I should receive a CCS Comparison Search response", target_fixture="response")
def _(response: Response) -> None:
    """Checks the response from the CCS Comparison Search request.

    Args:
        response (Response): response to check.
    """
    json_response = response.json()
    assert json_response["search_one"] is not None
    assert json_response["search_one_environment"] is not None
    assert json_response["search_two"] is not None
    assert json_response["search_two_environment"] is not None
