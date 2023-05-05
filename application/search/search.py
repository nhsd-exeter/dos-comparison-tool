from typing import Any

from aws_lambda_powertools.event_handler import APIGatewayRestResolver, CORSConfig
from aws_lambda_powertools.event_handler.exceptions import BadRequestError, InternalServerError
from aws_lambda_powertools.logging import Logger
from aws_lambda_powertools.tracing import Tracer
from aws_lambda_powertools.utilities.typing.lambda_context import LambdaContext

from .ccs_comparison_search.check_capacity_summary_search import CheckCapacitySummarySearch, compare_search_responses

logger = Logger()
tracer = Tracer()


cors_config = CORSConfig(allow_headers=["Origin", "Content-Type", "Accept", "Authorization"])
app = APIGatewayRestResolver(cors=cors_config)


@app.post("/search/CCSComparisonSearch")
@tracer.capture_method()
def ccs_comparison_search() -> tuple:
    """CCS Comparison Search.

    Args:
        event (APIGatewayProxyEventV2): API Gateway Event
        context (LambdaContext): Lambda Context

    Returns:
        Dict[str, Any]: Response
    """
    try:
        body: dict = app.current_event.json_body
        search_one = body.get("search_one", {})
        search_two = body.get("search_two", {})
        if search_one == {} or search_two == {}:
            error_message = "search_one and search_two are required"
            raise BadRequestError(error_message)  # noqa: TRY301
        search_one_response = CheckCapacitySummarySearch(**search_one).search()
        search_two_response = CheckCapacitySummarySearch(**search_two).search()
        search_one_response, search_two_response = compare_search_responses(search_one_response, search_two_response)
        logger.debug(
            "CCS Comparison Search Responses",
            extra={"search_one_response": search_one_response, "search_two_response": search_two_response},
        )
        response_body = {
            "search_one": search_one_response,
            "search_two": search_two_response,
            "search_one_environment": search_one["search_environment"],
            "search_two_environment": search_two["search_environment"],
        }
    except BadRequestError:
        logger.exception("Bad Request Error")
        raise
    except Exception as e:
        logger.exception("Internal Server Error")
        error_message = "Internal Server Error"
        raise InternalServerError(error_message) from e
    return response_body, 200


@logger.inject_lambda_context(clear_state=True)
@tracer.capture_lambda_handler(capture_response=True)
def lambda_handler(event: dict[str, Any], context: LambdaContext) -> dict[str, Any]:
    """Lambda handler.

    Args:
        event (dict[str, Any]): Lambda Event
        context (LambdaContext): Lambda Context

    Returns:
        dict[str, Any]: Response
    """
    return app.resolve(event, context)
