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
