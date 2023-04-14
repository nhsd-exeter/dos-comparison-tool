#!/bin/sh

cd static/js || exit
sed -i "s|PROFILE_TO_REPLACE|$PROFILE|g" main.*.js
sed -i "s|ENVIRONMENT_TO_REPLACE|$ENVIRONMENT|g" main.*.js
sed -i "s|CLIENT_ID_TO_REPLACE|$CLIENT_ID|g" main.*.js
sed -i "s|USER_POOL_ID_TO_REPLACE|$USER_POOL_ID|g" main.*.js
sed -i "s|API_ENDPOINT_TO_REPLACE|$API_ENDPOINT|g" main.*.js

echo Environment variables replaced
