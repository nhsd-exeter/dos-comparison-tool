from os import getenv

from aws_lambda_powertools.logging import Logger
from boto3 import client
from pandas import DataFrame
from pandas.io.parsers import read_csv

s3 = client("s3")
logger = Logger(child=True)


def file_to_dataframe(file_name: str) -> DataFrame:
    """Get File from S3 and Convert to Pandas DataFrame.

    Args:
    ----
        file_name (str): File Name

    Returns:
    -------
        DataFrame: Pandas DataFrame
    """
    bucket_name = getenv("APPLICATION_CONFIG_BUCKET_NAME")
    local_file_name = f"/tmp/{file_name}"  # nosec - This is a local file path in lambda
    logger.info(
        f"Getting file {file_name} from S3",
        extra={"file_name": file_name, "bucket_name": bucket_name, "local_file_name": local_file_name},
    )
    s3.download_file(bucket_name, file_name, local_file_name)
    return read_csv(local_file_name)
