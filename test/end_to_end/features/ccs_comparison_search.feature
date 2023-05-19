Feature: CCS Comparison Seach

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
      | key      | value                       |
      | postcode | SW1A 2AA                    |
      | postcode | EX2 5SE                     |
      | postcode | E14 4PU                     |
      | postcode | PR8 2HH                     |
      | postcode | EX25SE                      |
      | postcode | EX2  5SE                    |
      | role     | 111 Telephony Referral      |
      | role     | 111 Telephony Referral DHU  |
      | role     | 111 Telephony Referral IOW  |
      | role     | 111 Telephony Referral LAS  |
      | role     | 111 Telephony Referral NWAS |
      | role     | 111 Telephony Referral SCAS |
      | role     | 111 Telephony Referral WMAS |
      | role     | 999 Referral                |
      | role     | CAS Referral                |
      | role     | Digital Referral            |
      | role     | ED Streaming Referral       |
      | sex      | Male                        |
      | sex      | Female                      |
      | sex      | Unknown                     |

  Scenario Outline: CCS Comparison Search produces errors
    Given I am on the CCS Comparison Search page
    When I run a CCS Comparison search with "<key>" "<value>"
    Then I should see the CCS Comparison Search results with error message "<error_message>"

    Examples:
      | key         | value              | error_message                                                                                                  |
      | postcode    | SW1A               | CCS API Response Error: Postcode Validation: Postcode not found, Please try again later or contact support     |
      | disposition | Medication Enquiry | CCS API Response Error: Parameter Validation: Disposition not found, Please try again later or contact support |

  Scenario Outline: CCS Comparison Search with different SG, SD, DX combinations
    Given I am on the CCS Comparison Search page
    When I run a CCS Comparison search with symptom group "<symptom_group>" and symptom discriminator "<symptom_discriminator>" and disposition "<disposition>"
    Then I should see the CCS Comparison Search results page

    Examples:
      | symptom_group                    | symptom_discriminator                                      | disposition                                      |
      | Abdominal or Flank Injury, Blunt | PC full Primary Care assessment and prescribing capability | To contact a Primary Care Service within 2 hours |
      | Bites, Human                     | ED full ED assessment and management capability            | Attend Emergency Treatment Centre within 1 hour  |

  Scenario Outline: CCS Comparison Search with different Age and Age Group combinations
    Given I am on the CCS Comparison Search page
    When I run a CCS Comparison search with age "<age>" and age unit "<age_unit>"
    Then I should see the CCS Comparison Search results page

    Examples:
      | age | age_unit |
      | 2   | Years    |
      | 129 | Years    |
      | 1   | Months   |
      | 23  | Months   |
      | 0   | Days     |
      | 31  | Days     |

  Scenario Outline: CCS Comparison Search with different Age and Age Group combinations to produce errors
    Given I am on the CCS Comparison Search page
    When I run a CCS Comparison search with age "<age>" and age unit "<age_unit>"
    Then I should see the CCS Comparison Search results with error message "<error_message>"

    Examples:
      | age | age_unit | error_message                                                                                                                                                                                    |
      | 0   | Years    | CCS API Response Error: Parameter Validation: Invalid age value supplied. Supported values where Years format is used are whole numbers between 2-129, Please try again later or contact support |
      | 1   | Years    | CCS API Response Error: Parameter Validation: Invalid age value supplied. Supported values where Years format is used are whole numbers between 2-129, Please try again later or contact support |
      | 130 | Years    | CCS API Response Error: Parameter Validation: Invalid age value supplied. Supported values where Years format is used are whole numbers between 2-129, Please try again later or contact support |
      | 24  | Months   | CCS API Response Error: Parameter Validation: Invalid age value supplied. Supported values where Months format is used are whole numbers between 1-23, Please try again later or contact support |
      | 0   | Months   | CCS API Response Error: Parameter Validation: Invalid age value supplied. Supported values where Months format is used are whole numbers between 1-23, Please try again later or contact support |
      | -1  | Days     | CCS API Response Error: Parameter Validation: Invalid age value supplied. Supported values where Days format is used are whole numbers between 0-31, Please try again later or contact support   |
      | 32  | Days     | CCS API Response Error: Parameter Validation: Invalid age value supplied. Supported values where Days format is used are whole numbers between 0-31, Please try again later or contact support   |
