from json import dumps
from unittest.mock import MagicMock, patch

from aws_lambda_powertools.utilities.typing.lambda_context import LambdaContext
from pandas import read_csv

from application.data.data import lambda_handler

# Fixtures that can't be found in this file are in the conftest.py file
FILE_PATH = "application.data.data"
LAMBDA_NAME = "data"
SYMPTOM_GROUPS_URL_PATH = f"/{LAMBDA_NAME}/symptom_groups"
SYMPTOM_DISCRIMINATORS_URL_PATH = f"/{LAMBDA_NAME}/symptom_discriminators"
DISPOSITIONS_URL_PATH = f"/{LAMBDA_NAME}/dispositions"
ROLES_URL_PATH = f"/{LAMBDA_NAME}/roles"
HTTP_METHOD = "POST"


def test_lambda_handler_invalid_route(lambda_context: LambdaContext) -> None:
    """Test lambda handler with an invalid route."""
    # Arrange
    event = {"body": "", "path": "/data/any", "httpMethod": "GET"}
    # Act
    response = lambda_handler(event, lambda_context)
    # Assert
    assert response["body"] == """{"statusCode":404,"message":"Not found"}"""


@patch(f"{FILE_PATH}.file_to_dataframe")
def test_lambda_handler_symptom_groups(mock_file_to_dataframe: MagicMock, lambda_context: LambdaContext) -> None:
    """Test lambda handler with a valid route."""
    # Arrange
    event = {"body": "", "path": SYMPTOM_GROUPS_URL_PATH, "httpMethod": HTTP_METHOD}
    mock_file_to_dataframe.return_value = data_frame = read_csv(
        "application/data/tests/resources/symptom_groups_test.csv",
    )
    # Act
    response = lambda_handler(event, lambda_context)
    # Assert
    expected_status_code = 200
    assert response["statusCode"] == expected_status_code
    assert response["body"] == dumps(data_frame.to_dict(orient="records"), separators=(",", ":"))
    mock_file_to_dataframe.assert_called_once_with("symptom_groups.csv")


@patch(f"{FILE_PATH}.file_to_dataframe")
def test_lambda_handler_symptom_discriminators(
    mock_file_to_dataframe: MagicMock,
    lambda_context: LambdaContext,
) -> None:
    """Test lambda handler symptom discriminators.

    Args:
        mock_file_to_dataframe (MagicMock): Mocked file to data frame.
        lambda_context (LambdaContext): Lambda context for data lambda.
    """
    # Arrange
    symptom_group_id = 1000
    event = {"body": "", "path": f"{SYMPTOM_DISCRIMINATORS_URL_PATH}/{symptom_group_id}", "httpMethod": HTTP_METHOD}
    mock_file_to_dataframe.return_value = data_frame = read_csv(
        "application/data/tests/resources/symptom_discriminators_test.csv",
    )
    # Act
    response = lambda_handler(event, lambda_context)
    # Assert
    expected_status_code = 200
    assert response["statusCode"] == expected_status_code
    expected_data_frame = data_frame.drop("SymptomGroupId", axis=1)
    assert response["body"] == dumps(expected_data_frame.to_dict(orient="records"), separators=(",", ":"))
    mock_file_to_dataframe.assert_called_once_with("symptom_discriminators.csv")


@patch(f"{FILE_PATH}.file_to_dataframe")
def test_lambda_handler_dispositions(mock_file_to_dataframe: MagicMock, lambda_context: LambdaContext) -> None:
    """Test lambda handler dispositions.

    Args:
        mock_file_to_dataframe (MagicMock): Mocked file to data frame.
        lambda_context (LambdaContext): Lambda context.
    """
    # Arrange
    event = {"body": "", "path": DISPOSITIONS_URL_PATH, "httpMethod": HTTP_METHOD}
    mock_file_to_dataframe.return_value = data_frame = read_csv(
        "application/data/tests/resources/dispositions_test.csv",
    )
    # Act
    response = lambda_handler(event, lambda_context)
    # Assert
    expected_status_code = 200
    assert response["statusCode"] == expected_status_code
    assert response["body"] == dumps(data_frame.to_dict(orient="records"), separators=(",", ":"))
    mock_file_to_dataframe.assert_called_once_with("dispositions.csv")


@patch(f"{FILE_PATH}.file_to_dataframe")
def test_lambda_handler_roles(mock_file_to_dataframe: MagicMock, lambda_context: LambdaContext) -> None:
    """AI is creating summary for test_lambda_handler_roles.

    Args:
        mock_file_to_dataframe (MagicMock): [description]
        lambda_context (LambdaContext): [description]
    """
    # Arrange
    event = {"body": "", "path": ROLES_URL_PATH, "httpMethod": HTTP_METHOD}
    mock_file_to_dataframe.return_value = data_frame = read_csv(
        "application/data/tests/resources/ccs_roles_test.csv",
    )
    # Act
    response = lambda_handler(event, lambda_context)
    # Assert
    expected_status_code = 200
    assert response["statusCode"] == expected_status_code
    assert response["body"] == dumps(data_frame.to_dict(orient="records"), separators=(",", ":"))
    mock_file_to_dataframe.assert_called_once_with("ccs_roles.csv")
