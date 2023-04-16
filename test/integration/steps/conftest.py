from pytest_bdd import then
from pytest_bdd.parsers import parse
from requests.models import Response

# Use this file for common steps that are used across multiple feature files.


@then(parse('the response should have status code "{status_code:d}"'), target_fixture="response")
def _(status_code: int, response: Response) -> Response:
    """Checks that the response has the correct status code.

    Args:
        status_code (int): Expected status code of the response.
        response (Response): response to check.
    """
    assert response.status_code == status_code
    return response
