resource "aws_cloudwatch_event_rule" "schedule_rule" {
  count               = var.codebuild_schedule_enabled ? 1 : 0
  name                = "${var.codebuild_project_name}-schedule"
  schedule_expression = var.codebuild_schedule_expression
}

resource "aws_cloudwatch_event_target" "codebuild_event_target" {
  count = var.codebuild_schedule_enabled ? 1 : 0
  rule  = aws_cloudwatch_event_rule.schedule_rule[0].name
  arn   = aws_codebuild_project.codebuild_project.id

  role_arn = var.codebuild_service_role
}
