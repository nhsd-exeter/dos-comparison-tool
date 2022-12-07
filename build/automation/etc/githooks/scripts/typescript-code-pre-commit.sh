#!/bin/bash
set -e

[ $(make project-check-if-tech-is-included-in-stack NAME=typescript) == false ] && exit 0

if [ $(make git-check-if-commit-changed-directory DIR=application/ui PRECOMMIT=true) == true ]; then
  make -s typescript-code-check
fi

exit 0
