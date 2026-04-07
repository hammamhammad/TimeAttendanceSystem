# 02 - Authentication & Security

## 2.1 Overview

The authentication and security module provides enterprise-grade identity management including JWT-based authentication, two-factor authentication (2FA), role-based access control (RBAC), branch-scoped multi-tenancy, and comprehensive audit logging.

## 2.2 Features

| Feature | Description |
|---------|-------------|
| JWT Authentication | Token-based stateless authentication with access + refresh tokens |
| Two-Factor Auth (2FA) | TOTP-based 2FA with backup codes |
| Role-Based Access (RBAC) | 52+ permission policies across all modules |
| Branch-Scoped Access | Multi-tenancy data isolation by branch |
| Password Policies | Complexity rules, history tracking, expiry enforcement |
| Session Management | Active session tracking, remote logout capability |
| Login Attempt Tracking | Brute-force protection with account lockout |
| Rate Limiting | 100 requests per 60 seconds per client |

## 2.3 Entities

| Entity | Purpose |
|--------|---------|
| User | User accounts with credentials and settings |
| Role | Named role grouping permissions |
| Permission | Individual permission (resource + action) |
| RolePermission | Maps permissions to roles |
| UserRole | Maps roles to users |
| UserBranchScope | Restricts user data access to specific branches |
| UserSession | Tracks active login sessions |
| RefreshToken | Stores refresh tokens for token renewal |
| BlacklistedToken | Revoked tokens for immediate invalidation |
| PasswordHistory | Stores previous password hashes to prevent reuse |
| LoginAttempt | Tracks failed login attempts for lockout |
| TwoFactorBackupCode | One-time backup codes for 2FA recovery |

## 2.4 Login Flow

```mermaid
graph TD
    A((Start)) --> B[User Enters Credentials]
    B --> C[POST /api/v1/auth/login]
    C --> D{Account Exists?}
    D -->|No| E[Return 401 Unauthorized]
    
    D -->|Yes| F{Account Locked?}
    F -->|Yes| G[Return 423 Locked - Show lockout duration]
    
    F -->|No| H{Password Correct?}
    H -->|No| I[Increment Failed Attempts]
    I --> J{Max Attempts Reached?}
    J -->|Yes| K[Lock Account for Duration]
    K --> G
    J -->|No| E
    
    H -->|Yes| L[Reset Failed Attempts]
    L --> M{2FA Enabled?}
    
    M -->|Yes| N[Return 2FA Required Response]
    N --> O[User Enters TOTP Code]
    O --> P[POST /api/v1/auth/verify-2fa]
    P --> Q{Code Valid?}
    Q -->|No| R{Is Backup Code?}
    R -->|Yes| S[Validate & Consume Backup Code]
    R -->|No| E
    Q -->|Yes| T[Generate Tokens]
    S --> T
    
    M -->|No| T
    
    T --> U[Create UserSession]
    U --> V{Must Change Password?}
    V -->|Yes| W[Return Token + MustChangePassword Flag]
    V -->|No| X[Return Token + User Info]
    
    W --> Y[Force Password Change Screen]
    Y --> Z[PUT /api/v1/auth/change-password]
    Z --> AA[Update Password + History]
    AA --> X
    
    X --> AB((End - User Authenticated))
```

## 2.5 Token Refresh Flow

```mermaid
graph TD
    A((Access Token Expired)) --> B[Client Sends Refresh Token]
    B --> C[POST /api/v1/auth/refresh-token]
    C --> D{Refresh Token Valid?}
    
    D -->|No| E{Token Blacklisted?}
    E -->|Yes| F[Return 401 - Session Revoked]
    E -->|No| G{Token Expired?}
    G -->|Yes| H[Return 401 - Re-login Required]
    G -->|No| F
    
    D -->|Yes| I[Blacklist Old Refresh Token]
    I --> J[Generate New Access Token]
    J --> K[Generate New Refresh Token]
    K --> L[Return New Token Pair]
    L --> M((Client Continues))
```

## 2.6 Logout Flow

```mermaid
graph TD
    A((User Clicks Logout)) --> B[POST /api/v1/auth/logout]
    B --> C[Blacklist Current Access Token]
    C --> D[Blacklist Current Refresh Token]
    D --> E[End UserSession]
    E --> F[Return Success]
    F --> G[Redirect to Login Page]
    G --> H((End))
```

## 2.7 2FA Setup Flow

```mermaid
graph TD
    A((User Enables 2FA)) --> B[POST /api/v1/auth/setup-2fa]
    B --> C[Generate TOTP Secret]
    C --> D[Return QR Code + Secret]
    D --> E[User Scans QR with Authenticator App]
    E --> F[User Enters Verification Code]
    F --> G[POST /api/v1/auth/confirm-2fa]
    G --> H{Code Valid?}
    H -->|No| I[Return Error - Try Again]
    I --> F
    H -->|Yes| J[Enable 2FA on Account]
    J --> K[Generate 10 Backup Codes]
    K --> L[Display Backup Codes to User]
    L --> M[User Saves Backup Codes]
    M --> N((2FA Active))
```

## 2.8 Role & Permission Management Flow

```mermaid
graph TD
    A((Admin Creates Role)) --> B[Define Role Name & Description]
    B --> C[Select Permissions]
    C --> D{Permissions Categories}
    
    D --> E[Employees: View, Create, Edit, Delete]
    D --> F[Attendance: View, Create, Edit, Delete]
    D --> G[Vacations: View, Create, Edit, Delete, Approve]
    D --> H[Shifts: View, Create, Edit, Delete, Assign]
    D --> I[Reports: View, Export]
    D --> J[Settings: View, Manage]
    D --> K[...52+ Policy Groups]
    
    E --> L[Save Role with Permissions]
    F --> L
    G --> L
    H --> L
    I --> L
    J --> L
    K --> L
    
    L --> M[Assign Role to Users]
    M --> N[Assign Branch Scopes to Users]
    N --> O((Users Have Scoped Access))
```

## 2.9 Permission Check Flow (Every API Request)

```mermaid
graph TD
    A((API Request)) --> B[Extract JWT from Header]
    B --> C{Token Valid?}
    C -->|No| D[Return 401 Unauthorized]
    
    C -->|Yes| E{Token Blacklisted?}
    E -->|Yes| D
    
    E -->|No| F[Extract User Claims]
    F --> G{Has Required Permission?}
    G -->|No| H[Return 403 Forbidden]
    
    G -->|Yes| I{Branch-Scoped Endpoint?}
    I -->|No| J[Allow Access]
    
    I -->|Yes| K{User Has Branch Scope?}
    K -->|No| H
    K -->|Yes| L[Filter Data by Branch Scope]
    L --> J
    
    J --> M((Process Request))
```

## 2.10 Password Change Flow

```mermaid
graph TD
    A((Password Change Request)) --> B[User Enters Current + New Password]
    B --> C{Current Password Correct?}
    C -->|No| D[Return Error]
    
    C -->|Yes| E{New Password Meets Complexity?}
    E -->|No| F[Return Complexity Requirements]
    
    E -->|Yes| G{Password in History?}
    G -->|Yes| H[Return Error - Cannot Reuse]
    
    G -->|No| I[Hash New Password]
    I --> J[Save to PasswordHistory]
    J --> K[Update User Password]
    K --> L[Clear MustChangePassword Flag]
    L --> M[Invalidate All Other Sessions]
    M --> N((Password Changed))
```

## 2.11 Session Management Flow

```mermaid
graph TD
    A((Admin Views Sessions)) --> B[GET /api/v1/sessions/active]
    B --> C[List All Active Sessions]
    C --> D{Action?}
    
    D -->|View Details| E[Show Session Info: IP, Device, Location, Last Active]
    
    D -->|Terminate Session| F[POST /api/v1/sessions/{id}/terminate]
    F --> G[Blacklist Session Tokens]
    G --> H[Mark Session as Terminated]
    H --> I[User Gets Logged Out on Next Request]
    
    D -->|Terminate All| J[POST /api/v1/sessions/terminate-all]
    J --> K[Blacklist All Tokens Except Current]
    K --> L[Mark All Other Sessions as Terminated]
    
    I --> M((Done))
    L --> M
```

## 2.12 Security Middleware Pipeline

```
Request
  |
  v
[CORS Middleware] --> Check allowed origins (localhost:4200, 4201, 4202)
  |
  v
[Global Exception Handler] --> Catch unhandled exceptions, return JSON with traceId
  |
  v
[Rate Limiting Middleware] --> 100 req/60s per client IP
  |
  v
[Localization Middleware] --> Set culture from Accept-Language header
  |
  v
[Authentication Middleware] --> Validate JWT token
  |
  v
[Authorization Middleware] --> Check permissions & branch scope
  |
  v
[Controller / SignalR Hub] --> Process request
  |
  v
Response
```
