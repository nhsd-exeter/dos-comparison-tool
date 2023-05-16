Feature: CCS Comparison Search

  Compare CCS Searches against mutiple DoS Environments.

  Scenario: CCS Comparison Search - Happy Path
    Given I have a CCS Comparison Search request
    When I send an authenticated CCS Comparison Search request
    Then the response should have status code "200"
    And I should receive a CCS Comparison Search response

  Scenario: CCS Comparison Search - Bad Request
    Given I have an empty CCS Comparison Search request
    When I send an authenticated CCS Comparison Search request
    Then the response should have status code "400"
    And I should receive a CCS Comparison Search error response

  Scenario Outline: CCS Comparison Search - Bad CCS Search Request
    Given I have a CCS Comparison Search request with invalid "<parameter>"
    When I send an authenticated CCS Comparison Search request
    Then the response should have status code "400"
    And I should receive a CCS Search error response with message "<response_message>"

    Examples:
      | parameter             | response_message                                                                                                                                      |
      | symptom_group         | CCS API Response Error: Parameter Validation: SG not found                                                                                            |
      | symptom_discriminator | CCS API Response Error: Parameter Validation: No valid discriminators passed                                                                          |
      | disposition           | CCS API Response Error: Parameter Validation: Disposition not found                                                                                   |
      | age                   | CCS API Response Error: Parameter Validation: Invalid age value supplied. Supported values where Years format is used are whole numbers between 2-129 |
