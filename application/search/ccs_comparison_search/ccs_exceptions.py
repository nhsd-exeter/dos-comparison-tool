from typing import Self


class CCSAPIResponseError(Exception):
    """Exception raised for errors in the CCS API response.

    Attributes:
        status_code -- HTTP status code
        message -- explanation of the error
    """

    def __init__(self: Self, status_code: int, message: str) -> None:
        """Initialise CCSAPIResponseError.

        Args:
            status_code (int): HTTP status code
            message (str): explanation of the error
        """
        self.status_code = status_code
        self.message = message
