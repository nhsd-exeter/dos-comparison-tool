locals {
  unit_tests   = toset(["typescript", "python"])
  lambda_build = toset(["search", "data"])

  codebuild_standard_environment_variables = [
    {
      name  = "AWS_ACCOUNT_ID_LIVE_PARENT"
      type  = "PLAINTEXT"
      value = var.aws_account_id_live_parent
    },
    {
      name  = "AWS_ACCOUNT_ID_MGMT"
      type  = "PLAINTEXT"
      value = var.aws_account_id_mgmt
    },
    {
      name  = "AWS_ACCOUNT_ID_NONPROD"
      type  = "PLAINTEXT"
      value = var.aws_account_id_nonprod
    },
    {
      name  = "AWS_ACCOUNT_ID_PROD"
      type  = "PLAINTEXT"
      value = var.aws_account_id_prod
    },
    {
      name  = "AWS_ACCOUNT_ID_IDENTITIES"
      type  = "PLAINTEXT"
      value = var.aws_account_id_identities
    }
  ]

  pipeline_stages_path = "${path.module}/buildspecs/pipeline_stages"
  standalone_path      = "${path.module}/buildspecs/stand_alone_codebuild_stages"
}
