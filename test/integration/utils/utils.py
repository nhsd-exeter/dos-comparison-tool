from json import dumps, load

from requests import post
from requests.models import Response

from .auth import get_authentication_token
from .environment_variables import API_GATEWAY_ENDPOINT


def load_default_ccs_comparison_search_request() -> dict:
    """Load the default CCS Comparison Search request.

    Returns:
        dict: The default CCS Comparison Search request.
    """
    with open("resources/default_ccs_comparison_search.json") as file:
        return load(file)


def api_gateway_request(path: str, payload: dict = None, *, auth: bool = True) -> Response:
    """Send a request to the API Gateway.

    Args:
        path (str): The path to send to the API Gateway.
        payload (dict): The payload to send to the API Gateway.
        auth (bool): Whether to authenticate the request.

    Returns:
        Response: The response from the API Gateway.
    """
    payload = {} if payload is None else dumps(payload)
    headers = {"Authorization": get_authentication_token()} if auth else {}
    return post(
        url=f"{API_GATEWAY_ENDPOINT}{path}",
        headers=headers,
        data=payload,
        timeout=20,
    )
