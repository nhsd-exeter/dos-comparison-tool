from pytest_bdd import given, scenarios, then, when


scenarios("../../features/data/symptom_discriminators.feature")


@given("I am on the symptom discriminator search page")
def _():
    """I am on the symptom discriminator search page."""
    pass


@when("I search for a symptom discriminator")
def _():
    """I search for a symptom discriminator."""
    pass


@then("I should see the symptom discriminator search results")
def _():
    """I should see the symptom discriminator search results."""
    pass
