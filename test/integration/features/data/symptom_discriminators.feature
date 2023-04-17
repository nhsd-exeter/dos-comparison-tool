Feature: Symptom Discriminator

  Scenario: Symptom Discriminator Search
    When I search for a symptom discriminators with symptom group id "1000"
    Then the response should have status code "200"
    And I should see symptom discriminators search results

  Scenario: Symptom Discriminator Search with invalid symptom group id
    When I search for a symptom discriminators with symptom group id "1"
    Then the response should have status code "200"
    And I shouldn't see any symptom discriminators search results
