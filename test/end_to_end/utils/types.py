from typing import TypedDict


class SignUpContext(TypedDict):
    """Sign Up Context."""

    username: str
    password: str
    email: str


class SignInContext(TypedDict):
    """Sign In Context."""

    username: str
    password: str
