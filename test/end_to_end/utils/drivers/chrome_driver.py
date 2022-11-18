from selenium import webdriver
from os import getenv

driver = None


def create_driver() -> None:
    global driver
    options = webdriver.ChromeOptions()
    options.add_argument("--ignore-ssl-errors=yes")
    options.add_argument("--ignore-certificate-errors")
    test_browser_url = getenv("TEST_BROWSER_URL")
    driver = webdriver.Remote(command_executor=test_browser_url, options=options)


def get_driver() -> webdriver:
    return driver


def close_driver():
    if driver is not None:
        driver.close()
