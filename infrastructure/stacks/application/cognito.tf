resource "aws_cognito_user_pool" "dos_comparison_tool_user_pool" {
  name = var.user_pool_name
}
