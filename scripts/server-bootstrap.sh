#!/usr/bin/env bash
# One-time server setup. Run as 'hhammad' (who has full sudo) — the deploy user
# has no sudo rights until this script installs the sudoers rule for it.
#
# Installs the NOPASSWD sudoers rule for deploy (rsync+docker), ensures Docker
# is present (expected — 29.4.0 already on this server), ensures /root/reverse-proxy
# and /root/applications/hrms directories exist, creates the shared edge-net docker
# network, opens the firewall.
set -euo pipefail

# 1. Passwordless sudo for deploy user: rsync + docker only
SUDOERS=/etc/sudoers.d/deploy-hrms
if [ ! -f "$SUDOERS" ]; then
    sudo tee "$SUDOERS" >/dev/null <<'SUDO'
deploy ALL=(root) NOPASSWD: /usr/bin/rsync, /usr/bin/docker
SUDO
    sudo chmod 440 "$SUDOERS"
    sudo visudo -c -f "$SUDOERS"
fi

# 2. Docker Engine + compose plugin (already installed at time of writing)
if ! command -v docker >/dev/null 2>&1; then
    curl -fsSL https://get.docker.com | sudo sh
fi

# 3. Directory layout under /root/applications (lowercase; created manually earlier)
sudo mkdir -p /root/reverse-proxy
sudo mkdir -p /root/applications/hrms/compose
sudo mkdir -p /root/applications/hrms/artifacts/api
sudo mkdir -p /root/applications/hrms/artifacts/admin
sudo mkdir -p /root/applications/hrms/artifacts/portal

# 4. Shared edge network (owned by no project, referenced by all apps)
sudo docker network inspect edge-net >/dev/null 2>&1 \
    || sudo docker network create edge-net

# 5. Firewall (SSH port 2222, HTTP, HTTPS)
sudo ufw allow 2222/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

cat <<'EOF'

Server ready. Next steps:

  1. Upload reverse-proxy files to /root/reverse-proxy/
  2. cd /root/reverse-proxy && sudo docker compose up -d
  3. Upload HRMS compose files to /root/applications/hrms/compose/
  4. Create /root/applications/hrms/compose/.env with secrets
  5. From laptop: ./scripts/build-artifacts.sh && ./scripts/deploy-artifacts.sh
  6. cd /root/applications/hrms/compose && sudo docker compose up -d
EOF
