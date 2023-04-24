from typing import Self

from end_to_end.utils.drivers.chrome_driver import CHROME_DRIVER
from end_to_end.utils.environment_variables import get_and_check_environment_variable

from .page import Page


class HomePage(Page):
    """Actions and checks for the homepage."""

    url_subdirectory = "/"
    page_number = 1

    def navigate_to_page(self: Self) -> None:
        """Navigate to the homepage."""
        application_url = get_and_check_environment_variable("APPLICATION_URL")
        return CHROME_DRIVER.get(application_url)
