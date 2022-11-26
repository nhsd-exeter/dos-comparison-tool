terraform {
  backend "s3" {
    encrypt = true
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.41.0"
    }
    template = {
      source  = "hashicorp/random"
      version = "~> 3.4.3"
    }
  }
}
