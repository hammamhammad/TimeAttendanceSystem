#!/bin/bash
# =============================================================
# Time Attendance System - Server Deployment Script
# Server: Ubuntu 24.04 LTS
# Components: .NET 9 API + PostgreSQL 16
# =============================================================

set -e

echo "=========================================="
echo "  Time Attendance System - Server Setup"
echo "=========================================="

# --- 1. System Update ---
echo ""
echo "[1/8] Updating system packages..."
apt update && apt upgrade -y
apt install -y curl wget git vim ufw net-tools htop unzip nginx certbot python3-certbot-nginx

# --- 2. Install .NET 9 Runtime ---
echo ""
echo "[2/8] Installing .NET 9 Runtime..."
wget https://dot.net/v1/dotnet-install.sh -O /tmp/dotnet-install.sh
chmod +x /tmp/dotnet-install.sh

# Install ASP.NET Core Runtime 9.0
apt install -y dotnet-runtime-9.0 aspnetcore-runtime-9.0 2>/dev/null || {
    # Fallback: manual install
    wget https://packages.microsoft.com/config/ubuntu/24.04/packages-microsoft-prod.deb -O /tmp/packages-microsoft-prod.deb
    dpkg -i /tmp/packages-microsoft-prod.deb
    apt update
    apt install -y aspnetcore-runtime-9.0
}
dotnet --info || echo "dotnet installed"

# --- 3. Install PostgreSQL 16 ---
echo ""
echo "[3/8] Installing PostgreSQL 16..."
apt install -y postgresql postgresql-contrib
systemctl enable postgresql
systemctl start postgresql

# Configure PostgreSQL
echo ""
echo "[3b] Configuring PostgreSQL..."
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'P@ssw0rd@3213';" 2>/dev/null || true
sudo -u postgres psql -c "CREATE DATABASE \"TimeAttendanceSystem\";" 2>/dev/null || true

# Enable password auth for local connections
PG_HBA=$(find /etc/postgresql -name pg_hba.conf | head -1)
if [ -n "$PG_HBA" ]; then
    # Backup original
    cp "$PG_HBA" "${PG_HBA}.bak"
    # Change peer to md5 for local postgres user
    sed -i 's/local   all             postgres                                peer/local   all             postgres                                md5/' "$PG_HBA"
    sed -i 's/local   all             all                                     peer/local   all             all                                     md5/' "$PG_HBA"
    systemctl restart postgresql
fi

echo "PostgreSQL configured."

# --- 4. Create app directory and user ---
echo ""
echo "[4/8] Setting up application directory..."
mkdir -p /var/www/timeattendance-api
mkdir -p /var/log/timeattendance

# Create service user
id -u timeattendance &>/dev/null || useradd -r -s /bin/false timeattendance
chown -R timeattendance:timeattendance /var/www/timeattendance-api
chown -R timeattendance:timeattendance /var/log/timeattendance

echo "App directory ready at /var/www/timeattendance-api/"

# --- 5. Create systemd service ---
echo ""
echo "[5/8] Creating systemd service..."
cat > /etc/systemd/system/timeattendance-api.service << 'SERVICEEOF'
[Unit]
Description=Time Attendance System API
After=network.target postgresql.service
Requires=postgresql.service

[Service]
WorkingDirectory=/var/www/timeattendance-api
ExecStart=/usr/bin/dotnet /var/www/timeattendance-api/TimeAttendanceSystem.Api.dll
Restart=always
RestartSec=10
SyslogIdentifier=timeattendance-api
User=timeattendance
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=ASPNETCORE_URLS=http://localhost:5099
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false

[Install]
WantedBy=multi-user.target
SERVICEEOF

systemctl daemon-reload
systemctl enable timeattendance-api

echo "Service created."

# --- 6. Configure Nginx reverse proxy ---
echo ""
echo "[6/8] Configuring Nginx..."
cat > /etc/nginx/sites-available/timeattendance-api << 'NGINXEOF'
server {
    listen 80;
    server_name api.clockn.net;

    location / {
        proxy_pass http://localhost:5099;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
        client_max_body_size 50M;
    }

    # SignalR WebSocket support
    location /hubs/ {
        proxy_pass http://localhost:5099;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 86400s;
    }
}
NGINXEOF

ln -sf /etc/nginx/sites-available/timeattendance-api /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx

echo "Nginx configured."

# --- 7. Configure firewall ---
echo ""
echo "[7/8] Configuring firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "Firewall configured."

# --- 8. SSL with Let's Encrypt ---
echo ""
echo "[8/8] SSL will be configured after DNS is pointed to this server."
echo "Run this command after DNS propagation:"
echo "  certbot --nginx -d api.clockn.net --non-interactive --agree-tos -m admin@clockn.net"

echo ""
echo "=========================================="
echo "  Server Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "  1. Upload API files to /var/www/timeattendance-api/"
echo "  2. Run: systemctl start timeattendance-api"
echo "  3. Point api.clockn.net DNS to this server IP"
echo "  4. Run certbot for SSL"
echo ""
