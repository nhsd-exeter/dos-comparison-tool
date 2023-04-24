from json import dumps

from requests import post
from requests.models import Response

from .auth import get_authentication_token
from .environment_variables import API_GATEWAY_ENDPOINT


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
        timeout=10,
    )
