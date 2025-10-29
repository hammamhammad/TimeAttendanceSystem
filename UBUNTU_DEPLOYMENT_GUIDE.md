# Ubuntu Server Deployment Guide - Time Attendance System

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Server Preparation](#server-preparation)
3. [Install Required Software](#install-required-software)
4. [Database Setup (PostgreSQL)](#database-setup-postgresql)
5. [Backend Deployment (.NET 9)](#backend-deployment-net-9)
6. [Frontend Deployment (Angular)](#frontend-deployment-angular)
7. [Nginx Configuration](#nginx-configuration)
8. [SSL/TLS Setup (Let's Encrypt)](#ssltls-setup-lets-encrypt)
9. [Systemd Service Configuration](#systemd-service-configuration)
10. [Security Hardening](#security-hardening)
11. [Performance Optimization](#performance-optimization)
12. [Monitoring & Logging](#monitoring--logging)
13. [Backup Strategy](#backup-strategy)
14. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Information
- Ubuntu Server 22.04 LTS or later
- SSH access with sudo privileges
- Domain name (e.g., `yourdomain.com`)
- DNS A records pointing to your server IP
- Minimum 2GB RAM, 2 CPU cores, 20GB storage
- Open ports: 22 (SSH), 80 (HTTP), 443 (HTTPS)

### Local Machine Requirements
- Git installed
- SSH key configured

---

## Server Preparation

### 1. Initial Server Update

```bash
# SSH into your server
ssh timeattendance@20.196.112.66

# Update system packages
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl wget git vim ufw net-tools htop
```

### 2. Create Application User

```bash
# Create dedicated user for the application
sudo adduser --system --group --home /opt/timeattendance timeattendance

# Add your user to the timeattendance group (optional)
sudo usermod -aG timeattendance $USER
```

### 3. Configure Firewall

```bash
# Enable UFW firewall
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Check status
sudo ufw status
```

---

## Install Required Software

### 1. Install .NET 9 Runtime & SDK

```bash
# Download and run the dotnet-install script
curl -sSL https://dot.net/v1/dotnet-install.sh | bash /dev/stdin --channel 9.0

# Add .NET to your PATH
echo 'export DOTNET_ROOT=$HOME/.dotnet' >> ~/.bashrc
echo 'export PATH=$PATH:$HOME/.dotnet' >> ~/.bashrc
source ~/.bashrc

# Verify installation
dotnet --version
Option 2: Manual download and installation
# Download .NET 9 SDK manually
cd /tmp
wget https://download.visualstudio.microsoft.com/download/pr/your-architecture/dotnet-sdk-9.0.xxx-linux-x64.tar.gz

# Extract to /opt/dotnet
sudo mkdir -p /opt/dotnet
sudo tar -xzf dotnet-sdk-9.0.xxx-linux-x64.tar.gz -C /opt/dotnet

# Create symbolic link
sudo ln -s /opt/dotnet/dotnet /usr/local/bin/dotnet

# Verify
dotnet --version
# Should output: 9.0.x
```

### 2. Install Node.js 20.x (for Angular build)

```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should output v20.x.x
npm --version   # Should output 10.x.x

# Create a directory for global npm packages
mkdir -p ~/.npm-global

# Configure npm to use the new directory
npm config set prefix '~/.npm-global'

# Add the npm bin directory to your PATH
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Now install Angular CLI without sudo
npm install -g @angular/cli@20
```

### 3. Install Docker and Docker Compose

```bash
# Update package list
sudo apt update

# Install prerequisites
sudo apt install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package list again
sudo apt update

# Install Docker
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Verify Docker installation
docker --version
docker compose version

# Add your user to docker group (optional, to run docker without sudo)
sudo usermod -aG docker $USER

# Apply group changes (or log out and back in)
newgrp docker
```

### 4. Setup PostgreSQL 18 with Docker

```bash
# Create directory for PostgreSQL configuration
sudo mkdir -p /opt/timeattendance/postgres

# Create custom PostgreSQL configuration file
sudo tee /opt/timeattendance/postgres/postgresql.conf > /dev/null << 'EOF'
# Memory Configuration
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
work_mem = 10MB

# Checkpoint Configuration
checkpoint_completion_target = 0.9
wal_buffers = 16MB
max_wal_size = 2GB
min_wal_size = 1GB

# Query Planning
random_page_cost = 1.1
effective_io_concurrency = 200
default_statistics_target = 100

# Connection Settings
max_connections = 100
listen_addresses = '*'

# Logging
logging_collector = on
log_directory = 'log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_rotation_age = 1d
log_rotation_size = 100MB
log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h '
log_checkpoints = on
log_connections = on
log_disconnections = on
log_lock_waits = on
log_statement = 'ddl'
EOF

# Create docker-compose.yml for PostgreSQL
sudo tee /opt/timeattendance/docker-compose.yml > /dev/null << 'EOF'
services:
  postgres:
    image: postgres:18
    container_name: timeattendance-postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: P@ssw0rd@3213
      POSTGRES_DB: TimeAttendanceSystem
      POSTGRES_INITDB_ARGS: "-E UTF8"
    volumes:
      - postgres-data:/var/lib/postgresql
      - ./postgres/postgresql.conf:/etc/postgresql/postgresql.conf
    ports:
      - "5432:5432"
    command: postgres -c config_file=/etc/postgresql/postgresql.conf
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres-data:
    driver: local
EOF

# IMPORTANT: Replace YOUR_STRONG_PASSWORD_HERE with a strong password
# Edit the docker-compose.yml file:
sudo vim /opt/timeattendance/docker-compose.yml

# Start PostgreSQL container
cd /opt/timeattendance
sudo docker compose up -d

# Verify container is running
sudo docker ps

# View logs
sudo docker compose logs -f postgres
```

### 5. Install Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verify installation
nginx -v
sudo systemctl status nginx
```

---

## Database Setup (PostgreSQL with Docker)

### 1. Verify PostgreSQL Container is Running

```bash
# Check container status
sudo docker ps | grep timeattendance-postgres

# Check container health
sudo docker inspect timeattendance-postgres | grep -A 5 Health

# View container logs
sudo docker logs timeattendance-postgres
```

### 2. Connect to PostgreSQL and Verify Setup

```bash
# Connect to PostgreSQL using docker exec
sudo docker exec -it timeattendance-postgres psql -U postgres -d TimeAttendanceSystem

# Inside PostgreSQL prompt, verify database
\l
\q

# Or test connection from host (using docker exec)
sudo docker exec timeattendance-postgres psql -U postgres -d TimeAttendanceSystem -c "SELECT version();"
```

### 3. Useful PostgreSQL Docker Commands

```bash
# Stop PostgreSQL container
sudo docker stop timeattendance-postgres

# Start PostgreSQL container
sudo docker start timeattendance-postgres

# Restart PostgreSQL container
sudo docker restart timeattendance-postgres

# View real-time logs
sudo docker logs -f timeattendance-postgres

# Execute SQL commands
sudo docker exec timeattendance-postgres psql -U postgres -d TimeAttendanceSystem -c "SELECT current_database();"

# Access PostgreSQL shell
sudo docker exec -it timeattendance-postgres psql -U postgres -d TimeAttendanceSystem
```

---

## Backend Deployment (.NET 9)

### 1. Clone Repository

```bash
# Create application directory
sudo mkdir -p /opt/timeattendance
sudo chown timeattendance:timeattendance /opt/timeattendance

# Switch to application user
sudo su - timeattendance

# Clone your repository (or upload files via SCP)
cd /opt/timeattendance
git clone https://github.com/hammamhammad/TimeAttendanceSystem.git app
# OR upload via SCP from your local machine:
# scp -r /path/to/TimeAttendanceSystem username@server:/tmp/
# sudo mv /tmp/TimeAttendanceSystem /opt/timeattendance/app
# sudo chown -R timeattendance:timeattendance /opt/timeattendance/app

cd app
```

### 2. Configure Backend Settings

```bash
# Create production appsettings with correct configuration
cd /opt/timeattendance/app/src/Api/TimeAttendanceSystem.Api

# Create appsettings.Production.json
cat > appsettings.Production.json << 'EOF'
{
  "DatabaseProvider": "PostgreSql",
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=false",
    "PostgreSqlConnection": "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=false"
  },
  "Jwt": {
    "Secret": "ThIZHwA6QsYSUfaUzXeoc6EaEx1lmBTlTbgZDmVgI3uZR7p2jBWl35FLO1G4q/Yjo8pGHRsQ5KIgJxbGyeJuqQ==",
    "Issuer": "TimeAttendanceSystem",
    "Audience": "TimeAttendanceSystem-Client",
    "ExpiryMinutes": 15,
    "RememberMeDays": 7
  },
  "Cors": {
    "PolicyName": "ProductionCorsPolicy",
    "AllowedOrigins": [
      "http://20.196.112.66",
      "http://20.196.112.66:4200",
      "http://localhost:4200"
    ],
    "AllowedMethods": ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    "AllowedHeaders": ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
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
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Warning",
      "TimeAttendanceSystem.Infrastructure.Services.AttendanceSchedulingService": "Information"
    },
    "EnableSensitiveDataLogging": false,
    "EnableDetailedErrors": false
  },
  "AllowedHosts": "*"
}
EOF

# Verify the file was created
cat appsettings.Production.json
```

**Note:** The configuration includes:
- **Database**: PostgreSQL 18 (Docker) with `postgres` user and password `P@ssw0rd@3213`
- **Database Name**: `TimeAttendanceSystem` (matches development environment)
- **JWT Secret**: Pre-generated secure 256-bit key (can regenerate with `openssl rand -base64 64`)
- **CORS**: Configured for server IP `20.196.112.66` (update if using domain name)
- **Important**: The `DatabaseProvider` field is required for the application to use PostgreSQL

### 3. Build Backend

```bash
cd /opt/timeattendance/app/src/Api/TimeAttendanceSystem.Api

# Restore dependencies
dotnet restore

# Build in Release mode
dotnet build --configuration Release

# Publish the application
dotnet publish --configuration Release --output /opt/timeattendance/publish
```

### 4. Install EF Core Tools

```bash
# Install Entity Framework Core tools globally
dotnet tool install --global dotnet-ef

# Add .NET tools to PATH
echo 'export PATH="$PATH:$HOME/.dotnet/tools"' >> ~/.bashrc
source ~/.bashrc

# Verify installation
dotnet ef --version
```

### 5. Apply Database Migrations

```bash
cd /opt/timeattendance/app/src/Infrastructure/TimeAttendanceSystem.Infrastructure

# Apply migrations
ASPNETCORE_ENVIRONMENT=Production dotnet ef database update \
  --startup-project ../../Api/TimeAttendanceSystem.Api \
  --context TimeAttendanceDbContext --verbose
```

### 6. Test Backend

```bash
# Test the application
cd /opt/timeattendance/publish
ASPNETCORE_ENVIRONMENT=Production dotnet TimeAttendanceSystem.Api.dll

# Should start without errors
# Press Ctrl+C to stop
```

---

## Frontend Deployment (Angular)

### 1. Configure Frontend Environment

```bash
cd /opt/timeattendance/app/time-attendance-frontend

# Edit production environment
vim src/environments/environment.prod.ts
```

```typescript
export const environment = {
  production: true,
  apiUrl: 'http://20.196.112.66'  // No trailing /api - services append /api/v1/...
};
```

**Important:** The `apiUrl` should NOT include `/api` because the Angular services already append `/api/v1/...` to the URLs. If you include `/api` here, you'll get double `/api/api/v1/...` in the requests.

### 2. Build Frontend

```bash
cd /opt/timeattendance/app/time-attendance-frontend

# Install dependencies
npm ci --production=false

# Build for production
npm run build

# The output will be in dist/time-attendance-frontend/browser/
```

### 3. Deploy Frontend Files

```bash
# Create web root directory
sudo mkdir -p /var/www/timeattendance

# Copy built files
sudo cp -r /opt/timeattendance/app/time-attendance-frontend/dist/time-attendance-frontend/browser/* /var/www/timeattendance/

# Set correct permissions
sudo chown -R www-data:www-data /var/www/timeattendance
sudo chmod -R 755 /var/www/timeattendance
```

---

## Nginx Configuration

### 1. Create Nginx Configuration

```bash
sudo vim /etc/nginx/sites-available/timeattendance
```

```nginx
# Upstream for .NET backend
upstream backend {
    server localhost:5099;
    keepalive 32;
}

# HTTP - Redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name 20.196.112.66;

    # Allow Let's Encrypt challenges
    location /.well-known/acme-challenge/ {
        root /var/www/letsencrypt;
    }

    # Redirect all other traffic to HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS - Main Configuration
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name 20.196.112.66;

    # SSL Certificates (will be configured after Let's Encrypt setup)
    ssl_certificate /etc/letsencrypt/live/20.196.112.66/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/20.196.112.66/privkey.pem;

    # SSL Configuration (Strong Security)
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://20.196.112.66;" always;

    # Logging
    access_log /var/log/nginx/timeattendance_access.log;
    error_log /var/log/nginx/timeattendance_error.log warn;

    # Client body size limit
    client_max_body_size 10M;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;

    # API Backend Proxy
    location /api/ {
        proxy_pass http://backend/api/;
        proxy_http_version 1.1;

        # Proxy Headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # Buffering
        proxy_buffering off;
        proxy_request_buffering off;

        # Cache bypass
        proxy_cache_bypass $http_upgrade;
    }

    # Swagger/OpenAPI Documentation
    location /swagger/ {
        proxy_pass http://backend/swagger/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Angular Frontend
    location / {
        root /var/www/timeattendance;
        index index.html;
        try_files $uri $uri/ /index.html;

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Don't cache index.html
        location = /index.html {
            expires -1;
            add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
        }
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

### 2. Enable Site & Test Configuration

```bash
# Create letsencrypt directory for SSL challenges
sudo mkdir -p /var/www/letsencrypt

# Enable the site
sudo ln -s /etc/nginx/sites-available/timeattendance /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# If test passes, reload Nginx (don't restart yet - SSL certificates not installed)
# sudo systemctl reload nginx
```

---

## SSL/TLS Setup

You have two options for SSL certificates: **Let's Encrypt (Free)** or **Custom Certificates** (e.g., Cloudflare Origin Certificates).

---

### Option 1: Let's Encrypt (Free, Automated)

**Requirements:**
- A registered domain name
- Domain DNS pointing to your server IP

#### 1. Install Certbot

```bash
# Install Certbot and Nginx plugin
sudo apt install -y certbot python3-certbot-nginx
```

#### 2. Obtain SSL Certificate

**First, temporarily modify Nginx config to work without SSL:**

```bash
sudo vim /etc/nginx/sites-available/timeattendance
```

Comment out the HTTPS server block (lines starting with `listen 443`) and keep only the HTTP redirect server block. Then:

```bash
# Reload Nginx
sudo systemctl reload nginx

# Obtain certificate (replace with your domain)
sudo certbot certonly --webroot \
  -w /var/www/letsencrypt \
  -d yourdomain.com \
  -d www.yourdomain.com \
  --email your-email@example.com \
  --agree-tos \
  --no-eff-email

# Uncomment the HTTPS server block in Nginx config
sudo vim /etc/nginx/sites-available/timeattendance

# Update SSL certificate paths in Nginx config:
# ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
# ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

# Test Nginx configuration
sudo nginx -t

# Reload Nginx with SSL enabled
sudo systemctl reload nginx
```

#### 3. Auto-Renewal Setup

```bash
# Test auto-renewal
sudo certbot renew --dry-run

# Certbot installs a cron job/systemd timer automatically
# Verify it's enabled
sudo systemctl status certbot.timer
```

---

### Option 2: Custom SSL Certificates (Cloudflare, Commercial CA, etc.)

**Use this if you:**
- Have Cloudflare Origin Certificates
- Purchased SSL certificates from a commercial CA
- Have self-signed certificates

#### 1. Prepare Your Certificate Files

You should have these files:
- **Certificate file** (e.g., `yourdomain.pem` or `yourdomain.crt`)
- **Private key file** (e.g., `yourdomain.key`)
- **CA Bundle/Chain** (e.g., `ca-bundle.pem` or `ca.crt`) - optional but recommended

**For Cloudflare Origin Certificates:**
- From Cloudflare dashboard → SSL/TLS → Origin Server → Create Certificate
- Save the **Certificate** to `yourdomain.pem`
- Save the **Private Key** to `yourdomain.key`
- Download Cloudflare CA: `https://developers.cloudflare.com/ssl/static/origin_ca_rsa_root.pem`

#### 2. Upload Certificates to Server

**From your local Windows machine:**

```powershell
# Using PowerShell (if OpenSSH installed)
cd C:\path\to\certificates

scp yourdomain.pem timeattendance@YOUR_SERVER_IP:/tmp/
scp yourdomain.key timeattendance@YOUR_SERVER_IP:/tmp/
scp ca-bundle.pem timeattendance@YOUR_SERVER_IP:/tmp/
```

**OR use WinSCP/FileZilla:**
- Upload all certificate files to `/tmp/` directory on the server

#### 3. Configure Certificates on Server

```bash
# SSH into server
ssh timeattendance@YOUR_SERVER_IP

# For Cloudflare, download the CA certificate
sudo wget https://developers.cloudflare.com/ssl/static/origin_ca_rsa_root.pem -O /tmp/cloudflare-ca.pem

# Create SSL directory
sudo mkdir -p /etc/nginx/ssl

# Move and rename certificate files
sudo mv /tmp/yourdomain.pem /etc/nginx/ssl/yourdomain.crt
sudo mv /tmp/yourdomain.key /etc/nginx/ssl/yourdomain.key
sudo mv /tmp/cloudflare-ca.pem /etc/nginx/ssl/yourdomain.ca

# Set proper permissions (CRITICAL!)
sudo chmod 644 /etc/nginx/ssl/yourdomain.crt
sudo chmod 600 /etc/nginx/ssl/yourdomain.key  # Private key must be restricted!
sudo chmod 644 /etc/nginx/ssl/yourdomain.ca

# Verify files exist
ls -la /etc/nginx/ssl/

# Test that certificate and key match
echo "Certificate modulus:"
sudo openssl x509 -noout -modulus -in /etc/nginx/ssl/yourdomain.crt | openssl md5
echo "Private key modulus:"
sudo openssl rsa -noout -modulus -in /etc/nginx/ssl/yourdomain.key | openssl md5
echo "These two hashes should match!"
```

#### 4. Update Nginx Configuration for Custom Certificates

```bash
sudo tee /etc/nginx/sites-available/timeattendance > /dev/null << 'EOF'
upstream backend {
    server 127.0.0.1:5099;
    keepalive 32;
}

# HTTP - Redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    return 301 https://$host$request_uri;
}

# HTTPS - Main Configuration
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Certificates
    ssl_certificate /etc/nginx/ssl/yourdomain.crt;
    ssl_certificate_key /etc/nginx/ssl/yourdomain.key;

    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_session_tickets off;

    # Security Headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Logging
    access_log /var/log/nginx/yourdomain_access.log;
    error_log /var/log/nginx/yourdomain_error.log warn;

    # Client body size limit
    client_max_body_size 10M;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;

    # API Backend Proxy
    location /api/ {
        proxy_pass http://backend/api/;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        proxy_buffering off;
        proxy_request_buffering off;
        proxy_cache_bypass $http_upgrade;
    }

    # Angular Frontend
    location / {
        root /var/www/timeattendance;
        index index.html;
        try_files $uri $uri/ /index.html;

        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        location = /index.html {
            add_header Cache-Control "no-cache, no-store, must-revalidate";
        }
    }

    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
EOF

# Replace 'yourdomain.com' with your actual domain
sudo sed -i 's/yourdomain.com/YOUR_ACTUAL_DOMAIN/g' /etc/nginx/sites-available/timeattendance

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

#### 5. Update Backend CORS Configuration

```bash
sudo nano /opt/timeattendance/publish/appsettings.Production.json
```

Update the CORS section to include your domain:

```json
"Cors": {
  "PolicyName": "ProductionCorsPolicy",
  "AllowedOrigins": [
    "https://yourdomain.com",
    "https://www.yourdomain.com",
    "http://localhost:4200"
  ]
}
```

Save and restart backend:

```bash
sudo systemctl restart timeattendance
```

#### 6. Update Frontend Environment Files

**IMPORTANT:** Update BOTH environment files with your domain:

```bash
cd /opt/timeattendance/app/time-attendance-frontend

# Update production environment
cat > src/environments/environment.prod.ts << 'EOF'
export const environment = {
  production: true,
  apiUrl: 'https://yourdomain.com'
};
EOF

# Update development environment
cat > src/environments/environment.ts << 'EOF'
export const environment = {
  production: false,
  apiUrl: 'https://yourdomain.com'
};
EOF

# Replace with your actual domain
sed -i 's/yourdomain.com/YOUR_ACTUAL_DOMAIN/g' src/environments/environment.prod.ts
sed -i 's/yourdomain.com/YOUR_ACTUAL_DOMAIN/g' src/environments/environment.ts

# Verify both files
cat src/environments/environment.prod.ts
cat src/environments/environment.ts
```

#### 7. Rebuild and Redeploy Frontend

```bash
# Clean previous builds
rm -rf dist/ .angular/ node_modules/.cache/

# Rebuild with production configuration
npm run build -- --configuration production

# Verify the build contains your domain
grep -r "YOUR_ACTUAL_DOMAIN" dist/ | head -n 5

# Deploy
sudo rm -rf /var/www/timeattendance/*
sudo cp -r dist/time-attendance-frontend/browser/* /var/www/timeattendance/
sudo chown -R www-data:www-data /var/www/timeattendance

echo "Deployment complete!"
```

#### 8. Test SSL Configuration

```bash
# Test HTTPS redirect
curl -I http://yourdomain.com

# Test HTTPS access
curl -I https://yourdomain.com

# Test API endpoint
curl https://yourdomain.com/api/v1/branches

# Test SSL certificate
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com < /dev/null
```

**Then test in browser:**
1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Visit: `https://yourdomain.com`
3. Verify the padlock icon shows secure connection
4. Login with: `admin` / `Admin@123`

---

### Common SSL Issues

**"Mixed Content" Errors:**
- Problem: Frontend making HTTP requests from HTTPS page
- Solution: Ensure both `environment.prod.ts` AND `environment.ts` use `https://` URLs
- Rebuild frontend after fixing

**"Certificate verify failed":**
- Problem: Incomplete certificate chain
- Solution: Ensure you have the CA bundle/chain file configured

**"ssl_stapling" warnings:**
- For Cloudflare Origin Certificates, this is normal
- Remove `ssl_stapling` lines from Nginx config to silence warnings

---

## Systemd Service Configuration

### 1. Create Systemd Service for Backend

```bash
sudo vim /etc/systemd/system/timeattendance.service
```

```ini
[Unit]
Description=Time Attendance System ASP.NET Core Application
After=network.target docker.service
Requires=docker.service

[Service]
Type=exec
WorkingDirectory=/opt/timeattendance/publish
ExecStart=/home/timeattendance/.dotnet/dotnet /opt/timeattendance/publish/TimeAttendanceSystem.Api.dll
Restart=always
RestartSec=10
TimeoutStartSec=120
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false

User=timeattendance
Group=timeattendance

# Security hardening
NoNewPrivileges=true
PrivateTmp=true

# Logging
StandardOutput=journal
StandardError=journal
SyslogIdentifier=timeattendance

[Install]
WantedBy=multi-user.target
```

**Important Notes:**
- **Type=exec**: Changed from `notify` because .NET Core apps don't send systemd notifications by default
- **TimeoutStartSec=120**: Allows 2 minutes for startup (database seeding can be slow)
- **ExecStart path**: Uses `/home/timeattendance/.dotnet/dotnet` (user-installed dotnet) instead of `/usr/bin/dotnet`
- Removed `ProtectSystem=strict` and `ProtectHome=true` to avoid file access issues

### 2. Enable and Start Service

```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable service to start on boot
sudo systemctl enable timeattendance.service

# Start the service
sudo systemctl start timeattendance.service

# Check status
sudo systemctl status timeattendance.service

# View logs
sudo journalctl -u timeattendance.service -f
```

---

## Security Hardening

### 1. Configure SSH Security

```bash
sudo vim /etc/ssh/sshd_config
```

Update these settings:
```
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
PermitEmptyPasswords no
MaxAuthTries 3
MaxSessions 2
```

```bash
# Restart SSH
sudo systemctl restart sshd
```

### 2. Install and Configure Fail2Ban

```bash
# Install fail2ban
sudo apt install -y fail2ban

# Create local configuration
sudo vim /etc/fail2ban/jail.local
```

```ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5
destemail = your-email@example.com
sendername = Fail2Ban
action = %(action_mwl)s

[sshd]
enabled = true
port = 22
logpath = /var/log/auth.log

[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/log/nginx/timeattendance_error.log

[nginx-limit-req]
enabled = true
port = http,https
logpath = /var/log/nginx/timeattendance_error.log
```

```bash
# Start and enable fail2ban
sudo systemctl start fail2ban
sudo systemctl enable fail2ban

# Check status
sudo fail2ban-client status
```

### 3. Enable Automatic Security Updates

```bash
# Install unattended-upgrades
sudo apt install -y unattended-upgrades

# Enable automatic updates
sudo dpkg-reconfigure -plow unattended-upgrades

# Configure updates
sudo vim /etc/apt/apt.conf.d/50unattended-upgrades
```

### 4. Install and Configure ModSecurity (Optional)

```bash
# Install ModSecurity for Nginx
sudo apt install -y libnginx-mod-security

# Follow additional ModSecurity configuration guides for advanced setup
```

---

## Performance Optimization

### 1. PostgreSQL Performance Tuning

```bash
sudo vim /etc/postgresql/16/main/postgresql.conf
```

Adjust based on your server resources (example for 4GB RAM server):

```
# Memory Configuration
shared_buffers = 1GB                    # 25% of RAM
effective_cache_size = 3GB              # 75% of RAM
maintenance_work_mem = 256MB
work_mem = 10MB

# Checkpoint Configuration
checkpoint_completion_target = 0.9
wal_buffers = 16MB
max_wal_size = 2GB
min_wal_size = 1GB

# Query Planning
random_page_cost = 1.1                  # For SSD storage
effective_io_concurrency = 200          # For SSD storage
default_statistics_target = 100

# Connection Settings
max_connections = 100

# Logging (for monitoring)
logging_collector = on
log_directory = 'log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_rotation_age = 1d
log_rotation_size = 100MB
log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h '
log_checkpoints = on
log_connections = on
log_disconnections = on
log_duration = off
log_lock_waits = on
log_statement = 'ddl'
log_temp_files = 0
```

```bash
# Restart PostgreSQL
sudo systemctl restart postgresql
```

### 2. .NET Application Performance

The application is already configured with:
- Compiled in Release mode
- Response compression enabled
- Memory caching configured
- Connection pooling via Entity Framework Core

### 3. Nginx Performance Tuning

```bash
sudo vim /etc/nginx/nginx.conf
```

```nginx
user www-data;
worker_processes auto;
worker_rlimit_nofile 65535;
pid /run/nginx.pid;

events {
    worker_connections 4096;
    use epoll;
    multi_accept on;
}

http {
    # Basic Settings
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    keepalive_requests 100;
    types_hash_max_size 2048;
    server_tokens off;

    # Buffer Size
    client_body_buffer_size 128k;
    client_max_body_size 10m;
    client_header_buffer_size 1k;
    large_client_header_buffers 4 16k;
    output_buffers 1 32k;
    postpone_output 1460;

    # Timeouts
    client_body_timeout 12;
    client_header_timeout 12;
    send_timeout 10;

    # Gzip Settings
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 1000;
    gzip_disable "msie6";
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;

    # File Cache
    open_file_cache max=5000 inactive=20s;
    open_file_cache_valid 30s;
    open_file_cache_min_uses 2;
    open_file_cache_errors on;

    # Include configs
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # Virtual Host Configs
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

```bash
# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

### 4. System-Level Optimization

```bash
# Edit sysctl.conf
sudo vim /etc/sysctl.conf
```

Add these lines:
```
# Network Performance
net.core.somaxconn = 65535
net.ipv4.tcp_max_syn_backlog = 8192
net.ipv4.tcp_tw_reuse = 1
net.ipv4.ip_local_port_range = 1024 65535
net.ipv4.tcp_fin_timeout = 15

# File Descriptors
fs.file-max = 65535

# Memory
vm.swappiness = 10
```

```bash
# Apply changes
sudo sysctl -p
```

---

## Monitoring & Logging

### 1. Install Monitoring Tools

```bash
# Install monitoring tools
sudo apt install -y htop iotop nethogs

# For advanced monitoring, consider:
# - Prometheus + Grafana
# - Elastic Stack (ELK)
# - Netdata (lightweight)
```

### 2. Setup Log Rotation

```bash
# Backend logs are handled by systemd journal
# Configure journal retention
sudo vim /etc/systemd/journald.conf
```

```ini
[Journal]
SystemMaxUse=500M
SystemMaxFileSize=100M
MaxRetentionSec=2week
```

```bash
sudo systemctl restart systemd-journald
```

### 3. PostgreSQL Log Management

```bash
# Logs are in /var/log/postgresql/
# They rotate automatically based on configuration

# View recent logs
sudo tail -f /var/log/postgresql/postgresql-16-main.log
```

### 4. Nginx Log Management

```bash
# Create logrotate config for Nginx (usually already exists)
sudo vim /etc/logrotate.d/nginx
```

```
/var/log/nginx/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data adm
    sharedscripts
    prerotate
        if [ -d /etc/logrotate.d/httpd-prerotate ]; then \
            run-parts /etc/logrotate.d/httpd-prerotate; \
        fi
    endscript
    postrotate
        invoke-rc.d nginx rotate >/dev/null 2>&1
    endscript
}
```

### 5. Application Health Check Script

```bash
sudo vim /opt/timeattendance/health-check.sh
```

```bash
#!/bin/bash

# Health check script
API_URL="http://localhost:5099/api/health"  # Add a health endpoint to your API
EXPECTED_STATUS=200

status_code=$(curl -s -o /dev/null -w "%{http_code}" $API_URL)

if [ "$status_code" -eq "$EXPECTED_STATUS" ]; then
    echo "$(date): API is healthy (Status: $status_code)"
    exit 0
else
    echo "$(date): API is unhealthy (Status: $status_code)"
    # Optionally restart the service
    # sudo systemctl restart timeattendance.service
    exit 1
fi
```

```bash
# Make executable
sudo chmod +x /opt/timeattendance/health-check.sh

# Add to crontab for periodic checks
sudo crontab -e
```

Add this line:
```
*/5 * * * * /opt/timeattendance/health-check.sh >> /var/log/timeattendance-health.log 2>&1
```

---

## Backup Strategy

### 1. Database Backup Script (Docker PostgreSQL)

```bash
sudo vim /opt/timeattendance/backup-database.sh
```

```bash
#!/bin/bash

# Configuration
CONTAINER_NAME="timeattendance-postgres"
DB_NAME="TimeAttendanceSystem"
DB_USER="postgres"
BACKUP_DIR="/opt/timeattendance/backups"
DATE=$(date +"%Y%m%d_%H%M%S")
RETENTION_DAYS=7

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup database using docker exec
docker exec "$CONTAINER_NAME" pg_dump -U "$DB_USER" -d "$DB_NAME" | gzip > "$BACKUP_DIR/db_backup_$DATE.sql.gz"

# Check if backup was successful
if [ $? -eq 0 ]; then
    echo "$(date): Database backup completed: db_backup_$DATE.sql.gz"
else
    echo "$(date): Database backup FAILED!" >&2
    exit 1
fi

# Remove old backups
find "$BACKUP_DIR" -name "db_backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete

echo "$(date): Old backups cleaned up (retention: $RETENTION_DAYS days)"
```

```bash
# Make executable
sudo chmod +x /opt/timeattendance/backup-database.sh

# Test the backup script
sudo /opt/timeattendance/backup-database.sh

# Add to crontab for daily backups at 2 AM
sudo crontab -e
```

Add this line:
```
0 2 * * * /opt/timeattendance/backup-database.sh >> /var/log/timeattendance-backup.log 2>&1
```

### 2. Application Files Backup

```bash
# Backup application files weekly
sudo vim /opt/timeattendance/backup-files.sh
```

```bash
#!/bin/bash

BACKUP_DIR="/opt/timeattendance/backups"
DATE=$(date +"%Y%m%d_%H%M%S")
APP_DIR="/opt/timeattendance/app"
RETENTION_DAYS=30

mkdir -p "$BACKUP_DIR"

# Backup application files
tar -czf "$BACKUP_DIR/app_backup_$DATE.tar.gz" -C /opt/timeattendance app publish

# Remove old backups
find "$BACKUP_DIR" -name "app_backup_*.tar.gz" -mtime +$RETENTION_DAYS -delete

echo "$(date): Application backup completed: app_backup_$DATE.tar.gz"
```

```bash
# Make executable
sudo chmod +x /opt/timeattendance/backup-files.sh

# Add to crontab for weekly backups on Sunday at 3 AM
sudo crontab -e
```

Add this line:
```
0 3 * * 0 /opt/timeattendance/backup-files.sh >> /var/log/timeattendance-backup.log 2>&1
```

### 3. Restore Database from Backup (Docker PostgreSQL)

```bash
# To restore a database backup:
gunzip -c /opt/timeattendance/backups/db_backup_YYYYMMDD_HHMMSS.sql.gz | \
  sudo docker exec -i timeattendance-postgres psql -U postgres -d TimeAttendanceSystem

# Or restore from uncompressed SQL file:
sudo docker exec -i timeattendance-postgres psql -U postgres -d TimeAttendanceSystem < /path/to/backup.sql
```

---

## Troubleshooting

### Quick Diagnostic Commands

Run these commands to quickly check the system status:

```bash
# Check all services
sudo systemctl status timeattendance nginx
sudo docker ps | grep postgres

# Check if services are listening on correct ports
sudo netstat -tlnp | grep -E '5099|5432|80|443'

# Test backend directly
curl -v http://localhost:5099/api/v1/branches

# Test through Nginx
curl -v http://localhost/api/v1/branches

# View recent logs
sudo journalctl -u timeattendance -n 50 --no-pager
sudo tail -n 50 /var/log/nginx/error.log

# Check frontend configuration
grep -r "apiUrl" /var/www/timeattendance/*.js | head -n 1
```

### Common Issues

#### 1. Service Won't Start / Timeout Issues

**Problem:** Service shows "activating (start)" for a long time, then fails with "start operation timed out"

**Solution:**
```bash
# Check service status and logs
sudo systemctl status timeattendance.service
sudo journalctl -u timeattendance.service -n 100 --no-pager

# Common causes:
# 1. Service type is 'notify' but app doesn't send notification - Change to Type=exec
# 2. Startup timeout too short - Add TimeoutStartSec=120
# 3. Wrong dotnet path - Use /home/timeattendance/.dotnet/dotnet

# Fix the service file:
sudo nano /etc/systemd/system/timeattendance.service
# Ensure it has:
# Type=exec
# TimeoutStartSec=120
# ExecStart=/home/timeattendance/.dotnet/dotnet /opt/timeattendance/publish/TimeAttendanceSystem.Api.dll

# Reload and restart
sudo systemctl daemon-reload
sudo systemctl restart timeattendance.service

# Monitor startup
sudo journalctl -u timeattendance.service -f
```

**Other checks:**
```bash
# Check if port is already in use
sudo netstat -tlnp | grep :5099

# Check file permissions
ls -la /opt/timeattendance/publish

# Test backend manually
cd /opt/timeattendance/publish
/home/timeattendance/.dotnet/dotnet TimeAttendanceSystem.Api.dll
```

#### 2. Database Connection Issues (Docker PostgreSQL)

```bash
# Check if PostgreSQL container is running
sudo docker ps | grep timeattendance-postgres

# Check PostgreSQL container logs
sudo docker logs timeattendance-postgres
sudo docker logs -f timeattendance-postgres  # Follow logs

# Test PostgreSQL connection
sudo docker exec -it timeattendance-postgres psql -U postgres -d TimeAttendanceSystem

# Check container health
sudo docker inspect timeattendance-postgres | grep -A 10 Health

# Restart PostgreSQL container
sudo docker restart timeattendance-postgres

# Verify connection string in appsettings.Production.json
# Should be: Host=localhost;Port=5432;Database=timeattendancesystem;Username=timeattendance;Password=...

# Check if port 5432 is accessible
sudo netstat -tlnp | grep 5432
```

#### 3. Nginx 502 Bad Gateway

**Problem:** Frontend can't reach backend API, all API calls return 502

**Common Causes:**
1. Backend service not running
2. Backend listening on wrong port
3. Nginx proxy configuration incorrect

**Solution:**
```bash
# 1. Check if backend service is running
sudo systemctl status timeattendance.service

# 2. Check if backend is listening on port 5099
sudo netstat -tlnp | grep 5099
# OR
sudo ss -tlnp | grep 5099

# 3. Test backend directly (bypass Nginx)
curl -v http://localhost:5099/api/v1/branches

# 4. Check Nginx error logs
sudo tail -n 50 /var/log/nginx/error.log

# 5. Verify Nginx configuration
sudo nginx -t
cat /etc/nginx/sites-available/timeattendance | grep -A 10 "location /api/"

# 6. Ensure Nginx proxy_pass includes /api/ prefix
# CORRECT:   proxy_pass http://backend/api/;
# INCORRECT: proxy_pass http://backend/;

# 7. Reload Nginx after configuration changes
sudo systemctl reload nginx
```

#### 4. API Endpoints Return 404 Not Found

**Problem:** API calls return 404 errors: `GET http://20.196.112.66/api/v1/branches 404 (Not Found)`

**Common Causes:**
1. Double `/api/` in URL (e.g., `/api/api/v1/...`)
2. Nginx stripping `/api/` prefix incorrectly
3. Frontend environment configuration wrong

**Solution:**

**A. Check for Double /api/ in Browser Network Tab**
```bash
# If you see URLs like: http://20.196.112.66/api/api/v1/branches
# The frontend environment.prod.ts has wrong apiUrl

# On Ubuntu server, fix the frontend configuration:
cd /opt/timeattendance/app/time-attendance-frontend

# Update environment files (should NOT have /api suffix)
cat > src/environments/environment.prod.ts << 'EOF'
export const environment = {
  production: true,
  apiUrl: 'http://20.196.112.66'
};
EOF

# Clean and rebuild
rm -rf dist/ .angular/ node_modules/.cache/
npm run build -- --configuration production

# Redeploy
sudo rm -rf /var/www/timeattendance/*
sudo cp -r dist/time-attendance-frontend/browser/* /var/www/timeattendance/
sudo chown -R www-data:www-data /var/www/timeattendance
```

**B. Verify Nginx Configuration**
```bash
# The Nginx proxy_pass MUST include /api/ to preserve the prefix
cat /etc/nginx/sites-available/timeattendance | grep -A 5 "location /api/"

# Should see:
# location /api/ {
#     proxy_pass http://backend/api/;  ← Important: /api/ at the end
# }

# If it shows proxy_pass http://backend/; (without /api/), fix it:
sudo nano /etc/nginx/sites-available/timeattendance
# Change: proxy_pass http://backend/;
# To:     proxy_pass http://backend/api/;

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

**C. Test the Flow**
```bash
# 1. Test backend directly (should work)
curl -v http://localhost:5099/api/v1/branches

# 2. Test through Nginx (should also work)
curl -v http://localhost/api/v1/branches

# 3. Check from browser network tab - URL should be:
# http://20.196.112.66/api/v1/branches (single /api/, not double)
```

#### 5. SSL Certificate Issues

```bash
# Test SSL certificate
sudo certbot certificates

# Renew certificate manually
sudo certbot renew --force-renewal

# Check Nginx SSL configuration
sudo nginx -t
```

#### 5. Performance Issues

```bash
# Check system resources
htop
free -h
df -h

# Check active connections
sudo netstat -an | grep ESTABLISHED | wc -l

# Check PostgreSQL connections (Docker)
sudo docker exec timeattendance-postgres psql -U postgres -d TimeAttendanceSystem -c "SELECT count(*) FROM pg_stat_activity;"

# Check PostgreSQL performance stats
sudo docker exec timeattendance-postgres psql -U postgres -d TimeAttendanceSystem -c "SELECT * FROM pg_stat_database WHERE datname='TimeAttendanceSystem';"

# Check Docker container resource usage
sudo docker stats timeattendance-postgres

# Check application logs for errors
sudo journalctl -u timeattendance.service -f
```

### Useful Commands

```bash
# Restart all services
sudo systemctl restart timeattendance.service
sudo systemctl restart nginx
sudo docker restart timeattendance-postgres

# View real-time logs
sudo journalctl -u timeattendance.service -f
sudo tail -f /var/log/nginx/timeattendance_error.log
sudo docker logs -f timeattendance-postgres

# Check service status
sudo systemctl status timeattendance.service nginx
sudo docker ps | grep timeattendance-postgres

# Test API endpoint
curl -i http://localhost:5099/api/health

# Check open files/connections
sudo lsof -i :5099
sudo lsof -i :80
sudo lsof -i :443
sudo lsof -i :5432

# Docker PostgreSQL specific commands
sudo docker exec -it timeattendance-postgres psql -U postgres -d TimeAttendanceSystem
sudo docker stats timeattendance-postgres
sudo docker inspect timeattendance-postgres
```

---

## Production Checklist

Before going live, ensure:

- [ ] Domain DNS records configured correctly
- [ ] SSL certificate installed and auto-renewal working
- [ ] Strong passwords set for all accounts (database, JWT secret)
- [ ] Firewall (UFW) configured and enabled
- [ ] SSH key authentication enabled, password auth disabled
- [ ] Fail2Ban installed and configured
- [ ] Database backups running daily
- [ ] Application backups running weekly
- [ ] Monitoring and health checks configured
- [ ] Log rotation configured
- [ ] Automatic security updates enabled
- [ ] All services set to start on boot
- [ ] CORS configured for production domain only
- [ ] Sensitive data logging disabled
- [ ] Production environment variables set correctly
- [ ] Test all critical application features
- [ ] Load testing performed (optional but recommended)
- [ ] Disaster recovery plan documented

---

## Updating the Application

### Backend Update

```bash
# Navigate to app directory
cd /opt/timeattendance/app

# Pull latest changes
git pull origin main

# Build and publish
cd src/Api/TimeAttendanceSystem.Api
dotnet publish --configuration Release --output /opt/timeattendance/publish

# Apply any new migrations
cd ../../../src/Infrastructure/TimeAttendanceSystem.Infrastructure
ASPNETCORE_ENVIRONMENT=Production dotnet ef database update \
  --startup-project ../../Api/TimeAttendanceSystem.Api \
  --context TimeAttendanceDbContext

# Restart service
sudo systemctl restart timeattendance.service

# Check status
sudo systemctl status timeattendance.service
```

### Frontend Update

```bash
# Navigate to frontend directory
cd /opt/timeattendance/app/time-attendance-frontend

# Pull latest changes (if not already done)
git pull origin main

# Install dependencies (if package.json changed)
npm ci

# Build
npm run build

# Deploy
sudo rm -rf /var/www/timeattendance/*
sudo cp -r dist/time-attendance-frontend/browser/* /var/www/timeattendance/
sudo chown -R www-data:www-data /var/www/timeattendance

# Clear browser cache or use cache-busting techniques
```

---

## Additional Resources

### Recommended Tools

- **Monitoring**: Netdata, Grafana, Prometheus
- **Log Management**: ELK Stack, Graylog
- **Backup**: Rsync, Duplicati, Borg
- **Security Scanning**: Lynis, ClamAV
- **Load Testing**: Apache Bench (ab), JMeter, k6

### Documentation Links

- [ASP.NET Core Deployment](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/docs/)
- [Ubuntu Server Guide](https://ubuntu.com/server/docs)

---

## Support & Maintenance

For ongoing support:

1. Monitor application logs daily
2. Review security updates weekly
3. Test backups monthly
4. Review server resources monthly
5. Update application dependencies quarterly
6. Review and update security policies annually

---

**Last Updated:** January 2025
**Version:** 1.0
