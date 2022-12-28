from .pages.login_page import LoginPage


def login_as_authorised_user():
    login_page = LoginPage()
    login_page.navigate_to_page()
    login_page.login()


def login_as_user(username: str, password: str):
    """Login to the application. User will be left on menu page."""
    login_page = LoginPage()
    login_page.navigate_to_page()
    login_page.login(username, password)
