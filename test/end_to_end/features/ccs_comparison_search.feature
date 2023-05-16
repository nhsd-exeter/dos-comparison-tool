Feature: CCS Comparison Seach

  Scenario: CCS Comparison Search
    Given I am on the CCS Comparison Search page
    When I run a CCS Comparison search with default values one
    Then I should see the CCS Comparison Search results page with expected results one
    And Results should have the same ranking for "10" services

  Scenario: Mutiple CCS Comparison Searches
    Given I am on the CCS Comparison Search page
    When I run a CCS Comparison search with default values one
    Then I should see the CCS Comparison Search results page with expected results one
    And Results should have the same ranking for "10" services
    When I return to the CCS Comparison Search page
    Then I should see the CCS Comparison Search page
    When I run a CCS Comparison search with default values two
    Then I should see the CCS Comparison Search results page with expected results two
    And Results should have the same ranking for "16" services

  Scenario Outline: CCS Comparison Search with different combinations
    Given I am on the CCS Comparison Search page
    When I run a CCS Comparison search with "<key>" "<value>"
    Then I should see the CCS Comparison Search results page

    Examples:
      | key         | value                                             |
      | postcode    | SW1A 2AA                                          |
      | postcode    | EX2 5SE                                           |
      | postcode    | E14 4PU                                           |
      | postcode    | PR8 2HH                                           |
      | postcode    | EX25SE                                            |
      | postcode    | EX2  5SE                                          |
      | role        | 111 Telephony Referral                            |
      | role        | 111 Telephony Referral DHU                        |
      | role        | 111 Telephony Referral IOW                        |
      | role        | 111 Telephony Referral LAS                        |
      | role        | 111 Telephony Referral NWAS                       |
      | role        | 111 Telephony Referral SCAS                       |
      | role        | 111 Telephony Referral WMAS                       |
      | role        | 999 Referral                                      |
      | role        | CAS Referral                                      |
      | role        | Digital Referral                                  |
      | role        | ED Streaming Referral                             |
      | disposition | Attend Emergency Treatment Centre within 1 hour   |
      | disposition | Attend Emergency Treatment Centre within 4 hours  |
      | disposition | To contact a Primary Care Service within 2 hours  |
      | disposition | To contact a Primary Care Service within 24 hours |

  Scenario Outline: CCS Comparison Search produces errors
    Given I am on the CCS Comparison Search page
    When I run a CCS Comparison search with "<key>" "<value>"
    Then I should see the CCS Comparison Search results with error message "<error_message>"

    Examples:
      | key         | value              | error_message                                                                                          |
      | postcode    | SW1A               | Error: ERR_BAD_REQUEST: Request failed with status code 400, Please try again later or contact support |
      | disposition | Medication Enquiry | Error: ERR_BAD_REQUEST: Request failed with status code 400, Please try again later or contact support |
