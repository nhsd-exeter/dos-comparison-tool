module "unit_tests_codebuild_project" {
  source                          = "../../modules/codebuild"
  codebuild_project_name          = var.unit_tests_codebuild_project
  codebuild_project_description   = "Unit tests"
  codebuild_service_role          = data.aws_iam_role.pipeline_role.arn
  github_repsitory_url            = var.github_repository
  buildspec_rendered              = file("${path.module}/buildspecs/unit_tests_buildspec.yml")
  codebuild_environment_variables = local.codebuild_standard_environment_variables
}

module "build_codebuild_project" {
  source                          = "../../modules/codebuild"
  codebuild_project_name          = var.build_codebuild_project
  codebuild_project_description   = "Build and Push docker images"
  codebuild_service_role          = data.aws_iam_role.pipeline_role.arn
  github_repsitory_url            = var.github_repository
  buildspec_rendered              = file("${path.module}/buildspecs/build_buildspec.yml")
  codebuild_environment_variables = local.codebuild_standard_environment_variables
}

module "deploy_codebuild_project" {
  source                          = "../../modules/codebuild"
  codebuild_project_name          = var.deploy_codebuild_project
  codebuild_project_description   = "Deploy application"
  codebuild_service_role          = data.aws_iam_role.pipeline_role.arn
  github_repsitory_url            = var.github_repository
  buildspec_rendered              = file("${path.module}/buildspecs/deploy_buildspec.yml")
  codebuild_environment_variables = local.codebuild_standard_environment_variables
}
