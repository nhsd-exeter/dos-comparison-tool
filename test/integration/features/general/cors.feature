Feature: Cors

  Scenario Outline: Cors in enabled on all paths
    When I send a "<http_method>" request to "<path>"
    Then the response should have "<cors_header>" header set to "<cors_value>"

    Examples:
      | http_method | path    | cors_header                 | cors_value |
      | OPTIONS     | /data   | Access-Control-Allow-Origin | *          |
      | OPTIONS     | /search | Access-Control-Allow-Origin | *          |
