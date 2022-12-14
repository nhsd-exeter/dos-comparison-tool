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
# CLOUDWATCH
# ############################

variable "cloudwatch_monitoring_dashboard_name" {
  type        = string
  description = "The name of the CloudWatch monitoring dashboard"
}

# ############################
# API GATEWAY
# ############################

variable "api_gateway_name" {
  type        = string
  description = "The name of the API Gateway"
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
