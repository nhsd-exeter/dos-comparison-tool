from typing import Any

from aws_lambda_powertools.event_handler import APIGatewayRestResolver, CORSConfig
from aws_lambda_powertools.logging import Logger
from aws_lambda_powertools.tracing import Tracer
from aws_lambda_powertools.utilities.typing.lambda_context import LambdaContext

from .utils import file_to_dataframe

logger = Logger()
tracer = Tracer()

cors_config = CORSConfig(allow_headers=["Origin", "Content-Type", "Accept", "Authorization"])
app = APIGatewayRestResolver(cors=cors_config)


@logger.inject_lambda_context(clear_state=True)
@tracer.capture_lambda_handler(capture_response=True)
def lambda_handler(event: dict[str, Any], context: LambdaContext) -> dict[str, Any]:
    """Lambda Handler.

    Args:
        event (dict[str, Any]): Event from API Gateway
        context (LambdaContext): Lambda Context

    Returns:
        dict[str, Any]: Response
    """
    return app.resolve(event, context)


# Must be post due to Lambda Proxy Integration
@app.post("/data/symptom_groups")
@tracer.capture_method()
def symptom_groups() -> tuple:
    """Get Symptom Groups.

    Returns:
        tuple: Response
    """
    symptom_groups = file_to_dataframe("symptom_groups.csv")
    return symptom_groups.to_dict(orient="records"), 200


# Must be post due to Lambda Proxy Integration
@app.post("/data/symptom_discriminators/<symptom_group_id>")
@tracer.capture_method()
def symptom_discriminators(symptom_group_id: str) -> tuple:
    """Get Symptom Discriminators using Symptom Group ID.

    Returns:
        tuple: Response
    """
    symptom_group_id = int(symptom_group_id)
    symptom_discriminators = file_to_dataframe("symptom_discriminators.csv")
    symptom_discriminators = symptom_discriminators.loc[symptom_discriminators["SymptomGroupId"] == symptom_group_id]
    symptom_discriminators = symptom_discriminators[["SymptomDiscriminatorId", "SymptomDiscriminatorName"]]
    return symptom_discriminators.to_dict(orient="records"), 200


# Must be post due to Lambda Proxy Integration
@app.post("/data/dispositions")
@tracer.capture_method()
def dispositions() -> tuple:
    """Get Symptom Groups.

    Returns:
        tuple: Response
    """
    dispositions = file_to_dataframe("dispositions.csv")
    return dispositions.to_dict(orient="records"), 200


@app.post("/data/roles")
@tracer.capture_method()
def roles() -> tuple:
    """Get Roles.

    Returns:
        tuple: Response
    """
    dispositions = file_to_dataframe("ccs_roles.csv")
    return dispositions.to_dict(orient="records"), 200
