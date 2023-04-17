module "search_lambda" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "4.14.0"

  function_name = var.search_lambda_function_name
  description   = "Search lambda function for the DoS Comparison Tool"

  memory_size                       = 128
  timeout                           = 5
  maximum_retry_attempts            = 0
  tracing_mode                      = "Active"
  cloudwatch_logs_retention_in_days = 30

  create_package = false
  package_type   = "Image"
  image_uri      = var.search_lambda_image_uri

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
          "Action" : "secretsmanager:GetSecretValue",
          "Resource" : "arn:aws:secretsmanager:${var.aws_region}:${var.aws_account_id}:secret:${var.ccs_secrets_name}-*"
        },
      ]
    }
  )
  environment_variables = {
    "PROFILE" : var.profile
    "ENVIRONMENT" : var.environment
    "POWERTOOLS_SERVICE_NAME" : var.environment
    "POWERTOOLS_TRACER_CAPTURE_RESPONSE" : true
    "POWERTOOLS_TRACER_CAPTURE_ERROR" : true
    "POWERTOOLS_TRACE_MIDDLEWARES" : true
    "CCS_SECRET_NAME" : var.ccs_secrets_name
    "CCS_USERNAME_KEY" : var.ccs_username_key
    "CCS_PASSWORD_KEY" : var.ccs_password_key
    "DEFAULT_ENVIRONMENT_URL" : var.default_environment_url
    "CCS_SEARCH_PATH" : var.ccs_search_path
  }

  vpc_security_group_ids = [aws_security_group.lambda_security_group.id]
  vpc_subnet_ids         = [data.aws_subnet.vpc_subnet_a.id, data.aws_subnet.vpc_subnet_b.id, data.aws_subnet.vpc_subnet_c.id]

  depends_on = [aws_security_group.lambda_security_group]
}

resource "aws_cloudwatch_log_subscription_filter" "search_lambda_splunk_firehose_subscription" {
  name            = "${var.search_lambda_function_name}-log-subscription"
  role_arn        = "arn:aws:iam::${var.aws_account_id}:role/${var.splunk_firehose_role}"
  filter_pattern  = ""
  log_group_name  = module.search_lambda.lambda_cloudwatch_log_group_name
  destination_arn = "arn:aws:firehose:${var.aws_region}:${var.aws_account_id}:deliverystream/${var.splunk_firehose_subscription}"
}
