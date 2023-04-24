from typing import Self

from selenium.webdriver.common.by import By

from end_to_end.utils.drivers.chrome_driver import CHROME_DRIVER


class Page:
    """Base class to initialize the base webpage that will be called from all pages."""

    url_subdirectory: str
    page_number: int

    def navigate_to_next_page(self: Self) -> None:
        """Navigate to the next page."""
        click_next_button()


def click_next_button() -> None:
    """Click the next button."""
    CHROME_DRIVER.find_element(By.CLASS_NAME, "nhsuk-button").click()
