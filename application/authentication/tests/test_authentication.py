from ..authentication import lambda_handler


def test_lambda_handler():
    # Arrange
    event = {"body": {}}
    # Act
    lambda_handler(event, None)
    # Assert
