Feature: CCS Comparison Search

  Compare CCS Searches against mutiple DoS Environments.

  Scenario: CCS Comparison Search
    Given I have a CCS Comparison Search request
    When I send an authenticated CCS Comparison Search request
    Then the response should have status code "200"
    And I should receive a CCS Comparison Search response

  Scenario: CCS Comparison Search Bad Request
    Given I have an empty CCS Comparison Search request
    When I send an authenticated CCS Comparison Search request
    Then the response should have status code "400"
    And I should receive a CCS Comparison Search error response
