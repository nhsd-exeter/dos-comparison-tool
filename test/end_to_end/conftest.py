from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait

from .utils.drivers.chrome_driver import close_driver, create_driver
from .utils.pages.home_page import HomePage
from pytest import fixture
from .utils.constants import HOMEPAGE_WAIT_TIMEOUT


@fixture()
def driver() -> webdriver.Remote:
    """A fixture to prepare for the test by creating a driver then navigating the driver to the homepage."""
    driver = create_driver()
    HomePage().navigate_to_page()
    WebDriverWait(driver, HOMEPAGE_WAIT_TIMEOUT).until(
        expected_conditions.presence_of_element_located((By.ID, "DoSComparisonToolHeader"))
    )
    return driver


def pytest_bdd_after_scenario():
    """Hook to close the driver after each scenario."""
    close_driver()
