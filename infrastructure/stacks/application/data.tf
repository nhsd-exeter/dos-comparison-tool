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

# ############################
# VPC
# ############################

data "aws_subnet" "vpc_subnet_a" {
  filter {
    name   = "tag:Name"
    values = ["${var.aws_vpc_name}-private-${var.aws_region}a"]
  }
}

data "aws_subnet" "vpc_subnet_b" {
  filter {
    name   = "tag:Name"
    values = ["${var.aws_vpc_name}-private-${var.aws_region}b"]
  }
}

data "aws_subnet" "vpc_subnet_c" {
  filter {
    name   = "tag:Name"
    values = ["${var.aws_vpc_name}-private-${var.aws_region}c"]
  }
}
