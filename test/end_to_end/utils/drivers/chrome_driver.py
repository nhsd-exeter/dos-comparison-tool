from selenium import webdriver

from end_to_end.utils.environment_variables import get_and_check_environment_variable

options = webdriver.ChromeOptions()
options.add_argument("--ignore-ssl-errors=yes")
options.add_argument("--ignore-certificate-errors")
test_browser_url = get_and_check_environment_variable("TEST_BROWSER_URL")
CHROME_DRIVER = webdriver.Remote(command_executor=test_browser_url, options=options)
