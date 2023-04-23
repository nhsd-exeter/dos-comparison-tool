from pytest_bdd import given, scenarios, then, when
from selenium import webdriver

from end_to_end.utils.aws import delete_user, get_secret
from end_to_end.utils.environment_variables import get_and_check_environment_variable
from end_to_end.utils.pages.login_page import LoginPage
from end_to_end.utils.pages.register_page import RegisterPage
from end_to_end.utils.types import SignInContext, SignUpContext
from end_to_end.utils.utils import login_as_user

scenarios("../features/authentication.feature")


@given("a user wants to sign up", target_fixture="context")
def a_user_wants_to_sign_up(driver: webdriver.Remote) -> SignUpContext:
    """Set up the test environment.

    Args:
    ----
        driver (webdriver.Remote): Selenium driver. Created by a pytest fixture.

    Returns:
    -------
        SignUpContext: Context of the test.
    """
    RegisterPage().navigate_to_page()
    deployment_secrets = get_and_check_environment_variable("DEPLOYMENT_SECRETS")
    setup_user_username_key = get_and_check_environment_variable("SETUP_USER_USERNAME_KEY")
    setup_user_password_key = get_and_check_environment_variable("SETUP_USER_PASSWORD_KEY")
    setup_user_email_key = get_and_check_environment_variable("SETUP_USER_EMAIL_KEY")
    secret_value = get_secret(deployment_secrets)
    return SignUpContext(
        username=secret_value[setup_user_username_key],
        password=secret_value[setup_user_password_key],
        email=secret_value[setup_user_email_key],
    )


@when("the user signs up", target_fixture="context")
def the_user_signs_up(context: SignUpContext) -> SignUpContext:
    """Sign up.

    Args:
    ----
        context (SignUpContext): Context of the test.

    Returns:
    -------
        SignUpContext: Context of the test.
    """
    RegisterPage().sign_up(**context)
    return context


@then("the user is able to login")
def the_user_is_able_to_login(context: SignUpContext) -> None:
    """A user is able to login.

    Args:
    ----
        context (SignUpContext): Context of the test.
    """
    login_as_user(username=context["email"], password=context["password"])
    delete_user(context["email"])


@given("a user wants to sign in with invalid credentials", target_fixture="context")
def a_user_wants_to_sign_in_with_invalid_credentials(driver: webdriver.Remote) -> SignUpContext:
    """Set up the test environment.

    Args:
    ----
        driver (webdriver.Remote): Selenium driver. Created by a pytest fixture.

    Returns:
    -------
        SignUpContext: Context of the test.
    """
    LoginPage().navigate_to_page()
    return SignInContext(
        username="invalid_username",
        password="invalid_password",
    )


@when("the user signs in with invalid credentials")
def the_user_signs_in_with_invalid_credentials(context: SignInContext) -> None:
    """Sign in with invalid credentials.

    Args:
    ----
        context (SignInContext): Context of the test.
    """
    LoginPage().login(**context)


@then("the user is not able to login")
def the_user_is_not_able_to_login() -> None:
    """A user is not able to login."""
    assert LoginPage().is_login_error_displayed(), "Login error is not displayed"
