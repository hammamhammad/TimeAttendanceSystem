# CORS Configuration Guide

This document explains how to configure Cross-Origin Resource Sharing (CORS) for the Time Attendance System API to allow access from external clients and applications.

## Overview

CORS is configured via the `appsettings.json` files and can be customized for different environments without rebuilding the application.

## Configuration Structure

The CORS settings are located under the `"Cors"` section in appsettings files:

```json
{
  "Cors": {
    "PolicyName": "DefaultCorsPolicy",
    "AllowedOrigins": [
      "http://localhost:4200",
      "https://localhost:4200"
    ],
    "AllowedMethods": [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS"
    ],
    "AllowedHeaders": [
      "Content-Type",
      "Authorization",
      "Accept",
      "Origin",
      "X-Requested-With"
    ],
    "AllowCredentials": true,
    "PreflightMaxAge": 86400
  }
}
```

## Configuration Options

### PolicyName
- **Type**: `string`
- **Default**: `"DefaultCorsPolicy"`
- **Description**: Name of the CORS policy

### AllowedOrigins
- **Type**: `string[]`
- **Description**: Array of allowed origin URLs
- **Examples**:
  - `"http://localhost:3000"` - Local development client
  - `"https://app.yourdomain.com"` - Production client application
  - `"*"` - Allow all origins (not recommended for production)

### AllowedMethods
- **Type**: `string[]`
- **Description**: HTTP methods allowed for CORS requests
- **Common values**: `["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]`
- **Special**: Use `["*"]` to allow all methods

### AllowedHeaders
- **Type**: `string[]`
- **Description**: Headers allowed in CORS requests
- **Common values**:
  - `"Content-Type"` - For JSON requests
  - `"Authorization"` - For JWT tokens
  - `"Accept"` - For content negotiation
  - `"*"` - Allow all headers (use with caution)

### AllowCredentials
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Whether to allow credentials (cookies, authorization headers) in CORS requests
- **Note**: Cannot be `true` when `AllowedOrigins` contains `"*"`

### PreflightMaxAge
- **Type**: `integer`
- **Default**: `86400` (24 hours)
- **Description**: Maximum age in seconds for preflight request caching

## Environment-Specific Configurations

### Development (appsettings.Development.json)
```json
{
  "Cors": {
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://localhost:3000",
      "http://127.0.0.1:3000"
    ],
    "AllowedHeaders": ["*"],
    "AllowCredentials": true
  }
}
```

### Production (appsettings.Production.json)
```json
{
  "Cors": {
    "AllowedOrigins": [
      "https://yourdomain.com",
      "https://app.yourdomain.com"
    ],
    "AllowedHeaders": [
      "Content-Type",
      "Authorization",
      "Accept"
    ],
    "AllowCredentials": true
  }
}
```

### Docker (appsettings.Docker.json)
```json
{
  "Cors": {
    "AllowedOrigins": [
      "http://client:80",
      "http://client:3000"
    ]
  }
}
```

## Deployment Instructions

### 1. Development
No changes needed. Default configuration works with client applications on port 3000.

### 2. Production Deployment
Update `appsettings.Production.json` with your production client application URLs:

```json
{
  "Cors": {
    "AllowedOrigins": [
      "https://your-client-domain.com",
      "https://www.your-client-domain.com"
    ]
  }
}
```

### 3. Docker Deployment
Use environment variables or mount configuration files:

```bash
# Using environment variables
docker run -e ASPNETCORE_ENVIRONMENT=Production \
  -e Cors__AllowedOrigins__0=https://yourdomain.com \
  your-api-image
```

```yaml
# Docker Compose
version: '3.8'
services:
  api:
    image: your-api-image
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - Cors__AllowedOrigins__0=https://yourdomain.com
      - Cors__AllowedOrigins__1=https://app.yourdomain.com
```

### 4. Kubernetes Deployment
Use ConfigMaps or environment variables:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: api-config
data:
  appsettings.Production.json: |
    {
      "Cors": {
        "AllowedOrigins": [
          "https://yourdomain.com"
        ]
      }
    }
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  template:
    spec:
      containers:
      - name: api
        image: your-api-image
        env:
        - name: ASPNETCORE_ENVIRONMENT
          value: "Production"
        volumeMounts:
        - name: config-volume
          mountPath: /app/appsettings.Production.json
          subPath: appsettings.Production.json
      volumes:
      - name: config-volume
        configMap:
          name: api-config
```

## Security Best Practices

1. **Never use wildcards in production**:
   ```json
   // ❌ Don't do this in production
   {
     "AllowedOrigins": ["*"]
   }
   ```

2. **Be specific with origins**:
   ```json
   // ✅ Good - specific domains
   {
     "AllowedOrigins": [
       "https://app.yourdomain.com",
       "https://admin.yourdomain.com"
     ]
   }
   ```

3. **Limit headers in production**:
   ```json
   // ✅ Good - only necessary headers
   {
     "AllowedHeaders": [
       "Content-Type",
       "Authorization",
       "Accept"
     ]
   }
   ```

4. **Use HTTPS in production**:
   ```json
   // ✅ Good - HTTPS only
   {
     "AllowedOrigins": [
       "https://yourdomain.com"
     ]
   }
   ```

## Troubleshooting

### Common CORS Errors

1. **"Access to fetch at '...' has been blocked by CORS policy"**
   - Add your client application URL to `AllowedOrigins`
   - Ensure the URL format matches exactly (including protocol and port)

2. **"Credentials mode is 'include' but the CORS policy does not allow credentials"**
   - Set `AllowCredentials: true` in configuration
   - Ensure `AllowedOrigins` doesn't contain `"*"`

3. **"Preflight request doesn't pass access control check"**
   - Add required headers to `AllowedHeaders`
   - Add required methods to `AllowedMethods`

### Debugging CORS Issues

1. Check browser developer tools Network tab
2. Look for OPTIONS requests (preflight)
3. Verify response headers contain proper CORS headers
4. Check API logs for CORS policy violations

### Testing CORS Configuration

```bash
# Test preflight request
curl -X OPTIONS \
  -H "Origin: http://localhost:4200" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type,Authorization" \
  http://localhost:5000/api/auth/login

# Should return CORS headers in response
```

## Notes

- CORS configuration takes effect immediately upon application restart
- No rebuild required when changing appsettings files
- Different environments can have different CORS policies
- The configuration is loaded at application startup
- Changes require application restart to take effect