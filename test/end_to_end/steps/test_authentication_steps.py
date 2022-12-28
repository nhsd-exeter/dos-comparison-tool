from pytest_bdd import given, scenarios, when, then
from selenium import webdriver

from ..utils.utils import login_as_authorised_user

scenarios("../features/authentication.feature")


@given("a user wants to sign up")
def a_user_wants_to_sign_up(driver: webdriver.Remote):
    """Set up the test environment."""


@when("the user signs up")
def the_user_signs_up():
    """Sign up."""
    pass


@then("the user is able to login")
def the_user_is_able_to_login():
    """Login."""
    pass
    # login_as_authorised_user()
