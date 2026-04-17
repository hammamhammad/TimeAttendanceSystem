#!/usr/bin/env bash
#
# Phase 7 (v14.7): run Karma specs for the admin frontend in headless Chrome.
#
# Usage:
#   ./scripts/test-frontend.sh

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$ROOT/time-attendance-frontend"
npx ng test --watch=false --browsers=ChromeHeadless "$@"
