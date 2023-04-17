Feature: Security

  @security
  Scenario: CCS Comparison Search Security
    Given I have a CCS Comparison Search request
    When I send an unauthenticated CCS Comparison Search request
    Then I receive a 403 response

  @security
  Scenario: Symptom Group Search Security
    Given I have a Symptom Group Search request
    When I send an unauthenticated Symptom Group Search request
    Then I receive a 403 response

  @security
  Scenario: Symptom Discriminator Search Security
    Given I have a Symptom Discriminator Search request
    When I send an unauthenticated Symptom Discriminator Search request
    Then I receive a 403 response

  @security
  Scenario: Dispostion Search Security
    Given I have a Disposition Search request
    When I send an unauthenticated Disposition Search request
    Then I receive a 403 response
