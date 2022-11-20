provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      "Environment"     = var.environment
      "EnvironmentType" = var.aws_account_name
      "Product"         = var.project_id
      "Profile"         = var.profile
      "Programme"       = var.programme
      "Project"         = var.project_display_name
      "ProviderRegion"  = var.aws_region
      "PublicFacing"    = "No"
      "Service"         = var.project_id
      "TagVersion"      = "2.0"
      "Tool"            = "Terraform"
    }
  }
}
