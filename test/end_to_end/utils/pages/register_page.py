from os import getenv
from typing import Self

from ..drivers.chrome_driver import get_driver
from .page import Page
from ..elements import input_textbox
from ..aws import confirm_user
from time import sleep


class RegisterPage(Page):
    """Actions and checks for the register page
    Includes both the signup and confirm signup forms
    """

    url_subdirectory = "/register"

    def navigate_to_page(self: Self) -> None:
        """Navigate to the sign up page"""
        get_driver().get(f'{getenv("APPLICATION_URL")}{self.url_subdirectory}')

    def sign_up(self: Self, username: str, email: str, password: str) -> None:
        """Sign up"""
        self.input_username(username=username)
        self.input_email(email=email)
        self.input_password(password=password)
        self.navigate_to_next_page()
        # User has been created but not confirmed
        # Due to no test email service, the user will not be able to confirm their account in the tests
        confirm_user(username=email)

    def input_username(self: Self, username: str) -> None:
        """Input username"""
        input_textbox(element_id="authRegisterUsernameInput", text=username)

    def input_email(self: Self, email: str) -> None:
        """Input email"""
        input_textbox(element_id="authRegisterEmailInput", text=email)

    def input_password(self: Self, password: str) -> None:
        """Input password"""
        input_textbox(element_id="authRegisterPasswordInput", text=password)

    def navigate_to_page(self):
        """Navigate to the homepage"""
        return get_driver().get(f'{getenv("APPLICATION_URL")}{self.url_subdirectory}')
