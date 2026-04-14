#!/usr/bin/env bash
# Local build script. Produces publish/{api,admin,portal} trees ready to rsync to the server.
set -euo pipefail
cd "$(dirname "$0")/.."

rm -rf publish
mkdir -p publish/admin publish/portal

echo "[1/3] Publishing backend..."
dotnet publish src/Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj \
    -c Release -o publish/api -p:UseAppHost=false

echo "[2/3] Building admin frontend..."
( cd time-attendance-frontend && npm install --no-audit --no-fund && npx ng build --configuration production )
cp -r time-attendance-frontend/dist/time-attendance-frontend/browser/. publish/admin/

echo "[3/3] Building self-service frontend..."
( cd time-attendance-selfservice-frontend && npm install --no-audit --no-fund && npx ng build --configuration production )
cp -r time-attendance-selfservice-frontend/dist/time-attendance-selfservice-frontend/browser/. publish/portal/

echo ""
echo "Done. Artifacts in ./publish/"
echo "  publish/api/TecAxle.Hrms.Api.dll"
echo "  publish/admin/index.html"
echo "  publish/portal/index.html"
