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
# OTHER
# ############################

variable "eks_terraform_state_key" {
  type        = string
  description = "The name of the Terraform state key for the EKS cluster"
}
