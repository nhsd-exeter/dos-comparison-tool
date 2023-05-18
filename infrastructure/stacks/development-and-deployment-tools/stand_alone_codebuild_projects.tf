# Codebuild Projects in this file are not part of a pipeline, they are stand alone projects

module "build_and_deploy_environment_codebuild_project" {
  source                        = "../../modules/standalone-codebuild"
  codebuild_project_name        = var.build_and_deploy_environment_codebuild_project
  codebuild_project_description = "Build and deploy environment"
  codebuild_service_role        = data.aws_iam_role.pipeline_role.arn
  github_repsitory_url          = var.github_repository_url
  buildspec_rendered            = file("${local.standalone_path}/build_and_deploy_environment_buildspec.yml")
  codebuild_environment_variables = concat(
    local.codebuild_standard_environment_variables, [{
      name  = "PROFILE"
      value = "dev"
      type  = "PLAINTEXT"
  }])
  codebuild_webhook_enabled = true
  filters = [
    {
      type                    = "EVENT"
      pattern                 = "PUSH"
      exclude_matched_pattern = false
    },
    {
      type                    = "HEAD_REF"
      pattern                 = "refs/heads/task/DOSCT-[0-9]*"
      exclude_matched_pattern = false
    },
  ]
}

module "clean_up_resources_codebuild_project" {
  source                        = "../../modules/standalone-codebuild"
  codebuild_project_name        = var.clean_up_resources_codebuild_project
  codebuild_project_description = "Clean up non production resources"
  codebuild_service_role        = data.aws_iam_role.pipeline_role.arn
  github_repsitory_url          = var.github_repository_url
  buildspec_rendered            = file("${local.standalone_path}/clean_up_resources_buildspec.yml")
  codebuild_environment_variables = concat(
    local.codebuild_standard_environment_variables, [{
      name  = "PROFILE"
      value = "dev"
      type  = "PLAINTEXT"
  }])
  codebuild_schedule_enabled    = true
  codebuild_schedule_expression = "cron(15 6 * * ? *)"
  # codebuild_schedule_expression = "rate(1 day)"
}
