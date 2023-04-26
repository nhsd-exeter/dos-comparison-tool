#tfsec:ignore:aws-cloudwatch-log-group-customer-key
resource "aws_cloudwatch_log_group" "api_gateway_waf_logs" {
  name              = var.api_gateway_waf_logs_name
  retention_in_days = "30"
}
