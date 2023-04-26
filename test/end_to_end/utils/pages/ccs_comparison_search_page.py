from typing import Self

from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.wait import WebDriverWait

from end_to_end.utils.drivers.chrome_driver import CHROME_DRIVER

from .login_page import LoginPage
from .menu_page import MenuPage
from .page import Page

DEFAULT_POSTCODE = "EX2 5SE"
DEFAULT_SYMPTOM_GROUP = "Arm, Pain or Swelling"
DEFAULT_SYMPTOM_DISCRIMINATOR = "AMB Bleeding"
DEFAULT_DISPOSITION = "To contact a Primary Care Service with 2 hours"
DEFAULT_SEX = "Male"


class CCSComparisonSearchPage(Page):
    """Actions and checks for the CCS Comparison Search page."""

    url_subdirectory = "/ccs-comparison-search"
    page_number = 4
    page_id = "CCSComparisonSearchPage"

    def navigate_to_page(self: Self) -> None:
        """Navigate to the CCS Comparison Search page."""
        login_page = LoginPage()
        login_page.navigate_to_page()
        login_page.login()
        login_page.navigate_to_next_page()
        MenuPage().select_ccs_comparison_search()
        self.assert_on_page()

    def build_search(self: Self) -> None:
        """Build a CCS Comparison Search."""
        self.input_default_values_for_shared_search_criteria()
        self.input_default_values_for_specific_search_criteria(search_prefix="SearchOne")
        self.input_default_values_for_specific_search_criteria(search_prefix="SearchTwo")

    def run_search(self: Self) -> None:
        """Run a CCS Comparison Search."""
        self.navigate_to_next_page()

    def input_default_values_for_shared_search_criteria(self: Self) -> None:
        """Input default values for shared search criteria."""
        self.input_text_into_field("PostcodeInput", DEFAULT_POSTCODE)
        self.select_from_dropdown("SymptomGroupDropDown", DEFAULT_SYMPTOM_GROUP)
        self.select_from_dropdown("SymptomDiscriminatorDropDown", DEFAULT_SYMPTOM_DISCRIMINATOR)
        self.select_from_dropdown("DispositionDropDown", DEFAULT_DISPOSITION)
        self.select_from_dropdown("SexDropDown", DEFAULT_SEX)

    def input_default_values_for_specific_search_criteria(self: Self, search_prefix: str) -> None:
        """Input default values for specific search criteria.

        Args:
            search_prefix (str): Prefix for the search.
        """
        self.select_from_dropdown(drop_down_name=f"{search_prefix}EnvironmentDropDown", drop_down_text="Regression DI")
        self.select_from_dropdown(drop_down_name=f"{search_prefix}RoleDropDown", drop_down_text="111 Telephony")
        self.input_text_into_field(field_name=f"{search_prefix}AgeInput", text="2")
        self.select_from_dropdown(drop_down_name=f"{search_prefix}AgeUnitsDropDown", drop_down_text="Years")

    def input_text_into_field(self: Self, field_name: str, text: str) -> None:
        """Input text into a field.

        Args:
            field_name (str): Name of the field.
            text (str): Text to input into the field.
        """
        CHROME_DRIVER.find_element(By.ID, field_name).send_keys(text)

    def select_from_dropdown(self: Self, drop_down_name: str, drop_down_text: str) -> None:
        """Select from a dropdown.

        Args:
            drop_down_name (str): Name of the dropdown.
            drop_down_text (str): Text to select from the dropdown.
        """
        select = Select(CHROME_DRIVER.find_element(By.ID, drop_down_name))
        select.select_by_visible_text(drop_down_text)

    def assert_on_page(self: Self) -> None:
        """Assert that the user is on the CCS Comparison Search page."""
        WebDriverWait(CHROME_DRIVER, 20).until(expected_conditions.presence_of_element_located((By.ID, self.page_id)))
