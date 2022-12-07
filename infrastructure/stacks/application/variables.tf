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

# ############################
# OTHER
# ############################

variable "eks_terraform_state_key" {
  type        = string
  description = "The name of the Terraform state key for the EKS cluster"
}
