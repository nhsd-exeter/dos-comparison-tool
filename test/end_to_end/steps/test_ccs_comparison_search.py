from pytest_bdd import given, scenarios, then, when
from pytest_bdd.parsers import parse

from end_to_end.utils.pages.ccs_comparison_results_page import (
    DEFAULT_SEARCH_ONE_RESULTS,
    DEFAULT_SEARCH_TWO_RESULTS,
    CCSComparisonResultsPage,
)
from end_to_end.utils.pages.ccs_comparison_search_page import CCSComparisonSearchPage

scenarios("../features/ccs_comparison_search.feature")


@given("I am on the CCS Comparison Search page")
def _() -> None:
    """I am on the CCS Comparison Search page."""
    CCSComparisonSearchPage().navigate_to_page()


@when("I run a CCS Comparison search with default values one")
def _() -> None:
    ccs_comparison_search = CCSComparisonSearchPage()
    ccs_comparison_search.build_default_search_one()
    ccs_comparison_search.run_search()


@when("I run a CCS Comparison search with default values two")
def _() -> None:
    ccs_comparison_search = CCSComparisonSearchPage()
    ccs_comparison_search.build_default_search_two()
    ccs_comparison_search.run_search()


@when("I return to the CCS Comparison Search page")
def _() -> None:
    """I return to the CCS Comparison Search page."""
    CCSComparisonResultsPage().navigate_to_previous_page()


@when(parse('I run a CCS Comparison search with "{key}" "{value}"'))
def _(key: str, value: str) -> None:
    """I return to the CCS Comparison Search page."""
    ccs_comparison_search = CCSComparisonSearchPage()
    match key:
        case "postcode":
            ccs_comparison_search.enter_search_details(postcode=value)
    ccs_comparison_search.run_search()
    # _:


@then("I should see the CCS Comparison Search results page with expected results one")
def _() -> None:
    """I should see the CCS Comparison Search results page."""
    ccs_comparison_results_page = CCSComparisonResultsPage()
    ccs_comparison_results_page.assert_on_page()
    ccs_comparison_results_page.assert_results_table_are_displayed()
    ccs_comparison_results_page.assert_results_table_has_values(default_search_results=DEFAULT_SEARCH_ONE_RESULTS)


@then("I should see the CCS Comparison Search results page with expected results two")
def _() -> None:
    """I should see the CCS Comparison Search results page."""
    ccs_comparison_results_page = CCSComparisonResultsPage()
    ccs_comparison_results_page.assert_on_page()
    ccs_comparison_results_page.assert_results_table_are_displayed()
    ccs_comparison_results_page.assert_results_table_has_values(default_search_results=DEFAULT_SEARCH_TWO_RESULTS)


@then("I should see the CCS Comparison Search results page")
def _() -> None:
    """I should see the CCS Comparison Search results page."""
    ccs_comparison_results_page = CCSComparisonResultsPage()
    ccs_comparison_results_page.assert_on_page()
    ccs_comparison_results_page.assert_results_table_are_displayed()


@then("I should see the CCS Comparison Search page")
def _() -> None:
    """I should see the CCS Comparison Search page."""
    CCSComparisonSearchPage().assert_on_page()


@then(parse('Results should have the same ranking for "{search_ranking_number}" services'))
def _(search_ranking_number: str) -> None:
    """Results should have the same ranking."""
    CCSComparisonResultsPage().assert_all_ranking_results_are_equal(search_ranking_number=int(search_ranking_number))
