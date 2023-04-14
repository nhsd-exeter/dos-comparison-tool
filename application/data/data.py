from os import getenv
from typing import Any, Dict

from aws_lambda_powertools.event_handler import APIGatewayRestResolver, CORSConfig
from aws_lambda_powertools.logging import Logger
from aws_lambda_powertools.tracing import Tracer
from aws_lambda_powertools.utilities.typing.lambda_context import LambdaContext
from boto3 import client
from pandas import DataFrame
from pandas.io.parsers import read_csv

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
    bucket_name = getenv("APPLICATION_CONFIG_BUCKET_NAME")
    local_file_name = f"/tmp/{file_name}"
    logger.info(
        f"Getting file {file_name} from S3",
        extra={"file_name": file_name, "bucket_name": bucket_name, "local_file_name": local_file_name},
    )
    s3.download_file(bucket_name, file_name, local_file_name)
    return read_csv(local_file_name)


# Must be post due to Lambda Proxy Integration
@app.post("/data/symptom_groups")
@tracer.capture_method()
def symptom_groups() -> tuple:
    """Get Symptom Groups

    Returns:
        tuple: Response
    """
    symptom_groups = file_to_dataframe("symptom_groups.csv")
    return symptom_groups.to_dict(orient="records"), 200


# Must be post due to Lambda Proxy Integration
@app.post("/data/symptom_discriminators/<symptom_group_id>")
@tracer.capture_method()
def symptom_discriminators(symptom_group_id: str) -> tuple:
    """Get Symptom Discriminators using Symptom Group ID

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
    """Get Symptom Groups

    Returns:
        tuple: Response
    """
    dispositions = file_to_dataframe("dispositions.csv")
    return dispositions.to_dict(orient="records"), 200


@logger.inject_lambda_context(clear_state=True)
@tracer.capture_lambda_handler(capture_response=True)
def lambda_handler(event: Dict[str, Any], context: LambdaContext) -> Dict[str, Any]:
    return app.resolve(event, context)
