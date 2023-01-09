resource "aws_codepipeline" "development_pipeline" {
  name     = var.development_pipeline
  role_arn = data.aws_iam_role.pipeline_role.arn

  artifact_store {
    location = var.development_pipeline_bucket
    type     = "S3"
  }


  stage {
    name = "Source"
    action {
      category         = "Source"
      name             = "Source"
      owner            = "AWS"
      provider         = "CodeStarSourceConnection"
      version          = "1"
      output_artifacts = ["source_output"]

      configuration = {
        ConnectionArn    = aws_codestarconnections_connection.github.arn
        FullRepositoryId = var.github_repository
        BranchName       = var.development_pipeline_integration_branch
        DetectChanges    = true
      }
    }
  }

  stage {
    name = "Unit_Tests"
    dynamic "action" {
      for_each = local.unit_tests
      content {
        name            = "${title(action.key)}_Unit_Tests"
        category        = "Build"
        owner           = "AWS"
        provider        = "CodeBuild"
        input_artifacts = ["source_output"]
        version         = "1"
        configuration = {
          ProjectName = var.unit_tests_codebuild_project
          EnvironmentVariables = jsonencode([
            {
              name  = "UNIT_TEST_MAKE_TARGET"
              value = "${action.key}-test"
              type  = "PLAINTEXT"
            }
          ])
        }
      }
    }
  }
  stage {
    name = "Build"
    dynamic "action" {
      for_each = local.build
      content {
        name            = "Build_${title(action.key)}"
        category        = "Build"
        owner           = "AWS"
        provider        = "CodeBuild"
        input_artifacts = ["source_output"]
        version         = "1"
        configuration = {
          ProjectName = var.build_codebuild_project
          EnvironmentVariables = jsonencode([
            {
              name  = "BUILD_ITEM_NAME"
              value = action.key
              type  = "PLAINTEXT"
            },
            {
              name  = "BUILD_MAKE_TARGET"
              value = "${action.key}-build"
              type  = "PLAINTEXT"
            }
          ])
        }
      }
    }
  }
  stage {
    name = "Deploy_Nonprod_Environments"
    action {

      name            = "Deploy_Dev"
      category        = "Build"
      owner           = "AWS"
      run_order       = 1
      provider        = "CodeBuild"
      input_artifacts = ["source_output"]
      version         = "1"
      configuration = {
        ProjectName = var.deploy_codebuild_project
        EnvironmentVariables = jsonencode([
          {
            name  = "PROFILE"
            value = "dev"
            type  = "PLAINTEXT"
          },
          {
            name  = "ENVIRONMENT"
            value = "dev"
            type  = "PLAINTEXT"
          }
        ])
      }
    }
  }
  depends_on = [
    module.development_pipeline_artefact_bucket,
    module.unit_tests_codebuild_project,
    module.build_codebuild_project,
    module.deploy_codebuild_project,
  ]
}
