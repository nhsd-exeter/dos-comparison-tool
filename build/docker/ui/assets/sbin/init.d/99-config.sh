#!/bin/sh

cd static/js || exit
sed -i "s/PROFILE_TO_REPLACE/$PROFILE/" main.*.js
sed -i "s/ENVIRONMENT_TO_REPLACE/$ENVIRONMENT/" main.*.js
sed -i "s/CLIENT_ID_TO_REPLACE/$CLIENT_ID/" main.*.js
sed -i "s/USER_POOL_ID_TO_REPLACE/$USER_POOL_ID/" main.*.js

echo Environment variables replaced
