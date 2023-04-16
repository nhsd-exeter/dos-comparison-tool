# ADR-006: CCS Comparison Search Redesign

## Overview

Should the data API requests be separated into another lambda to fit a micro-services model.

- Date: **01/04/2023**
- Status: **Decided**
- Deciders: **Jack Plowman**

- [ADR-006: CCS Comparison Search Redesign](#adr-006-ccs-comparison-search-redesign)
  - [Overview](#overview)
  - [Context and Problem Statement](#context-and-problem-statement)
    - [One Lambda](#one-lambda)
    - [Multiple Lambdas](#multiple-lambdas)
  - [Decision](#decision)


## Context and Problem Statement

Multiple API requests need to be made from the UI should the additional request be added to the search lambda or separated into a new data lambda.

### One Lambda

Pros:

- Common code all in one place means less duplication of code
- Less cold starts as all request through one lambda

Cons:

- Slower startup due to more code loaded on start
- More difficult to test as more scenarios

### Multiple Lambdas

Pros:

- Scalability of each individual lambdas
- Slightly faster as less code to deploy

Cons:

- Takes slightly longer to build, deploy and test.

## Decision

Multiple lambdas is the best solution and was chosen as it allows for improved scalability and flexibility in future solutions.
