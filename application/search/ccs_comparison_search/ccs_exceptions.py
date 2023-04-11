class CCSAPIResponseException(Exception):
    """Exception raised for errors in the CCS API response.

    Attributes:
        status_code -- HTTP status code
        message -- explanation of the error
    """

    def __init__(self, status_code: int, message: str):
        self.status_code = status_code
        self.message = message
