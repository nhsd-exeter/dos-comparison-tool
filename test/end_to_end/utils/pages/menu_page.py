from typing import Self

from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait

from end_to_end.utils.drivers.chrome_driver import CHROME_DRIVER

from .page import Page


class MenuPage(Page):
    """Actions and checks for the menu page."""

    url_subdirectory = "/menu"
    page_number = 3
    page_id = "MenuPage"

    def navigate_to_page(self: Self) -> None:
        """Navigate to the menu page."""
        self.navigate_to_next_page()

    def select_ccs_comparison_search(self: Self) -> None:
        """Select the CCS Comparison Search."""
        WebDriverWait(CHROME_DRIVER, 5).until(expected_conditions.presence_of_element_located((By.ID, "MenuPage")))
        CHROME_DRIVER.find_element(By.ID, "ccsSearchCard").click()
