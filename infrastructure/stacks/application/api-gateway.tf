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
    redeployment = join("", [md5(jsonencode([
      aws_api_gateway_resource.search_path,
      aws_api_gateway_method.search_path_method,
      aws_api_gateway_integration.lambda_integration,
    ]))])
  }
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "dos_comparison_tool_api_gateway_stage" {
  #checkov:skip=CKV2_AWS_4:Logs setting are set in the method
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
  retention_in_days = 30
}
