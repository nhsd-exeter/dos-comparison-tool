# dos-comparison-tool

This is a tool to compare the output of two DoS environments. It is primarily intended to be used to compare the output of a check capacity summary search in each environment.

- [dos-comparison-tool](#dos-comparison-tool)
  - [Testing](#testing)
    - [End to end tests](#end-to-end-tests)

## Testing

### End to end tests

  To run the end to end tests which test the UI and application functionality, run the following command:

  ```bash
  make end-to-end-test PROFILE= ENVIRONMENT=
  ```

  Example:

  ```bash
  make end-to-end-test PROFILE=dev ENVIRONMENT=dev
  ```
