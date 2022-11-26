module "unit_tests_codebuild_project" {
  source                        = "../../modules/codebuild"
  codebuild_project_name        = var.unit_tests_codebuild_project
  codebuild_project_description = "Unit tests"
  codebuild_service_role        = aws_iam_role.codebuild_service_role.arn
  github_repsitory_url          = var.github_repository
  buildspec_rendered            = file("${path.module}/buildspecs/buildspec_unit_tests.yml")
  aws_account_id_live_parent    = var.aws_account_id_live_parent
  aws_account_id_mgmt           = var.aws_account_id_mgmt
  aws_account_id_nonprod        = var.aws_account_id_nonprod
  aws_account_id_prod           = var.aws_account_id_prod
  aws_account_id_identities     = var.aws_account_id_identities
}

module "build_codebuild_project" {
  source                        = "../../modules/codebuild"
  codebuild_project_name        = var.build_codebuild_project
  codebuild_project_description = "Build and Push docker images"
  codebuild_service_role        = aws_iam_role.codebuild_service_role.arn
  github_repsitory_url          = var.github_repository
  buildspec_rendered            = file("${path.module}/buildspecs/buildspec_unit_tests.yml")
  aws_account_id_live_parent    = var.aws_account_id_live_parent
  aws_account_id_mgmt           = var.aws_account_id_mgmt
  aws_account_id_nonprod        = var.aws_account_id_nonprod
  aws_account_id_prod           = var.aws_account_id_prod
  aws_account_id_identities     = var.aws_account_id_identities
}

module "deploy_codebuild_project" {
  source                        = "../../modules/codebuild"
  codebuild_project_name        = var.deploy_codebuild_project
  codebuild_project_description = "Deploy application"
  codebuild_service_role        = aws_iam_role.codebuild_service_role.arn
  github_repsitory_url          = var.github_repository
  buildspec_rendered            = file("${path.module}/buildspecs/buildspec_unit_tests.yml")
  aws_account_id_live_parent    = var.aws_account_id_live_parent
  aws_account_id_mgmt           = var.aws_account_id_mgmt
  aws_account_id_nonprod        = var.aws_account_id_nonprod
  aws_account_id_prod           = var.aws_account_id_prod
  aws_account_id_identities     = var.aws_account_id_identities
}
