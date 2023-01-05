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
            ["AWS/Cognito", "SignUpSuccesses", "UserPool", ".", "UserPoolClient", "."],
            ["AWS/Cognito", "TokenRefreshSuccesses", "UserPool", ".", "UserPoolClient", "."],
            ["AWS/Cognito", "CallCount", "UserPool", ".", "UserPoolClient", "."],
            ["AWS/Cognito", "ThrottleCount", "UserPool", ".", "UserPoolClient", "."]
          ],
          stacked : false,
          region : var.aws_region,
          stat : "Sum",
          title : "Authentication Interactions"
        }
      },
      {
        height : 6,
        width : 6,
        y : 0,
        x : 12,
        type : "metric",
        properties : {
          metrics : [
            ["AWS/ApiGateway", "4XXError", "ApiName", aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.name],
            [".", "5XXError", ".", "."]
          ],
          period : 60,
          region : var.aws_region,
          stacked : false,
          stat : "Sum",
          title : "API Error Responses",
          view : "gauge",
          yAxis : {
            left : {
              min : 0,
              max : 100
            }
          },
          legend : {
            position : "bottom"
          },
          liveData : false,
          setPeriodToTimeRange : false,
          sparkline : true,
          trend : true
        }
      },
      {
        height : 6,
        width : 6,
        y : 12,
        x : 18,
        type : "metric",
        properties : {
          view : "timeSeries",
          stacked : false,
          metrics : [
            ["AWS/Lambda", "ConcurrentExecutions", "FunctionName", module.search_lambda.lambda_function_name],
            [".", "Duration", ".", "."],
            [".", "Errors", ".", ".", { "visible" : false }],
            ["...", { "id" : "errors", "stat" : "Sum", "color" : "#d62728" }],
            [".", "Invocations", ".", ".", { "id" : "invocations", "stat" : "Sum" }],
            [{ "expression" : "100 - 100 * errors / MAX([errors, invocations])", "label" : "Success rate (%)", "id" : "availability", "yAxis" : "right", "region" : var.aws_region, "color" : "#2ca02c" }]
          ],
          region : var.aws_region,
          title : "Search Lambda",
          period : 60
        }
      }
    ]
  })

  depends_on = [
    aws_cognito_user_pool.dos_comparison_tool_user_pool,
    aws_cognito_user_pool_client.dos_comparison_tool_user_pool_client,
    aws_api_gateway_rest_api.dos_comparison_tool_api_gateway,
  ]
}
