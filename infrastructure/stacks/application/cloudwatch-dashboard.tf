resource "aws_cloudwatch_dashboard" "cloudwatch_dashboard" {
  dashboard_name = var.cloudwatch_monitoring_dashboard_name
  dashboard_body = jsonencode({
    widgets = [
      {
        height : 6,
        width : 12,
        y : 0,
        x : 0,
        type : "metric",
        properties : {
          sparkline : true,
          view : "singleValue",
          metrics : [
            ["AWS/Cognito", "SignInSuccesses", "UserPool", aws_cognito_user_pool.dos_comparison_tool_user_pool.id, "UserPoolClient", aws_cognito_user_pool_client.dos_comparison_tool_user_pool_client.id],
            ["AWS/Cognito", "SignUpSuccesses", "UserPool", aws_cognito_user_pool.dos_comparison_tool_user_pool.id, "UserPoolClient", aws_cognito_user_pool_client.dos_comparison_tool_user_pool_client.id],
            ["AWS/Cognito", "TokenRefreshSuccesses", "UserPool", aws_cognito_user_pool.dos_comparison_tool_user_pool.id, "UserPoolClient", aws_cognito_user_pool_client.dos_comparison_tool_user_pool_client.id],
            ["AWS/Cognito", "CallCount", "UserPool", aws_cognito_user_pool.dos_comparison_tool_user_pool.id, "UserPoolClient", aws_cognito_user_pool_client.dos_comparison_tool_user_pool_client.id],
            ["AWS/Cognito", "ThrottleCount", "UserPool", aws_cognito_user_pool.dos_comparison_tool_user_pool.id, "UserPoolClient", aws_cognito_user_pool_client.dos_comparison_tool_user_pool_client.id]
          ],
          stacked : false,
          region : var.aws_region,
          stat : "Sum",
          title : "Authentication Interactions"
        }
      },
    ]
  })

  depends_on = [
    aws_cognito_user_pool.dos_comparison_tool_user_pool,
    aws_cognito_user_pool_client.dos_comparison_tool_user_pool_client
  ]
}
