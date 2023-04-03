resource "aws_api_gateway_method" "search_cors_method" {
  rest_api_id   = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  resource_id   = aws_api_gateway_resource.search_path.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "search_cors_integration" {
  rest_api_id          = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  resource_id          = aws_api_gateway_resource.search_path.id
  http_method          = aws_api_gateway_method.search_cors_method.http_method
  content_handling     = "CONVERT_TO_TEXT"
  type                 = "MOCK"
  passthrough_behavior = "WHEN_NO_MATCH"

  request_templates = {
    "application/json" = "{ \"statusCode\": 200 }"
  }
}

resource "aws_api_gateway_integration_response" "search_cors_integration_response" {
  rest_api_id = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  resource_id = aws_api_gateway_resource.search_path.id
  http_method = aws_api_gateway_method.search_cors_method.http_method
  status_code = 200

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Origin,Content-Type,Accept,Authorization'"
    "method.response.header.Access-Control-Allow-Methods" = "'OPTIONS,POST'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  depends_on = [
    aws_api_gateway_integration.search_cors_integration,
    aws_api_gateway_method_response.search_cors_method_response,
  ]
}

resource "aws_api_gateway_method_response" "search_cors_method_response" {
  rest_api_id = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  resource_id = aws_api_gateway_resource.search_path.id
  http_method = aws_api_gateway_method.search_cors_method.http_method
  status_code = 200

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }

  response_models = {
    "application/json" = "Empty"
  }

  depends_on = [
    aws_api_gateway_method.search_cors_method,
  ]
}

resource "aws_api_gateway_gateway_response" "default_4xx_gateway_response" {
  rest_api_id   = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  response_type = "DEFAULT_4XX"
  response_parameters = {
    "gatewayresponse.header.Access-Control-Allow-Headers" = "'Origin,Content-Type,Accept,Authorization'"
    "gatewayresponse.header.Access-Control-Allow-Methods" = "'OPTIONS,POST'"
    "gatewayresponse.header.Access-Control-Allow-Origin"  = "'*'"
  }
}

resource "aws_api_gateway_gateway_response" "default_5xx_gateway_response" {
  rest_api_id   = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  response_type = "DEFAULT_5XX"
  response_parameters = {
    "gatewayresponse.header.Access-Control-Allow-Headers" = "'Origin,Content-Type,Accept,Authorization'"
    "gatewayresponse.header.Access-Control-Allow-Methods" = "'OPTIONS,POST'"
    "gatewayresponse.header.Access-Control-Allow-Origin"  = "'*'"
  }
}
