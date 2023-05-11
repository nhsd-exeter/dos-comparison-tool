from typing import Self

from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait

from end_to_end.utils.drivers.chrome_driver import CHROME_DRIVER
from end_to_end.utils.elements import click_previous_button

from .page import Page

DEFAULT_SEARCH_ONE_RESULTS = [
    "ED - Royal Devon and Exeter Hospital - Exeter (CATCH ALL)",
    "ED - Torbay Hospital - Torquay (CATCH ALL)",
    "ED - Royal Devon and Exeter Hospital - Exeter (CATCH ALL)",
    "ED - Torbay Hospital - Torquay (CATCH ALL)",
]
DEFAULT_SEARCH_TWO_RESULTS = [
    "Emergency Department - Leeds, West Yorkshire (General Infirmary) (CATCH ALL)",
    "Emergency Department - Leeds, West Yorkshire (St James University Hospital) (CATCH ALL)",
    "Emergency Department - Leeds, West Yorkshire (General Infirmary) (CATCH ALL)",
    "Emergency Department - Leeds, West Yorkshire (St James University Hospital) (CATCH ALL)",
]


class CCSComparisonResultsPage(Page):
    """Actions and checks for the CCS Comparison Results page."""

    url_subdirectory = "/ccs-comparison-results"
    page_number = 4
    page_id = "CCSComparisonResultsPage"

    def assert_on_page(self: Self) -> None:
        """Assert that the user is on the CCS Comparison Search page."""
        WebDriverWait(CHROME_DRIVER, 20).until(expected_conditions.presence_of_element_located((By.ID, self.page_id)))

    def assert_results_table_are_displayed(self: Self) -> None:
        """Assert that the results are displayed."""
        WebDriverWait(CHROME_DRIVER, 20).until(
            expected_conditions.presence_of_element_located((By.ID, "CCSComparisonResultsTable")),
        )

    def assert_results_table_has_values(self: Self, default_search_results: list[str]) -> None:
        """Assert that the results table has values.

        Args:
            default_search_results (list[str]): The expected results.
        """
        WebDriverWait(CHROME_DRIVER, 20).until(
            expected_conditions.presence_of_element_located((By.CLASS_NAME, "results-card__header__title")),
        )
        headers = CHROME_DRIVER.find_elements(by=By.CLASS_NAME, value="results-card__header__title")
        values = [header.text for header in headers]
        assert values == default_search_results, f"Expected {default_search_results}, got {values}"

    def assert_all_ranking_results_are_equal(self: Self) -> None:
        """Assert that all ranking results are equal."""
        WebDriverWait(CHROME_DRIVER, 20).until(
            expected_conditions.presence_of_element_located((By.ID, "RankingValue")),
        )
        elements = CHROME_DRIVER.find_elements(by=By.ID, value="RankingValue")
        values = [element.text for element in elements]
        ranking_values = [value for value in values if value == "Service/Ranking Same"]
        assert len(ranking_values) == 4, f"Expected 4 equal ranking values, got {len(ranking_values)}"  # noqa: PLR2004

    def navigate_to_previous_page(self: Self) -> None:
        """Navigate to the previous page."""
        click_previous_button()
