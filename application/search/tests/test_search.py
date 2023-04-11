from json import dumps
from unittest.mock import call, MagicMock, patch

from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2
from aws_lambda_powertools.utilities.typing.lambda_context import LambdaContext

from ..search import lambda_handler
from .conftest import SEARCH_REQUEST

# Fixtures that can't be found in this file are in the conftest.py file
FILE_PATH = "application.search.search"


@patch(f"{FILE_PATH}.CheckCapacitySummarySearch")
def test_lambda_handler(
    mock_check_capacity_summary_search: MagicMock, search_request: APIGatewayProxyEventV2, lambda_context: LambdaContext
):
    # Arrange
    mock_check_capacity_summary_search.return_value.search.return_value = return_value = {}
    # Act
    response = lambda_handler(search_request, lambda_context)
    # Assert
    assert response["statusCode"] == 200

    assert response["body"] == dumps(
        {
            "search_one": return_value,
            "search_one_environment": SEARCH_REQUEST["search_one"]["search_environment"],
            "search_two": return_value,
            "search_two_environment": SEARCH_REQUEST["search_two"]["search_environment"],
        }
    )
    mock_check_capacity_summary_search.assert_has_calls(
        [
            call(
                age=1,
                age_format="years",
                disposition=1,
                symptom_group=1,
                symptom_discriminator_list=[1, 2, 3],
                search_distance=1,
                gender="male",
                search_environment="test",
            ),
            call().search(),
            call(
                age=1,
                age_format="years",
                disposition=1,
                symptom_group=1,
                symptom_discriminator_list=[1, 2, 3],
                search_distance=1,
                gender="male",
                search_environment="test2",
            ),
            call().search(),
        ]
    )


@patch(f"{FILE_PATH}.CheckCapacitySummarySearch")
def test_lambda_handler_with_invalid_request(
    mock_check_capacity_summary_search: MagicMock,
    invalid_search_request: APIGatewayProxyEventV2,
    lambda_context: LambdaContext,
):
    # Act
    response = lambda_handler(invalid_search_request, lambda_context)
    # Assert
    assert response["statusCode"] == 500
    assert response["body"] == "Internal Server Error"
    mock_check_capacity_summary_search.assert_not_called()
