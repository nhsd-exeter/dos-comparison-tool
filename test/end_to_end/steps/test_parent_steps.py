from time import sleep

from pytest_bdd import given, scenarios

from ..utils.pages.homepage import HomePage

scenarios("../features/smoke.feature")


@given("I an authorised user")
def login():
    """Login to the application."""
    HomePage().navigate_to_next_page()
