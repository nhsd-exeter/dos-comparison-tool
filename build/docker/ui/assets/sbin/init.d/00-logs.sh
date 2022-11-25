#!/bin/bash
set -e

tail -F /var/log/application/access.log > /dev/stdout 2> /dev/null &
tail -F /var/log/application/error.log > /dev/stderr 2> /dev/null &
