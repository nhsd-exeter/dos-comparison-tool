from json import dumps
from unittest.mock import call, MagicMock, patch

from aws_lambda_powertools.utilities.typing.lambda_context import LambdaContext

from ..search import lambda_handler

# Fixtures that can't be found in this file are in the conftest.py file
FILE_PATH = "application.search.search"
URL_PATH = "/search/CCSComparisonSearch"
HTTP_METHOD = "POST"


def test_lambda_handler_invalid_route(lambda_context: LambdaContext):
    # Arrange
    event = {"body": "invalid", "path": URL_PATH, "httpMethod": "GET"}
    # Act
    response = lambda_handler(event, lambda_context)
    # Assert
    assert response["body"] == """{"statusCode":404,"message":"Not found"}"""


@patch(f"{FILE_PATH}.CheckCapacitySummarySearch")
def test_ccs_comparison_search(
    mock_check_capacity_summary_search: MagicMock, search_request: dict, lambda_context: LambdaContext
):
    # Arrange
    mock_check_capacity_summary_search.return_value.search.return_value = {}
    search_request["path"] = URL_PATH
    search_request["httpMethod"] = HTTP_METHOD
    # Act
    response = lambda_handler(search_request, lambda_context)
    # Assert
    assert response["statusCode"] == 200
    assert (
        response["body"]
        == """{"search_one":{},"search_one_environment":"test","search_two":{},"search_two_environment":"test2"}"""
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
                gender="M",
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
                gender="M",
                search_environment="test2",
            ),
            call().search(),
        ]
    )


@patch(f"{FILE_PATH}.CheckCapacitySummarySearch")
def test_lambda_handler_with_invalid_request(
    mock_check_capacity_summary_search: MagicMock,
    lambda_context: LambdaContext,
):
    # Arrange
    event = {"body": dumps({"test": "tests"}), "path": URL_PATH, "httpMethod": HTTP_METHOD}
    # Act
    response = lambda_handler(event, lambda_context)
    # Assert
    assert response["body"] == """{"statusCode":400,"message":"search_one and search_two are required"}"""
    mock_check_capacity_summary_search.assert_not_called()


@patch(f"{FILE_PATH}.CheckCapacitySummarySearch")
def test_lambda_handler_internal_server_error(
    mock_check_capacity_summary_search: MagicMock,
    lambda_context: LambdaContext,
):
    # Arrange
    event = {"body": "invalid", "path": URL_PATH, "httpMethod": HTTP_METHOD}
    # Act
    response = lambda_handler(event, lambda_context)
    # Assert
    assert response["body"] == """{"statusCode":500,"message":"Internal Server Error"}"""
    mock_check_capacity_summary_search.assert_not_called()
