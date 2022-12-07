resource "aws_cognito_user_pool" "dos_comparison_tool_user_pool" {
  name = var.cognito_user_pool_name
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
