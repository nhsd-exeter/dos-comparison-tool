from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait

from .drivers.chrome_driver import CHROME_DRIVER


def wait_for_element_to_be_visible(element_id: str, timeout: int = 10) -> None:
    """Wait for an element to be visible.

    Args:
        element_id (str): The id of the element
        timeout (int, optional): The timeout in seconds. Defaults to 10.
    """
    WebDriverWait(CHROME_DRIVER, timeout).until(
        expected_conditions.visibility_of_element_located((By.ID, element_id)),
    )


def wait_and_get_element(element_id: str) -> WebElement:
    """Wait for an element to be visible and then return it.

    Args:
        element_id (str): The id of the element

    Returns:
        WebElement: The element
    """
    wait_for_element_to_be_visible(element_id)
    return CHROME_DRIVER.find_element("id", element_id)


def input_textbox(element_id: str, text: str) -> None:
    """Input text into a textbox.

    Args:
        element_id (str): The id of the textbox
        text (str): The text to input
    """
    CHROME_DRIVER.find_element("id", element_id).send_keys(text)


def click_next_button() -> None:
    """Click the next button."""
    CHROME_DRIVER.find_element(By.CLASS_NAME, "nhsuk-button").click()


def click_previous_button() -> None:
    """Click the previous button."""
    CHROME_DRIVER.find_element(By.ID, "previous-button").click()
