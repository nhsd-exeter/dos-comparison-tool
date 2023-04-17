# tfsec:ignore:aws-iam-no-policy-wildcards
module "data_lambda" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "4.14.0"

  function_name = var.data_lambda_function_name
  description   = "Data lambda function for the DoS Comparison Tool"

  memory_size                       = 128
  timeout                           = 5
  maximum_retry_attempts            = 0
  tracing_mode                      = "Active"
  cloudwatch_logs_retention_in_days = 30

  create_package = false
  package_type   = "Image"
  image_uri      = var.data_lambda_image_uri

  attach_network_policy         = true
  attach_cloudwatch_logs_policy = true
  attach_tracing_policy         = true
  attach_policy_json            = true
  policy_json = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Effect" : "Allow",
          "Action" : ["s3:GetObject", "s3:GetBucketLocation", "s3:ListBucket"]
          "Resource" : [module.application_bucket.s3_bucket_arn, "${module.application_bucket.s3_bucket_arn}/*"]
        },
      ]
    }
  )

  environment_variables = {
    "PROFILE" : var.profile
    "ENVIRONMENT" : var.environment
    "LOG_LEVEL" : var.log_level
    "POWERTOOLS_SERVICE_NAME" : var.environment
    "POWERTOOLS_TRACER_CAPTURE_RESPONSE" : true
    "POWERTOOLS_TRACER_CAPTURE_ERROR" : true
    "POWERTOOLS_TRACE_MIDDLEWARES" : true
    "APPLICATION_CONFIG_BUCKET_NAME" : var.application_bucket_name
  }
  depends_on = [
    module.application_bucket
  ]
}

resource "aws_cloudwatch_log_subscription_filter" "data_lambda_splunk_firehose_subscription" {
  name            = "${var.data_lambda_function_name}-log-subscription"
  role_arn        = "arn:aws:iam::${var.aws_account_id}:role/${var.splunk_firehose_role}"
  filter_pattern  = ""
  log_group_name  = module.data_lambda.lambda_cloudwatch_log_group_name
  destination_arn = "arn:aws:firehose:${var.aws_region}:${var.aws_account_id}:deliverystream/${var.splunk_firehose_subscription}"
}
