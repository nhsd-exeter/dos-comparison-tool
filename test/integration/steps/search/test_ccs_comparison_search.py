from json import load

from pytest_bdd import given, scenarios, then, when
from pytest_bdd.parsers import parse
from requests.models import Response

from integration.utils.constants import CCS_COMPARISON_SEARCH_URL
from integration.utils.utils import api_gateway_request, load_default_ccs_comparison_search_request

scenarios("../../features/search/ccs_comparison_search.feature")


@given("I have an empty CCS Comparison Search request", target_fixture="payload")
def _() -> dict:
    """Builds an empty CCS Comparison Search request.

    Returns:
        dict: CCS Comparison Search request.
    """
    return {"search_one": {}, "search_two": {}}


@given(parse('I have a CCS Comparison Search request with invalid "{parameter}"'), target_fixture="payload")
def _(parameter: str) -> dict:
    """Builds an empty CCS Comparison Search request.

    Returns:
        dict: CCS Comparison Search request.
    """
    payload = load_default_ccs_comparison_search_request()
    match parameter:
        case "symptom_group":
            payload["search_one"]["symptom_group"] = 1
        case "symptom_discriminator":
            payload["search_one"]["symptom_discriminator_list"] = [1]
        case "disposition":
            payload["search_one"]["disposition"] = 0
        case _:
            msg = f"Invalid parameter {parameter}"
            raise ValueError(msg)
    return payload


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
    with open("resources/default_ccs_comparison_search_response.json") as json_file:
        expected_json_response_body = load(json_file)
    assert json_response["search_one"] is not None, "Expected search_one to be not None"
    assert (
        json_response["search_one"] == expected_json_response_body
    ), "Expected search_one to be the same as expected_json_response_body"
    assert json_response["search_one_environment"] == "test", "Expected search_one_environment to be 'test'"
    assert json_response["search_two"] is not None, "Expected search_two to be not None"
    assert json_response["search_two_environment"] == "test", "Expected search_two_environment to be 'test'"


@then("I should receive a CCS Comparison Search error response", target_fixture="response")
def _(response: Response) -> None:
    """Checks the response from the CCS Comparison Search request.

    Args:
        response (Response): response to check.
    """
    json_response = response.json()
    assert (
        json_response["message"] == "Bad Request Error: search_one and search_two are required"
    ), "Expected message to be 'Bad Request Error: search_one and search_two are required'"


@then(
    parse('I should receive a CCS Search error response with message "{response_message}"'),
    target_fixture="response",
)
def _(response: Response, response_message: str) -> None:
    """Checks the response from the CCS Comparison Search request.

    Args:
        response (Response): response to check.
        response_message (str): response message to check.
    """
    json_response = response.json()
    assert json_response["message"] == response_message, f"Expected message to be '{response_message}'"
