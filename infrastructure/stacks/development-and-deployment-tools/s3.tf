module "development_pipeline_artefact_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "3.6.0"
  bucket  = var.development_pipeline_artefact_bucket

  // S3 bucket-level Public Access Block configuration
  block_public_acls                     = true
  block_public_policy                   = true
  ignore_public_acls                    = true
  restrict_public_buckets               = true
  attach_deny_insecure_transport_policy = true
  attach_require_latest_tls_policy      = true
}
