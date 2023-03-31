from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2
from aws_lambda_powertools.utilities.typing.lambda_context import LambdaContext

from ..search import lambda_handler

# Fixtures that can't be found in this file are in the conftest.py file


def test_lambda_handler(search_request: APIGatewayProxyEventV2, lambda_context: LambdaContext):
    # Act
    response = lambda_handler(search_request, lambda_context)
    # Assert
    assert response["statusCode"] == 200
    assert response["body"] == "Hello World"


def test_lambda_handler_with_invalid_request(
    invalid_search_request: APIGatewayProxyEventV2, lambda_context: LambdaContext
):
    # Act
    response = lambda_handler(invalid_search_request, lambda_context)
    # Assert
    assert response["statusCode"] == 500
    assert response["body"] == "Internal Server Error"
