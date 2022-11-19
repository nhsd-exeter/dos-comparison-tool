PROJECT_DIR := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
include $(abspath $(PROJECT_DIR)/build/automation/init.mk)

# ==============================================================================
# Development workflow targets

setup: # Set up project
	make project-config
# Set up local virtual environment and download dependencies

build: project-config # Build project
	make ui-build

start: project-start # Start project

stop: project-stop # Stop project

restart: stop start # Restart project

log: project-log # Show project logs

test: # Test project
	make start
	make stop

push: # Push project artefacts to the registry
	make docker-push NAME=NAME_TEMPLATE_TO_REPLACE

deploy: # Deploy artefacts - mandatory: PROFILE=[name]
	make project-deploy STACK=application PROFILE=$(PROFILE)

provision: # Provision environment - mandatory: PROFILE=[name]
	make terraform-apply-auto-approve STACK=database PROFILE=$(PROFILE)

clean: # Clean up project
	make \
		ui-clean \
		terraform-clean

# ==============================================================================
# Supporting targets

trust-certificate: ssl-trust-certificate-project ## Trust the SSL development certificate

# ==============================================================================

ui-build: # Build UI image
	make -s docker-run-node DIR=$(APPLICATION_DIR_REL)/ui CMD="yarn install --production && yarn build"
	cd $(APPLICATION_DIR)/ui
	tar -czf $(PROJECT_DIR)/build/docker/ui/assets/ui-app.tar.gz build
	cd $(PROJECT_DIR)
	make ssl-copy-certificate-project DIR=$(DOCKER_DIR)/ui/assets/certificate
	make -s docker-build NAME=ui

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
	rm -f $(APPLICATION_DIR)/ui/ui-app.tar.gz

# ==============================================================================

typescript-package-duplicate-check:
	cd $(APPLICATION_DIR)/ui
	yarn install && yarn dedupe --check

typescript-format: # Format TypeScript code
	cd $(APPLICATION_DIR)/ui
	yarn install
	yarn run format:fix

typescript-lint: # Lint TypeScript code
	cd $(APPLICATION_DIR)/ui
	yarn install
	yarn run lint:fix

typescript-code-check:
	cd $(APPLICATION_DIR)/ui
	yarn run ci-check

# ==============================================================================
# Pipeline targets

build-artefact:
	echo TODO: $(@)

publish-artefact:
	echo TODO: $(@)

backup-data:
	echo TODO: $(@)

provision-infractructure:
	echo TODO: $(@)

deploy-artefact:
	echo TODO: $(@)

apply-data-changes:
	echo TODO: $(@)

# --------------------------------------

run-static-analisys:
	echo TODO: $(@)

run-unit-test:
	echo TODO: $(@)

run-smoke-test:
	echo TODO: $(@)

run-integration-test:
	echo TODO: $(@)

run-contract-test:
	echo TODO: $(@)

run-functional-test:
	[ $$(make project-branch-func-test) != true ] && exit 0
	echo TODO: $(@)

run-performance-test:
	[ $$(make project-branch-perf-test) != true ] && exit 0
	echo TODO: $(@)

run-security-test:
	[ $$(make project-branch-sec-test) != true ] && exit 0
	echo TODO: $(@)

# --------------------------------------

remove-unused-environments:
	echo TODO: $(@)

remove-old-artefacts:
	echo TODO: $(@)

remove-old-backups:
	echo TODO: $(@)

# --------------------------------------

pipeline-finalise: ## Finalise pipeline execution - mandatory: PIPELINE_NAME,BUILD_STATUS
	# Check if BUILD_STATUS is SUCCESS or FAILURE
	make pipeline-send-notification

pipeline-send-notification: ## Send Slack notification with the pipeline status - mandatory: PIPELINE_NAME,BUILD_STATUS
	eval "$$(make aws-assume-role-export-variables)"
	eval "$$(make secret-fetch-and-export-variables NAME=$(PROJECT_GROUP_SHORT)-$(PROJECT_NAME_SHORT)-$(PROFILE)/deployment)"
	make slack-it

# --------------------------------------

pipeline-check-resources: ## Check all the pipeline deployment supporting resources - optional: PROFILE=[name]
	profiles="$$(make project-list-profiles)"
	# for each profile
	#export PROFILE=$$profile
	# TODO:
	# table: $(PROJECT_GROUP_SHORT)-$(PROJECT_NAME_SHORT)-deployment
	# secret: $(PROJECT_GROUP_SHORT)-$(PROJECT_NAME_SHORT)-$(PROFILE)/deployment
	# bucket: $(PROJECT_GROUP_SHORT)-$(PROJECT_NAME_SHORT)-$(PROFILE)-deployment
	# certificate: SSL_DOMAINS_PROD
	# repos: DOCKER_REPOSITORIES

pipeline-create-resources: ## Create all the pipeline deployment supporting resources - optional: PROFILE=[name]
	profiles="$$(make project-list-profiles)"
	# for each profile
	#export PROFILE=$$profile
	# TODO:
	# Per AWS accoount, i.e. `nonprod` and `prod`
	eval "$$(make aws-assume-role-export-variables)"
	#make aws-dynamodb-create NAME=$(PROJECT_GROUP_SHORT)-$(PROJECT_NAME_SHORT)-deployment ATTRIBUTE_DEFINITIONS= KEY_SCHEMA=
	#make secret-create NAME=$(PROJECT_GROUP_SHORT)-$(PROJECT_NAME_SHORT)-$(PROFILE)/deployment VARS=DB_PASSWORD,SMTP_PASSWORD,SLACK_WEBHOOK_URL
	#make aws-s3-create NAME=$(PROJECT_GROUP_SHORT)-$(PROJECT_NAME_SHORT)-$(PROFILE)-deployment
	#make ssl-request-certificate-prod SSL_DOMAINS_PROD
	# Centralised, i.e. `mgmt`
	eval "$$(make aws-assume-role-export-variables AWS_ACCOUNT_ID=$(AWS_ACCOUNT_ID_MGMT))"
	#make docker-create-repository NAME=NAME_TEMPLATE_TO_REPLACE
	#make aws-codeartifact-setup REPOSITORY_NAME=$(PROJECT_GROUP_SHORT)

# ==============================================================================

.SILENT:
