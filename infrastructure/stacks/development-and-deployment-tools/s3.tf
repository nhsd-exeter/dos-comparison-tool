#tfsec:ignore:aws-s3-encryption-customer-key
#tfsec:ignore:aws-s3-enable-bucket-logging
module "development_pipeline_artefact_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "3.6.0"
  bucket  = var.development_pipeline_bucket

  # Allow deletion of non-empty bucket
  force_destroy = true

  versioning = {
    enabled = true
  }

  server_side_encryption_configuration = {
    rule = {
      apply_server_side_encryption_by_default = {
        sse_algorithm = "AES256"
      }
    }
  }

  // S3 bucket-level Public Access Block configuration
  block_public_acls                     = true
  block_public_policy                   = true
  ignore_public_acls                    = true
  restrict_public_buckets               = true
  attach_deny_insecure_transport_policy = true
  attach_require_latest_tls_policy      = true
}
