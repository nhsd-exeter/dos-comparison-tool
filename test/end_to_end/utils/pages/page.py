from typing import Self

from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait

from end_to_end.utils.drivers.chrome_driver import CHROME_DRIVER
from end_to_end.utils.elements import click_next_button


class Page:
    """Base class to initialize the base webpage that will be called from all pages."""

    url_subdirectory: str
    page_number: int
    page_id: str

    def navigate_to_next_page(self: Self) -> None:
        """Navigate to the next page."""
        click_next_button()

    def assert_on_page(self: Self) -> None:
        """Assert that the page is the current page."""
        WebDriverWait(CHROME_DRIVER, 10).until(
            method=expected_conditions.presence_of_element_located((By.ID, self.page_id)),
            message=f"{self.page_id} not found",
        )
        assert CHROME_DRIVER.current_url.endswith(self.url_subdirectory)
