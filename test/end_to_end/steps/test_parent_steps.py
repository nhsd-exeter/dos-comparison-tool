from pytest_bdd import given, scenarios
from selenium import webdriver

from ..utils.utils import login_as_authorised_user

scenarios("../features/smoke.feature")


@given("I an authorised user")
def given_login_as_authorised_user(driver: webdriver.Remote):
    """Login to the application."""
    login_as_authorised_user()
