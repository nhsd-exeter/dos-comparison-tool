from json import loads
from os import getenv

from boto3 import client


def get_secret(secret_name: str) -> dict[str, str]:
    """Get the secret from AWS Secrets Manager.

    Args:
        secret_name (str): Name of the secret to get.

    Returns:
        dict[str, str]: Secret value.
    """
    secret = client("secretsmanager").get_secret_value(SecretId=secret_name)
    return loads(secret["SecretString"])


def confirm_user(username: str) -> None:
    """Confirm the user.

    Args:
        username (str): Username of the user to confirm.
    """
    secret_value = get_secret(getenv("COGNITO_SECRETS_NAME"))
    client("cognito-idp").admin_confirm_sign_up(UserPoolId=secret_value["USER_POOL_ID"], Username=username)


def delete_user(username: str) -> None:
    """Delete the user.

    Args:
        username (str): Username of the user to delete.
    """
    secret_value = get_secret(getenv("COGNITO_SECRETS_NAME"))
    client("cognito-idp").admin_delete_user(UserPoolId=secret_value["USER_POOL_ID"], Username=username)
