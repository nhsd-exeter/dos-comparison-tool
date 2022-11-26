resource "aws_codebuild_project" "codebuild_project" {
  name           = var.codebuild_project_name
  description    = var.codebuild_project_description
  build_timeout  = var.codebuild_build_timeout
  queued_timeout = var.codebuild_queued_timeout
  service_role   = var.codebuild_service_role

  artifacts {
    type = "NO_ARTIFACTS"
  }

  cache {
    type  = "LOCAL"
    modes = ["LOCAL_DOCKER_LAYER_CACHE"]
  }

  environment {
    compute_type                = var.codebuild_compute_type
    image                       = var.codebuild_linux_image
    type                        = "LINUX_CONTAINER"
    image_pull_credentials_type = "CODEBUILD"
    privileged_mode             = true

    environment_variable {
      name  = "CB_PROJECT_NAME"
      value = var.codebuild_project_name
    }
    environment_variable {
      name  = "AWS_ACCOUNT_ID_LIVE_PARENT"
      value = var.aws_account_id_live_parent
    }
    environment_variable {
      name  = "AWS_ACCOUNT_ID_MGMT"
      value = var.aws_account_id_mgmt
    }
    environment_variable {
      name  = "AWS_ACCOUNT_ID_NONPROD"
      value = var.aws_account_id_nonprod
    }
    environment_variable {
      name  = "AWS_ACCOUNT_ID_PROD"
      value = var.aws_account_id_prod
    }
    environment_variable {
      name  = "AWS_ACCOUNT_ID_IDENTITIES"
      value = var.aws_account_id_identities
    }
  }
  logs_config {
    cloudwatch_logs {
      group_name  = "/aws/codebuild/${var.codebuild_project_name}"
      stream_name = ""
    }
  }
  source {
    type            = "GITHUB"
    git_clone_depth = 0
    location        = var.github_repsitory_url
    buildspec       = var.buildspec_rendered
  }

}
