from pytest_bdd import scenarios, then, when
from requests.models import Response

from integration.utils.constants import DISPOSITIONS_URL
from integration.utils.utils import api_gateway_request

scenarios("../../features/data/dispositions.feature")


@when("I search for dispositions", target_fixture="response")
def _() -> Response:
    """Search for a disposition.

    Returns:
        Response: Response from the API Gateway.
    """
    return api_gateway_request(path=DISPOSITIONS_URL)


@then("I should see the dispositions search results")
def _(response: Response) -> None:
    """I should see the disposition search results.

    Args:
        response (Response): response to check.
    """
    json_response: list[dict] = response.json()
    assert (
        json_response[0]["DispositionCode"] == "DX02"
    ), "Expected DispositionCode to be 'DX02'"
    assert (
        json_response[0]["DispositionName"]
        == "Attend Emergency Treatment Centre within 1 hour"
    ), "Expected DispositionName to be 'Attend Emergency Treatment Centre within 1 hour'"
