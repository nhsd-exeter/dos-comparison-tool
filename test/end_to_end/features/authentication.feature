Feature: Authentication tests

  Scenario: User can sign up
    Given a user wants to sign up
    When the user signs up
    Then the user is able to login

  Scenario: User can't sign in with invalid credentials
    Given a user wants to sign in with invalid credentials
    When the user signs in with invalid credentials
    Then the user is not able to login
