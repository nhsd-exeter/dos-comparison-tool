#tfsec:ignore:aws-kms-auto-rotate-keys
resource "aws_kms_key" "log_encryption_key" {
  description              = "KMS key used to encrypt CloudWatch logs"
  key_usage                = "ENCRYPT_DECRYPT"
  customer_master_key_spec = "SYMMETRIC_DEFAULT"
  policy = jsonencode({
    Statement = [
      {
        Action = "kms:*"
        Effect = "Allow"
        Principal = {
          AWS = [
            "arn:aws:iam::${var.aws_account_id}:root",
            "arn:aws:iam::${var.aws_account_id}:role/${var.developer_role_name}",
          ]
        }
        Resource = "*"
      },
      {
        Action = "kms:*"
        Effect = "Allow"
        Principal = {
          Service = "cloudwatch.amazonaws.com"
        }
        Resource = "*"
      },
      {
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "logs.${var.aws_region}.amazonaws.com"
        },
        "Action" : [
          "kms:Encrypt*",
          "kms:Decrypt*",
          "kms:ReEncrypt*",
          "kms:GenerateDataKey*",
          "kms:Describe*"
        ],
        "Resource" : "*",
        "Condition" : {
          "ArnEquals" : {
            "kms:EncryptionContext:aws:logs:arn" : [
              "arn:aws:logs:${var.aws_region}:${var.aws_account_id}:log-group:${var.api_gateway_waf_logs_name}",
              "arn:aws:logs:${var.aws_region}:${var.aws_account_id}:log-group:/aws/lambda/${var.data_lambda_function_name}",
              "arn:aws:logs:${var.aws_region}:${var.aws_account_id}:log-group:/aws/lambda/${var.search_lambda_function_name}"
            ]
          }
        }
      }
    ]
    Version = "2012-10-17"
    }
  )
  deletion_window_in_days = 7
  is_enabled              = true
  enable_key_rotation     = false
}

resource "aws_kms_alias" "log_encryption_key_alias" {
  name          = var.log_encryption_key_alias
  target_key_id = aws_kms_key.log_encryption_key.key_id
}
