data "terraform_remote_state" "eks" {
  backend = "s3"
  config = {
    bucket = var.terraform_platform_state_store
    key    = var.eks_terraform_state_key
    region = var.aws_region
  }
}
