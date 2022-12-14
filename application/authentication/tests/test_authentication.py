from ..authentication import lambda_handler


def test_lambda_handler():
    # Arrange
    event = {"body": {"username": "test", "password": "test"}}
    # Act
    lambda_handler(event, None)
    # Assert
