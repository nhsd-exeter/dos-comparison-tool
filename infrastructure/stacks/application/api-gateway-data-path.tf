resource "aws_api_gateway_integration" "data_lambda_integration" {
  rest_api_id             = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  resource_id             = aws_api_gateway_resource.data_proxy_path.id
  http_method             = aws_api_gateway_method.data_path_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = module.data_lambda.lambda_function_invoke_arn
  credentials             = aws_iam_role.api_gateway_execution_role.arn

  depends_on = [
    aws_api_gateway_method.data_path_method,
    module.data_lambda,
  ]
}

resource "aws_api_gateway_resource" "data_path" {
  parent_id   = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.root_resource_id
  path_part   = "data"
  rest_api_id = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id

  depends_on = [
    aws_api_gateway_rest_api.dos_comparison_tool_api_gateway,
  ]
}

resource "aws_api_gateway_resource" "data_proxy_path" {
  parent_id   = aws_api_gateway_resource.data_path.id
  path_part   = "{proxy+}"
  rest_api_id = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  depends_on = [
    aws_api_gateway_resource.data_path,
  ]
}

resource "aws_api_gateway_method" "data_path_method" {
  #checkov:skip=CKV2_AWS_53:Need to validate the request body once schema is defined
  http_method          = "POST"
  resource_id          = aws_api_gateway_resource.data_proxy_path.id
  rest_api_id          = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  authorization        = "COGNITO_USER_POOLS"
  authorizer_id        = aws_api_gateway_authorizer.cognito_authorizer.id
  request_validator_id = aws_api_gateway_request_validator.dos_comparison_tool_api_gateway_request_validator.id

  depends_on = [
    aws_api_gateway_request_validator.dos_comparison_tool_api_gateway_request_validator,
    aws_api_gateway_resource.data_proxy_path,
    aws_api_gateway_authorizer.cognito_authorizer,
  ]
}
