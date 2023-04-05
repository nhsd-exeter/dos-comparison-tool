from json import dumps
from typing import Any, Dict

from aws_lambda_powertools.logging import Logger
from aws_lambda_powertools.tracing import Tracer
from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2, event_source
from aws_lambda_powertools.utilities.typing.lambda_context import LambdaContext

from .ccs.check_capacity_summary_search import CheckCapacitySummarySearch

logger = Logger()
tracer = Tracer()

response_headers = {
    "Access-Control-Allow-Headers": "Origin,Content-Type,Accept,Authorization",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
}


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
        search_two = body.get("search_two")
        response_body = {"search_one": CheckCapacitySummarySearch(**search_one).search()}
        response_body["search_two"] = CheckCapacitySummarySearch(**search_two).search()
    except Exception as e:
        logger.exception(e)
        return {"statusCode": 500, "body": "Internal Server Error", "headers": response_headers}

    return {"statusCode": 200, "body": dumps(response_body), "headers": response_headers}
