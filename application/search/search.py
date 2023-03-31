from json import loads
from typing import Any, Dict

from aws_lambda_powertools.logging import Logger
from aws_lambda_powertools.tracing import Tracer
from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2, event_source
from aws_lambda_powertools.utilities.typing.lambda_context import LambdaContext
from .ccs.check_capacity_summary_search import CheckCapacitySummarySearch

logger = Logger()
tracer = Tracer()


@logger.inject_lambda_context(clear_state=True)
@event_source(data_class=APIGatewayProxyEventV2)
def lambda_handler(event: APIGatewayProxyEventV2, context: LambdaContext) -> Dict[str, Any]:
    """Entrypoint handler for the authentication lambda
    Args:
        event (APIGatewayProxyEventV2): Lambda function invocation event
        context (LambdaContext): Lambda function context object
    Returns:
        Dict[str, Any]: Response body
    """
    body = extract_body(event)
    CheckCapacitySummarySearch(body).log_values()
    return {"statusCode": 200, "body": "Hello World"}


def extract_body(event: APIGatewayProxyEventV2) -> dict:
    """Extracts the body from the event
    Args:
        event (APIGatewayProxyEventV2): Lambda function invocation event
    Returns:
        dict: Body of the event
    """
    return loads(event.body) if event.body else {}
