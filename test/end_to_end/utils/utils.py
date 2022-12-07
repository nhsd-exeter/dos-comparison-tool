from .pages.home_page import HomePage
from .pages.login_page import LoginPage


def login_as_authorised_user():
    """Login to the application. User will be left on menu page."""
    home_page = HomePage()
    home_page.navigate_to_next_page()
    login_page = LoginPage()
    login_page.login()
