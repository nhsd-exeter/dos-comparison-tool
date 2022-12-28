from typing import TypedDict


class SignUpContext(TypedDict):
    username: str
    password: str
    email: str
