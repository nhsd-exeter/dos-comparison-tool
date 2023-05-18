resource "aws_codebuild_project" "codebuild_project" {
  name           = var.codebuild_project_name
  description    = var.codebuild_project_description
  build_timeout  = var.codebuild_build_timeout
  queued_timeout = var.codebuild_queued_timeout
  service_role   = var.codebuild_service_role

  artifacts {
    type = "CODEPIPELINE"
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
      type  = "PLAINTEXT"
    }

    dynamic "environment_variable" {
      for_each = var.codebuild_environment_variables
      content {
        name  = environment_variable.value.name
        value = environment_variable.value.value
        type  = environment_variable.value.type
      }
    }
  }
  logs_config {
    cloudwatch_logs {
      group_name  = "/aws/codebuild/${var.codebuild_project_name}"
      stream_name = ""
    }
  }
  source {
    type      = "CODEPIPELINE"
    buildspec = var.buildspec_rendered
  }

}
