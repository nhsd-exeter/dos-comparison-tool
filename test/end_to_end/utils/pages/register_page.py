from typing import Self

from end_to_end.utils.aws import confirm_user
from end_to_end.utils.drivers.chrome_driver import CHROME_DRIVER
from end_to_end.utils.elements import input_textbox
from end_to_end.utils.environment_variables import get_and_check_environment_variable

from .page import Page


class RegisterPage(Page):
    """Actions and checks for the register page. Includes both the signup and confirm signup forms."""

    url_subdirectory = "/register"

    def sign_up(self: Self, username: str, email: str, password: str) -> None:
        """Sign up."""
        self.input_username(username=username)
        self.input_email(email=email)
        self.input_password(password=password)
        self.navigate_to_next_page()
        # User has been created but not confirmed
        # Due to no test email service, the user will not be able to confirm their account in the tests
        confirm_user(username=email)

    def input_username(self: Self, username: str) -> None:
        """Input username."""
        input_textbox(element_id="authRegisterUsernameInput", text=username)

    def input_email(self: Self, email: str) -> None:
        """Input email."""
        input_textbox(element_id="authRegisterEmailInput", text=email)

    def input_password(self: Self, password: str) -> None:
        """Input password."""
        input_textbox(element_id="authRegisterPasswordInput", text=password)

    def navigate_to_page(self: Self) -> None:
        """Navigate to the homepage."""
        application_url = get_and_check_environment_variable("APPLICATION_URL")
        CHROME_DRIVER.get(f"{application_url}{self.url_subdirectory}")
