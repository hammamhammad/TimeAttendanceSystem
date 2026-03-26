# Deployment Guide - Time Attendance System (ClockN)

## Architecture

| Component | Host | URL |
|-----------|------|-----|
| **Backend API + DB** | Ubuntu 24.04 LTS (`76.13.184.116`) | https://api.clockn.net |
| **Admin Frontend** | Cloudflare Pages | https://www.clockn.net |
| **Self-Service Portal** | Cloudflare Pages | https://portal.clockn.net |
| **Mobile App** | Flutter (iOS/Android) | Connects to api.clockn.net |

---

## Part 1: Server Setup (API + Database)

### SSH Access

```bash
ssh root@76.13.184.116
```

### Quick Setup (Automated)

Upload and run the setup script:

```bash
# From local machine
scp scripts/deploy-server.sh root@76.13.184.116:/tmp/
ssh root@76.13.184.116 "chmod +x /tmp/deploy-server.sh && /tmp/deploy-server.sh"
```

### Manual Setup Steps

#### 1. System Update

```bash
apt update && apt upgrade -y
apt install -y curl wget git vim ufw net-tools htop unzip nginx certbot python3-certbot-nginx
```

#### 2. Install .NET 9 ASP.NET Core Runtime

```bash
# Add Microsoft package repository
wget https://packages.microsoft.com/config/ubuntu/24.04/packages-microsoft-prod.deb -O /tmp/packages-microsoft-prod.deb
dpkg -i /tmp/packages-microsoft-prod.deb
apt update

# Install ASP.NET Core Runtime
apt install -y aspnetcore-runtime-9.0

# Verify
dotnet --info
```

#### 3. Install PostgreSQL

```bash
apt install -y postgresql postgresql-contrib
systemctl enable postgresql
systemctl start postgresql

# Set postgres password and create database
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'P@ssw0rd@3213';"
sudo -u postgres psql -c "CREATE DATABASE \"TimeAttendanceSystem\";"

# Enable password authentication
PG_HBA=$(find /etc/postgresql -name pg_hba.conf | head -1)
cp "$PG_HBA" "${PG_HBA}.bak"
sed -i 's/local   all             postgres                                peer/local   all             postgres                                md5/' "$PG_HBA"
sed -i 's/local   all             all                                     peer/local   all             all                                     md5/' "$PG_HBA"
systemctl restart postgresql
```

#### 4. Create Application Directory

```bash
mkdir -p /var/www/timeattendance-api
mkdir -p /var/log/timeattendance
id -u timeattendance &>/dev/null || useradd -r -s /bin/false timeattendance
chown -R timeattendance:timeattendance /var/www/timeattendance-api
chown -R timeattendance:timeattendance /var/log/timeattendance
```

#### 5. Create Systemd Service

```bash
cat > /etc/systemd/system/timeattendance-api.service << 'EOF'
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
EOF

systemctl daemon-reload
systemctl enable timeattendance-api
```

#### 6. Configure Nginx Reverse Proxy

```bash
cat > /etc/nginx/sites-available/timeattendance-api << 'EOF'
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
EOF

ln -sf /etc/nginx/sites-available/timeattendance-api /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx
```

#### 7. Firewall

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
```

#### 8. SSL Certificate (after DNS is pointed)

```bash
certbot --nginx -d api.clockn.net --non-interactive --agree-tos -m admin@clockn.net
```

---

## Part 2: Deploy API

### From Local Machine

```bash
# 1. Publish the API
cd d:/Work/TimeAttendanceSystem
dotnet publish src/Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj -c Release -o publish/

# 2. Upload to server
scp -r publish/* root@76.13.184.116:/var/www/timeattendance-api/

# 3. Fix permissions and restart
ssh root@76.13.184.116 << 'EOF'
chown -R timeattendance:timeattendance /var/www/timeattendance-api
systemctl restart timeattendance-api
systemctl status timeattendance-api
EOF
```

### Verify API

```bash
# On server
curl http://localhost:5099/swagger/index.html -s -o /dev/null -w "%{http_code}"
# Should return 200

# Check logs
journalctl -u timeattendance-api -f --no-pager -n 50
```

### Load Sample Data (First Time Only)

```bash
# On server - connect to PostgreSQL and run sample data
sudo -u postgres psql -d TimeAttendanceSystem < /var/www/timeattendance-api/scripts/sample-data-with-users.sql
```

Or from local machine:
```bash
# Upload and run sample data script
scp scripts/sample-data-with-users.sql root@76.13.184.116:/tmp/
ssh root@76.13.184.116 "sudo -u postgres psql -d TimeAttendanceSystem < /tmp/sample-data-with-users.sql"
```

---

## Part 3: Deploy Frontends (Cloudflare Pages)

### Prerequisites

- Cloudflare account with `clockn.net` domain
- Wrangler CLI: `npm install -g wrangler`
- Authenticate: `wrangler login`

### Admin Frontend → www.clockn.net

```bash
cd d:/Work/TimeAttendanceSystem/time-attendance-frontend

# Build for production
npx ng build --configuration production

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist/time-attendance-frontend/browser --project-name=clockn-admin
```

**Cloudflare Pages Settings:**
- Project name: `clockn-admin`
- Custom domain: `www.clockn.net` and `clockn.net`
- Build output: `dist/time-attendance-frontend/browser`

**SPA Routing Fix** - Create `_redirects` file in the output directory:
```
/*    /index.html   200
```

### Self-Service Portal → portal.clockn.net

```bash
cd d:/Work/TimeAttendanceSystem/time-attendance-selfservice-frontend

# Build for production
npx ng build --configuration production

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist/time-attendance-selfservice-frontend/browser --project-name=clockn-portal
```

**Cloudflare Pages Settings:**
- Project name: `clockn-portal`
- Custom domain: `portal.clockn.net`
- Build output: `dist/time-attendance-selfservice-frontend/browser`

---

## Part 4: DNS Configuration (Cloudflare)

### Required DNS Records

| Type | Name | Value | Proxy |
|------|------|-------|-------|
| A | `api` | `76.13.184.116` | DNS only (gray cloud) |
| CNAME | `www` | `clockn-admin.pages.dev` | Proxied (orange cloud) |
| CNAME | `portal` | `clockn-portal.pages.dev` | Proxied (orange cloud) |
| CNAME | `@` | `clockn-admin.pages.dev` | Proxied (orange cloud) |

**Important:** The `api` subdomain should NOT be proxied through Cloudflare (gray cloud) to allow WebSocket connections for SignalR. Or if proxied, enable WebSocket support in Cloudflare dashboard.

---

## Part 5: Update Deployment

### Update API Only

```bash
# Build and upload
cd d:/Work/TimeAttendanceSystem
dotnet publish src/Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj -c Release -o publish/
scp -r publish/* root@76.13.184.116:/var/www/timeattendance-api/
ssh root@76.13.184.116 "chown -R timeattendance:timeattendance /var/www/timeattendance-api && systemctl restart timeattendance-api"
```

### Update Admin Frontend Only

```bash
cd d:/Work/TimeAttendanceSystem/time-attendance-frontend
npx ng build --configuration production
npx wrangler pages deploy dist/time-attendance-frontend/browser --project-name=clockn-admin
```

### Update Self-Service Portal Only

```bash
cd d:/Work/TimeAttendanceSystem/time-attendance-selfservice-frontend
npx ng build --configuration production
npx wrangler pages deploy dist/time-attendance-selfservice-frontend/browser --project-name=clockn-portal
```

---

## Monitoring & Troubleshooting

### Check API Status

```bash
ssh root@76.13.184.116

# Service status
systemctl status timeattendance-api

# Live logs
journalctl -u timeattendance-api -f

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Common Issues

| Issue | Solution |
|-------|----------|
| API won't start | Check: `journalctl -u timeattendance-api -n 100` |
| Database connection error | Verify PostgreSQL: `systemctl status postgresql` |
| CORS errors | Check `appsettings.Production.json` AllowedOrigins |
| 502 Bad Gateway | API not running: `systemctl restart timeattendance-api` |
| SignalR not connecting | Check Nginx WebSocket config, verify `/hubs/` proxy |
| SSL cert expired | Run: `certbot renew` |

### Backup Database

```bash
# On server
sudo -u postgres pg_dump TimeAttendanceSystem > /tmp/backup_$(date +%Y%m%d).sql

# Download backup
scp root@76.13.184.116:/tmp/backup_*.sql ./backups/
```

### Restore Database

```bash
sudo -u postgres psql -d TimeAttendanceSystem < backup_file.sql
```

---

## Default Credentials

**System Administrator:**
- Username: `systemadmin`
- Password: `TempP@ssw0rd123!`

**Sample Employees** (after loading sample data):
- Username: email prefix (e.g., `ahmed.rashid`)
- Password: `Emp@123!` (must change on first login)

---

**Last Updated**: March 25, 2026
