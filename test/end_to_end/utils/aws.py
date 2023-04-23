from json import loads

from boto3 import client

from end_to_end.utils.environment_variables import get_and_check_environment_variable


def get_secret(secret_name: str) -> dict[str, str]:
    """Get the secret from AWS Secrets Manager.

    Args:
    ----
        secret_name (str): Name of the secret to get.

    Returns:
    -------
        dict[str, str]: Secret value.
    """
    secret = client("secretsmanager").get_secret_value(SecretId=secret_name)
    return loads(secret["SecretString"])


def confirm_user(username: str) -> None:
    """Confirm the user.

    Args:
    ----
        username (str): Username of the user to confirm.
    """
    secret_name = get_and_check_environment_variable("COGNITO_SECRETS_NAME")
    secret_value = get_secret(secret_name)
    client("cognito-idp").admin_confirm_sign_up(UserPoolId=secret_value["USER_POOL_ID"], Username=username)


def delete_user(username: str) -> None:
    """Delete the user.

    Args:
    ----
        username (str): Username of the user to delete.
    """
    secret_name = get_and_check_environment_variable("COGNITO_SECRETS_NAME")
    secret_value = get_secret(secret_name)
    client("cognito-idp").admin_delete_user(UserPoolId=secret_value["USER_POOL_ID"], Username=username)
