#!/bin/bash

# This script is used to build the metadata for the project.

# The script is called from the root of the project.

# Output to .buildserver with the following format:
# BUILD_TIME=2019-01-01T00:00:00Z
# LATEST_COMMIT_TIME=2019-01-01T00:00:00Z

echo "BUILD_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")" > .buildserver

# Get the latest commit time from git
echo "LATEST_COMMIT_TIME=$(git log -1 --format=%cd --date=iso-strict)" >> .buildserver