# ADR-005: Types of Testing

## Overview

What forms of testing does the DoS Comparison Tool need to fully test the DoS Comparison Tool.

- Date: **01/04/2023**
- Status: **Decided**
- Deciders: **Jack Plowman**

- [ADR-005: Types of Testing](#adr-005-types-of-testing)
  - [Overview](#overview)
  - [Context and Problem Statement](#context-and-problem-statement)
    - [Unit Testing](#unit-testing)
      - [Advantages \& Disadvantages of Unit Tests](#advantages--disadvantages-of-unit-tests)
      - [Tool(s) Selected](#tools-selected)
        - [Python -\> Pytest](#python---pytest)
        - [TypeScript -\> Jest](#typescript---jest)
    - [End To End Tests](#end-to-end-tests)
      - [Advantages \& Disadvantages of End to End Tests](#advantages--disadvantages-of-end-to-end-tests)
      - [End to End Tests Tool(s) Selected](#end-to-end-tests-tools-selected)
    - [Contract Testing](#contract-testing)
      - [Advantages \& Disadvantages of Contract Tests](#advantages--disadvantages-of-contract-tests)
      - [Contract Tests Tool(s) Selected](#contract-tests-tools-selected)
    - [Performance Testing](#performance-testing)
      - [Advantages \& Disadvantages of Performance Tests](#advantages--disadvantages-of-performance-tests)
      - [Performance Tests Tool(s) Selected](#performance-tests-tools-selected)
      - [API Performance Testing -\> Locust](#api-performance-testing---locust)


## Context and Problem Statement

Select which forms of testing the DoS Comparison Tool should use.

### Unit Testing

Unit tests should be developed for application to test the individual function for all parts of the application

#### Advantages & Disadvantages of Unit Tests

<https://medium.com/qa-lead/unit-testing-advantages-disadvantages-c629773bb870>

#### Tool(s) Selected

##### Python -> Pytest

Pytest was selected for unit testing Python as it's a popular and easy to use Python testing framework

<https://docs.pytest.org/>

##### TypeScript -> Jest

Jest was selected for unit testing TypeScript because it's a popular and easy to use TypeScript testing framework. As well it works with React.

<https://jestjs.io/>

### End To End Tests

End to End tests will be used to test the whole application by simulating a user interacting with the user interface but will inherently test Auth and API as the UI will call out to the API.

#### Advantages & Disadvantages of End to End Tests

<https://www.browserstack.com/guide/end-to-end-testing>

#### End to End Tests Tool(s) Selected

Pytest and pytest-bdd will be used to run end to end tests as the tests can be written in gherkin (feature files) and use Selenium (Python) to interact with the user interface.

### Integration Testing

Integration testing (sometimes called integration and testing, abbreviated I&T) is the phase in software testing in which individual software modules are combined and tested as a group.

#### Advantages & Disadvantages of Integration Testing

<https://pactflow.io/blog/what-is-contract-testing/#:~:text=Contract%20testing%20is%20a%20methodology,both%20parties%20adhere%20to%20it.>

#### Integration Tests Tool(s) Selected

#### Integration Test Tool(s) Selected

Pytest and pytest-bdd will be used to run end to integration tests as the tests can be written in gherkin (feature files) and Python with the API Layer

### Performance Testing

Performance testing checks the performance of the application to ensure the performance is within acceptable limits.

#### Advantages & Disadvantages of Performance Tests

<https://testpoint.com.au/the-benefits-of-performance-testing/>

#### Performance Tests Tool(s) Selected

##### API Performance Testing -> Locust

Locust was selected for performance testing as it is an open source Python package for load testing.
