from os import environ
from unittest.mock import MagicMock, patch

from pandas import DataFrame

from application.data.utils import file_to_dataframe

FILE_PATH = "application.data.utils"


@patch(f"{FILE_PATH}.read_csv")
@patch(f"{FILE_PATH}.s3")
def test_file_to_dataframe(mock_s3: MagicMock, mock_read_csv: MagicMock) -> None:
    """Test file to dataframe.

    Args:
        mock_s3 (MagicMock): Mocked s3.
        mock_read_csv (MagicMock): Mocked read_csv.
    """
    # Arrange
    environ["APPLICATION_CONFIG_BUCKET_NAME"] = bucket_name = "test-bucket"
    file_name = "test.csv"
    mock_read_csv.return_value = DataFrame()
    # Act
    dataframe = file_to_dataframe(file_name)
    # Assert
    assert isinstance(dataframe, DataFrame)
    mock_s3.download_file.assert_called_once_with(
        bucket_name,
        file_name,
        f"/tmp/{file_name}",  # noqa: S108 - This is a local file path in lambda
    )
    mock_read_csv.assert_called_once_with(f"/tmp/{file_name}")  # noqa: S108 - This is a local file path in lambda
