# from json import loads
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
    try:
        body = event.json_body
        search_one = body.get("search_one")
        ccs_search_one = CheckCapacitySummarySearch(**search_one)
        ccs_search_one.log_values()
        ccs_search_one.search()
        search_two = body.get("search_two")
        ccs_search_two = CheckCapacitySummarySearch(**search_two)
        ccs_search_two.log_values()
        ccs_search_two.search()
    except Exception as e:
        logger.exception(e)
        return {"statusCode": 500, "body": "Internal Server Error"}

    return {"statusCode": 200, "body": "Successful Request"}
