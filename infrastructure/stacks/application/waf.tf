resource "aws_wafv2_web_acl" "api_gateway_waf_acl" {
  #checkov:skip=CKV_AWS_192
  name        = var.api_gateway_waf_acl
  description = "WAF ACL for the DoS Integration API Gateway"
  scope       = "REGIONAL"

  default_action {
    allow {}
  }

  rule {
    name = var.waf_rate_based_rule_name
    action {
      count {}
    }
    priority = 1

    statement {
      rate_based_statement {
        limit = 1500
      }
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = var.waf_rate_based_metric_name
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = var.waf_non_gb_rule_name
    priority = 2
    action {
      count {}
    }
    statement {
      not_statement {
        statement {
          geo_match_statement {
            country_codes = ["GB"]
          }
        }
      }
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = var.waf_non_gb_rule_metric_name
      sampled_requests_enabled   = true
    }
  }



  rule {
    name     = var.waf_aws_known_bad_inputs_rule_name
    priority = 3

    override_action {
      count {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesKnownBadInputsRuleSet"
        vendor_name = "AWS"
      }
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = var.waf_aws_known_bad_inputs_metric_name
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = var.waf_aws_sqli_rule_name
    priority = 4

    override_action {
      count {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesSQLiRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = var.waf_aws_sqli_metric_name
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = var.waf_ip_reputation_list_rule_name
    priority = 5

    override_action {
      count {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesAmazonIpReputationList"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = var.waf_ip_reputation_list_metric_name
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = var.waf_managed_rule_group_rule_name
    priority = 6

    override_action {
      count {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = var.waf_managed_rule_group_metric_name
      sampled_requests_enabled   = true
    }
  }
  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = var.waf_acl_metric_name
    sampled_requests_enabled   = true
  }
}

resource "aws_wafv2_web_acl_logging_configuration" "api_gateway_waf_acl_logging_configuration" {
  log_destination_configs = [aws_cloudwatch_log_group.api_gateway_waf_logs.arn]
  resource_arn            = aws_wafv2_web_acl.api_gateway_waf_acl.arn
}

resource "aws_wafv2_web_acl_association" "api_gateway_waf_acl_association" {
  resource_arn = aws_api_gateway_stage.dos_comparison_tool_api_gateway_stage.arn
  web_acl_arn  = aws_wafv2_web_acl.api_gateway_waf_acl.arn

  depends_on = [
    aws_api_gateway_stage.dos_comparison_tool_api_gateway_stage,
    aws_wafv2_web_acl.api_gateway_waf_acl
  ]

}
