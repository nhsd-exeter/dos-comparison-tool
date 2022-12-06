resource "aws_cognito_user_pool" "dos_comparison_tool_user_pool" {
  name = var.user_pool_name
}

resource "aws_cognito_user_pool_client" "dos_comparison_tool_user_pool_client" {
  name = var.aws_cognito_user_pool_client_name

  user_pool_id = aws_cognito_user_pool.dos_comparison_tool_user_pool.id
  depends_on = [
    aws_cognito_user_pool.dos_comparison_tool_user_pool
  ]
}
