Feature: CCS Comparison Search

  Compare CCS Searches against mutiple DoS Environments.

  @complete @ccs-comparison-search
  Scenario: CCS Comparison Search
    Given I have a CCS Comparison Search request
    When I send an authenticated CCS Comparison Search request
    Then I should receive a CCS Comparison Search response
