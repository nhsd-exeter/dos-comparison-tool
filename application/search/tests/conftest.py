from json import dumps

import pytest


@pytest.fixture()
def search_request() -> dict[str, dict[str, str | int | list[int]]]:
    """Fixture to return a search request."""
    return {"body": dumps(SEARCH_REQUEST)}


SEARCH_REQUEST = {
    "search_one": {
        "age": 1,
        "age_format": "years",
        "disposition": 1,
        "symptom_group": 1,
        "symptom_discriminator_list": [1, 2, 3],
        "search_distance": 1,
        "gender": "M",
        "search_environment": "test",
    },
    "search_two": {
        "age": 1,
        "age_format": "years",
        "disposition": 1,
        "symptom_group": 1,
        "symptom_discriminator_list": [1, 2, 3],
        "search_distance": 1,
        "gender": "M",
        "search_environment": "test2",
    },
}
