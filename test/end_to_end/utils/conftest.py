from .drivers.chrome_driver import create_driver, close_driver


def pytest_bdd_before_scenario():
    """Create a driver before each scenario."""
    create_driver()


def pytest_bdd_after_scenario():
    """Close the driver after each scenario."""
    close_driver()
