locals {
  unit_tests = {
    ui = {
      name        = "ui"
      make_target = "ui-test"
    }
  }
  build = {
    ui = {
      name        = "ui"
      make_target = "ui-build"
    }
  }

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
}
