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
    type            = "GITHUB"
    git_clone_depth = 0
    location        = var.github_repsitory_url
    buildspec       = var.buildspec_rendered
  }

}

resource "aws_codebuild_webhook" "codebuild_webhook" {
  count        = var.codebuild_webhook_enabled ? 1 : 0
  project_name = aws_codebuild_project.codebuild_project.name
  build_type   = "BUILD"
  filter_group {
    dynamic "filter" {
      for_each = var.filters
      content {
        type                    = filter.value.type
        pattern                 = filter.value.pattern
        exclude_matched_pattern = filter.value.exclude_matched_pattern
      }
    }
  }
  depends_on = [aws_codebuild_project.codebuild_project]
}
