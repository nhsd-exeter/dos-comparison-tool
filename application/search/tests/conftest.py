from json import dumps, load
from os import path

from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2
from pytest import fixture


@fixture
def search_request():
    #  Open the test event file
    filename = "test_event.json"
    current_dir = path.dirname(path.abspath(__file__))
    with open(f"{current_dir}/{filename}") as file:
        file_contents = load(file)
        file_contents["body"] = dumps(SEARCH_REQUEST)
        event = APIGatewayProxyEventV2(file_contents)
        file.close()
    return event


@fixture
def invalid_search_request():
    #  Open the test event file
    filename = "test_event.json"
    current_dir = path.dirname(path.abspath(__file__))
    with open(f"{current_dir}/{filename}") as file:
        file_contents = load(file)
        file_contents["body"] = "abc"
        event = APIGatewayProxyEventV2(file_contents)
        file.close()
    return event


SEARCH_REQUEST = {
    "search_one": {
        "age": 1,
        "age_format": "years",
        "disposition": 1,
        "symptom_group": 1,
        "symptom_discriminator_list": [1, 2, 3],
        "search_distance": 1,
        "gender": "male",
        "search_environment": "test",
    },
    "search_two": {
        "age": 1,
        "age_format": "years",
        "disposition": 1,
        "symptom_group": 1,
        "symptom_discriminator_list": [1, 2, 3],
        "search_distance": 1,
        "gender": "male",
        "search_environment": "test2",
    },
}
