#!/usr/bin/env bash
#
# Phase 7 (v14.7): run the full backend test suite WITHOUT requiring Postgres.
#
# Tests attributed with [PostgresRequiredFact] auto-skip when HRMS_INTEGRATION_DB
# is unset AND the default dev cluster isn't reachable, so this target gives a
# clean green on any dev laptop that doesn't have Postgres running.
#
# Usage:
#   ./scripts/test-backend-unit.sh

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT"

# Explicitly unset the integration env-var so PostgresTestHarness.IsAvailable
# doesn't transparently connect to a stale dev DB on this machine.
unset HRMS_INTEGRATION_DB || true

dotnet test "./TimeAttendanceSystem.sln" --verbosity minimal "$@"
