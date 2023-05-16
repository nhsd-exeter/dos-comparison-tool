from application.search.ccs_comparison_search.ccs_exceptions import CCSAPIResponseError


class TestCCSAPIResponseError:
    """Test CCSAPIResponseError class."""

    def test__init__(self) -> None:
        """Test CCSAPIResponseError init method."""
        # Arrange
        status_code = 200
        error_code = "test"
        message = "test"
        # Act
        ccs_api_response_error = CCSAPIResponseError(status_code, error_code, message)
        # Assert
        assert ccs_api_response_error.status_code == status_code, "Status code not set correctly"
        assert ccs_api_response_error.error_code == error_code, "Error code not set correctly"
        assert ccs_api_response_error.message == message, "Message not set correctly"

    def test__repr__(self) -> None:
        """Test CCSAPIResponseError representation method."""
        # Arrange
        status_code = 200
        error_code = "test"
        message = "test"
        # Act
        ccs_api_response_error = CCSAPIResponseError(status_code, error_code, message)
        # Assert
        assert ccs_api_response_error.__repr__() == message, "CCS API response error representation not correct"
