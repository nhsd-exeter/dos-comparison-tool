# ADR-003: Cognito design choices

## Overview

Design the new DoS Comparison Tool.

- Date: **20/12/2022**
- Status: **Decided**
- Deciders: **Jack Plowman, Jonathan Pearce**

- [ADR-003: Cognito design choices](#adr-003-cognito-design-choices)
  - [Overview](#overview)
  - [Context and Problem Statement](#context-and-problem-statement)
  - [Decision](#decision)
  - [Consequences](#consequences)


## Context and Problem Statement

How to build the authentication of the DoS Comparison Tool using AWS Cognito. Such as using Cognito within the React application or using Cognito from the backend.

## Decision

I experimented with both having the sign in process within the React application and having the sign in process on the backend. I found that having the sign in process on the backend was easier to implement as it was in python but I had to leave the API Gateway route unprotected which is a security risk. So I decided to have the sign in process within the React application which removed the security risk.

## Consequences

The consequence on this decision is that all actions which use authentication will be faster as a single request will be made to AWS Cognito instead of two requests. This is because the React application will be able to use the AWS Cognito session cookie to authenticate the user instead of having to make a request to AWS Cognito to get the user's JWT.
