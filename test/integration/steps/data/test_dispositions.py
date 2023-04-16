from pytest_bdd import scenarios, then, when
from pytest_bdd.parsers import parse
from requests.models import Response

from ...utils.constants import DISPOSITIONS_URL
from ...utils.utils import api_gateway_request

scenarios("../../features/data/dispositions.feature")


@when("I search for dispositions", target_fixture="response")
def _() -> Response:
    """Search for a disposition.

    Returns:
        Response: Response from the API Gateway.
    """
    return api_gateway_request(path=DISPOSITIONS_URL)


@then(parse('the response should have status code "{status_code}"'), target_fixture="response")
def _(status_code: str, response: Response) -> Response:
    """Checks that the response has the correct status code.

    Args:
        status_code (str): Expected status code of the response.
        response (Response): response to check.
    """
    assert response.status_code == int(status_code)
    return response


@then("I should see the dispositions search results")
def _(response: Response):
    """I should see the disposition search results.

    Args:
        response (Response): response to check.
    """
    json_response: list[dict] = response.json()
    assert json_response[0]["DispositionCode"] == "DX02", "Expected DispositionCode to be 'DX02'"
    assert (
        json_response[0]["DispositionName"] == "Attend Emergency Treatment Centre within 1 hour"
    ), "Expected DispositionName to be 'Attend Emergency Treatment Centre within 1 hour'"
