from os import getenv

from ..drivers.chrome_driver import get_driver
from .page import Page


class HomePage(Page):
    """Actions and checks for the homepage"""

    url_subdirectory = "/"
    page_number = 1

    def navigate_to_page(self):
        """Navigate to the homepage"""
        return get_driver().get(getenv("APPLICATION_URL"))
