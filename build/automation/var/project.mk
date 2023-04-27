# ==============================================================================
# Project specific variables
ORG_NAME = nhsd-exeter
PROGRAMME = uec
PROJECT_GROUP = uec/dos
PROJECT_GROUP_SHORT = uec-dos
PROJECT_NAME = dos-comparison-tool
PROJECT_NAME_SHORT = ct
PROJECT_DISPLAY_NAME = DoS Comparison Tool
PROJECT_ID = $(PROJECT_GROUP_SHORT)-$(PROJECT_NAME_SHORT)

TEAM_ID = $(PROJECT_NAME)
ROLE_PREFIX = UECDoSCT
PROJECT_TAG = $(PROJECT_NAME)
SERVICE_TAG = $(PROJECT_ID)

PROJECT_TECH_STACK_LIST = python,typescript,terraform,shell
DEPLOYMENT_SECRETS = $(PROJECT_ID)-$(PROFILE)/deployment
TF_VAR_role_prefix := $(ROLE_PREFIX)
AWS_VPC_NAME = lk8s-$(AWS_ACCOUNT_NAME).texasplatform.uk
TF_VAR_aws_vpc_name = $(AWS_VPC_NAME)

CONFIGURATION_BUCKET = $(PROJECT_ID)-configuration-bucket
TF_VAR_developer_role_name := Developer
# ==============================================================================
# Pipeline

TF_VAR_github_repository = $(ORG_NAME)/$(PROJECT_NAME)
TF_VAR_github_repository_url = https://github.com/$(TF_VAR_github_repository).git
TF_VAR_development_pipeline_integration_branch = main
TF_VAR_development_pipeline = $(PROJECT_ID)-$(PROFILE)-development-pipeline
TF_VAR_development_pipeline_bucket = $(PROJECT_ID)-$(PROFILE)-development-pipeline-bucket
TF_VAR_development_pipeline_log_bucket = $(PROJECT_ID)-$(PROFILE)-development-pipeline-log-bucket
TF_VAR_typescript_unit_tests_codebuild_project = $(PROJECT_ID)-$(PROFILE)-typescript-unit-tests
TF_VAR_python_unit_tests_codebuild_project = $(PROJECT_ID)-$(PROFILE)-python-unit-tests
TF_VAR_lambda_build_codebuild_project = $(PROJECT_ID)-$(PROFILE)-lambda-build
TF_VAR_ui_build_codebuild_project = $(PROJECT_ID)-$(PROFILE)-ui-build
TF_VAR_deploy_codebuild_project = $(PROJECT_ID)-$(PROFILE)-deploy
TF_VAR_end_to_end_tests_codebuild_project = $(PROJECT_ID)-$(PROFILE)-end-to-end-tests
TF_VAR_api_integration_tests_codebuild_project = $(PROJECT_ID)-$(PROFILE)-api-integration-tests
TF_VAR_clean_up_resources_codebuild_project = $(PROJECT_ID)-$(PROFILE)-clean-up-resources

# ==============================================================================
# IaC Variables (Infrastructure as Code)
# Splunk
TF_VAR_splunk_firehose_subscription := $(PROJECT_ID)-cw-logs-firehose
TF_VAR_splunk_firehose_role := $(PROJECT_ID)_cw_firehose_access_role
# Kubernetes
K8S_SERVICE_ACCOUNT_NAME = $(PROJECT_ID)-$(ENVIRONMENT)-k8s-service-account
TF_VAR_application_service_account_name := $(K8S_SERVICE_ACCOUNT_NAME)
TF_VAR_kubernetes_service_account_role_name := $(K8S_SERVICE_ACCOUNT_NAME)-role
TF_VAR_kubernetes_service_account_role_policy_name := $(K8S_SERVICE_ACCOUNT_NAME)-policy
TEXAS_CERTIFICATE_ARN := arn:aws:acm:$(AWS_REGION):$(AWS_ACCOUNT_ID):certificate/$(TEXAS_CERTIFICATE_ID)
# Cognito
TF_VAR_cognito_user_pool_name := $(PROJECT_ID)-$(ENVIRONMENT)-user-pool
TF_VAR_cognito_user_pool_client_name := $(PROJECT_ID)-$(ENVIRONMENT)-user-pool-client
TF_VAR_cognito_admin_user := admin
COGNITO_SECRETS_NAME := $(PROJECT_ID)-$(ENVIRONMENT)-cognito-secrets
TF_VAR_cognito_secrets_name := $(COGNITO_SECRETS_NAME)
COGNITO_SECRETS_ADMIN_USERNAME_KEY := ADMIN_USERNAME
COGNITO_SECRETS_ADMIN_PASSWORD_KEY := ADMIN_PASSWORD
COGNITO_SECRETS_USER_POOL_ID_KEY := USER_POOL_ID
COGNITO_SECRETS_USER_POOL_CLIENT_ID_KEY := USER_POOL_CLIENT_ID
TF_VAR_cognito_secrets_admin_username_key := $(COGNITO_SECRETS_ADMIN_USERNAME_KEY)
TF_VAR_cognito_secrets_admin_password_key := $(COGNITO_SECRETS_ADMIN_PASSWORD_KEY)
TF_VAR_cognito_secrets_user_pool_id_key := $(COGNITO_SECRETS_USER_POOL_ID_KEY)
TF_VAR_cognito_secrets_user_pool_client_id_key := $(COGNITO_SECRETS_USER_POOL_CLIENT_ID_KEY)
# Cloudwatch
TF_VAR_cloudwatch_monitoring_dashboard_name := $(PROJECT_ID)-$(ENVIRONMENT)-monitoring-dashboard
TF_VAR_search_lambda_error_rate_alert_name := $(PROJECT_ID)-$(ENVIRONMENT)-search-lambda-error-rate-alert
TF_VAR_data_lambda_error_rate_alert_name := $(PROJECT_ID)-$(ENVIRONMENT)-data-lambda-error-rate-alert
# API Gateway
TF_VAR_api_gateway_name := $(PROJECT_ID)-$(ENVIRONMENT)-api-gateway
TF_VAR_api_gateway_execution_role_name := $(PROJECT_ID)-$(ENVIRONMENT)-api-gateway-execution-role
TF_VAR_api_gateway_execution_role_policy_name := $(PROJECT_ID)-$(ENVIRONMENT)-api-gateway-execution-role-policy
TF_VAR_cognito_authorizer_name := $(PROJECT_ID)-$(ENVIRONMENT)-cognito-authorizer
API_GATEWAY_ENDPOINT_KEY := API_GATEWAY_ENDPOINT
TF_VAR_api_gateway_endpoint_key := $(API_GATEWAY_ENDPOINT_KEY)
TF_VAR_api_gateway_request_validator_name := $(PROJECT_ID)-$(ENVIRONMENT)-api-gateway-request-validator
# All Lambdas
TF_VAR_log_level := $(LOG_LEVEL)
# Search Lambda
TF_VAR_search_lambda_function_name := $(PROJECT_ID)-$(ENVIRONMENT)-search
TF_VAR_search_lambda_image_repository := $(DOCKER_REGISTRY)/search
TF_VAR_search_lambda_image_tag := $(or $(SEARCH_IMAGE_TAG), $(VERSION))
TF_VAR_search_lambda_image_uri := $(TF_VAR_search_lambda_image_repository):$(TF_VAR_search_lambda_image_tag)
TF_VAR_ccs_secrets_name := $(DEPLOYMENT_SECRETS)
TF_VAR_ccs_username_key := CCS_USERNAME
TF_VAR_ccs_password_key := CCS_PASSWORD
TF_VAR_default_environment_url := https://core-dos-regressiondi-ddc-core-dos-ui.$(TEXAS_HOSTED_ZONE_NONPROD)
TF_VAR_ccs_search_path = /app/api/webservices
# Data Lambda
TF_VAR_data_lambda_function_name := $(PROJECT_ID)-$(ENVIRONMENT)-data
TF_VAR_data_lambda_image_repository := $(DOCKER_REGISTRY)/data
TF_VAR_data_lambda_image_tag := $(or $(DATA_IMAGE_TAG), $(VERSION))
TF_VAR_data_lambda_image_uri := $(TF_VAR_data_lambda_image_repository):$(TF_VAR_data_lambda_image_tag)
# Route53
TF_VAR_dos_comparison_tool_api_gateway_subdomain_name := $(PROJECT_ID)-$(ENVIRONMENT)-api-gateway
API_GATEWAY_ENDPOINT := https://$(TF_VAR_dos_comparison_tool_api_gateway_subdomain_name).$(TEXAS_HOSTED_ZONE_NONPROD)
# Security Group
TF_VAR_security_group_name := $(PROJECT_ID)-$(ENVIRONMENT)-security-group
# S3
APPLICATION_BUCKET :=$(PROJECT_ID)-$(ENVIRONMENT)-application-bucket
TF_VAR_application_bucket_name := $(APPLICATION_BUCKET)
TF_VAR_log_bucket_name := $(PROJECT_ID)-$(ENVIRONMENT)-logs-bucket
# WAF
TF_VAR_api_gateway_waf_acl := $(PROJECT_ID)-$(ENVIRONMENT)-api-gateway-waf-acl
TF_VAR_api_gateway_waf_logs_name := aws-waf-logs-$(PROJECT_ID)-$(ENVIRONMENT)-api-gateway-waf-logs
# WAF Rules
TF_VAR_waf_ip_reputation_list_rule_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-ip-reputation-list-rule
TF_VAR_waf_non_gb_rule_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-non-gb-rule
TF_VAR_waf_ip_allow_list_rule_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-ip-allow-list-rule
TF_VAR_waf_rate_based_rule_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-rate-based-rule
TF_VAR_waf_aws_known_bad_inputs_rule_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-aws-known-bad-inputs-rule
TF_VAR_waf_aws_sqli_rule_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-aws-sqli-rule
TF_VAR_waf_managed_rule_group_rule_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-managed-rule-group-rule
# WAF Metrics
TF_VAR_waf_acl_metric_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-acl-metric
TF_VAR_waf_ip_reputation_list_metric_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-ip-reputation-list-metric
TF_VAR_waf_non_gb_rule_metric_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-non-gb-rule-metric
TF_VAR_waf_ip_allow_list_metric_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-ip-allow-list-metric
TF_VAR_waf_rate_based_metric_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-rate-based-metric
TF_VAR_waf_aws_known_bad_inputs_metric_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-aws-known-bad-inputs-metric
TF_VAR_waf_aws_sqli_metric_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-aws-sqli-metric
TF_VAR_waf_managed_rule_group_metric_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-managed-rule-group-metric
# WAF Alarms
TF_VAR_waf_rate_based_alarm_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-rate-based-alarm
TF_VAR_waf_non_gb_alarm_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-non-gb-alarm
TF_VAR_waf_aws_known_bad_inputs_alarm_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-aws-known-bad-inputs-alarm
TF_VAR_waf_aws_sqli_alarm_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-aws-sqli-alarm
TF_VAR_waf_ip_reputation_list_alarm_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-ip-reputation-list-alarm
TF_VAR_waf_managed_rule_group_alarm_name := $(PROJECT_ID)-$(ENVIRONMENT)-waf-managed-rule-group-alarm
# KMS
LOG_ENCRYPTION_KEY := $(PROJECT_ID)-$(ENVIRONMENT)-log-encryption-key
TF_VAR_log_encryption_key_alias := alias/$(LOG_ENCRYPTION_KEY)
# ==============================================================================
# End to End Tests
TEST_BROWSER_URL := http://host.docker.internal:4444/wd/hub
APPLICATION_URL := https://host.docker.internal:8081
SETUP_USER_USERNAME_KEY := INTEGRATION_TEST_SETUP_USER_USERNAME
SETUP_USER_PASSWORD_KEY := INTEGRATION_TEST_SETUP_USER_PASSWORD
SETUP_USER_EMAIL_KEY := INTEGRATION_TEST_SETUP_USER_EMAIL
