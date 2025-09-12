# Time Attendance System API Documentation

## Overview
The Time Attendance System provides a comprehensive REST API for managing users, employees, branches, departments, roles, and permissions in a multi-tenant environment.

## Base URL
```
http://localhost:5000/api/v1
https://your-domain.com/api/v1
```

## Authentication
All endpoints (except authentication endpoints) require JWT Bearer token authentication.

### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
Accept-Language: en|ar (optional, defaults to en)
```

## Quick Start

### 1. Login to get access token
```http
POST /api/v1/auth/login
{
  "username": "systemadmin",
  "password": "TempP@ssw0rd123!"
}
```

**Response:**
```json
{
  "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refreshToken": "refresh_token_here",
  "expiresIn": 900,
  "tokenType": "Bearer"
}
```

### 2. Use the access token for subsequent requests
```http
GET /api/v1/users
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

## API Endpoints

### 🔐 Authentication (16 endpoints)

#### Login
```http
POST /api/v1/auth/login
```
**Body:**
```json
{
  "username": "string",
  "password": "string",
  "deviceInfo": "string (optional)"
}
```

#### Register
```http
POST /api/v1/auth/register
```
**Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "phone": "string (optional)",
  "preferredLanguage": "en|ar"
}
```

#### Refresh Token
```http
POST /api/v1/auth/refresh
```
**Body:**
```json
{
  "refreshToken": "string"
}
```

#### Logout
```http
POST /api/v1/auth/logout
```

#### Two-Factor Authentication
```http
POST /api/v1/auth/enable-2fa       # Enable 2FA
POST /api/v1/auth/confirm-2fa      # Confirm 2FA setup
POST /api/v1/auth/verify-2fa       # Verify 2FA token
POST /api/v1/auth/disable-2fa      # Disable 2FA
```

#### Password Management
```http
POST /api/v1/auth/request-password-reset    # Request password reset
POST /api/v1/auth/reset-password            # Reset password with token
POST /api/v1/auth/change-password           # Change password (authenticated)
```

#### Email Verification
```http
POST /api/v1/auth/verify-email              # Verify email with token
POST /api/v1/auth/resend-verification       # Resend verification email
```

### 👥 User Management (8 endpoints)

#### List Users
```http
GET /api/v1/users?page=1&pageSize=10&search=john&branchId=1&roleId=2&isActive=true
```

#### Get User Details
```http
GET /api/v1/users/{id}
```

#### Create User
```http
POST /api/v1/users
```
**Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "preferredLanguage": "en",
  "roleIds": [2, 3],
  "branchIds": [1]
}
```

#### Update User
```http
PUT /api/v1/users/{id}
```
**Body:**
```json
{
  "email": "newemail@example.com",
  "phone": "+9876543210",
  "preferredLanguage": "ar",
  "isActive": true
}
```

#### Delete User
```http
DELETE /api/v1/users/{id}
```

#### Role Management
```http
POST /api/v1/users/{id}/roles              # Assign role
DELETE /api/v1/users/{id}/roles/{roleId}   # Remove role
```

#### Branch Access
```http
POST /api/v1/users/{id}/branches           # Assign branch access
```

### 👨‍💼 Employee Management (5 endpoints)

#### List Employees
```http
GET /api/v1/employees?page=1&pageSize=10&search=john&branchId=1&departmentId=1&managerId=5&isActive=true&employmentStatus=Active
```

#### Get Employee Details
```http
GET /api/v1/employees/{id}
```

#### Create Employee
```http
POST /api/v1/employees
```
**Body:**
```json
{
  "branchId": 1,
  "employeeNumber": "EMP001",
  "firstName": "John",
  "lastName": "Doe",
  "firstNameAr": "جون",
  "lastNameAr": "دو",
  "nationalId": "1234567890",
  "email": "john.doe@company.com",
  "phone": "+1234567890",
  "dateOfBirth": "1990-01-15",
  "gender": "Male",
  "hireDate": "2024-01-01",
  "employmentStatus": "Active",
  "jobTitle": "Software Developer",
  "jobTitleAr": "مطور برامج",
  "departmentId": 1,
  "managerEmployeeId": 2,
  "workLocationType": "Onsite"
}
```

#### Update Employee
```http
PUT /api/v1/employees/{id}
```

#### Delete Employee
```http
DELETE /api/v1/employees/{id}
```

### 🏢 Branch Management (1 endpoint)

#### List Branches
```http
GET /api/v1/branches?page=1&pageSize=10&search=headquarters&isActive=true
```

**Response:**
```json
{
  "items": [
    {
      "id": 1,
      "code": "HQ",
      "name": "Head Quarters",
      "timeZone": "Asia/Riyadh",
      "isActive": true,
      "employeeCount": 25,
      "departmentCount": 5,
      "createdAtUtc": "2024-01-01T00:00:00Z"
    }
  ],
  "totalCount": 1,
  "page": 1,
  "pageSize": 10,
  "totalPages": 1
}
```

### 🏬 Department Management (1 endpoint)

#### List Departments
```http
GET /api/v1/departments?branchId=1&includeTree=true
```

**Response (Tree Structure):**
```json
[
  {
    "id": 1,
    "branchId": 1,
    "branchName": "Head Quarters",
    "name": "Engineering",
    "parentDepartmentId": null,
    "parentDepartmentName": null,
    "employeeCount": 15,
    "level": 0,
    "children": [
      {
        "id": 2,
        "name": "Backend Development",
        "parentDepartmentId": 1,
        "employeeCount": 8,
        "level": 1,
        "children": []
      }
    ]
  }
]
```

### ⚙️ Role Management (2 endpoints)

#### List Roles
```http
GET /api/v1/roles?includePermissions=true
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "SystemAdmin",
    "isSystem": true,
    "isEditable": false,
    "isDeletable": false,
    "userCount": 1,
    "permissions": [
      {
        "id": 1,
        "key": "user.read",
        "group": "User",
        "description": "View users"
      }
    ]
  }
]
```

#### Manage Role Permissions (SystemAdmin only)
```http
POST /api/v1/roles/{roleId}/permissions              # Assign permission
DELETE /api/v1/roles/{roleId}/permissions/{permissionId}  # Remove permission
```

### 🔑 Permission Management (1 endpoint)

#### List Permissions
```http
GET /api/v1/permissions?group=User
```

**Response:**
```json
[
  {
    "group": "User",
    "permissions": [
      {
        "id": 1,
        "key": "user.read",
        "group": "User",
        "description": "View users"
      },
      {
        "id": 2,
        "key": "user.create",
        "group": "User",
        "description": "Create users"
      }
    ]
  }
]
```

### 📱 Session Management (2 endpoints)

#### List User Sessions
```http
GET /api/v1/sessions
```

#### Terminate Session
```http
DELETE /api/v1/sessions/{sessionId}
```

## Error Handling

All endpoints return consistent error responses following RFC 7807:

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "Validation Error",
  "status": 400,
  "detail": "One or more validation errors occurred",
  "traceId": "0HMVB9OII2LRD:00000001",
  "errors": {
    "Email": ["Email is required"]
  }
}
```

### Common HTTP Status Codes
- `200 OK` - Success
- `201 Created` - Resource created
- `204 No Content` - Success with no response body
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `500 Internal Server Error` - Server error

## Pagination

List endpoints support pagination:

**Query Parameters:**
- `page` (default: 1)
- `pageSize` (default: 10, max: 100)
- `search` (optional)

**Response Format:**
```json
{
  "items": [...],
  "totalCount": 100,
  "page": 1,
  "pageSize": 10,
  "totalPages": 10,
  "hasPrevious": false,
  "hasNext": true
}
```

## Filtering & Search

Most list endpoints support filtering:

### User Filtering
- `search` - Search in username, email, phone
- `branchId` - Filter by branch
- `roleId` - Filter by role
- `isActive` - Filter by active status

### Employee Filtering
- `search` - Search in name, employee number, email
- `branchId` - Filter by branch
- `departmentId` - Filter by department
- `managerId` - Filter by manager
- `isActive` - Filter by active status
- `employmentStatus` - Filter by employment status

## Multi-language Support

The API supports both English and Arabic:

**Request Header:**
```
Accept-Language: en|ar
```

**Response fields with multi-language:**
- Employee names: `firstName`/`firstNameAr`, `lastName`/`lastNameAr`
- Job titles: `jobTitle`/`jobTitleAr`
- Error messages and validation messages are localized

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- 100 requests per minute per IP for general endpoints
- 10 requests per minute per IP for authentication endpoints

**Rate limit headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Security Features

### Authentication
- JWT tokens with 15-minute expiration
- Refresh tokens with 30-day expiration
- Automatic token rotation

### Authorization
- Role-based access control (RBAC)
- Branch-scoped multi-tenancy
- Permission-based fine-grained access

### Security Headers
- CORS protection
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options

### Audit Logging
All operations are logged with:
- Actor (who performed the action)
- Action type (Create, Update, Delete, etc.)
- Entity details
- Timestamp
- IP address and user agent

## Default Accounts & Roles

### Default Admin Account
- **Username:** `systemadmin`
- **Password:** `TempP@ssw0rd123!` (must be changed on first login)
- **Role:** SystemAdmin (full access)

### Default Roles
1. **SystemAdmin** - Full system access (non-deletable)
2. **Admin** - All permissions except user management
3. **HROperation** - Employee management only
4. **User** - Read-only access

## Postman Collection

A Postman collection is available with all endpoints pre-configured. Import the collection and set these environment variables:

```
baseUrl: http://localhost:5000/api/v1
accessToken: {{obtained from login}}
```

## SDK & Client Libraries

Official client libraries available for:
- JavaScript/TypeScript
- C# .NET
- Python
- Mobile (Flutter/React Native)

Contact support for SDK documentation and download links.