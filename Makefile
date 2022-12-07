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
	make docker-push NAME=ui

deploy: # Deploy artefacts - mandatory: PROFILE=[name], optional: ENVIRONMENT=[name]
	make terraform-apply-auto-approve STACKS=application
	make k8s-deploy STACK=application

undeploy: # Undeploy artefacts - mandatory: PROFILE=[name], optional: ENVIRONMENT=[name]
	make k8s-undeploy STACK=application
	make terraform-destroy-auto-approve STACKS=application

build-and-deploy: # Build, push and deploy application - mandatory: PROFILE=[name]
	make build-and-push deploy VERSION=$(BUILD_TAG)

build-and-push: # Build and push docker images
	make build push

clean: # Clean up project
	make \
		ui-clean \
		terraform-clean

# ==============================================================================
# Supporting targets

trust-certificate: ssl-trust-certificate-project ## Trust the SSL development certificate

# ==============================================================================

ui-build: # Build UI image - mandatory: PROFILE=[name], ENVIRONMENT=[name]
	make -s docker-run-node DIR=$(APPLICATION_DIR_REL)/ui CMD="yarn install && yarn build"
	cd $(APPLICATION_DIR)/ui/build
	tar -czf $(PROJECT_DIR)/build/docker/ui/assets/ui-app.tar.gz .
	cd $(PROJECT_DIR)
	make ssl-copy-certificate-project DIR=$(DOCKER_DIR)/ui/assets/certificate
	make -s docker-build NAME=ui

ui-config: # Create UI config file  - mandatory: PROFILE=[name]
	make file-copy-and-replace \
		SRC=$(APPLICATION_DIR_REL)/ui/config/config.json \
		DEST=$(APPLICATION_DIR_REL)/ui/src/config.json

ui-start: # Start UI development server (Hot reload)
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
# Testing targets

tester-build: # Build tester image which is used for end-to-end testing
	cp $(APPLICATION_TEST_DIR)/requirements-test.txt $(DOCKER_DIR)/tester/assets/requirements.txt
	make -s docker-build NAME=tester

end-to-end-test:
	make -s docker-run-python \
	IMAGE=$(DOCKER_REGISTRY)/tester \
	DIR=test/end_to_end \
	CMD="pytest --gherkin-terminal-reporter"

# ==============================================================================
# Deployment variables

populate-application-variables: ## Populate application variables required for ui to run
	COGNITO_SECRETS=$$(make -s secret-get-existing-value NAME=$(COGNITO_SECRETS_NAME))
	echo "export AUTH_USER_POOL_ID=$$(echo $$COGNITO_SECRETS | jq -r '.$(COGNITO_SECRETS_USER_POOL_ID_KEY)')"
	echo "export AUTH_USER_POOL_WEB_CLIENT_ID=$$(echo $$COGNITO_SECRETS | jq -r '.$(COGNITO_SECRETS_USER_POOL_CLIENT_ID_KEY)')"

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
	make docker-run-checkov DIR=/infrastructure CHECKOV_OPTS="--framework terraform --skip-check CKV_AWS_7,CKV_AWS_115,CKV_AWS_116,CKV_AWS_117,CKV_AWS_120,CKV_AWS_147,CKV_AWS_149,CKV_AWS_158,CKV_AWS_173,CKV_AWS_219,CKV_AWS_225,CKV2_AWS_29"

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
