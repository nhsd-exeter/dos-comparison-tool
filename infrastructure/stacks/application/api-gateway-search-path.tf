resource "aws_api_gateway_integration" "lambda_integration" {
  rest_api_id             = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  resource_id             = aws_api_gateway_resource.search_path.id
  http_method             = aws_api_gateway_method.search_path_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = module.search_lambda.lambda_function_invoke_arn
}

resource "aws_api_gateway_resource" "search_path" {
  parent_id   = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.root_resource_id
  path_part   = "search"
  rest_api_id = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
}

resource "aws_api_gateway_method" "search_path_method" {
  #checkov:skip=CKV2_AWS_53:Need to validate the request body once schema is defined
  http_method   = "POST"
  resource_id   = aws_api_gateway_resource.search_path.id
  rest_api_id   = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.cognito_authorizer.id

  depends_on = [
    aws_api_gateway_authorizer.cognito_authorizer,
  ]
}

resource "aws_api_gateway_method_settings" "search_path_method_settings" {
  rest_api_id = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  stage_name  = aws_api_gateway_stage.dos_comparison_tool_api_gateway_stage.stage_name
  method_path = "*/*"

  settings {
    metrics_enabled      = true
    logging_level        = "INFO"
    cache_data_encrypted = true
  }
}
