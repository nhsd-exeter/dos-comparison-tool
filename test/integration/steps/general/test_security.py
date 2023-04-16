"""Security feature tests."""

from pytest_bdd import given, scenarios, then, when


scenarios("../../features/general/security.feature")


@given("I have a CCS Comparison Search request")
def _():
    """I have a CCS Comparison Search request."""
    pass


@given("I have a Disposition Search request")
def _():
    """I have a Disposition Search request."""
    pass


@given("I have a Symptom Discriminator Search request")
def _():
    """I have a Symptom Discriminator Search request."""
    pass


@given("I have a Symptom Group Search request")
def _():
    """I have a Symptom Group Search request."""
    pass


@when("I send an unauthenticated CCS Comparison Search request")
def _():
    """I send an unauthenticated CCS Comparison Search request."""
    pass


@when("I send an unauthenticated Disposition Search request")
def _():
    """I send an unauthenticated Disposition Search request."""
    pass


@when("I send an unauthenticated Symptom Discriminator Search request")
def _():
    """I send an unauthenticated Symptom Discriminator Search request."""
    pass


@when("I send an unauthenticated Symptom Group Search request")
def _():
    """I send an unauthenticated Symptom Group Search request."""
    pass


@then("I receive a 403 response")
def _():
    """I receive a 403 response."""
    pass
