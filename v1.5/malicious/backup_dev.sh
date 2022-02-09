#!/bin/bash

OUTPUT_DIR=/tmp/eisenhower_$(date +"%Y-%m-%d_%Hh%M")
OUTPUT_FRONTEND_DIR=${OUTPUT_DIR}/frontend
OUTPUT_BACKEND_DIR=${OUTPUT_DIR}/backend
OUTPUT_MALICIOUS_DIR=${OUTPUT_DIR}/malicious

mkdir -p $OUTPUT_DIR
mkdir -p $OUTPUT_FRONTEND_DIR
mkdir -p $OUTPUT_BACKEND_DIR
mkdir -p $OUTPUT_MALICIOUS_DIR

frontend_items="assets chartjs chart.html eisenhower-matrix.html eisenhower-matrix.js index.html"
backend_items="copy.php delete.php upload.php tasks_lists.php"
malicious_items="backup_dev.sh"


cp -rf $frontend_items  $OUTPUT_FRONTEND_DIR
cp -rf $backend_items   $OUTPUT_BACKEND_DIR
cp -rf $malicious_items $OUTPUT_MALICIOUS_DIR

echo "backup done in $OUTPUT_DIR"

