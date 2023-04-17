from pytest_bdd import given, scenarios, then, when

scenarios("../../features/data/symptom_groups.feature")


@given("I am on the symptom group search page")
def _():
    """I am on the symptom group search page."""
    pass


@when("I search for a symptom group")
def _():
    """I search for a symptom group."""
    pass


@then("I should see the symptom group search results")
def _():
    """I should see the symptom group search results."""
    pass
