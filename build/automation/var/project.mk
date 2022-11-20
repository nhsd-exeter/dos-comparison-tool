ORG_NAME = nhsd-exeter
PROGRAMME = uec
PROJECT_GROUP = uec/dos
PROJECT_GROUP_SHORT = uec-dos
PROJECT_NAME = comparison-tool
PROJECT_NAME_SHORT = ct
PROJECT_DISPLAY_NAME = DoS Comparison Tool
PROJECT_ID = $(PROJECT_GROUP_SHORT)-$(PROJECT_NAME_SHORT)

TEAM_ID = $(PROJECT_NAME)

ROLE_PREFIX = UECDoSCT
PROJECT_TAG = $(PROJECT_NAME)
SERVICE_TAG = $(PROJECT_GROUP_SHORT)

PROJECT_TECH_STACK_LIST = python,typescript,terraform,shell

DEPLOYMENT_SECRETS = $(PROJECT_ID)-$(PROFILE)/deployment

# --------------------------------------

K8S_SERVICE_ACCOUNT_NAME = $(PROJECT_ID)-$(ENVIRONMENT)-k8s-service-account

# ==============================================================================

TEST_BROWSER_URL := http://host.docker.internal:4444/wd/hub
APPLICATION_URL := https://host.docker.internal:8081
