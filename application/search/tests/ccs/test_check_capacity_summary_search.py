from unittest.mock import MagicMock, patch

from ...ccs.check_capacity_summary_search import CheckCapacitySummarySearch

FILE_PATH = "application.search.ccs.check_capacity_summary_search"


class TestCheckCapacitySummarySearch:
    age = 1
    age_format = "years"
    disposition = 1
    symptom_group = 1
    symptom_discriminator_list = [1, 2, 3]
    gender = "M"
    search_environment = "test"
    expected_search_distance = 20

    def test__init__(self) -> None:
        # Arrange
        # Act
        ccs_search = CheckCapacitySummarySearch(
            age=self.age,
            age_format=self.age_format,
            disposition=self.disposition,
            symptom_group=self.symptom_group,
            symptom_discriminator_list=self.symptom_discriminator_list,
            gender=self.gender,
            search_environment=self.search_environment,
        )
        # Assert
        assert ccs_search.age == self.age, "Age not set correctly"
        assert ccs_search.age_format == self.age_format, "Age format not set correctly"
        assert ccs_search.disposition == self.disposition, "Disposition not set correctly"
        assert ccs_search.symptom_group == self.symptom_group, "Symptom group not set correctly"
        assert (
            ccs_search.symptom_discriminator_list == self.symptom_discriminator_list
        ), "Symptom discriminator list not set correctly"
        assert ccs_search.gender == self.gender, "Gender not set correctly"
        assert ccs_search.search_environment == self.search_environment, "Search environment not set correctly"
        assert ccs_search.search_distance == self.expected_search_distance, "Search distance not set correctly"

    @patch(f"{FILE_PATH}.CheckCapacitySummarySearch._parse_xml_response")
    @patch(f"{FILE_PATH}.post")
    @patch(f"{FILE_PATH}.CheckCapacitySummarySearch._build_request_data")
    @patch(f"{FILE_PATH}.CheckCapacitySummarySearch._get_username_and_password")
    def test_search(
        self,
        mock__get_username_and_password: MagicMock,
        mock__build_request_data: MagicMock,
        mock_post: MagicMock,
        mock__parse_xml_response: MagicMock,
    ) -> None:
        # Arrange
        username = "username"
        password = "password"
        environment_url = "https://test.com"
        mock__get_username_and_password.return_value = (username, password)
        mock__build_request_data.return_value = return_data = "<xml></xml>"
        mock__parse_xml_response.return_value = expected_return = "parsed xml"
        ccs_search = CheckCapacitySummarySearch(
            age=self.age,
            age_format=self.age_format,
            disposition=self.disposition,
            symptom_group=self.symptom_group,
            symptom_discriminator_list=self.symptom_discriminator_list,
            gender=self.gender,
            search_environment=self.search_environment,
        )
        mock_post.return_value = MagicMock(status_code=200)
        # Act
        search_details = ccs_search.search()
        # Assert
        assert search_details == expected_return, "Search details should be parsed xml"
        mock__get_username_and_password.assert_called_once()
        mock__build_request_data.assert_called_with(username, password)
        mock_post(
            url=f"{environment_url}/app/api/webservices",
            headers={"content-type": "text/xml"},
            data=return_data,
            timeout=2,
        )
        mock__parse_xml_response.assert_called_with(mock_post.return_value.text)
