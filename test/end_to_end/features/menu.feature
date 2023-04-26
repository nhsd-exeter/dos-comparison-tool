Feature: Menu page
  Scenario: User selects CCS Comparison Search from the menu
    Given I an authorised user
    When I select CCS Comparison Search
    Then I am on the CCS Comparison Search page
