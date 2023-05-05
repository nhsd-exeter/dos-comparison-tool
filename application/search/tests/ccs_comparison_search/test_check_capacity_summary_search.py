from json import dumps
from os import environ
from unittest.mock import MagicMock, call, patch
from xml.dom.minidom import parse  # nosec - B408 minidom used to create XML

import pytest

from application.search.ccs_comparison_search.ccs_exceptions import CCSAPIResponseError
from application.search.ccs_comparison_search.check_capacity_summary_search import (
    CheckCapacitySummarySearch,
    compare_search_responses,
)
from application.search.ccs_comparison_search.service import Service

FILE_PATH = "application.search.ccs_comparison_search.check_capacity_summary_search"


class TestCheckCapacitySummarySearch:
    """Tests for the CheckCapacitySummarySearch class."""

    age = 1
    age_format = "years"
    disposition = 1
    gender = "M"
    postcode = "test"
    role = "test"
    search_environment = "test"
    symptom_discriminator_list = [1, 2, 3]
    symptom_group = 1
    search_date_time = "2021-01-01T00:00:00Z"
    expected_search_distance = 20
    expected_version = 1.5

    default_ccs_search = CheckCapacitySummarySearch(
        age=age,
        age_format=age_format,
        disposition=disposition,
        symptom_group=symptom_group,
        symptom_discriminator_list=symptom_discriminator_list,
        gender=gender,
        role=role,
        postcode=postcode,
        search_environment=search_environment,
        search_date_time=search_date_time,
    )

    def test__init__(self) -> None:
        """Test the __init__ method."""
        # Assert
        assert self.default_ccs_search.age == self.age, "Age not set correctly"
        assert self.default_ccs_search.age_format == self.age_format, "Age format not set correctly"
        assert self.default_ccs_search.disposition == self.disposition, "Disposition not set correctly"
        assert self.default_ccs_search.symptom_group == self.symptom_group, "Symptom group not set correctly"
        assert (
            self.default_ccs_search.symptom_discriminator_list == self.symptom_discriminator_list
        ), "Symptom discriminator list not set correctly"
        assert self.default_ccs_search.gender == self.gender, "Gender not set correctly"
        assert self.default_ccs_search.postcode == self.postcode, "Postcode not set correctly"
        assert (
            self.default_ccs_search.search_environment == self.search_environment
        ), "Search environment not set correctly"
        assert (
            self.default_ccs_search.search_distance == self.expected_search_distance
        ), "Search distance not set correctly"
        assert self.default_ccs_search.version == self.expected_version, "Version not set correctly"
        assert self.default_ccs_search.search_date_time == self.search_date_time, "Search date time not set correctly"

    @patch(f"{FILE_PATH}.logger")
    @patch(f"{FILE_PATH}.CheckCapacitySummarySearch._parse_xml_response")
    @patch(f"{FILE_PATH}.post")
    @patch(f"{FILE_PATH}.CheckCapacitySummarySearch._build_request_data")
    @patch(f"{FILE_PATH}.CheckCapacitySummarySearch._get_non_prod_username_and_password")
    def test_search(
        self,
        mock__get_non_prod_username_and_password: MagicMock,
        mock__build_request_data: MagicMock,
        mock_post: MagicMock,
        mock__parse_xml_response: MagicMock,
        mock_logger: MagicMock,
    ) -> None:
        """Test the search method."""
        # Arrange
        environ["PROFILE"] = "dev"
        username = "username"
        password = "password"
        environment_url = "https://test.com"
        status_code = 200
        mock__get_non_prod_username_and_password.return_value = (username, password)
        mock__build_request_data.return_value = return_data = "<xml></xml>"
        mock__parse_xml_response.return_value = expected_return = "parsed xml"
        mock_post.return_value = MagicMock(status_code=status_code)
        # Act
        search_details = self.default_ccs_search.search()
        # Assert
        assert search_details == expected_return, "Search details should be parsed xml"
        mock__get_non_prod_username_and_password.assert_called_once()
        mock__build_request_data.assert_called_with(username, password)
        mock_post(
            url=f"{environment_url}/app/api/webservices",
            headers={"content-type": "text/xml"},
            data=return_data,
            timeout=2,
        )
        mock__parse_xml_response.assert_called_with(mock_post.return_value.text)
        mock_logger.info.assert_has_calls(
            calls=[
                call(
                    f"CCS Request for environment {self.search_environment}",
                    age=self.age,
                    age_format=self.age_format,
                    disposition=self.disposition,
                    symptom_group=self.symptom_group,
                    symptom_discriminator_list=self.symptom_discriminator_list,
                    postcode=self.postcode,
                    gender=self.gender,
                    search_environment=self.search_environment,
                    version=self.expected_version,
                    search_date_time=self.search_date_time,
                ),
                call(
                    f"CCS Request for environment {self.search_environment}",
                    data="<xml></xml>",
                    environment_url=None,
                ),
                call(
                    f"{self.search_environment} CCS Response {status_code}",
                    status_code=status_code,
                    search_environment=self.search_environment,
                ),
            ],
        )
        # Clean up
        del environ["PROFILE"]

    @patch(f"{FILE_PATH}.logger")
    @patch(f"{FILE_PATH}.CheckCapacitySummarySearch._parse_xml_response")
    @patch(f"{FILE_PATH}.post")
    @patch(f"{FILE_PATH}.CheckCapacitySummarySearch._build_request_data")
    @patch(f"{FILE_PATH}.CheckCapacitySummarySearch._get_non_prod_username_and_password")
    def test_search_error(
        self,
        mock__get_non_prod_username_and_password: MagicMock,
        mock__build_request_data: MagicMock,
        mock_post: MagicMock,
        mock__parse_xml_response: MagicMock,
        mock_logger: MagicMock,
    ) -> None:
        """Test the search method."""
        # Arrange
        username = "username"
        password = "password"
        environment_url = "https://test.com"
        status_code = 500
        mock__get_non_prod_username_and_password.return_value = (username, password)
        mock__build_request_data.return_value = return_data = "<xml></xml>"
        mock_post.return_value = MagicMock(status_code=status_code)
        # Act
        with pytest.raises(CCSAPIResponseError) as exception:  # noqa: PT012
            response = self.default_ccs_search.search()
            assert exception == f"CCS Response {status_code}"
            assert response is None, "No expected response"
        # Assert
        mock__get_non_prod_username_and_password.assert_called_once()
        mock__build_request_data.assert_called_with(username, password)
        mock_post(
            url=f"{environment_url}/app/api/webservices",
            headers={"content-type": "text/xml"},
            data=return_data,
            timeout=2,
        )
        mock__parse_xml_response.assert_not_called()
        mock_logger.error.assert_called_once_with(
            f"{self.search_environment} CCS Response {status_code}",
            status_code=status_code,
            search_environment=self.search_environment,
            error_message=mock_post.return_value.text,
        )

    @patch(f"{FILE_PATH}.client")
    def test_get_non_prod_username_and_password(self, mock_client: MagicMock) -> None:
        """Test the _get_non_prod_username_and_password method."""
        # Arrange
        username_value = "username"
        password_value = "password"
        environ["CCS_SECRET_NAME"] = secret_name = "test"
        environ["CCS_USERNAME_KEY"] = username_key = "username_key"
        environ["CCS_PASSWORD_KEY"] = password_key = "password_key"
        mock_client.return_value.get_secret_value.return_value = {
            "SecretString": dumps({username_key: username_value, password_key: password_value}),
        }
        # Act
        username, password = self.default_ccs_search._get_non_prod_username_and_password()
        # Assert
        mock_client.return_value.get_secret_value.assert_called_with(SecretId=secret_name)
        assert username == username_value, "Username should be username value"
        assert password == password_value, "Password should be password value"
        # Cleanup
        del environ["CCS_SECRET_NAME"]
        del environ["CCS_USERNAME_KEY"]
        del environ["CCS_PASSWORD_KEY"]

    def test_get_prod_username_and_password(self) -> None:
        """Test the _get_prod_username_and_password method."""
        # Act
        username, password = self.default_ccs_search._get_prod_username_and_password()
        # Assert
        assert username == self.role, f"Username should be {self.role}"
        assert password == "example-password", "Password should be example-password"

    def test_build_request_data(self) -> None:
        """Test the _build_request_data method."""
        # Arrange
        username = "username"
        password = "password"
        # Act
        request_data = self.default_ccs_search._build_request_data(username, password)
        # Assert
        expected_xml = '<?xml version="1.0" ?><soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:web="https://nww.pathwaysdos.nhs.uk/app/api/webservices"><soap:Header><web:serviceVersion>1.5</web:serviceVersion></soap:Header><soap:Body><web:CheckCapacitySummary><web:userInfo><web:username>username</web:username><web:password>password</web:password></web:userInfo><web:c><web:postcode>test</web:postcode><web:age>1</web:age><web:ageFormat>years</web:ageFormat><web:disposition>1</web:disposition><web:symptomGroup>1</web:symptomGroup><web:searchDistance>20</web:searchDistance><web:gender>M</web:gender><web:SearchDateTime>2021-01-01T00:00:00Z</web:SearchDateTime><web:symptomDiscriminatorList><web:int>1</web:int><web:int>2</web:int><web:int>3</web:int></web:symptomDiscriminatorList></web:c></web:CheckCapacitySummary></soap:Body></soap:Envelope>'  # noqa: E501
        assert request_data == expected_xml, "Request data should be as expected"

    def test_parse_xml_response(self) -> None:
        """Test the _parse_xml_response method."""
        # Arrange
        api_response = parse(  # noqa: S318
            "application/search/tests/ccs_comparison_search/example_ccs_api_response.xml",
        )
        api_response_xml = api_response.toprettyxml()
        # Act
        response = self.default_ccs_search._parse_xml_response(api_response_xml)
        # Assert
        expected_response = [
            Service(
                uid="123",
                name="Test Pharmacy",
                address="1 Pharmacy Lane",
                service_type="Pharmacy",
                distance="0.4",
            ).__dict__,
        ]
        assert expected_response == response, "Service not as expected"


def test_compare_search_responses() -> None:
    """Test the compare_search_responses method."""
    # Arrange
    shared_ccs_search = [
        Service(
            uid="123",
            name="Test Pharmacy",
            address="1 Pharmacy Lane",
            service_type="Pharmacy",
            distance="0.4",
        ).__dict__,
    ]
    # Act
    ccs_search_one_response, ccs_search_two_response = compare_search_responses(shared_ccs_search, shared_ccs_search)
    # Assert
    assert ccs_search_one_response == ccs_search_two_response, "Responses should be the same"
    for response in ccs_search_one_response:
        assert response["equal_results"] is True, "Equal responses should be True"
    for response in ccs_search_two_response:
        assert response["equal_results"] is True, "Equal responses should be True"
