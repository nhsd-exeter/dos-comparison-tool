Feature: Disposition Search

  Scenario: Disposition Search
    When I search for dispositions
    Then the response should have status code "200"
    And I should see the dispositions search results
