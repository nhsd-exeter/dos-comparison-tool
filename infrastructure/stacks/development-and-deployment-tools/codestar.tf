resource "aws_codestarconnections_connection" "github" {
  name          = "${var.project_id}-${var.environment}"
  provider_type = "GitHub"
}
