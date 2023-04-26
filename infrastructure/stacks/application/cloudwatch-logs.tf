resource "aws_cloudwatch_log_group" "api_gateway_waf_logs" {
  name              = var.api_gateway_waf_logs_name
  retention_in_days = "30"
  kms_key_id        = aws_kms_alias.log_encryption_key_alias.target_key_arn

  depends_on = [
    aws_kms_key.log_encryption_key,
  ]
}
