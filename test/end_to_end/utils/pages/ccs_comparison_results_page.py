from typing import Self

from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait

from end_to_end.utils.drivers.chrome_driver import CHROME_DRIVER
from end_to_end.utils.elements import click_previous_button

from .page import Page

DEFAULT_SEARCH_ONE_RESULTS_INDIVIDUAL_SEARCH = [
    "Choice - GP - Wonford Green Surgery - Exeter",
    "GP - Wonford Green Surgery - Exeter",
    "WIC - RDE Hospital - Exeter",
    "Choice - GP - Whipton Surgery - Exeter",
    "WIC - Sidwell Street - Exeter",
]

DEFAULT_SEARCH_ONE_RESULTS = DEFAULT_SEARCH_ONE_RESULTS_INDIVIDUAL_SEARCH + DEFAULT_SEARCH_ONE_RESULTS_INDIVIDUAL_SEARCH

DEFAULT_SEARCH_TWO_RESULTS_INDIVIDUAL_SEARCH = [
    "GP - Leeds, West Yorkshire (Dr P Earnshaw & Partners)",
    "GP Choice - Leeds, West Yorkshire (Priory View Medical Centre)",
    "York Street Health Practice",
    "GP Choice - Leeds, West Yorkshire (Lincoln Green Medical Centre)",
    "Minor Injuries Unit - Leeds, West Yorkshire (St Georges Centre)",
    "Walk In Centre - Wakefield, West Yorkshire (King Street Health Centre)",
    "Minor Injuries Unit - Leeds, West Yorkshire (Wharfedale)",
    "Walk in Centre - Leeds, West Yorkshire (Shakespeare Medical Practice)",
]


DEFAULT_SEARCH_TWO_RESULTS = DEFAULT_SEARCH_TWO_RESULTS_INDIVIDUAL_SEARCH + DEFAULT_SEARCH_TWO_RESULTS_INDIVIDUAL_SEARCH


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

    def assert_all_ranking_results_are_equal(self: Self, search_ranking_number: int) -> None:
        """Assert that all ranking results are equal.

        Args:
        search_ranking_number (int): The number of results to expect.
        """
        WebDriverWait(CHROME_DRIVER, 20).until(
            expected_conditions.presence_of_element_located((By.ID, "RankingValue")),
        )
        elements = CHROME_DRIVER.find_elements(by=By.ID, value="RankingValue")
        values = [element.text for element in elements]
        ranking_values = [value for value in values if value == "Service/Ranking Same"]
        assert (
            len(ranking_values) == search_ranking_number
        ), f"Expected {search_ranking_number} equal ranking values, got {len(ranking_values)}"

    def navigate_to_previous_page(self: Self) -> None:
        """Navigate to the previous page."""
        click_previous_button()
