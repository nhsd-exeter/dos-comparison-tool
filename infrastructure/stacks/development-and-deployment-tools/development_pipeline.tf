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
      }
    }
  }

  stage {
    name = "Unit_Tests"
    action {
      name            = "Typescript_Unit_Tests"
      category        = "Build"
      owner           = "AWS"
      provider        = "CodeBuild"
      input_artifacts = ["source_output"]
      version         = "1"
      configuration = {
        ProjectName = var.typescript_unit_tests_codebuild_project
      }
    }
    action {
      name            = "Python_Unit_Tests"
      category        = "Build"
      owner           = "AWS"
      provider        = "CodeBuild"
      input_artifacts = ["source_output"]
      version         = "1"
      configuration = {
        ProjectName = var.python_unit_tests_codebuild_project
      }
    }
  }
  stage {
    name = "Build_and_Push"
    dynamic "action" {
      for_each = local.lambda_build
      content {
        name            = "Build_${title(action.key)}"
        category        = "Build"
        owner           = "AWS"
        provider        = "CodeBuild"
        input_artifacts = ["source_output"]
        version         = "1"
        configuration = {
          ProjectName = var.lambda_build_codebuild_project
          EnvironmentVariables = jsonencode([
            {
              name  = "BUILD_ITEM_NAME"
              value = action.key
              type  = "PLAINTEXT"
            }
          ])
        }
      }
    }
    action {
      name            = "Build_UI"
      category        = "Build"
      owner           = "AWS"
      provider        = "CodeBuild"
      input_artifacts = ["source_output"]
      version         = "1"
      configuration = {
        ProjectName = var.ui_build_codebuild_project
      }
    }
  }
  stage {
    name = "Deploy_and_Test_Nonprod_Environments"
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
    action {
      name            = "End_To_End_Tests"
      category        = "Build"
      owner           = "AWS"
      run_order       = 2
      provider        = "CodeBuild"
      input_artifacts = ["source_output"]
      version         = "1"
      configuration = {
        ProjectName = var.end_to_end_tests_codebuild_project
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
    action {
      name            = "API_Integration_Tests"
      category        = "Build"
      owner           = "AWS"
      run_order       = 2
      provider        = "CodeBuild"
      input_artifacts = ["source_output"]
      version         = "1"
      configuration = {
        ProjectName = var.api_integration_tests_codebuild_project
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
    module.python_unit_tests_codebuild_project,
    module.typescript_unit_tests_codebuild_project,
    module.ui_build_codebuild_project,
    module.lambda_build_codebuild_project,
    module.deploy_codebuild_project,
    module.end_to_end_tests_codebuild_project,
    module.api_integration_tests_codebuild_project,
  ]
}
