data "terraform_remote_state" "eks" {
  backend = "s3"
  config = {
    bucket = var.terraform_platform_state_store
    key    = var.eks_terraform_state_key
    region = var.aws_region
  }
}

data "aws_route53_zone" "texas_hosted_zone" {
  name = var.texas_hosted_zone
}

data "aws_acm_certificate" "issued" {
  domain   = "*.${var.texas_hosted_zone}"
  statuses = ["ISSUED"]
}
