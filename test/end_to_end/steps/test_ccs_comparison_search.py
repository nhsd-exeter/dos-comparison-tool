from pytest_bdd import given, scenarios, then, when

from end_to_end.utils.pages.ccs_comparison_results_page import CCSComparisonResultsPage
from end_to_end.utils.pages.ccs_comparison_search_page import CCSComparisonSearchPage

scenarios("../features/ccs_comparison_search.feature")


@given("I am on the CCS Comparison Search page")
def _() -> None:
    """I am on the CCS Comparison Search page."""
    CCSComparisonSearchPage().navigate_to_page()


@when("I run a CCS Comparison search")
def _() -> None:
    ccs_comparison_search = CCSComparisonSearchPage()
    ccs_comparison_search.build_search()
    ccs_comparison_search.run_search()


@then("I should see the CCS Comparison Search results page")
def _() -> None:
    """I should see the CCS Comparison Search results page."""
    CCSComparisonResultsPage().assert_on_page()
