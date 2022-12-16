resource "aws_api_gateway_integration" "lambda_integration" {
  rest_api_id             = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  resource_id             = aws_api_gateway_resource.auth_path.id
  http_method             = aws_api_gateway_method.auth_path_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = module.authentication_lambda.lambda_invoke_arn
}

resource "aws_api_gateway_resource" "auth_path" {
  parent_id   = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.root_resource_id
  path_part   = "auth"
  rest_api_id = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
}

resource "aws_api_gateway_method" "auth_path_method" {
  http_method   = "POST"
  resource_id   = aws_api_gateway_resource.auth_path.id
  rest_api_id   = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  authorization = "AWS_IAM"
}

resource "aws_api_gateway_method_settings" "auth_path_method_settings" {
  rest_api_id = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  stage_name  = aws_api_gateway_stage.dos_comparison_tool_api_gateway_stage.stage_name
  method_path = "*/*"

  settings {
    metrics_enabled      = true
    logging_level        = "INFO"
    cache_data_encrypted = true
  }
}
