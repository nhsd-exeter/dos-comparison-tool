resource "aws_cognito_user_pool" "dos_comparison_tool_user_pool" {
  name                     = var.cognito_user_pool_name
  auto_verified_attributes = var.profile == "dev" ? ["email"] : []

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
    # TODO: Add temporary password validity
    # temporary_password_validity_days = 1
  }
  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    email_message        = "Your verification code is {####}"
    email_subject        = "DoS Comparison Tool - Verification Code"
  }
}

resource "aws_cognito_user_pool_client" "dos_comparison_tool_user_pool_client" {
  name         = var.cognito_user_pool_client_name
  user_pool_id = aws_cognito_user_pool.dos_comparison_tool_user_pool.id

  depends_on = [
    aws_cognito_user_pool.dos_comparison_tool_user_pool
  ]
}

resource "aws_cognito_user" "admin_user" {
  user_pool_id = aws_cognito_user_pool.dos_comparison_tool_user_pool.id
  username     = var.cognito_admin_user
  password     = random_password.admin_user_password.result

  depends_on = [
    aws_cognito_user_pool.dos_comparison_tool_user_pool,
    random_password.admin_user_password
  ]
}

resource "random_password" "admin_user_password" {
  length      = 10
  min_upper   = 2
  min_lower   = 2
  min_numeric = 2
  min_special = 1
  special     = true
}
