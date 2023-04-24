from .pages.login_page import LoginPage


def login_as_authorised_user() -> None:
    """Login to the application with admin user. User will be left on menu page."""
    login_page = LoginPage()
    login_page.navigate_to_page()
    login_page.login()


def login_as_user(username: str, password: str) -> None:
    """Login to the application. User will be left on menu page.

    Args:
        username (str): Username to login with
        password (str): Password to login with
    """
    login_page = LoginPage()
    login_page.navigate_to_page()
    login_page.login(username, password)
