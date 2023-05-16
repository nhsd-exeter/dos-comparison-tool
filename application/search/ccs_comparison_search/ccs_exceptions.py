class CCSAPIResponseError(Exception):
    """Exception raised for errors in the CCS API response.

    Attributes:
        status_code -- HTTP status code
        message -- explanation of the error
    """

    def __init__(self, status_code: int, error_code: str, message: str) -> None:
        """Initialise CCSAPIResponseError.

        Args:
            status_code (int): HTTP status code
            error_code (str): CCS error code
            message (str): explanation of the error
        """
        self.status_code = status_code
        self.error_code = error_code
        self.message = message

    def __repr__(self) -> str:
        """Return a string representation of the exception."""
        return self.message
