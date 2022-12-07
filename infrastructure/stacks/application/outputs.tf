output "admin_user_password" {
  value       = random_password.admin_user_password
  description = "The password for logging in to the application as the admin user"
  sensitive   = true
}

output "cognito_user_pool_id" {
  value       = aws_cognito_user_pool.dos_comparison_tool_user_pool.id
  description = "The ID of the Cognito user pool"
}

output "cognito_user_pool_client_id" {
  value       = aws_cognito_user_pool_client.dos_comparison_tool_user_pool_client.id
  description = "The ID of the Cognito user pool client"
}
