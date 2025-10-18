#!/usr/bin/env bash
set -euo pipefail

CONTAINER_NAME="${CONTAINER_NAME:-cloub-postgres-debug}"
POSTGRES_DB="${POSTGRES_DB:-cloubsm}"
POSTGRES_USER="${POSTGRES_USER:-cloubsm}"
POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-cloubsm}"
HOST_PORT="${HOST_PORT:-5432}"
DATA_VOLUME="${DATA_VOLUME:-${CONTAINER_NAME}-data}"
IMAGE="${IMAGE:-postgres:16}"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required to run this script." >&2
  exit 1
fi

if ! docker volume inspect "${DATA_VOLUME}" >/dev/null 2>&1; then
  echo "Creating Docker volume '${DATA_VOLUME}'."
  docker volume create "${DATA_VOLUME}" >/dev/null
fi

if docker ps -a --format '{{.Names}}' | grep -Fxq "${CONTAINER_NAME}"; then
  if [[ "$(docker inspect -f '{{.State.Running}}' "${CONTAINER_NAME}")" == "true" ]]; then
    echo "Container '${CONTAINER_NAME}' is already running."
    exit 0
  fi

  echo "Starting existing container '${CONTAINER_NAME}'."
  docker start "${CONTAINER_NAME}" >/dev/null
else
  echo "Running new PostgreSQL container '${CONTAINER_NAME}'."
  docker run -d \
    --name "${CONTAINER_NAME}" \
    -e "POSTGRES_DB=${POSTGRES_DB}" \
    -e "POSTGRES_USER=${POSTGRES_USER}" \
    -e "POSTGRES_PASSWORD=${POSTGRES_PASSWORD}" \
    -p "${HOST_PORT}:5432" \
    -v "${DATA_VOLUME}:/var/lib/postgresql/data" \
    "${IMAGE}" >/dev/null
fi

echo "PostgreSQL is available on localhost:${HOST_PORT} with database '${POSTGRES_DB}'."