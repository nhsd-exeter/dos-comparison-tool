from pytest_bdd import scenarios, then, when
from pytest_bdd.parsers import parse
from requests import Response

scenarios("../../features/general/cors.feature")


@when(parse('I send a "{http_method}" request to "{path}"'), target_fixture="response")
def _(http_method: str, path: str) -> Response:
    """I send a "OPTIONS" request to "/<path>"."""
    pass


@then(parse('the response should have "{cors_header}" header set to "{cors_value}"'))
def _(cors_header: str, cors_value: str, response: Response):
    """the response should have a "Access-Control-Allow-Origin" header."""
    pass
