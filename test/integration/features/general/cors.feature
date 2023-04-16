Feature: Cors

  Scenario Outline: Cors in enabled on all paths
    When I send a "OPTIONS" request to "/<path>"
    Then the response should have a "Access-Control-Allow-Origin" header

    Examples:
      | path    |
      | /search |
      | /data   |
