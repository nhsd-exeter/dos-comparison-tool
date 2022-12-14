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

# ==============================================================================
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
# Authentication Lambda
TF_VAR_authentication_lambda_name := $(PROJECT_ID)-$(ENVIRONMENT)-authentication
TF_VAR_authenication_lambda_image_repository := $(AWS_ECR)/authentication
TF_VAR_authenication_lambda_image_tag := $(or $(AUTH_IMAGE_TAG), $(VERSION))

# ==============================================================================

TEST_BROWSER_URL := http://host.docker.internal:4444/wd/hub
APPLICATION_URL := https://host.docker.internal:8081
