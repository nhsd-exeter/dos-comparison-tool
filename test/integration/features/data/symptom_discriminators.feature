Feature: Symptom Discriminator

  Scenario: Symptom Discriminator Search
    When I search for a symptom discriminators with symptom group id "1000"
    Then the response should have status code "200"
    And I should see the symptom discriminator search results
