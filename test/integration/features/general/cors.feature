Feature: Cors

  Scenario Outline: Cors in enabled on all paths
    When I send an unauthenticated "<http_method>" request to "<path>"
    Then the response should have status code "<status_code>"
    And the response should have "<cors_header>" header set to "<cors_value>"

    Examples:
      | http_method | path           | cors_header                  | cors_value                               | status_code |
      | OPTIONS     | /data/anything | Access-Control-Allow-Origin  | *                                        | 200         |
      | OPTIONS     | /data/anything | Access-Control-Allow-Methods | OPTIONS,POST                             | 200         |
      | OPTIONS     | /data/anything | Access-Control-Allow-Headers | Origin,Content-Type,Accept,Authorization | 200         |

      | OPTIONS | /data/symptom_groups | Access-Control-Allow-Origin  | *                                        | 200 |
      | OPTIONS | /data/symptom_groups | Access-Control-Allow-Methods | OPTIONS,POST                             | 200 |
      | OPTIONS | /data/symptom_groups | Access-Control-Allow-Headers | Origin,Content-Type,Accept,Authorization | 200 |

      | OPTIONS | /data/symptoms_discriminator/1 | Access-Control-Allow-Origin  | *                                        | 200 |
      | OPTIONS | /data/symptoms_discriminator/1 | Access-Control-Allow-Methods | OPTIONS,POST                             | 200 |
      | OPTIONS | /data/symptoms_discriminator/1 | Access-Control-Allow-Headers | Origin,Content-Type,Accept,Authorization | 200 |

      | OPTIONS | /data/dispositions/1 | Access-Control-Allow-Origin  | *                                        | 200 |
      | OPTIONS | /data/dispositions/1 | Access-Control-Allow-Methods | OPTIONS,POST                             | 200 |
      | OPTIONS | /data/dispositions/1 | Access-Control-Allow-Headers | Origin,Content-Type,Accept,Authorization | 200 |

      | OPTIONS | /search/CCSComparisonSearch | Access-Control-Allow-Origin  | *                                        | 200 |
      | OPTIONS | /search/CCSComparisonSearch | Access-Control-Allow-Methods | OPTIONS,POST                             | 200 |
      | OPTIONS | /search/CCSComparisonSearch | Access-Control-Allow-Headers | Origin,Content-Type,Accept,Authorization | 200 |

  Scenario Outline: Cors isn't available on paths when not authenticated
    When I send an unauthenticated "<http_method>" request to "<path>"
    Then the response should have status code "<status_code>"

    Examples:
      | http_method | path    | status_code |
      | OPTIONS     | /       | 403         |
      | OPTIONS     | /data   | 403         |
      | OPTIONS     | /search | 403         |
