from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait

from .drivers.chrome_driver import get_driver


def wait_for_element_to_be_visible(element_id: str, timeout=10) -> None:
    """Wait for an element to be visible.

    Args:
    ----
        element_id (str): The id of the element
        timeout (int, optional): The timeout in seconds. Defaults to 10.
    """
    WebDriverWait(get_driver(), timeout).until(expected_conditions.visibility_of_element_located((By.ID, element_id)))


def wait_and_get_element(element_id: str) -> WebElement:
    wait_for_element_to_be_visible(element_id)
    return get_driver().find_element("id", element_id)


def input_textbox(element_id: str, text: str) -> None:
    """Input text into a textbox.

    Args:
    ----
        element_id (str): The id of the textbox
        text (str): The text to input
    """
    get_driver().find_element("id", element_id).send_keys(text)
