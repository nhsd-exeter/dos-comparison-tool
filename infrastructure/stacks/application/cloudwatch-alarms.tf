# ############################
# Application Alarms
# ############################

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
    RuleName = var.non_gb_rule_metric_name
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
