from json import dumps

from requests import post
from requests.models import Response

from .auth import get_authentication_token
from .environment_variables import API_GATEWAY_ENDPOINT


def api_gateway_request(path: str, payload: dict = None) -> Response:
    """Send a request to the API Gateway.

    Args:
        path (str): The path to send to the API Gateway.
        payload (dict): The payload to send to the API Gateway.

    Returns:
        Response: The response from the API Gateway.
    """
    payload = {} if payload is None else dumps(payload)
    return post(
        url=f"{API_GATEWAY_ENDPOINT}{path}",
        headers={"Authorization": get_authentication_token()},
        data=payload,
    )
