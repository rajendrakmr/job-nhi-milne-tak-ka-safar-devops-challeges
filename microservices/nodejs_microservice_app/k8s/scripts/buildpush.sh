#!/bin/bash
set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
DOCKER_USER="rk0617"
SERVICES=("customer" "frontend")

for SERVICE in "${SERVICES[@]}"; do
  echo "🚀 Building and pushing $SERVICE..."
  docker build -t "$DOCKER_USER/$SERVICE:latest" "$PROJECT_ROOT/$SERVICE"
  docker push "$DOCKER_USER/$SERVICE:latest"
  echo "✅ $SERVICE done."
done
