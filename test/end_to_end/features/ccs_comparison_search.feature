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
    And Results should have the same ranking for "16" services

  Scenario Outline: CCS Comparison Search with different postcode combinations
    Given I am on the CCS Comparison Search page
    When I run a CCS Comparison search with "postcode" "<postcode_value>"
    Then I should see the CCS Comparison Search results page

    Examples:
      | postcode_value |
      | SW1A 2AA       |
      | EX2 5SE        |
      | E14 4PU        |
      | PR8 2HH        |
