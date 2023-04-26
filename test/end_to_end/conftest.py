from pytest_bdd import given

from .utils.utils import login_as_authorised_user

# ----------------
# Steps


@given("I an authorised user")
def _() -> None:
    """Login to the application."""
    login_as_authorised_user()
