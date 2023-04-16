# ADR-004: API Gateway Investigation

## Overview

DoS Comparison Tool needs to be able connect the user interface (UI) to the search lambda.

- Date: **06/01/2023**
- Status: **Decided**
- Deciders: **Jack Plowman**

- [ADR-004: API Gateway Investigation](#adr-004-api-gateway-investigation)
  - [Overview](#overview)
  - [Context and Problem Statement](#context-and-problem-statement)
    - [Lambda function URLs](#lambda-function-urls)
    - [API Gateway REST API (v1)](#api-gateway-rest-api-v1)
    - [API Gateway HTTP API (v2)](#api-gateway-http-api-v2)
  - [Decision](#decision)
  - [Consequences](#consequences)


## Context and Problem Statement

DoS Comparison Tool needs to be able connect the user interface (UI) to the search lambda in a secure way. This is because the lambda connects to DoS API so only authenticated users should be able to use the search lambda.

### Lambda function URLs

AWS Lambda has a function called lambda function urls which allow API access to a lambda with a resource policy to restrict access to the lambda. This is not suitable for DoS Comparison Tool because it can't authenticate a Cognito access token.

### API Gateway REST API (v1)

AWS API Gateway version 1 called REST APIs. These allows an easy connection to AWS lambda with an ability to test invocations of the API without authenticating the request. This is very useful for development to ensure the API is working as expected. As well it allows the API to be authenticated using Cognito with easy configuration of the authorizer.

### API Gateway HTTP API (v2)

The upgraded version of AWS API Gateway v2 called HTTP APIs provide an easier system to use than version 1 on the whole such as a cleaner AWS UI and more streamlined feature set. But this meant that it didn't have some nice to have features such as inbuilt AWS Cognito authorizers or AWS X-Ray tracing.

## Decision

Despite the general understand newer is better we decided to use API Gateway REST API (v1) because it has the features we need and is easier to use than API Gateway HTTP API (v2).

## Consequences

Due to having built in AWS Cognito authorizer within REST API (v1) it reduces the amount of code which is required as a custom authorizer doesn't need to be created and maintained. This is good as it is a critical part of the API and is a security risk if it is not implemented correctly.
