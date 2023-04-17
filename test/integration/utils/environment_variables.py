from os import getenv


def get_and_check_environment_variable(variable_name: str) -> str:
    """Get the environment variable and check it is not empty.

    Args:
        variable_name (str): Name of the environment variable.

    Returns:
        str: Value of the environment variable.
    """
    variable_value = getenv(variable_name)
    assert variable_value, f"Environment variable {variable_name} is not set"
    return variable_value


# API Gateway
API_GATEWAY_ENDPOINT = get_and_check_environment_variable("API_GATEWAY_ENDPOINT")
# Cognito
COGNITO_SECRETS_NAME = get_and_check_environment_variable("COGNITO_SECRETS_NAME")
COGNITO_SECRETS_ADMIN_USERNAME_KEY = get_and_check_environment_variable("COGNITO_SECRETS_ADMIN_USERNAME_KEY")
COGNITO_SECRETS_ADMIN_PASSWORD_KEY = get_and_check_environment_variable("COGNITO_SECRETS_ADMIN_PASSWORD_KEY")
COGNITO_SECRETS_USER_POOL_ID_KEY = get_and_check_environment_variable("COGNITO_SECRETS_USER_POOL_ID_KEY")
COGNITO_SECRETS_USER_POOL_CLIENT_ID_KEY = get_and_check_environment_variable("COGNITO_SECRETS_USER_POOL_CLIENT_ID_KEY")
