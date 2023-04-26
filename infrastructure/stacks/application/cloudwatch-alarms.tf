# ############################
# Application Alarms
# ############################

resource "aws_cloudwatch_metric_alarm" "search_lambda_error_rate_alert" {
  count               = var.profile == "dev" && var.environment != "dev" ? 0 : 1
  alarm_name          = var.search_lambda_error_rate_alert_name
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 2
  threshold           = 10
  alarm_description   = "Search Lambda error rate has exceeded 10%"
  metric_query {
    id          = "expression"
    expression  = "(errors/invocations) * 100"
    label       = "Error Rate (%)"
    return_data = "true"
  }

  metric_query {
    id = "errors"
    metric {
      metric_name = "Errors"
      namespace   = "AWS/Lambda"
      period      = "120"
      stat        = "Sum"
      unit        = "Count"
      dimensions = {
        FunctionName = var.search_lambda_function_name
      }
    }
  }

  metric_query {
    id = "invocations"
    metric {
      metric_name = "Invocations"
      namespace   = "AWS/Lambda"
      period      = "120"
      stat        = "Sum"
      unit        = "Count"
      dimensions = {
        FunctionName = var.search_lambda_function_name
      }
    }
  }
}

resource "aws_cloudwatch_metric_alarm" "data_lambda_error_rate_alert" {
  count               = var.profile == "dev" && var.environment != "dev" ? 0 : 1
  alarm_name          = var.data_lambda_error_rate_alert_name
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 2
  threshold           = 10
  alarm_description   = "Data Lambda error rate has exceeded 10%"
  metric_query {
    id          = "expression"
    expression  = "(errors/invocations) * 100"
    label       = "Error Rate (%)"
    return_data = "true"
  }

  metric_query {
    id = "errors"
    metric {
      metric_name = "Errors"
      namespace   = "AWS/Lambda"
      period      = "120"
      stat        = "Sum"
      unit        = "Count"
      dimensions = {
        FunctionName = var.data_lambda_function_name
      }
    }
  }

  metric_query {
    id = "invocations"
    metric {
      metric_name = "Invocations"
      namespace   = "AWS/Lambda"
      period      = "120"
      stat        = "Sum"
      unit        = "Count"
      dimensions = {
        FunctionName = var.data_lambda_function_name
      }
    }
  }
}

# ############################
# WAF Alarms
# ############################

resource "aws_cloudwatch_metric_alarm" "waf_rate_based_alarm" {
  count               = var.profile == "dev" && var.environment != "dev" ? 0 : 1
  alarm_name          = var.waf_rate_based_alarm_name
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 5
  metric_name         = "CountedRequests"
  namespace           = "AWS/WAFV2"
  period              = 60
  statistic           = "Sum"
  threshold           = 1
  alarm_description   = "WAF rate based alarm"
  dimensions = {
    region   = var.aws_region,
    RuleName = var.waf_rate_based_rule_name
  }
}


resource "aws_cloudwatch_metric_alarm" "waf_non_gb_alarm" {
  count               = var.profile == "dev" && var.environment != "dev" ? 0 : 1
  alarm_name          = var.waf_non_gb_alarm_name
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 5
  metric_name         = "CountedRequests"
  namespace           = "AWS/WAFV2"
  period              = 60
  statistic           = "Sum"
  threshold           = 5
  alarm_description   = "WAF non GB alarm"
  dimensions = {
    region   = var.aws_region,
    RuleName = var.waf_non_gb_rule_metric_name
  }
}

resource "aws_cloudwatch_metric_alarm" "waf_aws_known_bad_inputs_alarm" {
  count               = var.profile == "dev" && var.environment != "dev" ? 0 : 1
  alarm_name          = var.waf_aws_known_bad_inputs_alarm_name
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 5
  metric_name         = "CountedRequests"
  namespace           = "AWS/WAFV2"
  period              = 60
  statistic           = "Sum"
  threshold           = 5
  alarm_description   = "WAF AWS known bad inputs alarm"
  dimensions = {
    region   = var.aws_region,
    RuleName = var.waf_aws_known_bad_inputs_rule_name
  }
}

resource "aws_cloudwatch_metric_alarm" "waf_aws_sqli_alarm" {
  count               = var.profile == "dev" && var.environment != "dev" ? 0 : 1
  alarm_name          = var.waf_aws_sqli_alarm_name
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 5
  metric_name         = "CountedRequests"
  namespace           = "AWS/WAFV2"
  period              = 60
  statistic           = "Sum"
  threshold           = 5
  alarm_description   = "WAF AWS SQLi alarm"
  dimensions = {
    region   = var.aws_region,
    RuleName = var.waf_aws_sqli_rule_name
  }
}

resource "aws_cloudwatch_metric_alarm" "ip_reputation_list_alarm" {
  count               = var.profile == "dev" && var.environment != "dev" ? 0 : 1
  alarm_name          = var.waf_ip_reputation_list_alarm_name
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 5
  metric_name         = "CountedRequests"
  namespace           = "AWS/WAFV2"
  period              = 60
  statistic           = "Sum"
  threshold           = 5
  alarm_description   = "IP reputation list alarm"
  dimensions = {
    region   = var.aws_region,
    RuleName = var.waf_ip_reputation_list_rule_name
  }
}

resource "aws_cloudwatch_metric_alarm" "waf_managed_rule_group_alarm" {
  count               = var.profile == "dev" && var.environment != "dev" ? 0 : 1
  alarm_name          = var.waf_managed_rule_group_alarm_name
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 5
  metric_name         = "CountedRequests"
  namespace           = "AWS/WAFV2"
  period              = 60
  statistic           = "Sum"
  threshold           = 5
  alarm_description   = "WAF managed rule group alarm"
  dimensions = {
    region   = var.aws_region,
    RuleName = var.waf_managed_rule_group_rule_name
  }
}
