from selenium.webdriver.common.by import By

from end_to_end.utils.drivers.chrome_driver import get_driver


class Page:
    """Base class to initialize the base webpage that will be called from all pages."""

    url_subdirectory: str
    page_number: int

    def navigate_to_next_page(self):
        """Navigate to the next page."""
        click_next_button()


def click_next_button():
    """Click the next button."""
    return get_driver().find_element(By.CLASS_NAME, "nhsuk-button").click()
