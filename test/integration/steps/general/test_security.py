from pytest_bdd import scenarios, when
from pytest_bdd.parsers import parse
from requests.models import Response

from integration.utils.constants import (
    CCS_COMPARISON_SEARCH_URL,
    DISPOSITIONS_URL,
    SYMPTOM_DISCRIMINATORS_URL,
    SYMPTOM_GROUPS_URL,
)
from integration.utils.utils import api_gateway_request

scenarios("../../features/general/security.feature")


@when("I send an unauthenticated CCS Comparison Search request", target_fixture="response")
def _(payload: dict) -> Response:
    """I send an unauthenticated CCS Comparison Search request.

    Args:
        payload (dict): Payload to send to the API.

    Returns:
        Response: Response from the API Gateway.
    """
    return api_gateway_request(path=CCS_COMPARISON_SEARCH_URL, payload=payload, auth=False)


@when("I send an unauthenticated Symptom Group Search request", target_fixture="response")
def _() -> Response:
    """I send an unauthenticated Symptom Group Search request.

    Returns:
        Response: Response from the API Gateway.
    """
    return api_gateway_request(path=SYMPTOM_GROUPS_URL, auth=False)


@when("I send an unauthenticated Symptom Discriminator Search request", target_fixture="response")
def _() -> Response:
    """I send an unauthenticated Symptom Discriminator Search request.

    Returns:
        Response: Response from the API Gateway.
    """
    return api_gateway_request(path=f"{SYMPTOM_DISCRIMINATORS_URL}/1", auth=False)


@when("I send an unauthenticated Disposition Search request", target_fixture="response")
def _() -> Response:
    """I send an unauthenticated Disposition Search request.

    Returns:
        Response: Response from the API Gateway.
    """
    return api_gateway_request(path=DISPOSITIONS_URL, auth=False)


@when(parse('I send an authenticated request to "{path}"'), target_fixture="response")
def _(path: str) -> Response:
    """Sends a request to the API and returns the response.

    Args:
        path (str): Path to send the request to.

    Returns:
        Response: Response from the API Gateway.
    """
    return api_gateway_request(path=path)
