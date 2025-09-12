# Time Attendance System - Deployment Guide

## 🚀 Production Deployment Guide

### Prerequisites

#### System Requirements
- **.NET 9.0 Runtime** or later
- **SQL Server 2019** or later (or Azure SQL Database)
- **IIS 10** or later (Windows) / **Nginx** (Linux)
- **SSL Certificate** for HTTPS
- **Redis** (optional, for distributed caching)

#### Development Requirements
- **.NET 9.0 SDK**
- **SQL Server Express** or **SQL Server Developer Edition**
- **Visual Studio 2022** or **VS Code**

### 📋 Pre-Deployment Checklist

#### 1. Database Setup
- [ ] Create production SQL Server database
- [ ] Configure connection string with proper credentials
- [ ] Ensure database server has adequate resources
- [ ] Set up database backups
- [ ] Configure SQL Server for production (memory, connections, etc.)

#### 2. Security Configuration
- [ ] Generate strong JWT secret key
- [ ] Configure HTTPS/SSL certificates
- [ ] Set up proper CORS origins
- [ ] Configure rate limiting thresholds
- [ ] Set up firewall rules
- [ ] Configure secure password policies

#### 3. Application Configuration
- [ ] Update appsettings.Production.json
- [ ] Configure logging (Serilog with file/database sinks)
- [ ] Set up health checks
- [ ] Configure caching (Redis for production)
- [ ] Set up email service (SMTP configuration)

#### 4. Infrastructure
- [ ] Set up load balancer (if multiple instances)
- [ ] Configure reverse proxy (IIS/Nginx)
- [ ] Set up monitoring and alerting
- [ ] Configure automated backups
- [ ] Set up CI/CD pipeline

## 📁 Configuration Files

### appsettings.Production.json
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=prod-sql-server;Database=TimeAttendanceDB;Trusted_Connection=true;MultipleActiveResultSets=true;Encrypt=true;TrustServerCertificate=false;"
  },
  "JwtSettings": {
    "SecretKey": "your-super-secret-production-key-minimum-256-bits-long",
    "Issuer": "TimeAttendanceSystem",
    "Audience": "TimeAttendanceSystem",
    "ExpirationMinutes": 15,
    "RefreshTokenExpirationDays": 30
  },
  "EmailSettings": {
    "SmtpHost": "smtp.your-domain.com",
    "SmtpPort": 587,
    "UseSsl": true,
    "Username": "noreply@your-domain.com",
    "Password": "your-email-password",
    "FromEmail": "noreply@your-domain.com",
    "FromName": "Time Attendance System"
  },
  "CacheSettings": {
    "UseRedis": true,
    "RedisConnectionString": "localhost:6379",
    "DefaultExpirationMinutes": 60
  },
  "RateLimitingSettings": {
    "GeneralLimit": 100,
    "AuthLimit": 10,
    "WindowMinutes": 1
  },
  "CorsSettings": {
    "AllowedOrigins": [
      "https://your-admin-panel.com"
    ]
  },
  "Serilog": {
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning"
      }
    },
    "WriteTo": [
      {
        "Name": "Console"
      },
      {
        "Name": "File",
        "Args": {
          "path": "logs/timeattendance-.log",
          "rollingInterval": "Day",
          "retainedFileCountLimit": 30
        }
      },
      {
        "Name": "MSSqlServer",
        "Args": {
          "connectionString": "your-connection-string",
          "sinkOptionsSection": {
            "tableName": "Logs",
            "autoCreateSqlTable": true
          }
        }
      }
    ]
  }
}
```

### web.config (IIS Deployment)
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <location path="." inheritInChildApplications="false">
    <system.webServer>
      <handlers>
        <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
      </handlers>
      <aspNetCore processPath="dotnet" 
                  arguments=".\TimeAttendanceSystem.Api.dll" 
                  stdoutLogEnabled="true" 
                  stdoutLogFile=".\logs\stdout" 
                  hostingModel="inprocess">
        <environmentVariables>
          <environmentVariable name="ASPNETCORE_ENVIRONMENT" value="Production" />
          <environmentVariable name="ASPNETCORE_HTTPS_PORTS" value="443" />
        </environmentVariables>
      </aspNetCore>
      <security>
        <requestFiltering>
          <requestLimits maxAllowedContentLength="10485760" /> <!-- 10MB -->
        </requestFiltering>
      </security>
      <httpProtocol>
        <customHeaders>
          <add name="X-Frame-Options" value="DENY" />
          <add name="X-Content-Type-Options" value="nosniff" />
          <add name="Strict-Transport-Security" value="max-age=31536000; includeSubDomains" />
          <add name="Content-Security-Policy" value="default-src 'self'" />
        </customHeaders>
      </httpProtocol>
    </system.webServer>
  </location>
</configuration>
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_buffering off;
        proxy_read_timeout 100s;
        proxy_connect_timeout 100s;
    }
}
```

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["src/Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj", "Api/TimeAttendanceSystem.Api/"]
COPY ["src/Application/TimeAttendanceSystem.Application/TimeAttendanceSystem.Application.csproj", "Application/TimeAttendanceSystem.Application/"]
COPY ["src/Domain/TimeAttendanceSystem.Domain/TimeAttendanceSystem.Domain.csproj", "Domain/TimeAttendanceSystem.Domain/"]
COPY ["src/Infrastructure/TimeAttendanceSystem.Infrastructure/TimeAttendanceSystem.Infrastructure.csproj", "Infrastructure/TimeAttendanceSystem.Infrastructure/"]
COPY ["src/Shared/TimeAttendanceSystem.Shared/TimeAttendanceSystem.Shared.csproj", "Shared/TimeAttendanceSystem.Shared/"]

RUN dotnet restore "Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj"
COPY src/ .
WORKDIR "/src/Api/TimeAttendanceSystem.Api"
RUN dotnet build "TimeAttendanceSystem.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TimeAttendanceSystem.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TimeAttendanceSystem.Api.dll"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  timeattendance-api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
      - "443:443"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ASPNETCORE_URLS=https://+:443;http://+:80
      - ASPNETCORE_HTTPS_PORT=443
    volumes:
      - ./logs:/app/logs
      - ./certificates:/https:ro
    depends_on:
      - sql-server
      - redis
    networks:
      - timeattendance-network

  sql-server:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      - ACCEPT_EULA=Y
      - MSSQL_SA_PASSWORD=YourStrong@Password123
      - MSSQL_PID=Express
    ports:
      - "1433:1433"
    volumes:
      - sql-data:/var/opt/mssql
    networks:
      - timeattendance-network

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - timeattendance-network

volumes:
  sql-data:
  redis-data:

networks:
  timeattendance-network:
    driver: bridge
```

## 🔄 CI/CD Pipeline

### GitHub Actions (.github/workflows/deploy.yml)
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: '9.0.x'
        
    - name: Restore dependencies
      run: dotnet restore
      
    - name: Build
      run: dotnet build --no-restore --configuration Release
      
    - name: Test
      run: dotnet test --no-build --configuration Release --verbosity normal

  deploy:
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: '9.0.x'
        
    - name: Publish
      run: dotnet publish src/Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj -c Release -o ./publish
      
    - name: Deploy to Server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          sudo systemctl stop timeattendance
          sudo rm -rf /var/www/timeattendance/*
          sudo cp -r ./publish/* /var/www/timeattendance/
          sudo systemctl start timeattendance
```

## 📊 Monitoring & Health Checks

### Health Check Endpoints
```csharp
// Already configured in Program.cs
app.MapHealthChecks("/health", new HealthCheckOptions
{
    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
});

app.MapHealthChecks("/health/ready", new HealthCheckOptions
{
    Predicate = check => check.Tags.Contains("ready")
});

app.MapHealthChecks("/health/live", new HealthCheckOptions
{
    Predicate = _ => false
});
```

### Monitoring URLs
- **Health Check**: `https://your-domain.com/health`
- **Ready Check**: `https://your-domain.com/health/ready`
- **Live Check**: `https://your-domain.com/health/live`
- **API Documentation**: `https://your-domain.com/swagger`

## 🔧 Database Migration & Maintenance

### Apply Migrations
```bash
# Development
dotnet ef database update

# Production (using connection string)
dotnet ef database update --connection "your-production-connection-string"
```

### Backup & Recovery
```sql
-- Create backup
BACKUP DATABASE TimeAttendanceDB 
TO DISK = 'C:\Backups\TimeAttendanceDB.bak'

-- Restore backup
RESTORE DATABASE TimeAttendanceDB 
FROM DISK = 'C:\Backups\TimeAttendanceDB.bak'
```

### Performance Optimization
```sql
-- Create indexes for better performance
CREATE INDEX IX_Users_Email ON Users(Email);
CREATE INDEX IX_Users_Username ON Users(Username);
CREATE INDEX IX_Employees_EmployeeNumber ON Employees(BranchId, EmployeeNumber);
CREATE INDEX IX_Employees_Email ON Employees(Email) WHERE Email IS NOT NULL;
CREATE INDEX IX_AuditLogs_CreatedAtUtc ON AuditLogs(CreatedAtUtc);
CREATE INDEX IX_RefreshTokens_ExpiresAtUtc ON RefreshTokens(ExpiresAtUtc);

-- Update statistics
UPDATE STATISTICS Users;
UPDATE STATISTICS Employees;
UPDATE STATISTICS AuditLogs;
```

## 🔐 Security Hardening

### 1. Application Security
- [x] Use HTTPS only
- [x] Implement JWT with short expiration
- [x] Enable CORS with specific origins
- [x] Add security headers
- [x] Implement rate limiting
- [x] Use secure password hashing (Argon2id)
- [x] Enable audit logging

### 2. Database Security
- [x] Use connection strings with minimal privileges
- [x] Enable SQL Server encryption
- [x] Configure firewall rules
- [x] Regular security updates
- [x] Monitor for unusual activity

### 3. Infrastructure Security
- [x] Use reverse proxy (Nginx/IIS)
- [x] Configure firewall
- [x] Regular OS updates
- [x] Monitor logs
- [x] Backup encryption

## 📈 Performance Tuning

### 1. Application Performance
```csharp
// Already implemented in Program.cs
builder.Services.AddResponseCaching();
builder.Services.AddMemoryCache();
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = connectionString;
});
```

### 2. Database Performance
- Connection pooling configured
- Proper indexing strategy
- Query optimization
- Regular maintenance plans

### 3. Caching Strategy
- Memory cache for frequently accessed data
- Redis for distributed scenarios
- HTTP response caching
- Database query result caching

## 🚨 Troubleshooting

### Common Issues

#### 1. Database Connection Issues
```bash
# Check connection string
# Verify SQL Server is running
# Check firewall settings
# Verify credentials
```

#### 2. JWT Token Issues
```bash
# Verify JWT secret key
# Check token expiration
# Validate issuer/audience
```

#### 3. Permission Issues
```bash
# Check user roles and permissions
# Verify branch scope assignments
# Review audit logs
```

### Log Analysis
```bash
# View application logs
tail -f /var/log/timeattendance/application.log

# Check system logs
journalctl -u timeattendance -f

# Database logs
# Check SQL Server Error Log
```

## 📞 Support & Maintenance

### Regular Maintenance Tasks
- [ ] Weekly database backups verification
- [ ] Monthly log cleanup
- [ ] Quarterly security updates
- [ ] Annual SSL certificate renewal
- [ ] Performance monitoring review

### Support Contacts
- **System Administrator**: admin@your-company.com
- **Database Administrator**: dba@your-company.com
- **Security Team**: security@your-company.com

---

## ✅ Deployment Verification Checklist

After deployment, verify:
- [ ] API is accessible via HTTPS
- [ ] Authentication is working
- [ ] Database migrations applied
- [ ] Default admin account accessible
- [ ] Health checks returning OK
- [ ] Logs are being written
- [ ] Email notifications working
- [ ] Performance metrics are normal
- [ ] Security headers present
- [ ] CORS configured correctly

**🎉 Congratulations! Your Time Attendance System is now ready for production use.**