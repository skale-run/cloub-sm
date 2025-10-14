#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERSION="${VERSION:-v50}"

echo $ROOT_DIR
echo $VERSION

docker buildx build \
  -t "europe-west1-docker.pkg.dev/lkany-io/lkany/club-sm:${VERSION}" \
  --push \
  "${ROOT_DIR}/run"
