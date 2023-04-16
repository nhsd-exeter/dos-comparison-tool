from pytest_bdd import given, scenarios, then, when


scenarios("../../features/data/dispositions.feature")


@given("I am on the disposition search page")
def _():
    """I am on the disposition search page."""
    pass


@when("I search for a disposition")
def _():
    """I search for a disposition."""
    pass


@then("I should see the disposition search results")
def _():
    """I should see the disposition search results."""
    pass
