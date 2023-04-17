Feature: Security

  @security
  Scenario: CCS Comparison Search Security
    Given I have a CCS Comparison Search request
    When I send an unauthenticated CCS Comparison Search request
    Then the response should have status code "401"

  @security
  Scenario: Symptom Group Search Security
    When I send an unauthenticated Symptom Group Search request
    Then the response should have status code "401"

  @security
  Scenario: Symptom Discriminator Search Security
    When I send an unauthenticated Symptom Discriminator Search request
    Then the response should have status code "401"

  @security
  Scenario: Dispostion Search Security
    When I send an unauthenticated Disposition Search request
    Then the response should have status code "401"

  @security
  Scenario Outline: Page not found
    When I send an authenticated request to "<path>"
    Then the response should have status code "404"

    Examples:
      | path        |
      | /data/any   |
      | /search/any |
