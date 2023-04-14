from selenium import webdriver

from ..environment_variables import get_and_check_environment_variable

driver = None


def create_driver() -> driver:
    global driver
    options = webdriver.ChromeOptions()
    options.add_argument("--ignore-ssl-errors=yes")
    options.add_argument("--ignore-certificate-errors")
    test_browser_url = get_and_check_environment_variable("TEST_BROWSER_URL")
    driver = webdriver.Remote(command_executor=test_browser_url, options=options)
    return driver


def get_driver() -> webdriver.Remote:
    global driver
    return driver


def close_driver() -> None:
    global driver
    if driver is not None:
        driver.close()
