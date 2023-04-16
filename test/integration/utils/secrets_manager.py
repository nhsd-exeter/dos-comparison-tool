from json import loads

from boto3 import client

secrets_manager = client("secretsmanager")


def get_secret(secret_name: str) -> dict:
    """Get Secret from AWS Secrets Manager

    Args:
        secret_name (str): Secret Name

    Returns:
        dict: Secret
    """
    client_response = secrets_manager.get_secret_value(SecretId=secret_name)
    return loads(client_response["SecretString"])


def get_secret_value(secret_name: str, key: str) -> str:
    """Get Secret Value from AWS Secrets Manager

    Args:
        secret_name (str): Secret Name
        key (str): Key

    Returns:
        str: Secret Value
    """
    secret = get_secret(secret_name)
    return secret[key]
