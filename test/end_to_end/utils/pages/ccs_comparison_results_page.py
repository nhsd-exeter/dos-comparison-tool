from typing import Self

from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait

from end_to_end.utils.drivers.chrome_driver import CHROME_DRIVER

from .page import Page


class CCSComparisonResultsPage(Page):
    """Actions and checks for the CCS Comparison Results page."""

    url_subdirectory = "/ccs-comparison-results"
    page_number = 4
    page_id = "CCSComparisonResultsPage"

    def assert_on_page(self: Self) -> None:
        """Assert that the user is on the CCS Comparison Search page."""
        WebDriverWait(CHROME_DRIVER, 20).until(expected_conditions.presence_of_element_located((By.ID, self.page_id)))
