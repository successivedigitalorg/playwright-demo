#!/bin/bash

# Script to save reference snapshots from the current test run
echo "Saving reference snapshots from current test run..."

# Create baseline directories if they don't exist
mkdir -p ./playwright/snapshots/baseline/charts

# Copy screenshots from test-results to baseline
cp -v ./playwright/test-results/*.png ./playwright/snapshots/baseline/ 2>/dev/null || :
cp -v ./playwright/test-results/charts/*.png ./playwright/snapshots/baseline/charts/ 2>/dev/null || :

# Copy snapshots created by Playwright's toHaveScreenshot
find ./playwright -name "*.png" -path "*-snapshots*" -exec cp -v {} ./playwright/snapshots/baseline/ \;

echo "Snapshot saving complete."
