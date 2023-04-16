Feature: Symptom Discriminator

  Scenario: Symptom Discriminator Search
    Given I am on the symptom discriminator search page
    When I search for a symptom discriminator
    Then I should see the symptom discriminator search results
