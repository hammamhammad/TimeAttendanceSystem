#!/usr/bin/env bash
# Local deploy script. rsyncs publish/ to /root/Applications/hrms/artifacts/ on the server,
# then restarts the HRMS containers.
#
# Requires: the deploy user has NOPASSWD sudo for /usr/bin/rsync and /usr/bin/docker
# (configured by scripts/server-bootstrap.sh in Phase B).
set -euo pipefail
cd "$(dirname "$0")/.."

: "${SSH_USER:=deploy}"
: "${SSH_HOST:=187.124.217.81}"
: "${SSH_PORT:=2222}"
REMOTE_ROOT=/root/applications/hrms

SSH="ssh -p ${SSH_PORT}"
RSYNC_SSH="ssh -p ${SSH_PORT}"

# --rsync-path="sudo rsync" runs rsync as root on the server so it can write into /root/...
for target in api admin portal; do
    echo "[rsync] publish/${target}/ -> ${SSH_USER}@${SSH_HOST}:${REMOTE_ROOT}/artifacts/${target}/"
    rsync -az --delete -e "${RSYNC_SSH}" --rsync-path="sudo rsync" \
        "publish/${target}/" \
        "${SSH_USER}@${SSH_HOST}:${REMOTE_ROOT}/artifacts/${target}/"
done

echo "[ssh] restart containers"
${SSH} "${SSH_USER}@${SSH_HOST}" \
    "cd ${REMOTE_ROOT}/compose && sudo docker compose restart hrms-api hrms-admin hrms-portal"

echo "Done."
