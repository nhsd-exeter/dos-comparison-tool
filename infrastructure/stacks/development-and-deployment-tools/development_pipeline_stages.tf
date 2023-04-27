module "python_unit_tests_codebuild_project" {
  source                          = "../../modules/codebuild"
  codebuild_project_name          = var.python_unit_tests_codebuild_project
  codebuild_project_description   = "DoS Comparison Tool - Python Unit Tests"
  codebuild_service_role          = data.aws_iam_role.pipeline_role.arn
  codebuild_linux_image           = "aws/codebuild/standard:6.0"
  github_repsitory_url            = var.github_repository_url
  buildspec_rendered              = file("${path.module}/buildspecs/pipeline_stages/python_unit_tests_buildspec.yml")
  codebuild_environment_variables = local.codebuild_standard_environment_variables
}

module "typescript_unit_tests_codebuild_project" {
  source                          = "../../modules/codebuild"
  codebuild_project_name          = var.typescript_unit_tests_codebuild_project
  codebuild_project_description   = "DoS Comparison Tool - Typescript Unit Tests"
  codebuild_service_role          = data.aws_iam_role.pipeline_role.arn
  github_repsitory_url            = var.github_repository_url
  buildspec_rendered              = file("${path.module}/buildspecs/pipeline_stages/typescript_unit_tests_buildspec.yml")
  codebuild_environment_variables = local.codebuild_standard_environment_variables
}

module "ui_build_codebuild_project" {
  source                          = "../../modules/codebuild"
  codebuild_project_name          = var.ui_build_codebuild_project
  codebuild_project_description   = "DoS Comparison Tool - Build and Push lambda docker image"
  codebuild_service_role          = data.aws_iam_role.pipeline_role.arn
  github_repsitory_url            = var.github_repository_url
  buildspec_rendered              = file("${local.pipeline_stages_path}/ui_build_buildspec.yml")
  codebuild_environment_variables = local.codebuild_standard_environment_variables
}

module "lambda_build_codebuild_project" {
  source                          = "../../modules/codebuild"
  codebuild_project_name          = var.lambda_build_codebuild_project
  codebuild_project_description   = "DoS Comparison Tool - Build and Push ui docker image"
  codebuild_service_role          = data.aws_iam_role.pipeline_role.arn
  github_repsitory_url            = var.github_repository_url
  buildspec_rendered              = file("${local.pipeline_stages_path}/lambda_build_buildspec.yml")
  codebuild_environment_variables = local.codebuild_standard_environment_variables
}

module "deploy_codebuild_project" {
  source                          = "../../modules/codebuild"
  codebuild_project_name          = var.deploy_codebuild_project
  codebuild_project_description   = "DoS Comparison Tool - Deploy application"
  codebuild_service_role          = data.aws_iam_role.pipeline_role.arn
  github_repsitory_url            = var.github_repository_url
  buildspec_rendered              = file("${local.pipeline_stages_path}/deploy_buildspec.yml")
  codebuild_environment_variables = local.codebuild_standard_environment_variables
}

module "end_to_end_tests_codebuild_project" {
  source                          = "../../modules/codebuild"
  codebuild_project_name          = var.end_to_end_tests_codebuild_project
  codebuild_project_description   = "DoS Comparison Tool - End to end tests"
  codebuild_service_role          = data.aws_iam_role.pipeline_role.arn
  github_repsitory_url            = var.github_repository_url
  buildspec_rendered              = file("${local.pipeline_stages_path}/end_to_end_tests_buildspec.yml")
  codebuild_environment_variables = local.codebuild_standard_environment_variables
}

module "api_integration_tests_codebuild_project" {
  source                          = "../../modules/codebuild"
  codebuild_project_name          = var.api_integration_tests_codebuild_project
  codebuild_project_description   = "DoS Comparison Tool - API integration tests"
  codebuild_service_role          = data.aws_iam_role.pipeline_role.arn
  github_repsitory_url            = var.github_repository_url
  buildspec_rendered              = file("${local.pipeline_stages_path}/api_integration_tests_buildspec.yml")
  codebuild_environment_variables = local.codebuild_standard_environment_variables
}
