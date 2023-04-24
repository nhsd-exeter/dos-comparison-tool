from json import load

from pytest_bdd import given, then
from pytest_bdd.parsers import parse
from requests.models import Response

# Use this file for common steps that are used across multiple feature files.


@given("I have a CCS Comparison Search request", target_fixture="payload")
def _() -> dict:
    """Build CCS Comparison Search request.

    Returns:
        dict: CCS Comparison Search request.
    """
    with open("resources/ccs_comparison_search_one.json") as file:
        return load(file)


@then(parse('the response should have status code "{status_code:d}"'), target_fixture="response")
def _(status_code: int, response: Response) -> Response:
    """Check response has the correct status code.

    Args:
        status_code (int): Expected status code of the response.
        response (Response): response to check.
    """
    assert response.status_code == status_code
    return response
