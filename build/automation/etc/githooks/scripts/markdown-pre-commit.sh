#!/bin/bash

set -e

# Pre-commit git hook to check the Markdown file formatting rules compliance.

# Notes:
#   1) Please, make sure to enable Markdown linting in your IDE. For the Visual
#   Studio Code editor it is `davidanson.vscode-markdownlint` that is already
#   specified in the `./.vscode/extensions.json` file.
#   2) To see the full list of the rules, please visit
#   https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md

# ==============================================================================

docker run --rm --platform linux/amd64 \
  --volume=$PWD:/workdir \
  ghcr.io/igorshubovych/markdownlint-cli:v0.34.0 \
    *.md \
    --disable MD013 MD033 \
    --ignore .github/pull_request_template.md

exit 0
