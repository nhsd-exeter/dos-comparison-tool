##########################
# INFRASTRUCTURE COMPONENT
##########################

# ##############
# # Lambda
# ##############

variable "function_name" {
  type        = string
  description = "Name of the lambda function"
}

variable "image_uri" {
  type        = string
  description = "Docker image URI"
}

variable "vpc_config" {
  type        = bool
  description = "Whether to use VPC config"
  default     = false
}

variable "subnet_ids" {
  type        = list(string)
  description = "List of subnet IDs"
  default     = []
}

variable "security_group_ids" {
  type        = list(string)
  description = "List of security group IDs"
  default     = []
}

variable "environment_variables" {
  description = "Map of environment variables"
  type        = map(string)
}

variable "timeout" {
  type        = string
  description = "Timeout of the lambda function in seconds"
  default     = "5"
}

variable "retry_attempts" {
  type        = number
  description = "Number of retries for the lamdba"
  default     = 0
}

variable "log_retention" {
  type        = string
  description = "Length of time in days to keep the logs in cloudwatch"
  default     = "0"
}

variable "memory_size" {
  type        = string
  description = "Amount of memory in MB your Lambda Function can use at runtime"
  default     = "128"
}

# ##############
# # Splunk
# ##############

variable "splunk_firehose_subscription_destination_arn" {
  type        = string
  description = "Name of splunk firehose subscription destination"
}

variable "splunk_firehose_role_arn" {
  type        = string
  description = "Splunk firehose role ARN"
}
