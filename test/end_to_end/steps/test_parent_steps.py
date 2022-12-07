from pytest_bdd import given, scenarios

from ..utils.pages.home_page import HomePage
from ..utils.utils import login_as_authorised_user

scenarios("../features/smoke.feature")


@given("I an authorised user")
def given_login_as_authorised_user():
    """Login to the application."""
    login_as_authorised_user()
