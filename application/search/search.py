from typing import Any, Dict

from aws_lambda_powertools.logging import Logger
from aws_lambda_powertools.tracing import Tracer
from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2, event_source
from aws_lambda_powertools.utilities.typing.lambda_context import LambdaContext

logger = Logger()
tracer = Tracer()


@logger.inject_lambda_context()  # type: ignore
@event_source(data_class=APIGatewayProxyEventV2)
def lambda_handler(event: APIGatewayProxyEventV2, context: LambdaContext) -> Dict[str, Any]:
    """Entrypoint handler for the authentication lambda
    Args:
        event (APIGatewayProxyEventV2): Lambda function invocation event
        context (LambdaContext): Lambda function context object
    Returns:
        Dict[str, Any]: Response body
    """
    print("Hello World")
    return {"statusCode": 200, "body": "Hello World"}
