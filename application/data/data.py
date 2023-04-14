from json import dumps
from os import getenv
from typing import Any, Dict

from aws_lambda_powertools.event_handler import APIGatewayRestResolver, CORSConfig
from aws_lambda_powertools.logging import Logger
from aws_lambda_powertools.tracing import Tracer
from aws_lambda_powertools.utilities.typing.lambda_context import LambdaContext
from boto3 import client
from pandas import DataFrame

s3 = client("s3")
logger = Logger()
tracer = Tracer()

cors_config = CORSConfig(allow_headers=["Origin", "Content-Type", "Accept", "Authorization"])
app = APIGatewayRestResolver(cors=cors_config)


def file_to_dataframe(file_name: str) -> DataFrame:
    """Get File from S3 and Convert to Pandas DataFrame

    Args:
        file_name (str): File Name

    Returns:
        DataFrame: Pandas DataFrame
    """
    file_object = s3.get_object(Bucket=getenv("APPLICATION_CONFIG_BUCKET_NAME"), Key=file_name)
    file_content = file_object["Body"].read()
    return DataFrame.from_csv(file_content, sep=",")


# Must be post due to Lambda Proxy Integration
@app.post("/data/symptom_groups")
def symptom_groups() -> tuple:
    """Get Symptom Groups

    Returns:
        tuple: Response
    """
    sgsd = file_to_dataframe("sgsd.csv")
    print(sgsd)
    return dumps({"symptom_groups": [{"id": 1, "name": "Symptom Group 1"}, {"id": 2, "name": "Symptom Group 2"}]}), 200


# Must be post due to Lambda Proxy Integration
@app.post("/data/symptom_discriminators/{symptom_group_id}")
def symptom_discriminators(symptom_group_id: int) -> tuple:
    """Get Symptom Discriminators using Symptom Group ID

    Returns:
        tuple: Response
    """
    return (
        dumps(
            {
                "symptom_discriminators": [
                    {"id": 1, "name": "Symptom Discriminator 1"},
                    {"id": 2, "name": "Symptom Discriminator 2"},
                ]
            }
        ),
        200,
    )


# Must be post due to Lambda Proxy Integration
@app.post("/data/discriminators")
def discriminators() -> tuple:
    """Get Symptom Groups

    Returns:
        tuple: Response
    """
    return (
        dumps(
            {
                "symptom_discriminators": [
                    {"id": 1, "name": "Symptom Discriminator 1"},
                    {"id": 2, "name": "Symptom Discriminator 2"},
                ]
            }
        ),
        200,
    )


@logger.inject_lambda_context(clear_state=True)
@tracer.capture_lambda_handler(capture_response=True)
def lambda_handler(event: Dict[str, Any], context: LambdaContext) -> Dict[str, Any]:
    return app.resolve(event, context)
