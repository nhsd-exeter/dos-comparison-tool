from pytest_bdd import given, scenarios

from ..utils.drivers.chrome_driver import get_driver

from ..utils.pages.homepage import homepage

scenarios("../features/smoke.feature")


@given("I an authorised user")
def general_login():
    print("I an authorised user")
    homepage().go_to_page()
    print("I am on the homepage")
