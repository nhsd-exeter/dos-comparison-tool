from pytest_bdd import scenarios, given, when, then

# Scenarios

scenarios("../../features/search/ccs_comparison_search.feature")


@given("I have a CCS Comparison Search request")
def i_have_a_ccs_comparison_search_request():
    pass


@when("I send an authenticated CCS Comparison Search request")
def i_send_an_authenticated_ccs_comparison_search_request():
    pass


@then("I should receive a CCS Comparison Search response")
def i_should_receive_a_ccs_comparison_search_response():
    pass
