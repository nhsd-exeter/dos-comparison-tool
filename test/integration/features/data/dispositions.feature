Feature: Disposition Search

  Scenario: Disposition Search
    Given I am on the disposition search page
    When I search for a disposition
    Then I should see the disposition search results
