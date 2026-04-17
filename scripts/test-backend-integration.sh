#!/usr/bin/env bash
#
# Phase 7 (v14.7): run the Postgres-backed integration tests.
#
# Requires a reachable Postgres cluster. By default it uses the dev connection
# string baked into PostgresTestHarness (`localhost:5432`, `postgres` /
# `P@ssw0rd@3213`). Override with HRMS_INTEGRATION_DB for CI or custom dev envs:
#
#   HRMS_INTEGRATION_DB="Host=localhost;Port=5432;Username=postgres;Password=..." \
#     ./scripts/test-backend-integration.sh
#
# The harness creates a disposable database per test class and drops it on
# tear-down, so this script is safe to run repeatedly against the same cluster.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT"

FILTER="FullyQualifiedName~PayrollTransactionRollbackTests"

echo "→ Running Postgres integration tests: $FILTER"
if [[ -n "${HRMS_INTEGRATION_DB:-}" ]]; then
  echo "→ Using HRMS_INTEGRATION_DB override"
else
  echo "→ Using default dev connection (localhost:5432)"
fi

dotnet test "./tests/TecAxle.Hrms.LifecycleAutomation.Tests/TecAxle.Hrms.LifecycleAutomation.Tests.csproj" \
  --filter "$FILTER" \
  --verbosity normal "$@"
