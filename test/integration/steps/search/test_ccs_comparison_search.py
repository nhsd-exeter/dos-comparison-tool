from pytest_bdd import scenarios, given, when, then

# Scenarios

scenarios("../../features/search/ccs_comparison_search.feature")


@given("I have a CCS Comparison Search request")
def _():
    pass


@when("I send an authenticated CCS Comparison Search request")
def _():
    pass


@then("I should receive a CCS Comparison Search response")
def _():
    pass
