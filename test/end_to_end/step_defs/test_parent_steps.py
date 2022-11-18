from pytest_bdd import given, scenarios

from ..utils.drivers.chrome_driver import get_driver


scenarios("../features/smoke.feature")


@given("I an authorised user")
def general_login():
    print("I an authorised user")
