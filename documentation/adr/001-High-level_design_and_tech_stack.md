# ADR-001: High-level design and tech stack

## Overview

Design the new DoS Comparison Tool.

- Date: **25/10/2022**
- Status: **Decided**
- Deciders: **Jack Plowman, Jonathan Pearce**

## Context and Problem Statement

The DoS Testing Tool is a web application that allows users to compare search results from different DoS environments. It is current hosted on a platform called Anvil. This means it is unmaintained and can't be maintained by the DoS team.

So a new DoS Comparison Tool needs to be designed and built. This tool must be maintainable by the DoS team as it will be maintained by the DoS team after the prototype phase.

## Decision

The DoS team will build a new DoS Comparison Tool using the following tech stack:

- **Frontend:** TypeScript, React, Redux
- **Backend:** Python, AWS Lambda

TypeScript and React will be used for the frontend. This is because they are the most popular frontend technologies and is the most supported UI technology by the DoS Suite. At time of writing Service Finder is written in TypeScript and React. This means that if the project has any issues then assistance can be provided by members of the Service Finder team.

Python and AWS Lambda will be used for the backend. This is because the DoS lambdas as well as DoS Integration are written in Python. So this means the DoS team will be able to maintain the backend of the project easier than if it was written in a different language. As well it allows the project to be hosted on AWS Lambda which is the most cost effective way to host a web application.

We wanted to host the application user interface on AWS Amplify to reduce the cost of hosting the application. However, hosting a web app on AWS Amplify is not allowed by the NHS Digital security team and there wasn't time to raise the issue to attempt to change this policy.

## Consequences

The DoS team will be able to maintain the DoS Comparison Tool as it will be hosted on AWS using tools that are supported by the DoS team.

As K8S will be used to host the UI of the DoS Comparison Tool it will have a higher cost until the DoS team can migrate the DoS Comparison Tool to AWS Amplify.
