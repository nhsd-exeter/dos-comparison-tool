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
    """I return to the CCS Comparison Search page.

    Args:
        key (str): The key to search for.
        value (str): The value to search for.
    """
    ccs_comparison_search = CCSComparisonSearchPage()
    match key:
        case "postcode":
            ccs_comparison_search.enter_search_details(postcode=value)
        case "role":
            ccs_comparison_search.enter_search_details(role=value)
        case "disposition":
            ccs_comparison_search.enter_search_details(disposition=value)
        case "sex":
            ccs_comparison_search.enter_search_details(sex=value)
        case "age":
            ccs_comparison_search.enter_search_details(age=value)
        case _:
            msg = f"Unexpected key: {key}"
            raise ValueError(msg)
    ccs_comparison_search.run_search()


@when(
    parse(
        'I run a CCS Comparison search with symptom group "{symptom_group}" and '
        'symptom discriminator "{symptom_discriminator}" and disposition "{disposition}"',
    ),
)
def _(symptom_group: str, symptom_discriminator: str, disposition: str) -> None:
    """I run a specific CCS Comparison search.

    Args:
        symptom_group (str): The symptom group to search for.
        symptom_discriminator (str): The symptom discriminator to search for.
        disposition (str): The disposition to search for.
    """
    ccs_comparison_search = CCSComparisonSearchPage()
    ccs_comparison_search.enter_search_details(
        symptom_group=symptom_group,
        symptom_discriminator=symptom_discriminator,
        disposition=disposition,
    )
    ccs_comparison_search.run_search()


@when(
    parse(
        'I run a CCS Comparison search with age "{age}" and age unit "{age_group}"',
    ),
)
def _(age: str, age_group: str) -> None:
    """I run a specific CCS Comparison search.

    Args:
        age (str): The age to search for.
        age_group (str): The age group to search for.
    """
    ccs_comparison_search = CCSComparisonSearchPage()
    ccs_comparison_search.enter_search_details(
        age=age,
        age_unit=age_group,
    )
    ccs_comparison_search.run_search()


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
    """Results should have the same ranking.

    Args:
        search_ranking_number (str): The number of results to check.
    """
    CCSComparisonResultsPage().assert_all_ranking_results_are_equal(search_ranking_number=int(search_ranking_number))


@then(parse('I should see the CCS Comparison Search results with error message "{error_message}"'))
def _(error_message: str) -> None:
    """I should see the CCS Comparison Search results page.

    Args:
        error_message (str): The error message to check for.
    """
    ccs_comparison_results_page = CCSComparisonResultsPage()
    ccs_comparison_results_page.assert_on_page()
    ccs_comparison_results_page.assert_error_message_is_displayed(error_message=error_message)
