from typing import TypedDict


class SignUpContext(TypedDict):
    username: str
    password: str
    email: str


class SignInContext(TypedDict):
    username: str
    password: str
