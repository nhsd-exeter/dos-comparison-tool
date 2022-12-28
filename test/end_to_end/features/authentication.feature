Feature: Authenication tests

  @Complete
  Scenario: User can sign up
    Given a user wants to sign up
    When the user signs up
    Then the user is able to login
