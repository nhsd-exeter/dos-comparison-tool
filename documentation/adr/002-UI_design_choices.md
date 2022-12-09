# ADR-002: UI design choices

## Overview

Design the new DoS Comparison Tool.

- Date: **08/12/2022**
- Status: **Decided**
- Deciders: **Jack Plowman**

## Context and Problem Statement

How to build the UI of the DoS Comparison Tool. Such as what framework and libraries to use.

## Redux/Redux Toolkit

### Decision

As the DoS suite have experience with React and Redux these were going to be my selected UI technologies. However on further inspection of Redux I found that Redux Toolkit is now the recommended way to use Redux. Redux Toolkit is a library that makes it easier to use Redux. So I decided to use Redux Toolkit instead of Redux.

### Consequences

For my initial implementation of Redux Toolkit I found it easier and quicker to build using slices rather than having separate files for action and reducers. This means all related code is within the same file similar to the Redux Ducks format.
