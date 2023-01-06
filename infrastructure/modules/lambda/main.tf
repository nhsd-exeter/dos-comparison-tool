resource "aws_lambda_function" "lambda" {
  function_name = var.function_name
  role          = aws_iam_role.lambda_role.arn
  publish       = true
  package_type  = "Image"
  image_uri     = var.image_uri

  timeout     = var.timeout
  memory_size = var.memory_size

  dynamic "vpc_config" {
    for_each = var.vpc_config ? [1] : []
    content {
      subnet_ids         = var.subnet_ids
      security_group_ids = var.security_group_ids
    }
  }

  tracing_config {
    mode = "Active"
  }
  environment {
    variables = var.environment_variables
  }

  depends_on = [
    aws_iam_role.lambda_role,
    aws_iam_role_policy.lambda_role_policy,
    aws_cloudwatch_log_group.lambda_log_group
  ]
}

resource "aws_lambda_function_event_invoke_config" "lambda_invoke_config" {
  function_name          = aws_lambda_function.lambda.function_name
  maximum_retry_attempts = var.retry_attempts
}

resource "aws_iam_role" "lambda_role" {
  name               = "${var.function_name}-role"
  path               = "/"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

#tfsec:ignore:aws-iam-no-policy-wildcards
resource "aws_iam_role_policy" "lambda_role_policy" {
  name   = "${var.function_name}-role-policy"
  role   = aws_iam_role.lambda_role.name
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkInterface",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DeleteNetworkInterface",
        "ec2:AssignPrivateIpAddresses",
        "ec2:UnassignPrivateIpAddresses",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeSubnets",
        "ec2:DescribeVpcs",
        "xray:PutTraceSegments",
        "xray:PutTelemetryRecords",
        "xray:GetSamplingRules",
        "xray:GetSamplingTargets",
        "xray:GetSamplingStatisticSummaries"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
POLICY
}

#tfsec:ignore:aws-cloudwatch-log-group-customer-key
resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/${var.function_name}"
  retention_in_days = var.log_retention
}

resource "aws_cloudwatch_log_subscription_filter" "splunk_firehose_subscription" {
  name            = "${var.function_name}-log-subscription"
  role_arn        = var.splunk_firehose_role_arn
  filter_pattern  = ""
  log_group_name  = aws_cloudwatch_log_group.lambda_log_group.name
  destination_arn = var.splunk_firehose_subscription_destination_arn
}
