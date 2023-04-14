from ..aws import get_secret
from ..drivers.chrome_driver import get_driver
from ..elements import wait_and_get_element
from ..environment_variables import get_and_check_environment_variable
from .page import Page


class LoginPage(Page):
    """Login Page."""

    url_subdirectory = "/login"
    page_number = 2

    def login(self, username: str = "", password: str = ""):
        """Login to the application. User will be left on menu page."""
        assert (
            self.url_subdirectory in get_driver().current_url
        ), f"Expected to be on {self.url_subdirectory} page but was on {get_driver().current_url}"
        if not username and not password:
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
        secret_name = get_and_check_environment_variable("COGNITO_SECRETS_NAME")
        username = get_and_check_environment_variable("COGNITO_SECRETS_ADMIN_USERNAME_KEY")
        password = get_and_check_environment_variable("COGNITO_SECRETS_ADMIN_PASSWORD_KEY")
        secret_value = get_secret(secret_name=secret_name)
        username = secret_value[username]
        password = secret_value[password]
        return username, password

    def navigate_to_page(self) -> None:
        """Navigate to the homepage"""
        application_url = get_and_check_environment_variable("APPLICATION_URL")
        get_driver().get(f"{application_url}{self.url_subdirectory}")

    def is_login_error_displayed(self) -> bool:
        """Check if the login error is displayed.

        Returns:
            bool: True if the login error is displayed, False otherwise.
        """
        element = wait_and_get_element("error-summary")
        return bool(element.is_displayed() and "Login failed" in element.text)
