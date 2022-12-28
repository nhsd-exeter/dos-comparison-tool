from pytest_bdd import given, scenarios, when, then
from selenium import webdriver

from ..utils.utils import login_as_user
from ..utils.pages.register_page import RegisterPage
from ..utils.types import SignUpContext
from ..utils.aws import get_secret, delete_user
from os import getenv

scenarios("../features/authentication.feature")


@given("a user wants to sign up", target_fixture="context")
def a_user_wants_to_sign_up(driver: webdriver.Remote) -> SignUpContext:
    """Set up the test environment.

    Args:
        driver (webdriver.Remote): Selenium driver. Created by a pytest fixture.

    Returns:
        SignUpContext: Context of the test.
    """
    RegisterPage().navigate_to_page()
    secret_value = get_secret(getenv("DEPLOYMENT_SECRETS"))
    return SignUpContext(
        username=secret_value[getenv("SETUP_USER_USERNAME_KEY")],
        password=secret_value[getenv("SETUP_USER_PASSWORD_KEY")],
        email=secret_value[getenv("SETUP_USER_EMAIL_KEY")],
    )


@when("the user signs up", target_fixture="context")
def the_user_signs_up(context: SignUpContext) -> SignUpContext:
    """Sign up.

    Args:
        context (SignUpContext): Context of the test.

    Returns:
        SignUpContext: Context of the test.
    """
    RegisterPage().sign_up(**context)
    return context


@then("the user is able to login")
def the_user_is_able_to_login(context: SignUpContext) -> None:
    """A user is able to login.

    Args:
        context (SignUpContext): Context of the test.
    """
    login_as_user(username=context["email"], password=context["password"])
    delete_user(context["email"])
