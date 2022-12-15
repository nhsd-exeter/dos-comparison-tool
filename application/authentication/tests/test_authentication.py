from ..authentication import lambda_handler


def test_lambda_handler(lambda_context):
    # Arrange
    event = {"body": {}}
    # Act
    lambda_handler(event, lambda_context)
    # Assert
