#tfsec:ignore:aws-ssm-secret-use-customer-key
resource "aws_secretsmanager_secret" "cognito_secrets" {
  name                    = var.cognito_secrets_name
  description             = "Secrets for Cognito"
  recovery_window_in_days = 0
}

resource "aws_secretsmanager_secret_version" "cognito_secrets_version" {
  secret_id = aws_secretsmanager_secret.cognito_secrets.id
  secret_string = jsonencode({
    "${var.cognito_secrets_admin_username_key}"      = aws_cognito_user.admin_user.username,
    "${var.cognito_secrets_admin_password_key}"      = aws_cognito_user.admin_user.password,
    "${var.cognito_secrets_user_pool_id_key}"        = aws_cognito_user_pool.dos_comparison_tool_user_pool.id,
    "${var.cognito_secrets_user_pool_client_id_key}" = aws_cognito_user_pool_client.dos_comparison_tool_user_pool_client.id,
    "${var.api_gateway_endpoint_key}"                = "https://${aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id}.execute-api.${var.aws_region}.amazonaws.com/${var.environment}"
  })

  depends_on = [
    aws_cognito_user_pool.dos_comparison_tool_user_pool,
    aws_cognito_user_pool_client.dos_comparison_tool_user_pool_client,
    aws_cognito_user.admin_user,
    random_password.admin_user_password
  ]
}
