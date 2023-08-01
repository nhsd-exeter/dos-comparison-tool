# Ignored the following checks due to tfec bug causing the module's examples to fail the checks
# tfsec:ignore:aws-s3-encryption-customer-key
# tfsec:ignore:aws-s3-enable-bucket-encryption
# tfsec:ignore:aws-s3-ignore-public-acls
# tfsec:ignore:aws-s3-no-public-buckets
# tfsec:ignore:aws-s3-specify-public-access-block
# tfsec:ignore:aws-s3-block-public-acls
# tfsec:ignore:aws-s3-block-public-policy
module "development_pipeline_artefact_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "3.14.1"

  bucket        = var.development_pipeline_bucket
  acl           = "private"
  force_destroy = true

  attach_deny_insecure_transport_policy = true
  attach_require_latest_tls_policy      = true
  block_public_acls                     = true
  block_public_policy                   = true
  ignore_public_acls                    = true
  restrict_public_buckets               = true

  logging = {
    target_bucket = module.development_pipeline_log_bucket.s3_bucket_id
    target_prefix = "log/"
  }

  server_side_encryption_configuration = {
    rule = {
      apply_server_side_encryption_by_default = {
        sse_algorithm = "AES256"
      }
    }
  }

  versioning = {
    enabled = true
  }

  depends_on = [
    module.development_pipeline_log_bucket
  ]
}

# Ignored the following checks due to tfec bug causing the module's examples to fail the checks
# tfsec:ignore:aws-s3-encryption-customer-key
# tfsec:ignore:aws-s3-enable-bucket-encryption
# tfsec:ignore:aws-s3-ignore-public-acls
# tfsec:ignore:aws-s3-no-public-buckets
# tfsec:ignore:aws-s3-specify-public-access-block
# tfsec:ignore:aws-s3-block-public-acls
# tfsec:ignore:aws-s3-block-public-policy
# tfsec:ignore:aws-s3-enable-bucket-logging
module "development_pipeline_log_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "3.14.1"

  bucket        = var.development_pipeline_log_bucket
  force_destroy = true

  attach_deny_insecure_transport_policy = true
  attach_require_latest_tls_policy      = true
  block_public_acls                     = true
  block_public_policy                   = true
  ignore_public_acls                    = true
  restrict_public_buckets               = true

  server_side_encryption_configuration = {
    rule = {
      apply_server_side_encryption_by_default = {
        sse_algorithm = "AES256"
      }
    }
  }

  policy = jsonencode({
    Statement = [
      {
        Action = "kms:*"
        Effect = "Allow"
        Principal = {
          Service = ["s3:PutObject"]
        }
        Resource = [
          "arn:aws:s3:::${var.development_pipeline_log_bucket}/*",
          "arn:aws:s3:::${var.development_pipeline_log_bucket}/s3/${var.development_pipeline_bucket}/*"
        ]
        condition = {
          test     = "ArnLike"
          variable = "aws:SourceArn"
          values   = ["arn:aws:s3:::${var.development_pipeline_bucket}"]
        }
        condition = {
          test     = "StringEquals"
          variable = "aws:SourceAccount"
          values   = ["${var.aws_account_id}"]
        }
      }
    ]
  })

  versioning = {
    enabled = true
  }

}
