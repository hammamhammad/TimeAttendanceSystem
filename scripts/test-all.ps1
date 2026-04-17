# Phase 7 (v14.7): PowerShell wrapper — runs every test layer in sequence.
# Windows-friendly equivalent of ./scripts/test-all.sh.
#
# Usage:
#   pwsh ./scripts/test-all.ps1
# or
#   powershell -File ./scripts/test-all.ps1

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host '── Backend unit tests ──────────────────────────────────────'
$env:HRMS_INTEGRATION_DB = $null
dotnet test "./TimeAttendanceSystem.sln" --verbosity minimal
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ''
Write-Host '── Backend Postgres integration tests ──────────────────────'
dotnet test "./tests/TecAxle.Hrms.LifecycleAutomation.Tests/TecAxle.Hrms.LifecycleAutomation.Tests.csproj" `
  --filter "FullyQualifiedName~PayrollTransactionRollbackTests" `
  --verbosity normal
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ''
Write-Host '── Frontend Karma specs ────────────────────────────────────'
Push-Location "$root\time-attendance-frontend"
try {
  npx ng test --watch=false --browsers=ChromeHeadless
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
} finally { Pop-Location }

Write-Host ''
Write-Host '✓ All test layers completed.'
