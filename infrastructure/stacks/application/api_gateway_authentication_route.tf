resource "aws_apigatewayv2_route" "dos_comparison_tool_api_gateway_route" {
  api_id             = aws_apigatewayv2_api.dos_comparison_tool_api_gateway.id
  route_key          = "POST /authentication"
  target             = "integrations/${aws_apigatewayv2_integration.dos_comparison_tool_api_gateway_integration.id}"
  authorization_type = "AWS_IAM"
}

resource "aws_apigatewayv2_integration" "dos_comparison_tool_api_gateway_integration" {
  api_id           = aws_apigatewayv2_api.dos_comparison_tool_api_gateway.id
  integration_type = "AWS_PROXY"

  connection_type        = "INTERNET"
  description            = "Invoke authentication lambda function"
  integration_method     = "POST"
  integration_uri        = module.authentication_lambda.lambda_invoke_arn
  passthrough_behavior   = "WHEN_NO_MATCH"
  payload_format_version = "2.0"
}
