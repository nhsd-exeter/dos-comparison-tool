from json import load

from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2
from aws_lambda_powertools.utilities.typing.lambda_context import LambdaContext
from pytest import fixture

from ..authentication import lambda_handler


@fixture
def event():
    with open("test_event.json") as file:
        event = APIGatewayProxyEventV2(load(file))
        file.close()
    return event


def test_lambda_handler(event: APIGatewayProxyEventV2, lambda_context: LambdaContext):
    # Arrange
    # Act
    lambda_handler(event, lambda_context)
    # Assert
