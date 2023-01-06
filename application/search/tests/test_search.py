from json import load
from os import path

from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2
from aws_lambda_powertools.utilities.typing.lambda_context import LambdaContext
from pytest import fixture

from ..search import lambda_handler


@fixture
def event():
    #  Open the test event file
    filename = "test_event.json"
    current_dir = path.dirname(path.abspath(__file__))
    with open(f"{current_dir}/{filename}") as file:
        event = APIGatewayProxyEventV2(load(file))
        file.close()
    return event


def test_lambda_handler(event: APIGatewayProxyEventV2, lambda_context: LambdaContext):
    # Arrange
    # Act
    lambda_handler(event, lambda_context)
    # Assert
