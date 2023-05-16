# KEEP

variable "codebuild_project_name" {
  type        = string
  description = "Name of the CodeBuild project"
}

variable "codebuild_project_description" {
  type        = string
  description = "Description of the CodeBuild project"
  default     = ""
}

variable "codebuild_build_timeout" {
  type        = string
  description = "Build timeout for the CodeBuild project"
  default     = "30"
}

variable "codebuild_queued_timeout" {
  type        = string
  description = "Queued timeout for the CodeBuild project"
  default     = "5"
}

variable "codebuild_service_role" {
  type        = string
  description = "Service role for the CodeBuild project"
}

variable "codebuild_compute_type" {
  type        = string
  description = "The type of compute to use for the build. Valid values: BUILD_GENERAL1_SMALL | BUILD_GENERAL1_MEDIUM | BUILD_GENERAL1_LARGE"
  default     = "BUILD_GENERAL1_SMALL"
}

variable "codebuild_linux_image" {
  type        = string
  description = "The image tag or image digest that identifies the Docker image to use for this build project. Use the following formats: For an image tag: registry/repository:tag For an image digest: registry/repository@digest"
  default     = "aws/codebuild/amazonlinux2-x86_64-standard:4.0"
}

variable "buildspec_rendered" {
  type        = string
  description = "The buildspec file rendered from the template"
}

variable "codebuild_environment_variables" {
  type = list(object(
    {
      name  = string
      value = string
      type  = string
  }))
  description = "The environment variables for the CodeBuild project"
}
