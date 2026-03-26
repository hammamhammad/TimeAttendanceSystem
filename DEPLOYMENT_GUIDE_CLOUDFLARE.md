# Complete Deployment Guide — clockn.net

## Architecture Overview

```
                        Cloudflare
                           │
          ┌────────────────┼────────────────┐
          │                │                │
    clockn.net      portal.clockn.net  api.clockn.net
    (Admin UI)      (Self-Service UI)  (Backend API)
          │                │                │
    Cloudflare        Cloudflare       Hostinger VPS
      Pages             Pages          (Ubuntu 24.04)
    (FREE CDN)        (FREE CDN)           │
                                      ┌────┴────┐
                                      │         │
                                    Nginx    PostgreSQL
                                  (reverse   (localhost
                                   proxy)     :5432)
                                      │
                                 .NET 9 API
                                (localhost:5099)
```

| Component | Where | Domain | Cost |
|-----------|-------|--------|------|
| Admin Frontend | Cloudflare Pages | `clockn.net` | **FREE** |
| Self-Service Frontend | Cloudflare Pages | `portal.clockn.net` | **FREE** |
| Backend API | Hostinger KVM 1 | `api.clockn.net` | **$4.99/mo** |
| Mobile App | — | connects to `api.clockn.net` | — |
| Database | Hostinger VPS | localhost:5432 | included |
| DNS + SSL + CDN | Cloudflare Free | — | **FREE** |

**Total: $4.99/month**

---

## Part 1: Hostinger VPS Setup

### Step 1.1 — Purchase Hostinger KVM 1

1. Go to Hostinger and purchase **KVM 1** plan ($4.99/mo)
2. Choose **Ubuntu 24.04** as the OS
3. Choose a datacenter **closest to your users** (Europe or Middle East recommended)
4. Set a **root password** during setup

### Step 1.2 — Generate SSH Key (on your Windows machine)

```powershell
ssh-keygen -t ed25519 -C "clockn-deploy"
# Press Enter for default path (~/.ssh/id_ed25519)
# Set a passphrase (recommended)

# View the public key
Get-Content ~/.ssh/id_ed25519.pub
```

### Step 1.3 — Add SSH Key to Server

```bash
ssh root@76.13.184.116
```

### Step 1.4 — Server IP

**Server IP: `76.13.184.116`**

```bash
ssh root@76.13.184.116
```

---

## Part 2: Cloudflare Setup

### Step 2.1 — Add Domain to Cloudflare

1. Log in to https://dash.cloudflare.com
2. Click **Add a site** → Enter `clockn.net`
3. Select **Free** plan
4. Cloudflare will scan existing DNS records

### Step 2.2 — Update Nameservers

1. Cloudflare will give you 2 nameservers (e.g., `ada.ns.cloudflare.com`, `ben.ns.cloudflare.com`)
2. Go to your domain registrar → update nameservers to Cloudflare's
3. Wait for propagation (usually 1-2 hours, up to 24h)

### Step 2.3 — Configure DNS Records

Only the API subdomain points to your VPS. The frontend domains will be added by Cloudflare Pages automatically.

| Type | Name | Content | Proxy | TTL |
|------|------|---------|-------|-----|
| A | `api` | `76.13.184.116` | **Proxied** (orange cloud) | Auto |

> `clockn.net` and `portal.clockn.net` DNS records will be created automatically when you set up Cloudflare Pages (Part 7).

### Step 2.4 — Create Cloudflare Origin Certificate (for API server)

Go to **SSL/TLS → Origin Server**:

1. Click **Create Certificate**
2. Private key type: **RSA (2048)**
3. Hostnames: `api.clockn.net` (you can also add `*.clockn.net` and `clockn.net` for flexibility)
4. Certificate validity: **15 years**
5. Click **Create**
6. **COPY AND SAVE both the Origin Certificate and Private Key** — you cannot retrieve the key later!

### Step 2.5 — SSL/TLS Settings

Go to **SSL/TLS → Overview**:
- Set encryption mode to **Full (strict)**

### Step 2.6 — Cloudflare Settings

**Speed → Optimization**:
- Brotli: **On**

**Network**:
- WebSockets: **On** (needed for SignalR)

**Caching → Configuration**:
- Browser Cache TTL: **1 month**

**Rules → Page Rules** (add one rule):

| URL Pattern | Setting |
|-------------|---------|
| `api.clockn.net/*` | Cache Level: **Bypass** |

---

## Part 3: Server Security Setup

### Step 3.1 — SSH into Server

```bash
ssh root@76.13.184.116
```


### Step 3.2 — Update System

```bash
apt update && apt upgrade -y
apt install -y curl wget git nano ufw net-tools htop unzip software-properties-common sed
```

### Step 3.3 — Create Users

```bash
# Application user (runs the .NET app)
adduser --system --group --home /opt/timeattendance --shell /bin/bash timeattendance

# Deployment user (you SSH as this user)
adduser deployer
usermod -aG sudo deployer

# Copy SSH keys to deployer
mkdir -p /home/deployer/.ssh
cp /root/.ssh/authorized_keys /home/deployer/.ssh/
chown -R deployer:deployer /home/deployer/.ssh
chmod 700 /home/deployer/.ssh
chmod 600 /home/deployer/.ssh/authorized_keys
```

### Step 3.4 — Configure Firewall

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp      # SSH
ufw allow 80/tcp      # HTTP (redirect to HTTPS)
ufw allow 443/tcp     # HTTPS
ufw enable
ufw status
```

### Step 3.5 — Install Fail2Ban

```bash
apt install -y fail2ban

cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 86400
EOF

systemctl enable fail2ban
systemctl start fail2ban
```

### Step 3.6 — Enable Automatic Security Updates

```bash
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades
# Select "Yes"
```

---

## Part 4: Install Software on Server

### Step 4.1 — Install PostgreSQL 16

```bash
# Add PostgreSQL repository
sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor -o /usr/share/keyrings/postgresql-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/postgresql-archive-keyring.gpg] http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list

apt update
apt install -y postgresql-16 postgresql-client-16
```

### Step 4.2 — Configure PostgreSQL

```bash
sudo -u postgres psql
```

```sql
-- Set a strong password (CHANGE THIS!)
ALTER USER postgres WITH PASSWORD 'YourStrongPassword!@#2026';

-- Create the database
CREATE DATABASE "TimeAttendanceSystem" OWNER postgres;

-- Verify
\l

-- Exit
\q
```

**Tune for 4GB RAM** (1 vCPU server — conservative settings):

```bash
nano /etc/postgresql/16/main/postgresql.conf
# Use Ctrl+W to search, Ctrl+O to save, Ctrl+X to exit
```

```
# Memory (conservative for shared 4GB server)
shared_buffers = 512MB
effective_cache_size = 2GB
work_mem = 8MB
maintenance_work_mem = 128MB

# Connections
max_connections = 50

# WAL
wal_buffers = 16MB
checkpoint_completion_target = 0.9

# Planner
random_page_cost = 1.1
effective_io_concurrency = 200
```

```bash
systemctl restart postgresql
```

### Step 4.3 — Install .NET 9

```bash
wget https://packages.microsoft.com/config/ubuntu/24.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb

apt update
apt install -y aspnetcore-runtime-9.0
dotnet --info
```

> We only install the **runtime** (not the SDK) on the server. Building happens on your local machine.

### Step 4.4 — Install Nginx

```bash
apt install -y nginx
systemctl enable nginx
systemctl start nginx
```

---

## Part 5: Deploy Backend API

### Step 5.1 — Create Directory Structure (on server)

```bash
mkdir -p /opt/timeattendance/{publish,backups,ssl}
chown -R timeattendance:timeattendance /opt/timeattendance
```

### Step 5.2 — Build Backend (on your Windows machine)

Open a terminal on your local Windows machine:

```powershell
cd D:\Work\TimeAttendanceSystem

# Publish the backend for Linux
dotnet publish src/Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj `
  --configuration Release `
  --runtime linux-x64 `
  --self-contained false `
  --output ./publish
```

### Step 5.3 — Upload to Server (from Windows)

```powershell
# Upload published files to server
scp -r ./publish/* deployer@76.13.184.116:/tmp/publish/
```

Then on the server:

```bash
# Move files to the right place
sudo cp -r /tmp/publish/* /opt/timeattendance/publish/
sudo chown -R timeattendance:timeattendance /opt/timeattendance/publish/
rm -rf /tmp/publish
```

### Step 5.4 — Create Production Configuration (on server)

```bash
sudo nano /opt/timeattendance/publish/appsettings.Production.json
# Paste the JSON below, then Ctrl+O to save, Ctrl+X to exit
```

Paste the following (replace passwords and secrets):

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=YourStrongPassword!@#2026;Include Error Detail=false",
    "PostgreSqlConnection": "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=YourStrongPassword!@#2026;Include Error Detail=false"
  },
  "Jwt": {
    "Secret": "REPLACE_WITH_GENERATED_SECRET_SEE_BELOW",
    "Issuer": "TimeAttendanceSystem",
    "Audience": "TimeAttendanceSystem-Client",
    "ExpiryMinutes": 1440,
    "RememberMeDays": 7
  },
  "Cors": {
    "PolicyName": "ProductionCorsPolicy",
    "AllowedOrigins": [
      "https://clockn.net",
      "https://www.clockn.net",
      "https://portal.clockn.net"
    ],
    "AllowedMethods": [
      "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"
    ],
    "AllowedHeaders": [
      "Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"
    ],
    "AllowCredentials": true,
    "PreflightMaxAge": 86400
  },
  "AttendanceScheduling": {
    "EnableDailyCalculation": true,
    "DailyCalculationHour": 23,
    "DailyCalculationMinute": 30,
    "EnableWeeklyCalculation": true,
    "WeeklyCalculationDay": 0,
    "WeeklyCalculationHour": 23,
    "WeeklyCalculationMinute": 45,
    "EnableMonthlyCalculation": true,
    "MonthlyCalculationDay": 1,
    "MonthlyCalculationHour": 1,
    "MonthlyCalculationMinute": 0,
    "EnableAutoCheckout": true,
    "AutoCheckoutHour": 22,
    "AutoCheckoutMinute": 0
  },
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Warning"
    },
    "EnableSensitiveDataLogging": false,
    "EnableDetailedErrors": false
  },
  "AllowedHosts": "*",
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://localhost:5099"
      }
    }
  }
}
```

Generate a strong JWT secret:

```bash
openssl rand -base64 64 | tr -d '\n' | head -c 80; echo
```

Copy the output and replace `REPLACE_WITH_GENERATED_SECRET_SEE_BELOW` in the config.

### Step 5.5 — Run Database Migrations

You need the SDK for migrations. Two options:

**Option A — Run migrations from your Windows machine** (recommended):

Update the connection string in `appsettings.Production.json` on your local machine to point to the server temporarily, or use SSH tunnel:

```powershell
# Create SSH tunnel: local port 5433 → server's PostgreSQL port 5432
ssh -L 5433:localhost:5432 deployer@76.13.184.116

# In another terminal, run migrations using the tunnel
cd D:\Work\TimeAttendanceSystem
$env:ASPNETCORE_ENVIRONMENT="Production"

# Temporarily update connection string to use port 5433 (the tunnel)
dotnet ef database update `
  --project src/Infrastructure/TimeAttendanceSystem.Infrastructure `
  --startup-project src/Api/TimeAttendanceSystem.Api
```

**Option B — Install SDK temporarily on server**:

```bash
sudo apt install -y dotnet-sdk-9.0

# Clone repo temporarily for migrations
cd /tmp
git clone YOUR_REPO_URL timeattendance-temp
cd timeattendance-temp

dotnet ef database update \
  --project src/Infrastructure/TimeAttendanceSystem.Infrastructure \
  --startup-project src/Api/TimeAttendanceSystem.Api \
  --configuration Release

# Clean up
cd /
rm -rf /tmp/timeattendance-temp
sudo apt remove -y dotnet-sdk-9.0
```

### Step 5.6 — Load Sample Data (Optional)

If you want demo data, install the SDK temporarily (see Option B above), then:

```bash
cd /tmp/timeattendance-temp/tools

# First update the connection string in RunSampleData.cs to match your production password
nano RunSampleData.cs

dotnet run --project RunSampleData.csproj
```

### Step 5.7 — Create Systemd Service

```bash
sudo cat > /etc/systemd/system/timeattendance.service << 'EOF'
[Unit]
Description=Time Attendance System API
After=network.target postgresql.service
Wants=postgresql.service

[Service]
Type=exec
User=timeattendance
Group=timeattendance
WorkingDirectory=/opt/timeattendance/publish
ExecStart=/usr/bin/dotnet /opt/timeattendance/publish/TimeAttendanceSystem.Api.dll
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false

Restart=always
RestartSec=10
TimeoutStartSec=120
TimeoutStopSec=30

StandardOutput=journal
StandardError=journal
SyslogIdentifier=timeattendance

NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOF
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable timeattendance
sudo systemctl start timeattendance

# Verify
sudo systemctl status timeattendance
journalctl -u timeattendance -f --no-pager -n 30
```

### Step 5.8 — Test API

```bash
curl -I http://localhost:5099/swagger/index.html
# Should return HTTP 200
```

---

## Part 6: Configure Nginx (API reverse proxy only)

### Step 6.1 — Install Cloudflare Origin Certificate

Save the certificate and key from Part 2 Step 2.4:

```bash
sudo mkdir -p /etc/nginx/ssl

# Paste the Origin Certificate
sudo nano /etc/nginx/ssl/cloudflare-origin.pem
# Right-click to paste, then Ctrl+O to save, Ctrl+X to exit

# Paste the Private Key
sudo nano /etc/nginx/ssl/cloudflare-origin-key.pem
# Right-click to paste, then Ctrl+O to save, Ctrl+X to exit

# Set permissions
sudo chmod 644 /etc/nginx/ssl/cloudflare-origin.pem
sudo chmod 600 /etc/nginx/ssl/cloudflare-origin-key.pem
```

### Step 6.2 — Remove Default Nginx Config

```bash
sudo rm /etc/nginx/sites-enabled/default
```

### Step 6.3 — Create API Nginx Config

```bash
sudo cat > /etc/nginx/sites-available/api.clockn.net << 'NGINX'
upstream backend {
    server 127.0.0.1:5099;
    keepalive 32;
}

server {
    listen 80;
    listen [::]:80;
    server_name api.clockn.net;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name api.clockn.net;

    # Cloudflare Origin Certificate
    ssl_certificate     /etc/nginx/ssl/cloudflare-origin.pem;
    ssl_certificate_key /etc/nginx/ssl/cloudflare-origin-key.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # File upload limit
    client_max_body_size 10M;

    # Proxy all API requests to .NET backend
    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header Connection "";

        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
    }

    # SignalR WebSocket support
    location /hubs/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;

        # WebSocket upgrade
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Long timeout for WebSocket
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
        proxy_buffering off;
    }

    # Swagger docs (restrict in production if needed)
    location /swagger {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Optional: restrict by IP
        # allow YOUR_IP;
        # deny all;
    }

    access_log /var/log/nginx/api.clockn.net.access.log;
    error_log  /var/log/nginx/api.clockn.net.error.log;
}
NGINX
```

### Step 6.4 — Enable and Test

```bash
sudo ln -s /etc/nginx/sites-available/api.clockn.net /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 6.5 — Verify API Through Cloudflare

```bash
# Local test
curl -I http://localhost:5099/swagger/index.html

# Through Cloudflare (after DNS propagation)
curl -I https://api.clockn.net/swagger/index.html
```

---

## Part 7: Deploy Frontends to Cloudflare Pages

Both Angular frontends are deployed as static sites on Cloudflare Pages — **free, with global CDN**.

### Step 7.1 — Build Frontends Locally (on your Windows machine)

```powershell
cd D:\Work\TimeAttendanceSystem

# Build admin frontend
cd time-attendance-frontend
npm ci
npx ng build --configuration production
# Output: dist/time-attendance-frontend/browser/

# Build self-service frontend
cd ..\time-attendance-selfservice-frontend
npm ci
npx ng build --configuration production
# Output: dist/time-attendance-selfservice-frontend/browser/
```

### Step 7.2 — Deploy Admin Frontend (`clockn.net`)

**Option A — Direct Upload (easiest for first time)**:

1. Go to **Cloudflare Dashboard → Workers & Pages → Create → Pages**
2. Click **Upload assets** (Direct Upload)
3. Project name: `clockn-admin`
4. Upload the contents of `time-attendance-frontend/dist/time-attendance-frontend/browser/`
5. Click **Deploy**

**Option B — Connect Git Repository (for automatic deploys)**:

1. Go to **Workers & Pages → Create → Pages → Connect to Git**
2. Select your repository
3. Configure build settings:
   - **Framework preset**: None
   - **Build command**: `cd time-attendance-frontend && npm ci && npx ng build --configuration production`
   - **Build output directory**: `time-attendance-frontend/dist/time-attendance-frontend/browser`
   - **Root directory**: `/` (repository root)
4. Click **Save and Deploy**

### Step 7.3 — Add Custom Domain for Admin

1. Go to your Pages project (`clockn-admin`) → **Custom domains**
2. Click **Set up a custom domain**
3. Enter `clockn.net`
4. Cloudflare will automatically create the DNS record
5. Also add `www.clockn.net` as a custom domain

### Step 7.4 — Deploy Self-Service Frontend (`portal.clockn.net`)

Same process — create a second Pages project:

**Direct Upload:**

1. Go to **Workers & Pages → Create → Pages**
2. Click **Upload assets**
3. Project name: `clockn-portal`
4. Upload contents of `time-attendance-selfservice-frontend/dist/time-attendance-selfservice-frontend/browser/`
5. Click **Deploy**

**Or Connect Git** with these build settings:
- **Build command**: `cd time-attendance-selfservice-frontend && npm ci && npx ng build --configuration production`
- **Build output directory**: `time-attendance-selfservice-frontend/dist/time-attendance-selfservice-frontend/browser`

### Step 7.5 — Add Custom Domain for Self-Service

1. Go to `clockn-portal` project → **Custom domains**
2. Add `portal.clockn.net`
3. Cloudflare creates the DNS record automatically

### Step 7.6 — Configure SPA Routing (IMPORTANT)

Angular is a single-page app — all routes must serve `index.html`. Cloudflare Pages handles this with a `_redirects` file.

Create this file in each frontend's `src/` folder:

**For admin** (`time-attendance-frontend/src/_redirects`):
```
/*    /index.html   200
```

**For self-service** (`time-attendance-selfservice-frontend/src/_redirects`):
```
/*    /index.html   200
```

Then add it to `angular.json` assets so it gets copied during build. In both `angular.json` files, add `"src/_redirects"` to the assets array:

```json
"assets": [
  "src/favicon.ico",
  "src/assets",
  "src/_redirects"
]
```

Then rebuild and redeploy.

### Step 7.7 — Verify Frontends

After DNS propagation:

- Admin: https://clockn.net — should load the login page
- Self-Service: https://portal.clockn.net — should load the login page
- Check browser console for API calls going to `https://api.clockn.net`

---

## Part 8: Mobile App Configuration

### Step 8.1 — Update API URL in the Flutter App

The mobile app should connect to the same API:

In `ess_mobile_app/lib/core/config/` or wherever the base URL is configured:

```dart
const String baseUrl = 'https://api.clockn.net';
```

### Step 8.2 — Default Tenant

For tenant discovery, the mobile app should use:
- **Tenant URL**: `api.clockn.net`
- Or configure a default tenant that maps to your API endpoint

---

## Part 9: Backups & Monitoring

### Step 9.1 — Database Backup Script

```bash
sudo cat > /opt/timeattendance/backup-database.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/timeattendance/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/db_backup_$TIMESTAMP.sql.gz"
RETENTION_DAYS=7

mkdir -p "$BACKUP_DIR"

sudo -u postgres pg_dump TimeAttendanceSystem | gzip > "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "$(date): Backup OK — $BACKUP_FILE ($(du -h $BACKUP_FILE | cut -f1))"
else
    echo "$(date): ERROR — Backup failed!"
fi

find "$BACKUP_DIR" -name "db_backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete
EOF

sudo chmod +x /opt/timeattendance/backup-database.sh
```

### Step 9.2 — Health Check Script

```bash
sudo cat > /opt/timeattendance/health-check.sh << 'EOF'
#!/bin/bash
LOG="/var/log/timeattendance-health.log"

# Check backend
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5099/swagger/index.html 2>/dev/null)
if [ "$HTTP_CODE" != "200" ]; then
    echo "$(date): ALERT — Backend HTTP $HTTP_CODE, restarting..." >> $LOG
    systemctl restart timeattendance
    sleep 10
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5099/swagger/index.html 2>/dev/null)
    echo "$(date): After restart: HTTP $HTTP_CODE" >> $LOG
else
    echo "$(date): OK — Backend HTTP $HTTP_CODE" >> $LOG
fi

# Check Nginx
if ! systemctl is-active --quiet nginx; then
    echo "$(date): ALERT — Nginx down, restarting..." >> $LOG
    systemctl restart nginx
fi

# Check PostgreSQL
if ! systemctl is-active --quiet postgresql; then
    echo "$(date): ALERT — PostgreSQL down, restarting..." >> $LOG
    systemctl restart postgresql
fi

# Check disk
DISK=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$DISK" -gt 85 ]; then
    echo "$(date): WARNING — Disk at ${DISK}%" >> $LOG
fi
EOF

sudo chmod +x /opt/timeattendance/health-check.sh
```

### Step 9.3 — Schedule Cron Jobs

```bash
sudo crontab -e
```

```cron
# Database backup daily at 2 AM
0 2 * * * /opt/timeattendance/backup-database.sh >> /var/log/timeattendance-backup.log 2>&1

# Health check every 5 minutes
*/5 * * * * /opt/timeattendance/health-check.sh

# Trim health log weekly
0 3 * * 0 tail -500 /var/log/timeattendance-health.log > /var/log/timeattendance-health.log.tmp && mv /var/log/timeattendance-health.log.tmp /var/log/timeattendance-health.log
```

---

## Part 10: Redeployment Process

### Backend Redeployment (from your Windows machine)

```powershell
cd D:\Work\TimeAttendanceSystem

# 1. Build
dotnet publish src/Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj `
  --configuration Release `
  --runtime linux-x64 `
  --self-contained false `
  --output ./publish

# 2. Upload
scp -r ./publish/* deployer@76.13.184.116:/tmp/publish/

# 3. Deploy (SSH into server)
ssh deployer@76.13.184.116
sudo systemctl stop timeattendance
sudo cp -r /tmp/publish/* /opt/timeattendance/publish/
sudo chown -R timeattendance:timeattendance /opt/timeattendance/publish/
sudo systemctl start timeattendance
rm -rf /tmp/publish
sudo systemctl status timeattendance
```

### Frontend Redeployment

**If using Direct Upload:**

1. Build locally (`npx ng build --configuration production`)
2. Go to Cloudflare Pages → your project → **Create new deployment**
3. Upload the new `browser/` folder contents
4. Done — Cloudflare deploys globally in seconds

**If using Git integration:**

Just push to your repository — Cloudflare builds and deploys automatically.

---

## Part 11: Verification Checklist

```bash
# === On the server ===

# 1. Services running?
sudo systemctl status timeattendance
sudo systemctl status nginx
sudo systemctl status postgresql

# 2. API responding?
curl -I http://localhost:5099/swagger/index.html

# 3. API through Cloudflare?
curl -I https://api.clockn.net/swagger/index.html

# 4. Logs clean?
journalctl -u timeattendance -n 20 --no-pager
sudo tail -20 /var/log/nginx/api.clockn.net.error.log

# 5. Resources OK?
df -h
free -h
```

```
# === From your browser ===

# Admin frontend
https://clockn.net                    → Login page loads
https://clockn.net/dashboard          → Redirects to login (SPA routing works)

# Self-service
https://portal.clockn.net             → Login page loads

# API
https://api.clockn.net/swagger        → Swagger UI loads

# WebSocket
Open browser console → Network tab → check SignalR connection
```

---

## Quick Reference Commands

```bash
# View live API logs
journalctl -u timeattendance -f

# Restart API
sudo systemctl restart timeattendance

# Restart Nginx
sudo systemctl restart nginx

# Manual backup
sudo /opt/timeattendance/backup-database.sh

# Restore from backup
gunzip -c /opt/timeattendance/backups/db_backup_XXXXXX.sql.gz | sudo -u postgres psql TimeAttendanceSystem

# Check ports
ss -tlnp | grep -E '5099|5432|80|443'

# Test Nginx config
sudo nginx -t

# PostgreSQL shell
sudo -u postgres psql TimeAttendanceSystem

# Check disk & memory
df -h && free -h
```

---

## Troubleshooting

### API returns 502 Bad Gateway
- Backend is not running: `sudo systemctl status timeattendance`
- Check logs: `journalctl -u timeattendance -n 50`
- Port conflict: `ss -tlnp | grep 5099`

### CORS errors in browser console
- Check that `appsettings.Production.json` includes the exact frontend origins
- Origins must match exactly (no trailing slash): `https://clockn.net` not `https://clockn.net/`

### SignalR not connecting
- Verify Cloudflare WebSockets are ON (Network settings)
- Check Nginx `/hubs/` location block has WebSocket upgrade headers
- Check browser console for specific error

### Frontend shows blank page
- Check browser console for errors
- Verify `_redirects` file is in the deployed output
- Verify `environment.prod.ts` has correct `apiUrl: 'https://api.clockn.net'`

### Database connection error
- Check PostgreSQL is running: `sudo systemctl status postgresql`
- Check password matches in `appsettings.Production.json`
- Test connection: `sudo -u postgres psql -c "SELECT 1"`

---

## Part 12: Harden SSH (Optional — do after everything works)

> Only do this step after the entire system is deployed and you have confirmed
> that `ssh deployer@76.13.184.116` works from your Windows terminal.

This disables root login and password auth, so only SSH key login as `deployer` will work.

```bash
# SSH into the server
ssh deployer@76.13.184.116

# Apply hardening (copy-paste one by one)
sudo sed -i 's/^#*PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sudo sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo sed -i 's/^#*PubkeyAuthentication.*/PubkeyAuthentication yes/' /etc/ssh/sshd_config
sudo sed -i 's/^#*MaxAuthTries.*/MaxAuthTries 3/' /etc/ssh/sshd_config
sudo sed -i 's/^#*ClientAliveInterval.*/ClientAliveInterval 300/' /etc/ssh/sshd_config
sudo sed -i 's/^#*ClientAliveCountMax.*/ClientAliveCountMax 2/' /etc/ssh/sshd_config

# Restart SSH
sudo systemctl restart ssh
```

> **If you get locked out**: Use Hostinger's browser-based **VPS Console** to log in as root,
> then run: `sed -i 's/^PermitRootLogin no/PermitRootLogin yes/' /etc/ssh/sshd_config && sed -i 's/^PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config && systemctl restart ssh`

---

## Security Reminders

1. **Never expose port 5432** (PostgreSQL) to the internet
2. **Never expose port 5099** directly — always through Nginx
3. **Change default passwords** (database, JWT secret) before going live
4. **Restrict Swagger** in production (IP whitelist or disable)
5. **Enable Cloudflare "Under Attack" mode** if experiencing DDoS
6. **Keep server updated**: `sudo apt update && sudo apt upgrade -y`
7. **Monitor backups**: Check that daily backups are being created
8. **Harden SSH** (Part 12) after deployment is working
