from .drivers.chrome_driver import get_driver


def input_textbox(element_id: str, text: str) -> None:
    """Input text into a textbox"""
    get_driver().find_element("id", element_id).send_keys(text)
