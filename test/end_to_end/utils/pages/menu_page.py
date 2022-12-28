from os import getenv

from ..drivers.chrome_driver import get_driver
from .page import Page


class MenuPage(Page):
    """Actions and checks for the menu page"""

    url_subdirectory = "/menu"
    page_number = 3
