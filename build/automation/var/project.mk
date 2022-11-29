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

K8S_SERVICE_ACCOUNT_NAME = $(PROJECT_ID)-$(ENVIRONMENT)-k8s-service-account
TF_VAR_application_service_account_name := $(K8S_SERVICE_ACCOUNT_NAME)
TF_VAR_kubernetes_service_account_role_name := $(K8S_SERVICE_ACCOUNT_NAME)-role
TF_VAR_kubernetes_service_account_role_policy_name := $(K8S_SERVICE_ACCOUNT_NAME)-policy
TEXAS_CERTIFICATE_ARN := arn:aws:acm:$(AWS_REGION):$(AWS_ACCOUNT_ID):certificate/$(TEXAS_CERTIFICATE_ID)

# ==============================================================================

TEST_BROWSER_URL := http://host.docker.internal:4444/wd/hub
APPLICATION_URL := https://host.docker.internal:8081
