#!/bin/bash

file=/metadata/metadata.txt
echo "BUILD_DATE=$IMAGE_BUILD_DATE" >> $file
echo "VERSION=$IMAGE_VERSION" >> $file
echo "VCS_REF=$IMAGE_VCS_REF" >> $file
echo "PIPELINE_ID=$IMAGE_PIPELINE_ID" >> $file
