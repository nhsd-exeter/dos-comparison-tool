Feature: CCS Comparison Seach

  Scenario: CCS Comparison Search
    Given I am on the CCS Comparison Search page
    When I run a CCS Comparison search with default values one
    Then I should see the CCS Comparison Search results page with expected results one
    And Results should have the same ranking for "10" services

  Scenario: Mutiple CCS Comparison Searches
    Given I am on the CCS Comparison Search page
    When I run a CCS Comparison search with default values one
    Then I should see the CCS Comparison Search results page with expected results one
    And Results should have the same ranking for "10" services
    When I return to the CCS Comparison Search page
    Then I should see the CCS Comparison Search page
    When I run a CCS Comparison search with default values two
    Then I should see the CCS Comparison Search results page with expected results two
    And Results should have the same ranking for "20" services
