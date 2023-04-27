# Ignored the following checks due to tfec bug causing the module's examples to fail the checks
# tfsec:ignore:aws-s3-encryption-customer-key
# tfsec:ignore:aws-s3-enable-bucket-encryption
# tfsec:ignore:aws-s3-ignore-public-acls
# tfsec:ignore:aws-s3-no-public-buckets
# tfsec:ignore:aws-s3-specify-public-access-block
# tfsec:ignore:aws-s3-block-public-acls
# tfsec:ignore:aws-s3-block-public-policy
module "application_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "3.9.0"

  bucket        = var.application_bucket_name
  force_destroy = true

  attach_deny_insecure_transport_policy = true
  attach_require_latest_tls_policy      = true
  block_public_acls                     = true
  block_public_policy                   = true
  ignore_public_acls                    = true
  restrict_public_buckets               = true

  logging = {
    target_bucket = module.log_bucket.s3_bucket_id
    target_prefix = "s3/${var.application_bucket_name}/"
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
    module.log_bucket
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
module "log_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "3.9.0"

  bucket        = var.log_bucket_name
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
          "arn:aws:s3:::${var.log_bucket_name}/*",
          "arn:aws:s3:::${var.log_bucket_name}/s3/${var.application_bucket_name}/*"
        ]
        condition = {
          test     = "ArnLike"
          variable = "aws:SourceArn"
          values   = ["arn:aws:s3:::${var.application_bucket_name}"]
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
