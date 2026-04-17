#!/usr/bin/env bash
#
# Phase 7 (v14.7): run every test layer (unit + integration + frontend) in
# sequence. Convenient pre-commit check.
#
# If HRMS_INTEGRATION_DB is unset and the default dev cluster isn't reachable,
# the Postgres integration tests auto-skip without failing the run.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "── Backend unit tests ──────────────────────────────────────"
"$SCRIPT_DIR/test-backend-unit.sh"

echo ""
echo "── Backend Postgres integration tests ──────────────────────"
"$SCRIPT_DIR/test-backend-integration.sh"

echo ""
echo "── Frontend Karma specs ────────────────────────────────────"
"$SCRIPT_DIR/test-frontend.sh"

echo ""
echo "✓ All test layers completed."
