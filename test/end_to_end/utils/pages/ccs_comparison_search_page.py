from typing import Self

from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.wait import WebDriverWait

from end_to_end.utils.drivers.chrome_driver import CHROME_DRIVER
from end_to_end.utils.elements import click_previous_button

from .login_page import LoginPage
from .menu_page import MenuPage
from .page import Page

DEFAULT_POSTCODE_ONE = "EX2 5SE"
DEFAULT_SYMPTOM_GROUP_ONE = "Abdominal or Flank Injury, Blunt"
DEFAULT_SYMPTOM_DISCRIMINATOR_ONE = "PC full Primary Care assessment and prescribing capability"
DEFAULT_DISPOSITION_ONE = "To contact a Primary Care Service within 2 hours"
DEFAULT_SEX_ONE = "Male"
DEFAULT_ENVIRONMENT_ONE = "Regression DI"
DEFAULT_ROLE_ONE = "111 Telephony Referral"
DEFAULT_AGE_ONE = "2"

DEFAULT_POSTCODE_TWO = "LS1 4AP"
DEFAULT_SYMPTOM_GROUP_TWO = "Abdominal or Flank Injury, Blunt"
DEFAULT_SYMPTOM_DISCRIMINATOR_TWO = "PC full Primary Care assessment and prescribing capability"
DEFAULT_DISPOSITION_TWO = "To contact a Primary Care Service within 2 hours"
DEFAULT_SEX_TWO = "Female"
DEFAULT_ENVIRONMENT_TWO = "Regression DI"
DEFAULT_ROLE_TWO = "999 Referral"
DEFAULT_AGE_TWO = "99"

DEFAULT_AGE_UNITS = "Years"

SEARCH_ONE_PREFIX = "SearchOne"
SEARCH_TWO_PREFIX = "SearchTwo"

SYMPTOM_GROUP_LOADING_MESSAGE = "Loading Symptom Groups"
SYMPTOM_DISCRIMINATOR_LOADING_MESSAGE = "Loading Symptom Discriminators"
DISPOSITION_LOADING_MESSAGE = "Loading Dispositions"
ROLE_LOADING_MESSAGE = "Loading roles..."


class CCSComparisonSearchPage(Page):
    """Actions and checks for the CCS Comparison Search page.

    Greek alphabet: is used to define searches for the CCS Comparison Search. E.g ALPHA, BETA, GAMMA, DELTA, EPSILON.
    Search Numbers: is used to define the components of the search. E.g SearchOne, SearchTwo
    """

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
        self.wait_for_drop_downs_to_load()

    def build_default_search_one(self: Self) -> None:
        """Build a CCS Comparison Search."""
        self.wait_for_drop_downs_to_load()
        self.input_values_for_shared_search_criteria(
            postcode=DEFAULT_POSTCODE_ONE,
            symptom_group=DEFAULT_SYMPTOM_GROUP_ONE,
            symptom_discriminator=DEFAULT_SYMPTOM_DISCRIMINATOR_ONE,
            disposition=DEFAULT_DISPOSITION_ONE,
            sex=DEFAULT_SEX_ONE,
        )
        self.input_values_for_specific_search_criteria(
            search_prefix=SEARCH_ONE_PREFIX,
            environment=DEFAULT_ENVIRONMENT_ONE,
            role=DEFAULT_ROLE_ONE,
            age=DEFAULT_AGE_ONE,
        )
        self.input_values_for_specific_search_criteria(
            search_prefix=SEARCH_TWO_PREFIX,
            environment=DEFAULT_ENVIRONMENT_ONE,
            role=DEFAULT_ROLE_ONE,
            age=DEFAULT_AGE_ONE,
        )

    def build_default_search_two(self: Self) -> None:
        """Build a CCS Comparison Search."""
        self.wait_for_drop_downs_to_load()
        self.input_values_for_shared_search_criteria(
            postcode=DEFAULT_POSTCODE_TWO,
            symptom_group=DEFAULT_SYMPTOM_GROUP_TWO,
            symptom_discriminator=DEFAULT_SYMPTOM_DISCRIMINATOR_TWO,
            disposition=DEFAULT_DISPOSITION_TWO,
            sex=DEFAULT_SEX_TWO,
        )
        self.input_values_for_specific_search_criteria(
            search_prefix=SEARCH_ONE_PREFIX,
            environment=DEFAULT_ENVIRONMENT_TWO,
            role=DEFAULT_ROLE_TWO,
            age=DEFAULT_AGE_TWO,
        )
        self.input_values_for_specific_search_criteria(
            search_prefix=SEARCH_TWO_PREFIX,
            environment=DEFAULT_ENVIRONMENT_TWO,
            role=DEFAULT_ROLE_TWO,
            age=DEFAULT_AGE_TWO,
        )

    def navigate_to_previous_page(self: Self) -> None:
        """Navigate to the previous page."""
        click_previous_button()

    def run_search(self: Self) -> None:
        """Run a CCS Comparison Search."""
        self.navigate_to_next_page()

    def input_values_for_shared_search_criteria(  # noqa: PLR0913
        self: Self,
        postcode: str,
        symptom_group: str,
        symptom_discriminator: str,
        disposition: str,
        sex: str,
    ) -> None:
        """Input default values for shared search criteria.

        Args:
            postcode (str): Postcode to search for.
            symptom_group (str): Symptom group to search for.
            symptom_discriminator (str): Symptom discriminator to search for.
            disposition (str): Disposition to search for.
            sex (str): Sex to search for.
        """
        self.input_text_into_field("PostcodeInput", postcode)
        self.select_from_dropdown("SymptomGroupDropDown", symptom_group)
        WebDriverWait(CHROME_DRIVER, 15).until_not(
            method=expected_conditions.text_to_be_present_in_element(
                (By.ID, "SymptomDiscriminatorDropDown"),
                SYMPTOM_DISCRIMINATOR_LOADING_MESSAGE,
            ),
            message="Symptom Discriminator dropdown did not load values.",
        )
        self.select_from_dropdown("SymptomDiscriminatorDropDown", symptom_discriminator)
        self.select_from_dropdown("DispositionDropDown", disposition)
        self.select_from_dropdown("SexDropDown", sex)

    def input_values_for_specific_search_criteria(
        self: Self,
        search_prefix: str,
        environment: str,
        role: str,
        age: str,
    ) -> None:
        """Input default values for specific search criteria.

        Args:
            search_prefix (str): Prefix for the search.
            environment (str): Environment to search for.
            role (str): Role to search for.
            age (str): Age to search for.
        """
        self.select_from_dropdown(
            drop_down_name=f"{search_prefix}EnvironmentDropDown",
            drop_down_text=environment,
        )
        self.select_from_dropdown(drop_down_name=f"{search_prefix}RoleDropDown", drop_down_text=role)
        self.input_text_into_field(field_name=f"{search_prefix}AgeInput", text=age)
        self.select_from_dropdown(drop_down_name=f"{search_prefix}AgeUnitsDropDown", drop_down_text=DEFAULT_AGE_UNITS)

    def enter_search_details(  # noqa: PLR0913
        self: Self,
        postcode: str = DEFAULT_POSTCODE_ONE,
        symptom_group: str = DEFAULT_SYMPTOM_GROUP_ONE,
        symptom_discriminator: str = DEFAULT_SYMPTOM_DISCRIMINATOR_ONE,
        disposition: str = DEFAULT_DISPOSITION_ONE,
        sex: str = DEFAULT_SEX_ONE,
        environment: str = DEFAULT_ENVIRONMENT_ONE,
        role: str = DEFAULT_ROLE_ONE,
        age: str = DEFAULT_AGE_ONE,
    ) -> None:
        """Enter all search details.

        Args:
            postcode (str): Postcode to search for.
            symptom_group (str): Symptom group to search for.
            symptom_discriminator (str): Symptom discriminator to search for.
            disposition (str): Disposition to search for.
            sex (str): Sex to search for.
            environment (str): Environment to search for.
            role (str): Role to search for.
            age (str): Age to search for.
        """
        self.wait_for_drop_downs_to_load()
        self.input_values_for_shared_search_criteria(
            postcode=postcode,
            symptom_group=symptom_group,
            symptom_discriminator=symptom_discriminator,
            disposition=disposition,
            sex=sex,
        )
        self.input_values_for_specific_search_criteria(
            search_prefix=SEARCH_ONE_PREFIX,
            environment=environment,
            role=role,
            age=DEFAULT_AGE_ONE,
        )
        self.input_values_for_specific_search_criteria(
            search_prefix=SEARCH_TWO_PREFIX,
            environment=environment,
            role=role,
            age=age,
        )

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

    def wait_for_drop_downs_to_load(self: Self) -> None:
        """Wait for the dropdowns to load data from the data lambda."""
        WebDriverWait(CHROME_DRIVER, 15).until(
            method=expected_conditions.text_to_be_present_in_element(
                (By.ID, "SymptomGroupDropDown"),
                DEFAULT_SYMPTOM_GROUP_ONE,
            ),
            message="Symptom group dropdown did not load values.",
        )
        WebDriverWait(CHROME_DRIVER, 2).until(
            method=expected_conditions.text_to_be_present_in_element(
                (By.ID, "DispositionDropDown"),
                DEFAULT_DISPOSITION_ONE,
            ),
            message="Disposition dropdown did not load values.",
        )
        WebDriverWait(CHROME_DRIVER, 2).until(
            method=expected_conditions.text_to_be_present_in_element(
                (By.ID, "SearchOneRoleDropDown"),
                DEFAULT_ROLE_ONE,
            ),
            message="Search one role dropdown did not load values.",
        )
        WebDriverWait(CHROME_DRIVER, 2).until(
            method=expected_conditions.text_to_be_present_in_element(
                (By.ID, "SearchOneRoleDropDown"),
                DEFAULT_ROLE_TWO,
            ),
            message="Search two role dropdown did not load values.",
        )
