# ############################
# GITHUB
# ############################

variable "github_repository" {
  type        = string
  description = "The name of the GitHub repository"
}

variable "github_repository_url" {
  type        = string
  description = "The URL of the GitHub repository"
}

variable "development_pipeline_integration_branch" {
  type        = string
  description = "The name of the git branch to use/trigger for the development pipeline integration branch"
}

# ############################
# CODE PIPELINE
# ############################

variable "development_pipeline" {
  type        = string
  description = "The name of the development pipeline"
}

# ############################
# CODE BUILD
# ############################

variable "unit_tests_codebuild_project" {
  type        = string
  description = "The name of the unit tests codebuild project"
}

variable "build_codebuild_project" {
  type        = string
  description = "The name of the build codebuild project"
}

variable "deploy_codebuild_project" {
  type        = string
  description = "The name of the deploy codebuild project"
}

variable "end_to_end_tests_codebuild_project" {
  type        = string
  description = "The name of the end to end tests codebuild project"
}

variable "clean_up_resources_codebuild_project" {
  type        = string
  description = "The name of the clean up resources codebuild project"
}

# ############################
# S3
# ############################

variable "development_pipeline_bucket" {
  type        = string
  description = "The name of the development pipeline bucket"
}
