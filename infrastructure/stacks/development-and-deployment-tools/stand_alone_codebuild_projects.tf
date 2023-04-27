# Codebuild Projects in this file are not part of a pipeline, they are stand alone projects

# This job is used to clean up non production resources when a PR is merged
# module "clean_up_resources_codebuild_project" {
#   source                          = "../../modules/codebuild"
#   codebuild_project_name          = var.clean_up_resources_codebuild_project
#   codebuild_project_description   = "Clean up non production resources"
#   codebuild_service_role          = data.aws_iam_role.pipeline_role.arn
#   github_repsitory_url            = var.github_repository_url
#   buildspec_rendered              = file("${local.standalone_path}/clean_up_resources_buildspec.yml")
#   codebuild_environment_variables = local.codebuild_standard_environment_variables
# }
