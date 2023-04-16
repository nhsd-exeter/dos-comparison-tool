from pytest_bdd import scenarios, then, when
from pytest_bdd.parsers import parse
from requests.models import Response

scenarios("../../features/data/symptom_discriminators.feature")


@when(
    parse('I search for a symptom discriminators with symptom group id "{symptom_group_id}"'), target_fixture="response"
)
def _(symptom_group_id: str):
    """I search for a symptom discriminator."""
    pass


@then("I should see the symptom discriminator search results")
def _(response: Response):
    """I should see the symptom discriminator search results."""
    pass
