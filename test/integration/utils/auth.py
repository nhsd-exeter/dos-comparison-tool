from pycognito import Cognito

from .environment_variables import (
    COGNITO_SECRETS_ADMIN_PASSWORD_KEY,
    COGNITO_SECRETS_ADMIN_USERNAME_KEY,
    COGNITO_SECRETS_NAME,
    COGNITO_SECRETS_USER_POOL_CLIENT_ID_KEY,
    COGNITO_SECRETS_USER_POOL_ID_KEY,
)
from .secrets_manager import get_secret_value


def get_authentication_token() -> str:
    """Get Authentication Token from Cognito to be used in the Authorization header

    Returns:
        str: Id Token to be used in the Authorization header
    """
    user_name = get_secret_value(COGNITO_SECRETS_NAME, COGNITO_SECRETS_ADMIN_USERNAME_KEY)
    password = get_secret_value(COGNITO_SECRETS_NAME, COGNITO_SECRETS_ADMIN_PASSWORD_KEY)
    user_pool_id = get_secret_value(COGNITO_SECRETS_NAME, COGNITO_SECRETS_USER_POOL_ID_KEY)
    client_id = get_secret_value(COGNITO_SECRETS_NAME, COGNITO_SECRETS_USER_POOL_CLIENT_ID_KEY)
    cognito = Cognito(user_pool_id, client_id, username=user_name)
    cognito.authenticate(password)
    return cognito.id_token
