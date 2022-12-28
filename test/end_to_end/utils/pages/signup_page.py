from os import getenv
from typing import Self

from ..drivers.chrome_driver import get_driver
from .page import Page


class SignUpPage(Page):
    """Actions and checks for the sign up page
    Includes both the signup and confirm signup forms
    """

    url_subdirectory = "/"

    def navigate_to_page(self: Self) -> None:
        """Navigate to the sign up page"""
        get_driver().get(f'{getenv("APPLICATION_URL")}{self.url_subdirectory}')
