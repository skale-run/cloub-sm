#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERSION="${VERSION:-v50}"
BUILD_OUTPUT_DIR="${BUILD_OUTPUT_DIR:-run}"
BUILD_DIR="./${BUILD_OUTPUT_DIR}"

echo $BUILD_OUTPUT_DIR
echo $BUILD_DIR

if [[ ! -d "${BUILD_DIR}" ]]; then
  echo "Build output directory '${BUILD_DIR}' does not exist. Run 'npm run build' to generate it." >&2
  exit 1
fi

echo "Building image from ${BUILD_DIR}"
echo "Using version ${VERSION}"

docker buildx build \
  -t "europe-west1-docker.pkg.dev/lkany-io/lkany/club-sm:${VERSION}" \
  --push \
  "${BUILD_DIR}"
