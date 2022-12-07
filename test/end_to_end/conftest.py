from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait

from .utils.drivers.chrome_driver import close_driver, get_driver
from .utils.pages.home_page import HomePage


def pytest_bdd_before_scenario():
    """Create a driver before each scenario then navigate to the homepage."""
    driver = get_driver()
    HomePage().navigate_to_page()
    WebDriverWait(driver, 10).until(expected_conditions.presence_of_element_located((By.ID, "DoSComparisonToolHeader")))


def pytest_bdd_after_scenario():
    """Close the driver after each scenario."""
    close_driver()
