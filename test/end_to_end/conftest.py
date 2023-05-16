from pytest_bdd import given

from .utils.drivers.chrome_driver import CHROME_DRIVER
from .utils.utils import login_as_authorised_user

# ----------------
# Steps


@given("I an authorised user")
def _() -> None:
    """Login to the application."""
    login_as_authorised_user()


# ----------------
# Hooks


def pytest_sessionfinish(session, exitstatus):  # noqa: ANN201, ANN001, ARG001
    """Called after whole test run finished, right before returning the exit status to the system."""
    CHROME_DRIVER.quit()
