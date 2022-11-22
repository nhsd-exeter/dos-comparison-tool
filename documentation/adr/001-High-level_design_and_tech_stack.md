# ADR-001: High-level design and tech stack

## Overview

Design the new DoS Comparison Tool.

* Date: **13/10/2022**
* Status: **Decided**
* Deciders: **Jack Plowman, Jonathan Pearce**

## Context and Problem Statement

The DoS Testing Tool is a web application that allows users to compare search results from different DoS environments. It is current hosted on a platform called Anvil. This means it is unmaintained and can't be maintained by the DoS team.

## Decision

The DoS team will build a new DoS Comparison Tool using the following tech stack:

* **Frontend:** TypeScript, React, Redux
* **Backend:** Python, Lambda

## Consequences

The DoS team will be able to maintain the DoS Comparison Tool as it will be hosted on AWS using tools that are supported by the DoS team.
