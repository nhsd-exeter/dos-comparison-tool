from pytest_bdd import scenarios, then, when
from pytest_bdd.parsers import parse
from requests import request, Response

from ...utils.environment_variables import API_GATEWAY_ENDPOINT

scenarios("../../features/general/cors.feature")


@when(parse('I send a "{http_method}" request to "{path}"'), target_fixture="response")
def _(http_method: str, path: str) -> Response:
    """Sends a request to the API and returns the response.

    Args:
        http_method (str): HTTP method to use for the request.
        path (str): Path to send the request to.

    Returns:
        Response: Response from the API Gateway.
    """
    return request(method=http_method, url=f"{API_GATEWAY_ENDPOINT}{path}")


@then(parse('the response should have status code "{status_code}"'), target_fixture="response")
def _(status_code: str, response: Response) -> Response:
    """Checks that the response has the correct CORS header.

    Args:
        status_code (str): Expected status code of the response.
        response (Response): response to check.
    """
    assert response.status_code == int(status_code)
    return response


@then(parse('the response should have "{cors_header}" header set to "{cors_value}"'))
def _(cors_header: str, cors_value: str, response: Response) -> None:
    """Checks that the response has the correct CORS header.

    Args:
        cors_header (str): Cors header to check in the response.
        cors_value (str): Expected value of the cors header.
        response (Response): response to check.
    """
    assert response.headers[cors_header] == cors_value
