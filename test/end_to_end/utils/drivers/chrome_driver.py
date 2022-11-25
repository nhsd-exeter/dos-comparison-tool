from os import getenv

from selenium import webdriver

driver = None


def create_driver() -> None:
    global driver
    options = webdriver.ChromeOptions()
    options.add_argument("--ignore-ssl-errors=yes")
    options.add_argument("--ignore-certificate-errors")
    test_browser_url = getenv("TEST_BROWSER_URL")
    driver = webdriver.Remote(command_executor=test_browser_url, options=options)


def get_driver() -> webdriver:
    if driver is None:
        create_driver()
    return driver


def close_driver():
    if driver is not None:
        driver.close()
