from ..drivers.chrome_driver import get_driver
from ..environment_variables import get_and_check_environment_variable
from .page import Page


class HomePage(Page):
    """Actions and checks for the homepage"""

    url_subdirectory = "/"
    page_number = 1

    def navigate_to_page(self):
        """Navigate to the homepage"""
        application_url = get_and_check_environment_variable("APPLICATION_URL")
        return get_driver().get(application_url)
