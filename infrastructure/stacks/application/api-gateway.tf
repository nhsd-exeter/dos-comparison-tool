resource "aws_api_gateway_rest_api" "dos_comparison_tool_api_gateway" {
  name        = var.api_gateway_name
  description = "API Gateway for lambda functions for ${var.environment} environment"
  endpoint_configuration {
    types = ["REGIONAL"]
  }
  lifecycle {
    create_before_destroy = true
  }
  tags = {
    "PublicFacing" = "Yes"
  }
}

resource "aws_api_gateway_deployment" "di_endpoint_deployment" {
  rest_api_id = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.search_path.id,
      aws_api_gateway_resource.search_proxy_path.id,
      aws_api_gateway_method.search_path_method.id,
      aws_api_gateway_integration.search_lambda_integration.id,
      aws_api_gateway_method.search_cors_method.id,
      aws_api_gateway_integration.search_cors_integration.id,
      aws_api_gateway_method_response.search_cors_method_response.id,

      aws_api_gateway_resource.data_path.id,
      aws_api_gateway_resource.data_proxy_path.id,
      aws_api_gateway_method.data_path_method.id,
      aws_api_gateway_integration.data_lambda_integration.id,
      aws_api_gateway_method.data_cors_method.id,
      aws_api_gateway_integration.data_cors_integration.id,
      aws_api_gateway_method_response.data_cors_method_response.id,

      aws_api_gateway_gateway_response.default_4xx_gateway_response.id,
      aws_api_gateway_gateway_response.default_5xx_gateway_response.id,
    ]))

  }

  depends_on = [
    aws_api_gateway_resource.search_path,
    aws_api_gateway_resource.search_proxy_path,
    aws_api_gateway_method.search_path_method,
    aws_api_gateway_integration.search_lambda_integration,
    aws_api_gateway_method.search_cors_method,
    aws_api_gateway_integration.search_cors_integration,
    aws_api_gateway_method_response.search_cors_method_response,
    aws_api_gateway_resource.data_path,
    aws_api_gateway_resource.data_proxy_path,
    aws_api_gateway_method.data_path_method,
    aws_api_gateway_integration.data_lambda_integration,
    aws_api_gateway_method.data_cors_method,
    aws_api_gateway_integration.data_cors_integration,
    aws_api_gateway_method_response.data_cors_method_response,
    aws_api_gateway_gateway_response.default_4xx_gateway_response,
    aws_api_gateway_gateway_response.default_5xx_gateway_response,
  ]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "dos_comparison_tool_api_gateway_stage" {
  #checkov:skip=CKV2_AWS_51:TODO Ensure AWS API Gateway endpoints uses client certificate authentication
  deployment_id        = aws_api_gateway_deployment.di_endpoint_deployment.id
  rest_api_id          = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  stage_name           = var.environment
  xray_tracing_enabled = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.di_endpoint_access_logs.arn
    format = jsonencode({
      requestTime              = "$context.requestTime"
      requestId                = "$context.requestId"
      httpMethod               = "$context.httpMethod"
      path                     = "$context.path",
      resourcePath             = "$context.resourcePath",
      status                   = "$context.status"
      responseLatency          = "$context.responseLatency"
      ip                       = "$context.identity.sourceIp"
      xrayTraceId              = "$context.xrayTraceId"
      integrationRequestId     = "$context.integration.requestId"
      functionResponseStatus   = "$context.integration.status"
      integrationLatency       = "$context.integration.latency"
      integrationServiceStatus = "$context.integration.integrationStatus"
      }
    )
  }
  tags = {
    "PublicFacing" = "Yes"
  }
}

resource "aws_api_gateway_authorizer" "cognito_authorizer" {
  name        = var.cognito_authorizer_name
  rest_api_id = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  type        = "COGNITO_USER_POOLS"

  provider_arns = ["arn:aws:cognito-idp:${var.aws_region}:${var.aws_account_id}:userpool/${aws_cognito_user_pool.dos_comparison_tool_user_pool.id}"]

  depends_on = [
    aws_cognito_user_pool.dos_comparison_tool_user_pool,
    aws_cognito_user_pool_client.dos_comparison_tool_user_pool_client,
  ]
}

#tfsec:ignore:aws-cloudwatch-log-group-customer-key
resource "aws_cloudwatch_log_group" "di_endpoint_access_logs" {
  name              = "/aws/api-gateway/${var.api_gateway_name}"
  retention_in_days = 7
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

resource "aws_api_gateway_method_settings" "search_path_method_settings" {
  rest_api_id = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  stage_name  = aws_api_gateway_stage.dos_comparison_tool_api_gateway_stage.stage_name
  method_path = "*/*"

  settings {
    metrics_enabled      = true
    logging_level        = "INFO"
    cache_data_encrypted = true
  }

  depends_on = [
    aws_api_gateway_method.search_path_method
  ]
}

resource "aws_api_gateway_request_validator" "dos_comparison_tool_api_gateway_request_validator" {
  name                  = var.api_gateway_request_validator_name
  rest_api_id           = aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id
  validate_request_body = true

  depends_on = [
    aws_api_gateway_rest_api.dos_comparison_tool_api_gateway
  ]
}
