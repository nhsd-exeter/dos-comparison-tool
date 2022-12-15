resource "aws_apigatewayv2_api" "dos_comparison_tool_api_gateway" {
  name          = var.api_gateway_name
  description   = "API Gateway for lambda functions for ${var.environment} environment"
  protocol_type = "HTTP"

  tags = {
    "PublicFacing" = "Yes"
  }
}

resource "aws_apigatewayv2_stage" "dos_comparison_tool_api_gateway_stage" {
  api_id      = aws_apigatewayv2_api.dos_comparison_tool_api_gateway.id
  name        = var.environment
  description = "Stage for ${var.environment} environment"
  auto_deploy = true
  default_route_settings { detailed_metrics_enabled = true }
  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.dos_comparison_tool_api_gateway_log_group.arn
    format = jsonencode({
      requestId        = "$context.requestId"
      ip               = "$context.identity.sourceIp"
      requestTime      = "$context.requestTime"
      httpMethod       = "$context.httpMethod"
      routeKey         = "$context.routeKey"
      status           = "$context.status"
      protocol         = "$context.protocol"
      responseLength   = "$context.responseLength"
      error            = "$context.error.message"
      authError        = "$context.authorizer.error"
      integrationError = "$context.integration.error"
    })
  }
}

#tfsec:ignore:aws-cloudwatch-log-group-customer-key
resource "aws_cloudwatch_log_group" "dos_comparison_tool_api_gateway_log_group" {
  name              = "/aws/api-gateway/${var.api_gateway_name}"
  retention_in_days = "0"
}
