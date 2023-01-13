# ADR-004: API Gateway Investigation

## Overview

DoS Comparison Tool needs to be able connect the user interface (UI) to the search lambda.

- Date: **06/01/2023**
- Status: **Decided**
- Deciders: **Jack Plowman**

## Context and Problem Statement

DoS Comparison Tool needs to be able connect the user interface (UI) to the search lambda in a secure way. This is because the lambda connects to DoS API so only authenticated users should be able to use the search lambda.

### Lambda function URLs

AWS Lambda has a function called lambda function urls which allow API access to a lambda with a resource policy to restrict access to the lambda. This is not suitable for DoS Comparison Tool because it can't authenticate a Cognito access token.

### API Gateway REST API (v1)

AWS API Gateway version 1 called REST APIs. These allows an easy connection to AWS lambda with an ability to test invocations of the API without authenticating the request. This is very useful for development to ensure the API is working as expected. As well it allows the API to be authenticated using Cognito with easy configuration of the authorizer.

### API Gateway HTTP API (v2)

The upgraded version of AWS API Gateway v2 called HTTP APIs provide an easier system to use than version 1 on the whole such as a cleaner AWS UI and more streamlined feature set. But this meant that it didn't have some nice to have features or

## Decision

## Consequences
