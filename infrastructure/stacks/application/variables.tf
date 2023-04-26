# ############################
# K8S Service Role
# ############################

variable "application_service_account_name" {
  type        = string
  description = "The name of the service account to use for the application"
}

variable "kubernetes_service_account_role_name" {
  type        = string
  description = "The name of the Kubernetes service account role for the application"
}

variable "kubernetes_service_account_role_policy_name" {
  type        = string
  description = "The name of the Kubernetes service account policy for the application"
}

# ############################
# COGNITO
# ############################

variable "cognito_user_pool_name" {
  type        = string
  description = "The name of the Cognito user pool"
}

variable "cognito_user_pool_client_name" {
  type        = string
  description = "The name of the Cognito user pool client"
}

variable "cognito_admin_user" {
  type        = string
  description = "The name of the Cognito admin user"
}

variable "cognito_secrets_name" {
  type        = string
  description = "The name of the Cognito secrets"
}

# ############################
# CLOUDWATCH
# ############################

variable "cloudwatch_monitoring_dashboard_name" {
  type        = string
  description = "The name of the CloudWatch monitoring dashboard"
}

variable "api_gateway_waf_logs_name" {
  type        = string
  description = "The name of the API Gateway WAF logs"
}

variable "search_lambda_error_rate_alert_name" {
  type        = string
  description = "The name of the search lambda error rate alert"
}

variable "data_lambda_error_rate_alert_name" {
  type        = string
  description = "The name of the data lambda error rate alert"
}

# ############################
# API GATEWAY
# ############################

variable "api_gateway_name" {
  type        = string
  description = "The name of the API Gateway"
}

variable "api_gateway_execution_role_name" {
  type        = string
  description = "The name of the API Gateway execution role"
}

variable "api_gateway_execution_role_policy_name" {
  type        = string
  description = "The name of the API Gateway execution role policy"
}

variable "cognito_authorizer_name" {
  type        = string
  description = "The name of the Cognito authorizer"
}

# ############################
# LAMBDA
# ############################

variable "search_lambda_function_name" {
  type        = string
  description = "The name of the search lambda"
}

variable "search_lambda_image_uri" {
  type        = string
  description = "The URI of the search lambda image"
}

variable "data_lambda_function_name" {
  type        = string
  description = "The name of the data lambda"
}

variable "data_lambda_image_uri" {
  type        = string
  description = "The URI of the data lambda image"
}

# ############################
# LAMBDA ENVIRONMENT VARIABLES
# ############################

variable "log_level" {
  type        = string
  description = "The log level for the application"
}

variable "ccs_secrets_name" {
  type        = string
  description = "The name of the CCS secrets manager secret"
}

variable "ccs_username_key" {
  type        = string
  description = "The key for the CCS username in secrets manager"
}

variable "ccs_password_key" {
  type        = string
  description = "The key for the CCS password in secrets manager"
}

variable "default_environment_url" {
  type        = string
  description = "The default environment URL for the CCS API"
}

variable "ccs_search_path" {
  type        = string
  description = "The path for the CCS search API"
}

# ############################
# SPLUNK
# ############################

variable "splunk_firehose_subscription" {
  description = "Name of splunk firehose subscription"
}

variable "splunk_firehose_role" {
  description = "Name of splunk firehose IAM role"
}

# ############################
# OTHER
# ############################

variable "eks_terraform_state_key" {
  type        = string
  description = "The name of the Terraform state key for the EKS cluster"
}

# ############################
# Route53
# ############################

variable "dos_comparison_tool_api_gateway_subdomain_name" {
  type        = string
  description = "The subdomain name for the API Gateway"
}

variable "texas_hosted_zone" {
  type        = string
  description = "The name of the Texas hosted zone"
}

# ############################
# SECRETS
# ############################

variable "api_gateway_endpoint_key" {
  type        = string
  description = "The key for the API Gateway endpoint in the Cognito secrets"
}

variable "cognito_secrets_admin_username_key" {
  type        = string
  description = "The key for the admin username in the Cognito secrets"
}

variable "cognito_secrets_admin_password_key" {
  type        = string
  description = "The key for the admin password in the Cognito secrets"
}

variable "cognito_secrets_user_pool_id_key" {
  type        = string
  description = "The key for the user pool ID in the Cognito secrets"
}

variable "cognito_secrets_user_pool_client_id_key" {
  type        = string
  description = "The key for the user pool client ID in the Cognito secrets"
}

# ############################
# SECURITY GROUPS
# ############################

variable "security_group_name" {
  type        = string
  description = "The name of the security group"
}

# ##############
# # VPC
# ##############

data "aws_vpc" "texas_vpc" {
  tags = {
    Name = var.aws_vpc_name
  }
}

# ##############
# S3
# ##############

variable "application_bucket_name" {
  type        = string
  description = "The name of the application bucket"
}

variable "log_bucket_name" {
  type        = string
  description = "The name of the log bucket"
}

# ##############
# WAF
# ##############

variable "api_gateway_waf_acl" {
  type        = string
  description = "API Gateway WAF ACL"
}

# ##############
# WAF RULES
# ##############

variable "waf_rate_based_rule_name" {
  type        = string
  description = "WAF rate based rule name"
}

variable "waf_non_gb_rule_name" {
  type        = string
  description = "WAF non GB rule name"
}

variable "waf_aws_known_bad_inputs_rule_name" {
  type        = string
  description = "WAF AWS known bad inputs rule name"
}

variable "waf_aws_sqli_rule_name" {
  type        = string
  description = "WAF AWS SQLi rule name"
}

variable "waf_ip_reputation_list_rule_name" {
  type        = string
  description = "WAF IP reputation list rule name"
}

variable "waf_managed_rule_group_rule_name" {
  type        = string
  description = "WAF managed rule group rule name"
}

# ##############
# WAF METRICS
# ##############

variable "waf_acl_metric_name" {
  type        = string
  description = "WAF ACL metric name"
}

variable "waf_rate_based_metric_name" {
  type        = string
  description = "WAF rate based metric name"
}

variable "waf_non_gb_rule_metric_name" {
  type        = string
  description = "Non GB rule metric name"
}

variable "waf_aws_known_bad_inputs_metric_name" {
  type        = string
  description = "WAF AWS known bad inputs metric name"
}

variable "waf_aws_sqli_metric_name" {
  type        = string
  description = "WAF AWS SQLi metric name"
}

variable "waf_ip_reputation_list_metric_name" {
  type        = string
  description = "IP reputation list metric name"
}

variable "waf_managed_rule_group_metric_name" {
  type        = string
  description = "WAF managed rule group metric name"
}

# ##############
# WAF ALARMS
# ##############

variable "waf_rate_based_alarm_name" {
  type        = string
  description = "WAF rate based alarm name"
}

variable "waf_non_gb_alarm_name" {
  type        = string
  description = "WAF non GB alarm name"
}

variable "waf_aws_known_bad_inputs_alarm_name" {
  type        = string
  description = "WAF AWS known bad inputs alarm name"
}

variable "waf_aws_sqli_alarm_name" {
  type        = string
  description = "WAF AWS SQLi alarm name"
}

variable "waf_ip_reputation_list_alarm_name" {
  type        = string
  description = "WAF IP reputation list alarm name"
}

variable "waf_managed_rule_group_alarm_name" {
  type        = string
  description = "WAF managed rule group alarm name"
}

# ##############
# KMS
# ##############

variable "log_encryption_key_alias" {
  type        = string
  description = "The alias for the log encryption key"
}

variable "developer_role_name" {
  type        = string
  description = "The name of the developer role"
}
