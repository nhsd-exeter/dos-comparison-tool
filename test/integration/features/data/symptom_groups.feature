Feature: Symptom Groups Search

  Scenario: Symptom Group Search
    Given I am on the symptom group search page
    When I search for a symptom group
    Then I should see the symptom group search results
