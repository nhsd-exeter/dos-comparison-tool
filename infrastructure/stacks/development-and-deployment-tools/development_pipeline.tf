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
        BranchName       = var.development_pipeline_branch_name
        DetectChanges    = true
      }
    }
  }

  stage {
    name = "Unit_Tests"
    action {
      name            = "UnitTests"
      category        = "Build"
      owner           = "AWS"
      provider        = "CodeBuild"
      input_artifacts = ["source_output"]
      version         = "1"
      configuration = {
        ProjectName = var.unit_tests_codebuild_project
      }
    }
  }
  stage {
    name = "Build"
    dynamic "action" {
      for_each = local.to_build
      content {
        name            = "Build_${action.key}"
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
              value = "${action.key}"
              type  = "PLAINTEXT"
            }
          ])
        }
      }
    }
  }
  stage {
    name = "Deploy_Nonprod_Environments"
    dynamic "action" {
      for_each = local.development_nonprod_environments
      content {
        name            = "Deploy_${action.value["ENVIRONMENT"]}"
        category        = "Build"
        owner           = "AWS"
        run_order       = 1
        provider        = "CodeBuild"
        input_artifacts = ["source_output"]
        version         = "1"
        configuration = {
          ProjectName = var.deploy_codebuild_project
        }
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
