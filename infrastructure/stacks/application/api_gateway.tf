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
}
