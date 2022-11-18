from selenium import webdriver
from os import getenv


def get_driver():
    global driver
    if driver is None:
        options = webdriver.ChromeOptions()
        options.add_argument("--ignore-ssl-errors=yes")
        options.add_argument("--ignore-certificate-errors")
        test_browser_url = getenv("TEST_BROWSER_URL")
        driver = webdriver.Remote(command_executor=test_browser_url, options=options)


def close_driver():
    if driver is not None:
        driver.close()
