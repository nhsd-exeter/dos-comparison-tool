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
      },
      {
        height : 6,
        width : 12,
        y : 6,
        x : 0,
        type : "metric",
        properties : {
          sparkline : true,
          view : "singleValue",
          metrics : [
            ["AWS/WAFV2", "CountedRequests", "Region", var.aws_region, "Rule", var.waf_rate_based_metric_name, "WebACL", var.api_gateway_waf_acl, { "label" : "Rate Based Rule" }],
            ["...", var.waf_non_gb_rule_metric_name, ".", ".", { "label" : "Non GB Rule" }],
            ["...", var.waf_aws_known_bad_inputs_metric_name, ".", ".", { "label" : "Bad Inputs Rule" }],
            ["...", var.waf_aws_sqli_metric_name, ".", ".", { "label" : "SQL Injection Rule" }],
            ["...", var.waf_ip_reputation_list_metric_name, ".", ".", { "label" : "IP Reputation Rule" }],
            ["...", var.waf_managed_rule_group_metric_name, ".", ".", { "label" : "Common AWS Rules" }],
          ],
          stacked : false,
          region : var.aws_region,
          stat : "Sum",
          title : "WAF Rule Matches"
        }
      },
      {
        height : 6,
        width : 6,
        y : 6,
        x : 12,
        type : "metric",
        properties : {
          metrics : [
            ["AWS/WAFV2", "CountedRequests", "Region", "eu-west-2", "Rule", "ALL", "WebACL", var.api_gateway_waf_acl],
            ["...", "AllowedRequests", ".", "."]
          ],
          period : 60,
          region : var.aws_region,
          stacked : false,
          stat : "Sum",
          title : "WAF Requests",
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
            ["AWS/Lambda", "ConcurrentExecutions", "FunctionName", module.data_lambda.lambda_function_name],
            [".", "Duration", ".", "."],
            [".", "Errors", ".", ".", { "visible" : false }],
            ["...", { "id" : "errors", "stat" : "Sum", "color" : "#d62728" }],
            [".", "Invocations", ".", ".", { "id" : "invocations", "stat" : "Sum" }],
            [{ "expression" : "100 - 100 * errors / MAX([errors, invocations])", "label" : "Success rate (%)", "id" : "availability", "yAxis" : "right", "region" : var.aws_region, "color" : "#2ca02c" }]
          ],
          region : var.aws_region,
          title : "Data Lambda",
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
