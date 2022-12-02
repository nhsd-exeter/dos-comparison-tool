module "unit_tests_codebuild_project" {
  source                          = "../../modules/codebuild"
  codebuild_project_name          = var.unit_tests_codebuild_project
  codebuild_project_description   = "Unit tests"
  codebuild_service_role          = data.aws_iam_role.pipeline_role.arn
  github_repsitory_url            = var.github_repository_url
  buildspec_rendered              = file("${path.module}/buildspecs/pipeline_stages/unit_tests_buildspec.yml")
  codebuild_environment_variables = local.codebuild_standard_environment_variables
}

module "build_codebuild_project" {
  source                          = "../../modules/codebuild"
  codebuild_project_name          = var.build_codebuild_project
  codebuild_project_description   = "Build and Push docker images"
  codebuild_service_role          = data.aws_iam_role.pipeline_role.arn
  github_repsitory_url            = var.github_repository_url
  buildspec_rendered              = file("${path.module}/buildspecs/pipeline_stages/build_buildspec.yml")
  codebuild_environment_variables = local.codebuild_standard_environment_variables
}

module "deploy_codebuild_project" {
  source                          = "../../modules/codebuild"
  codebuild_project_name          = var.deploy_codebuild_project
  codebuild_project_description   = "Deploy application"
  codebuild_service_role          = data.aws_iam_role.pipeline_role.arn
  github_repsitory_url            = var.github_repository_url
  buildspec_rendered              = file("${path.module}/buildspecs/pipeline_stages/deploy_buildspec.yml")
  codebuild_environment_variables = local.codebuild_standard_environment_variables
}

module "end_to_end_tests_codebuild_project" {
  source                          = "../../modules/codebuild"
  codebuild_project_name          = var.end_to_end_tests_codebuild_project
  codebuild_project_description   = "End to end tests"
  codebuild_service_role          = data.aws_iam_role.pipeline_role.arn
  github_repsitory_url            = var.github_repository_url
  buildspec_rendered              = file("${path.module}/buildspecs/pipeline_stages/end_to_end_tests_buildspec.yml")
  codebuild_environment_variables = local.codebuild_standard_environment_variables
}
