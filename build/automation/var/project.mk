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
SERVICE_TAG_COMMON = texas

PROJECT_TECH_STACK_LIST = python,javascript,terraform,shell

DEPLOYMENT_SECRETS = $(PROJECT_ID)-$(PROFILE)/deployment

# ==============================================================================

TEST_BROWSER_URL := http://host.docker.internal:4444/wd/hub
