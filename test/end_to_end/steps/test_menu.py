from pytest_bdd import scenarios, then, when
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait

from end_to_end.utils.drivers.chrome_driver import CHROME_DRIVER

scenarios("../features/menu.feature")


@when("I select CCS Comparison Search")
def _() -> None:
    """I select CCS Comparison Search."""
    WebDriverWait(CHROME_DRIVER, 5).until(expected_conditions.presence_of_element_located((By.ID, "MenuPage")))
    CHROME_DRIVER.find_element(By.ID, "ccsSearchCard").click()


@then("I am on the CCS Comparison Search page")
def _() -> None:
    """I am on the CCS Comparison Search page."""
    WebDriverWait(CHROME_DRIVER, 5).until(
        expected_conditions.presence_of_element_located((By.ID, "CCSComparisonSearchPage")),
    )
