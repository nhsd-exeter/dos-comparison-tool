Feature: Symptom Groups Search

  Scenario: Symptom Group Search
    When I search for a symptom groups
    Then the response should have status code "200"
    And I should see the symptom group search results
