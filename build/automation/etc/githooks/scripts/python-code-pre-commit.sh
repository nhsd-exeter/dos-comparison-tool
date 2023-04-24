#!/bin/bash
set -e

[ $(make project-check-if-tech-is-included-in-stack NAME=python) == false ] && exit 0

make -s python-lint

exit 0
