from pytest_bdd import scenarios, when
from requests.models import Response

from ...utils.constants import (
    CCS_COMPARISON_SEARCH_URL,
    DISPOSITIONS_URL,
    SYMPTOM_GROUPS_URL,
    SYMPTOM_DISCRIMINATORS_URL,
)
from ...utils.utils import api_gateway_request

scenarios("../../features/general/security.feature")


@when("I send an unauthenticated CCS Comparison Search request", target_fixture="response")
def _(payload: dict) -> Response:
    """I send an unauthenticated CCS Comparison Search request."""
    return api_gateway_request(path=CCS_COMPARISON_SEARCH_URL, payload=payload, auth=False)


@when("I send an unauthenticated Symptom Group Search request", target_fixture="response")
def _() -> Response:
    """I send an unauthenticated Symptom Group Search request."""
    return api_gateway_request(path=SYMPTOM_GROUPS_URL, auth=False)


@when("I send an unauthenticated Symptom Discriminator Search request", target_fixture="response")
def _() -> Response:
    """I send an unauthenticated Symptom Discriminator Search request."""
    return api_gateway_request(path=f"{SYMPTOM_DISCRIMINATORS_URL}/1", auth=False)


@when("I send an unauthenticated Disposition Search request", target_fixture="response")
def _() -> Response:
    """I send an unauthenticated Disposition Search request."""
    return api_gateway_request(path=DISPOSITIONS_URL, auth=False)
