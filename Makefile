PROJECT_DIR := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
include $(abspath $(PROJECT_DIR)/build/automation/init.mk)

# ==============================================================================
# Development workflow targets

setup: # Set up project for development - mandatory: PROFILE=[name]
	make project-config
	make trust-certificate
# Yarn Setup
	cd $(APPLICATION_DIR)/ui
	yarn install
	cd $(PROJECT_DIR)
# Set up local virtual environment and download dependencies

build: project-config # Build project - mandatory: PROFILE=[name], ENVIRONMENT=[name]
	make search-build
	make ui-build

start: # Start project
	eval "$$(make -s populate-application-variables)"
	make project-start

stop: project-stop # Stop project

restart: stop start # Restart project

log: project-log # Show project logs

test: # Test project
	make start
	make stop

push: # Push project artefacts to the registry
	make docker-push NAME=search
	make docker-push NAME=ui

deploy: # Deploy artefacts - mandatory: PROFILE=[name], optional: ENVIRONMENT=[name]
	make provision-infrastructure
	eval "$$(make -s populate-application-variables)"
	make k8s-deploy STACK=application

undeploy: # Undeploy artefacts - mandatory: PROFILE=[name], optional: ENVIRONMENT=[name]
	make k8s-undeploy STACK=application
	make terraform-destroy-auto-approve STACKS=application

build-and-deploy: # Build, push and deploy application - mandatory: PROFILE=[name]
	make build-and-push deploy VERSION=$(BUILD_TAG)

build-and-start: # Build and start application - mandatory: PROFILE=[name]
	make build provision-infrastructure start

provision-infrastructure: # Provision infrastructure - mandatory: PROFILE=[name], optional: ENVIRONMENT=[name]
	make terraform-apply-auto-approve STACKS=application

build-and-push: # Build and push docker images - optional: VERSION=[name]
	make build push

build-and-push-without-ui: # Build and push docker images - optional: VERSION=[name]
	make search-build
	make docker-push NAME=search

clean: # Clean up project
	make search-clean
	make ui-clean
	make terraform-clean
	make python-clean
	make docker-clean
	make k8s-clean STACK=application

# ==============================================================================
# Supporting targets

trust-certificate: ssl-trust-certificate-project ## Trust the SSL development certificate

# ==============================================================================
# User Interface targets (UI Docker Image and UI Development Server)

ui-build: # Build UI image
	make -s ui-config PROFILE=PROFILE_TO_REPLACE ENVIRONMENT=ENVIRONMENT_TO_REPLACE
	make -s docker-run-node DIR=$(APPLICATION_DIR_REL)/ui CMD="yarn install && yarn build"
	cd $(APPLICATION_DIR)/ui/build
	tar -czf $(PROJECT_DIR)/build/docker/ui/assets/ui-app.tar.gz .
	cd $(PROJECT_DIR)
	make ssl-copy-certificate-project DIR=$(DOCKER_DIR)/ui/assets/certificate
	make -s docker-build NAME=ui

ui-config: # Create UI config file for running the UI locally
	cp $(APPLICATION_DIR_REL)/ui/config/template.env $(APPLICATION_DIR_REL)/ui/.env
	make -s file-replace-variables FILE=$(APPLICATION_DIR_REL)/ui/.env

ui-start: # Start UI development server (Hot reload) - mandatory: PROFILE=[name], optional: ENVIRONMENT=[name]
	make build-and-push-without-ui VERSION=$(BUILD_TAG)
	make provision-infrastructure VERSION=$(BUILD_TAG)
	eval "$$(make -s populate-application-variables)"
	make ui-config
	cd $(APPLICATION_DIR)/ui
	yarn install
	yarn run start

ui-test:
	make -s docker-run-node DIR=$(APPLICATION_DIR_REL)/ui CMD="yarn install"
	make -s docker-run-node DIR=$(APPLICATION_DIR_REL)/ui CMD="yarn run test"

ui-clean: # Clean UI
	make docker-image-clean NAME=ui
	make ui-build-clean

ui-build-clean: # Clean UI build artefacts
	rm -rf $(APPLICATION_DIR)/ui/build
	rm -rf $(APPLICATION_DIR)/ui/node_modules
	rm -rf $(APPLICATION_DIR)/ui/coverage
	rm -f $(APPLICATION_DIR)/ui/ui-app.tar.gz

# ==============================================================================
# Search targets (Search Lambda Docker Image)

search-build: # Build Search image
	make -s build-lambda NAME=search

search-build-and-deploy: # Build Search image and deploy to AWS
	make -s build-lambda NAME=search VERSION=$(BUILD_TAG)
	make docker-push NAME=search VERSION=$(BUILD_TAG)
	make provision-infrastructure VERSION=$(BUILD_TAG)

search-clean: # Clean Search
	make docker-image-clean NAME=search

# ==============================================================================
# TypeScript Development, Linting and Testing targets

yarn-install: # Install yarn dependencies
	cd $(APPLICATION_DIR)/ui
	yarn install

yarn-install-locked: # Install Yarn dependencies
	cd $(APPLICATION_DIR)/ui
	yarn install

typescript-package-duplicate-check:
	cd $(APPLICATION_DIR)/ui
	yarn dedupe --check

typescript-check-format: # Check TypeScript formatting
	cd $(APPLICATION_DIR)/ui
	yarn run format:check

typescript-fix-format: # Fix TypeScript formattting
	cd $(APPLICATION_DIR)/ui
	yarn run format:fix

typescript-check-lint: # Check TypeScript linting
	cd $(APPLICATION_DIR)/ui
	yarn run lint:check

typescript-fix-lint: # Fix TypeScript linting
	cd $(APPLICATION_DIR)/ui
	yarn run lint:fix

typescript-code-check: # Check TypeScript code for linting and formatting
	make typescript-check-format
	make typescript-check-lint

typescript-test-ci-setup: # Set up TypeScript test environment for CI
	make yarn-install-locked
	make ui-config

typescript-test: # Run TypeScript tests
	cd $(APPLICATION_DIR)/ui
	yarn run test

typescript-mutation-test: # Run TypeScript mutation tests
	cd $(APPLICATION_DIR)/ui
	yarn run test:mutation

# ==============================================================================
# Python Development, Linting and Testing targets

pip-install: # Install Python dependencies
	cat $(APPLICATION_DIR)/*/requirements.txt $(APPLICATION_DIR)/requirements-dev.txt | sort --unique > $(APPLICATION_DIR)/development-requirements.txt
	python -m pip install -r $(APPLICATION_DIR)/development-requirements.txt --upgrade pip

python-test: # Run Python unit tests
	python -m pytest application

python-dead-code-check: # Check for dead Python code
	python -m vulture $(APPLICATION_DIR)

python-imports-check: # Check Python imports - optional: DIR=[path]
	if [ -z "$(DIR)" ]; then DIR="."; fi
	python -m isort $$DIR -l=120 --check-only --profile=black \
		--force-alphabetical-sort-within-sections

python-imports-format: # Format Python imports - optional: DIR=[path]
	if [ -z "$(DIR)" ]; then DIR="."; fi
	python -m isort $$DIR -l=120 --profile=black \
		--force-alphabetical-sort-within-sections

python-security-check: # Run Python security checks
	python -m bandit -r application -c pyproject.toml

# ==============================================================================
# Development targets

build-lambda: ### Build lambda docker image - mandatory: NAME
	UNDERSCORE_LAMBDA_NAME=$$(echo $(NAME) | tr '-' '_')
	cp -f $(APPLICATION_DIR)/$$UNDERSCORE_LAMBDA_NAME/requirements.txt $(DOCKER_DIR)/$(NAME)/assets/requirements.txt
	cd $(APPLICATION_DIR)
	tar -czf $(DOCKER_DIR)/$(NAME)/assets/app.tar.gz \
		--exclude=tests $$UNDERSCORE_LAMBDA_NAME __init__.py > /dev/null 2>&1
	cd $(PROJECT_DIR)
	make -s docker-image NAME=$(NAME)
	rm -f $(DOCKER_DIR)/$(NAME)/assets/*.tar.gz $(DOCKER_DIR)/$(NAME)/assets/*.txt

# ==============================================================================
# Testing targets

tester-build: # Build tester image which is used for end-to-end testing
	cp $(APPLICATION_TEST_DIR)/requirements-test.txt $(DOCKER_DIR)/tester/assets/requirements.txt
	make -s docker-build NAME=tester

test-install: # Install test dependencies
	python -m pip install -r test/requirements-test.txt

end-to-end-test:
	make -s docker-run-python \
	IMAGE=$(DOCKER_REGISTRY)/tester \
	DIR=test/end_to_end \
	CMD="pytest"

# ==============================================================================
# Deployment variables

populate-application-variables: ## Populate application variables required for ui to run
	DEPLOYMENT_SECRETS=$$(make -s secret-get-existing-value NAME=$(COGNITO_SECRETS_NAME))
	echo "export USER_POOL_ID=$$(echo $$DEPLOYMENT_SECRETS | jq -r '.$(COGNITO_SECRETS_USER_POOL_ID_KEY)')"
	echo "export CLIENT_ID=$$(echo $$DEPLOYMENT_SECRETS | jq -r '.$(COGNITO_SECRETS_USER_POOL_CLIENT_ID_KEY)')"
	echo "export API_ENDPOINT=$$(echo $$DEPLOYMENT_SECRETS | jq -r '.$(API_GATEWAY_ENDPOINT_KEY)')"

# ==============================================================================

pipeline-finalise: ## Finalise pipeline execution - mandatory: PIPELINE_NAME,BUILD_STATUS
	# Check if BUILD_STATUS is SUCCESS or FAILURE
	make pipeline-send-notification

pipeline-send-notification: ## Send Slack notification with the pipeline status - mandatory: PIPELINE_NAME,BUILD_STATUS
	eval "$$(make aws-assume-role-export-variables)"
	eval "$$(make secret-fetch-and-export-variables NAME=$(PROJECT_GROUP_SHORT)-$(PROJECT_NAME_SHORT)-$(PROFILE)/deployment)"
	make slack-it

# ==============================================================================
# Checkov (Code Security Best Practices)

docker-best-practices:
	make docker-run-checkov DIR=/build/docker CHECKOV_OPTS="--framework dockerfile --skip-check CKV_DOCKER_2,CKV_DOCKER_3,CKV_DOCKER_4"

terraform-best-practices:
	make docker-run-checkov DIR=/infrastructure CHECKOV_OPTS="--framework terraform --skip-check CKV_AWS_7,CKV_AWS_115,CKV_AWS_116,CKV_AWS_117,CKV_AWS_120,CKV_AWS_147,CKV_AWS_149,CKV_AWS_158,CKV_AWS_173,CKV_AWS_219,CKV_AWS_225,CKV_AWS_272,CKV2_AWS_29"

kubernetes-best-practices:
	make docker-run-checkov DIR=/deployment CHECKOV_OPTS="--framework kubernetes --skip-check CKV_K8S_20,CKV_K8S_22,CKV_K8S_23,CKV_K8S_28,CKV_K8S_30,CKV_K8S_37,CKV_K8S_40,CKV_K8S_43"

github-actions-best-practices:
	make docker-run-checkov DIR=/.github CHECKOV_OPTS="--skip-check CKV_GHA_2"

checkov-secret-scanning:
	make docker-run-checkov CHECKOV_OPTS="--framework secrets"

terraform-security:
	make docker-run-terraform-tfsec DIR=infrastructure CMD="tfsec"

# ==============================================================================

.SILENT:
