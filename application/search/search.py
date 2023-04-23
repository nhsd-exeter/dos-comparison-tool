from typing import Any

from aws_lambda_powertools.event_handler import APIGatewayRestResolver, CORSConfig
from aws_lambda_powertools.event_handler.exceptions import BadRequestError, InternalServerError
from aws_lambda_powertools.logging import Logger
from aws_lambda_powertools.tracing import Tracer
from aws_lambda_powertools.utilities.typing.lambda_context import LambdaContext

from .ccs_comparison_search.check_capacity_summary_search import CheckCapacitySummarySearch

logger = Logger()
tracer = Tracer()


cors_config = CORSConfig(allow_headers=["Origin", "Content-Type", "Accept", "Authorization"])
app = APIGatewayRestResolver(cors=cors_config)


@app.post("/search/CCSComparisonSearch")
@tracer.capture_method()
def ccs_comparison_search() -> tuple:
    """CCS Comparison Search.

    Args:
    ----
        event (APIGatewayProxyEventV2): API Gateway Event
        context (LambdaContext): Lambda Context

    Returns:
    -------
        Dict[str, Any]: Response
    """
    try:
        body: dict = app.current_event.json_body
        search_one = body.get("search_one", {})
        search_two = body.get("search_two", {})
        if search_one == {} or search_two == {}:
            raise BadRequestError("search_one and search_two are required")
        response_body = {"search_one": CheckCapacitySummarySearch(**search_one).search()}
        response_body["search_one_environment"] = search_one["search_environment"]
        response_body["search_two"] = CheckCapacitySummarySearch(**search_two).search()
        response_body["search_two_environment"] = search_two["search_environment"]
    except BadRequestError as e:
        logger.exception(e)
        raise
    except Exception as e:
        logger.exception(e)
        raise InternalServerError("Internal Server Error") from e
    return response_body, 200


@logger.inject_lambda_context(clear_state=True)
@tracer.capture_lambda_handler(capture_response=True)
def lambda_handler(event: dict[str, Any], context: LambdaContext) -> dict[str, Any]:
    return app.resolve(event, context)
