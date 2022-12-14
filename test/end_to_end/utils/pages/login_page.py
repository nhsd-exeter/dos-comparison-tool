from json import loads
from os import getenv

from boto3 import client

from ..drivers.chrome_driver import get_driver
from .page import Page


class LoginPage(Page):
    """Login Page."""

    url_subdirectory = "/login"
    page_number = 2

    def login(self):
        """Login to the application. User will be left on menu page."""
        assert self.url_subdirectory in get_driver().current_url
        username, password = self.get_username_and_password()
        self.input_username(username)
        self.input_password(password)
        self.navigate_to_next_page()

    def input_username(self, username: str):
        """Input the username."""
        get_driver().find_element("id", "authUsernameInput").send_keys(username)

    def input_password(self, password: str):
        """Input the password."""
        get_driver().find_element("id", "authPasswordInput").send_keys(password)

    def get_username_and_password(self) -> tuple[str, str]:
        """Get the username and password from secrets manager.

        Returns:
            tuple[str, str]: Username and password in that order.
        """
        secret_name = getenv("COGNITO_SECRETS_NAME")
        secret = client("secretsmanager").get_secret_value(SecretId=secret_name)
        secret_value = loads(secret["SecretString"])
        username = secret_value[getenv("COGNITO_SECRETS_ADMIN_USERNAME_KEY")]
        password = secret_value[getenv("COGNITO_SECRETS_ADMIN_PASSWORD_KEY")]
        return username, password
