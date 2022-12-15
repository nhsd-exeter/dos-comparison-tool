from typing import Any, Dict

from aws_lambda_powertools.logging import Logger
from aws_lambda_powertools.tracing import Tracer
from aws_lambda_powertools.utilities.typing.lambda_context import LambdaContext

logger = Logger()
tracer = Tracer()


def lambda_handler(event: Dict[str, Any], context: LambdaContext) -> None:
    """Entrypoint handler for the orchestrator lambda
    Args:
        event (Dict[str, Any]): Lambda function invocation event
        context (LambdaContext): Lambda function context object
    Event: The event payload should contain an Update Request
    """
    print("Hello World")
