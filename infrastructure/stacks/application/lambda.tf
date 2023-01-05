module "search_lambda" {
  source        = "../../modules/lambda"
  function_name = var.search_lambda_function_name
  image_uri     = var.search_lambda_image_uri
  timeout       = "5"

  splunk_firehose_subscription_destination_arn = "arn:aws:firehose:${var.aws_region}:${var.aws_account_id}:deliverystream/${var.splunk_firehose_subscription}"
  splunk_firehose_role_arn                     = "arn:aws:iam::${var.aws_account_id}:role/${var.splunk_firehose_role}"

  environment_variables = {
    "PROFILE" : var.profile
    "ENVIRONMENT" : var.environment
  }
}

resource "aws_lambda_permission" "allow_api_gateway_to_invoke" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = module.search_lambda.lambda_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.aws_region}:${var.aws_account_id}:${aws_api_gateway_rest_api.dos_comparison_tool_api_gateway.id}/*/*/*"

  depends_on = [module.search_lambda]
}
