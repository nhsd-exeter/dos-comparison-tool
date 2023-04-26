from typing import Self

from end_to_end.utils.aws import get_secret
from end_to_end.utils.drivers.chrome_driver import CHROME_DRIVER
from end_to_end.utils.elements import wait_and_get_element
from end_to_end.utils.environment_variables import get_and_check_environment_variable

from .page import Page


class LoginPage(Page):
    """Login Page."""

    url_subdirectory = "/login"
    page_number = 2
    page_id = "LoginPage"

    def login(self: Self, username: str = "", password: str = "") -> None:
        """Login to the application. User will be left on menu page."""
        assert (
            self.url_subdirectory in CHROME_DRIVER.current_url
        ), f"Expected to be on {self.url_subdirectory} page but was on {CHROME_DRIVER.current_url}"
        if not username and not password:
            username, password = self.get_username_and_password()
        self.input_username(username)
        self.input_password(password)
        self.navigate_to_next_page()

    def input_username(self: Self, username: str) -> None:
        """Input the username."""
        CHROME_DRIVER.find_element("id", "authUsernameInput").send_keys(username)

    def input_password(self: Self, password: str) -> None:
        """Input the password.

        Args:
            password (str): Password to input.
        """
        CHROME_DRIVER.find_element("id", "authPasswordInput").send_keys(password)

    def get_username_and_password(self: Self) -> tuple[str, str]:
        """Get the username and password from secrets manager.

        Returns:
            tuple[str, str]: Username and password in that order.
        """
        secret_name = get_and_check_environment_variable("COGNITO_SECRETS_NAME")
        username = get_and_check_environment_variable(
            "COGNITO_SECRETS_ADMIN_USERNAME_KEY",
        )
        password = get_and_check_environment_variable(
            "COGNITO_SECRETS_ADMIN_PASSWORD_KEY",
        )
        secret_value = get_secret(secret_name=secret_name)
        username = secret_value[username]
        password = secret_value[password]
        return username, password

    def navigate_to_page(self: Self) -> None:
        """Navigate to the homepage."""
        application_url = get_and_check_environment_variable("APPLICATION_URL")
        CHROME_DRIVER.get(f"{application_url}{self.url_subdirectory}")

    def is_login_error_displayed(self: Self) -> bool:
        """Check if the login error is displayed.

        Returns:
            bool: True if the login error is displayed, False otherwise.
        """
        element = wait_and_get_element("error-summary")
        return bool(element.is_displayed() and "Login failed" in element.text)
