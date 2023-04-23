from dataclasses import dataclass

import pytest


@pytest.fixture()
def lambda_context() -> dataclass:
    """Mock LambdaContext - All dummy values.

    Returns:
    -------
        LambdaContext
    """

    @dataclass
    class LambdaContext:
        """Mock LambdaContext - All dummy values."""

        function_name: str = "lambda"
        memory_limit_in_mb: int = 128
        invoked_function_arn: str = "arn:aws:lambda:eu-west-1:000000000:function:lambda"
        aws_request_id: str = "212ef1ea-2182-154f-163f-5f0f9a621d72"

    return LambdaContext()
