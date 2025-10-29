# API Testing Guide - Employee Portal Endpoints

**Last Updated**: October 25, 2025
**Backend URL**: http://localhost:5099
**Swagger UI**: http://localhost:5099/swagger

---

## Quick Start

### 1. Start the Backend Server

```bash
cd "D:\Work\AI Code\TimeAttendanceSystem\src\Api\TimeAttendanceSystem.Api"
dotnet run
```

Server will start on: http://localhost:5099

### 2. Access Swagger UI

Open browser: http://localhost:5099/swagger

### 3. Authenticate

First, you need to get a JWT token by logging in:

**Endpoint**: `POST /api/v1/auth/login`

```json
{
  "username": "your-username",
  "password": "your-password"
}
```

Copy the `accessToken` from the response and use it in the "Authorize" button in Swagger (Bearer {token}).

---

## Portal Endpoints Testing

### Endpoint 1: Get Employee Dashboard

**Purpose**: Retrieve employee dashboard with stats and activity

**Method**: `GET`
**URL**: `/api/v1/portal/employee-dashboard`
**Auth**: Required (Bearer token)
**Policy**: Authenticated user

#### Request
```http
GET /api/v1/portal/employee-dashboard HTTP/1.1
Host: localhost:5099
Authorization: Bearer {your-jwt-token}
```

#### Expected Response (200 OK)
```json
{
  "isSuccess": true,
  "value": {
    "employeeId": 1,
    "employeeName": "John Doe",
    "departmentName": "IT Department",
    "branchName": "Main Branch",
    "attendanceRate": 95.5,
    "attendanceTrend": 2.3,
    "totalWorkingHours": 160.5,
    "overtimeHours": 12.0,
    "remainingVacationDays": 15,
    "usedVacationDays": 5,
    "pendingRequestsCount": 2,
    "recentActivity": [
      {
        "type": "Attendance",
        "description": "Attended on Oct 24, 2025 - 8.0h worked",
        "timestamp": "2025-10-24T08:00:00Z",
        "icon": "fa-check-circle",
        "variant": "success"
      }
    ]
  },
  "error": ""
}
```

#### Test Cases
- ✅ Valid token → Returns dashboard data
- ✅ Invalid token → Returns 401 Unauthorized
- ✅ No employee link → Returns 404 with error message
- ✅ Expired token → Returns 401 Unauthorized

---

### Endpoint 2: Get Manager Dashboard

**Purpose**: Retrieve manager dashboard with team stats

**Method**: `GET`
**URL**: `/api/v1/portal/manager-dashboard`
**Auth**: Required (Bearer token)
**Policy**: ManagerAccess (SystemAdmin, Admin, Manager roles)

#### Request
```http
GET /api/v1/portal/manager-dashboard HTTP/1.1
Host: localhost:5099
Authorization: Bearer {your-jwt-token}
```

#### Expected Response (200 OK)
```json
{
  "isSuccess": true,
  "value": {
    "managerId": 0,
    "managerName": "Placeholder",
    "teamSize": 0,
    "presentToday": 0,
    "absentToday": 0,
    "lateToday": 0,
    "pendingApprovals": 0,
    "teamAttendanceRate": 0,
    "teamOvertimeHours": 0,
    "pendingApprovalsSummary": {
      "pendingVacations": 0,
      "pendingExcuses": 0,
      "pendingRemoteWorkRequests": 0,
      "pendingFingerprintRequests": 0
    }
  },
  "error": ""
}
```

**Note**: Currently returns placeholder data. Full implementation coming in Phase 5.

#### Test Cases
- ✅ Manager role → Returns dashboard data
- ✅ Employee role → Returns 403 Forbidden
- ✅ Invalid token → Returns 401 Unauthorized

---

## Fingerprint Request Endpoints Testing

### Endpoint 3: List Fingerprint Requests

**Purpose**: Get paginated list of fingerprint requests with filtering

**Method**: `GET`
**URL**: `/api/v1/fingerprint-requests`
**Auth**: Required (Bearer token)
**Policy**: Authenticated user

#### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| employeeId | long | No | Filter by employee (admin only) |
| status | FingerprintRequestStatus | No | Filter by status (Pending, Scheduled, Completed, Cancelled, Rejected) |
| requestType | FingerprintRequestType | No | Filter by type |
| startDate | DateTime | No | Filter from date |
| endDate | DateTime | No | Filter to date |
| pageNumber | int | No | Page number (default: 1) |
| pageSize | int | No | Page size (default: 10) |

#### Request Examples

**Example 1: Get all requests (employee)**
```http
GET /api/v1/fingerprint-requests?pageNumber=1&pageSize=10 HTTP/1.1
Host: localhost:5099
Authorization: Bearer {your-jwt-token}
```

**Example 2: Get pending requests**
```http
GET /api/v1/fingerprint-requests?status=Pending&pageNumber=1&pageSize=10 HTTP/1.1
Host: localhost:5099
Authorization: Bearer {your-jwt-token}
```

**Example 3: Get requests for specific employee (admin only)**
```http
GET /api/v1/fingerprint-requests?employeeId=5&pageNumber=1&pageSize=10 HTTP/1.1
Host: localhost:5099
Authorization: Bearer {admin-jwt-token}
```

#### Expected Response (200 OK)
```json
{
  "isSuccess": true,
  "value": {
    "items": [
      {
        "id": 1,
        "employeeId": 1,
        "employeeName": "John Doe",
        "requestType": "Update",
        "issueDescription": "Fingerprint reader not recognizing my right thumb",
        "affectedFingers": "Right Thumb",
        "preferredDate": "2025-10-28",
        "preferredTime": "10:00:00",
        "scheduledDate": null,
        "scheduledTime": null,
        "status": "Pending",
        "technicianId": null,
        "technicianName": null,
        "technicianNotes": null,
        "completedDate": null,
        "createdAtUtc": "2025-10-25T10:00:00Z"
      }
    ],
    "totalCount": 1,
    "pageNumber": 1,
    "pageSize": 10,
    "totalPages": 1
  },
  "error": ""
}
```

#### Test Cases
- ✅ Employee sees only their own requests
- ✅ Admin sees all requests
- ✅ Pagination works correctly
- ✅ Filtering by status works
- ✅ Invalid token → Returns 401

---

### Endpoint 4: Get Fingerprint Request by ID

**Purpose**: Get details of a specific fingerprint request

**Method**: `GET`
**URL**: `/api/v1/fingerprint-requests/{id}`
**Auth**: Required (Bearer token)
**Policy**: Authenticated user (owner or admin)

#### Request
```http
GET /api/v1/fingerprint-requests/1 HTTP/1.1
Host: localhost:5099
Authorization: Bearer {your-jwt-token}
```

#### Expected Response (200 OK)
```json
{
  "isSuccess": true,
  "value": {
    "id": 1,
    "employeeId": 1,
    "employeeName": "John Doe",
    "requestType": "Update",
    "issueDescription": "Fingerprint reader not recognizing my right thumb",
    "affectedFingers": "Right Thumb",
    "preferredDate": "2025-10-28",
    "preferredTime": "10:00:00",
    "scheduledDate": null,
    "scheduledTime": null,
    "status": "Pending",
    "technicianId": null,
    "technicianName": null,
    "technicianNotes": null,
    "completedDate": null,
    "createdAtUtc": "2025-10-25T10:00:00Z"
  },
  "error": ""
}
```

#### Error Responses

**404 Not Found**:
```json
{
  "isSuccess": false,
  "value": null,
  "error": "Fingerprint request not found"
}
```

**403 Forbidden** (not owner):
```json
{
  "isSuccess": false,
  "value": null,
  "error": "You do not have permission to view this request"
}
```

#### Test Cases
- ✅ Owner can view their request
- ✅ Admin can view any request
- ✅ Non-owner cannot view → 403
- ✅ Invalid ID → 404
- ✅ Invalid token → 401

---

### Endpoint 5: Create Fingerprint Request

**Purpose**: Create a new fingerprint request

**Method**: `POST`
**URL**: `/api/v1/fingerprint-requests`
**Auth**: Required (Bearer token)
**Policy**: Authenticated user

#### Request Body
```json
{
  "requestType": "Update",
  "issueDescription": "Fingerprint reader not recognizing my right thumb",
  "affectedFingers": "Right Thumb",
  "preferredDate": "2025-10-28",
  "preferredTime": "10:00:00"
}
```

#### Request Types
- `NewEnrollment` - First time fingerprint enrollment
- `Update` - Update existing fingerprint
- `Issue` - Report fingerprint recognition issue
- `AdditionalFingers` - Add more fingers to system
- `LocationChange` - Re-enroll for new location

#### Request
```http
POST /api/v1/fingerprint-requests HTTP/1.1
Host: localhost:5099
Authorization: Bearer {your-jwt-token}
Content-Type: application/json

{
  "requestType": "Update",
  "issueDescription": "Fingerprint reader not recognizing my right thumb",
  "affectedFingers": "Right Thumb",
  "preferredDate": "2025-10-28",
  "preferredTime": "10:00:00"
}
```

#### Expected Response (201 Created)
```json
{
  "isSuccess": true,
  "value": 123,
  "error": ""
}
```

#### Error Responses

**400 Bad Request** (already has active request):
```json
{
  "isSuccess": false,
  "value": 0,
  "error": "You already have an active fingerprint request. Please wait for it to be processed or cancel it first."
}
```

**400 Bad Request** (preferred date in past):
```json
{
  "isSuccess": false,
  "value": 0,
  "error": "Preferred date cannot be in the past"
}
```

#### Test Cases
- ✅ Valid request → Returns 201 with ID
- ✅ Duplicate active request → Returns 400
- ✅ Past preferred date → Returns 400
- ✅ Missing required fields → Returns 400
- ✅ Invalid token → Returns 401

---

### Endpoint 6: Update Fingerprint Request

**Purpose**: Update an existing fingerprint request

**Method**: `PUT`
**URL**: `/api/v1/fingerprint-requests/{id}`
**Auth**: Required (Bearer token)
**Policy**: Authenticated user (owner only)

#### Request Body
```json
{
  "requestType": "Update",
  "issueDescription": "Updated: Fingerprint reader sometimes doesn't recognize my right thumb",
  "affectedFingers": "Right Thumb",
  "preferredDate": "2025-10-29",
  "preferredTime": "14:00:00"
}
```

#### Request
```http
PUT /api/v1/fingerprint-requests/1 HTTP/1.1
Host: localhost:5099
Authorization: Bearer {your-jwt-token}
Content-Type: application/json

{
  "requestType": "Update",
  "issueDescription": "Updated: Fingerprint reader sometimes doesn't recognize my right thumb",
  "affectedFingers": "Right Thumb",
  "preferredDate": "2025-10-29",
  "preferredTime": "14:00:00"
}
```

#### Expected Response (200 OK)
```json
{
  "isSuccess": true,
  "error": ""
}
```

#### Error Responses

**403 Forbidden** (not owner):
```json
{
  "isSuccess": false,
  "error": "You do not have permission to update this request"
}
```

**400 Bad Request** (not pending):
```json
{
  "isSuccess": false,
  "error": "Only pending requests can be updated"
}
```

#### Test Cases
- ✅ Owner updates pending request → 200
- ✅ Non-owner tries to update → 403
- ✅ Update scheduled/completed request → 400
- ✅ Invalid ID → 404
- ✅ Invalid token → 401

---

### Endpoint 7: Complete Fingerprint Request (Admin Only)

**Purpose**: Mark a fingerprint request as completed

**Method**: `POST`
**URL**: `/api/v1/fingerprint-requests/{id}/complete`
**Auth**: Required (Bearer token)
**Policy**: AdminAccess (SystemAdmin, Admin roles)

#### Request Body
```json
{
  "technicianNotes": "Successfully re-enrolled right thumb fingerprint. All fingers now working correctly."
}
```

#### Request
```http
POST /api/v1/fingerprint-requests/1/complete HTTP/1.1
Host: localhost:5099
Authorization: Bearer {admin-jwt-token}
Content-Type: application/json

{
  "technicianNotes": "Successfully re-enrolled right thumb fingerprint. All fingers now working correctly."
}
```

#### Expected Response (200 OK)
```json
{
  "isSuccess": true,
  "error": ""
}
```

#### Error Responses

**403 Forbidden** (not admin):
```json
{
  "isSuccess": false,
  "error": "You do not have permission to complete fingerprint requests"
}
```

**404 Not Found**:
```json
{
  "isSuccess": false,
  "error": "Fingerprint request not found"
}
```

#### Test Cases
- ✅ Admin completes request → 200
- ✅ Non-admin tries to complete → 403
- ✅ Invalid ID → 404
- ✅ Invalid token → 401

---

### Endpoint 8: Cancel Fingerprint Request

**Purpose**: Cancel a fingerprint request

**Method**: `POST`
**URL**: `/api/v1/fingerprint-requests/{id}/cancel`
**Auth**: Required (Bearer token)
**Policy**: Authenticated user (owner only)

**Status**: ⚠️ **PLACEHOLDER** - Not yet implemented

#### Request
```http
POST /api/v1/fingerprint-requests/1/cancel HTTP/1.1
Host: localhost:5099
Authorization: Bearer {your-jwt-token}
```

#### Expected Response (200 OK)
```json
{
  "isSuccess": true,
  "error": ""
}
```

---

## Common Error Responses

### 401 Unauthorized
```json
{
  "type": "https://tools.ietf.org/html/rfc7235#section-3.1",
  "title": "Unauthorized",
  "status": 401
}
```

**Cause**: Missing, invalid, or expired JWT token

**Solution**: Login again to get a new token

---

### 403 Forbidden
```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.3",
  "title": "Forbidden",
  "status": 403
}
```

**Cause**: User doesn't have required role or permission

**Solution**: Contact admin to get proper permissions

---

### 400 Bad Request
```json
{
  "isSuccess": false,
  "value": null,
  "error": "Validation error message here"
}
```

**Cause**: Invalid request data or business rule violation

**Solution**: Check error message and fix request

---

## Postman Collection

### Setup

1. Create a new collection: "Employee Portal API"
2. Set collection variables:
   - `baseUrl`: http://localhost:5099
   - `token`: (will be set after login)

3. Add Authorization to collection:
   - Type: Bearer Token
   - Token: `{{token}}`

### Request Examples

Create these requests in Postman:

1. **Login** (POST): `{{baseUrl}}/api/v1/auth/login`
2. **Employee Dashboard** (GET): `{{baseUrl}}/api/v1/portal/employee-dashboard`
3. **Manager Dashboard** (GET): `{{baseUrl}}/api/v1/portal/manager-dashboard`
4. **List Requests** (GET): `{{baseUrl}}/api/v1/fingerprint-requests`
5. **Get Request** (GET): `{{baseUrl}}/api/v1/fingerprint-requests/1`
6. **Create Request** (POST): `{{baseUrl}}/api/v1/fingerprint-requests`
7. **Update Request** (PUT): `{{baseUrl}}/api/v1/fingerprint-requests/1`
8. **Complete Request** (POST): `{{baseUrl}}/api/v1/fingerprint-requests/1/complete`
9. **Cancel Request** (POST): `{{baseUrl}}/api/v1/fingerprint-requests/1/cancel`

---

## Testing Checklist

### Prerequisites
- [ ] Backend server running
- [ ] Database seeded with test data
- [ ] Test user accounts available
- [ ] JWT authentication working

### Authentication
- [ ] Login with valid credentials
- [ ] Login with invalid credentials → 401
- [ ] Use expired token → 401
- [ ] Use token in all requests

### Employee Dashboard
- [ ] Get dashboard as employee
- [ ] Verify all stats are calculated
- [ ] Verify activity timeline
- [ ] Check response time < 1s

### Manager Dashboard
- [ ] Get dashboard as manager
- [ ] Try as employee → 403
- [ ] Verify placeholder data

### Fingerprint Requests
- [ ] List requests as employee (own only)
- [ ] List requests as admin (all)
- [ ] Filter by status
- [ ] Pagination works
- [ ] Get specific request
- [ ] Try to view other's request → 403
- [ ] Create new request
- [ ] Try to create duplicate → 400
- [ ] Update own request
- [ ] Try to update other's → 403
- [ ] Update non-pending → 400
- [ ] Complete as admin
- [ ] Try to complete as employee → 403

---

## Performance Benchmarks

Expected response times (with proper indexes):

| Endpoint | Expected Time |
|----------|---------------|
| Employee Dashboard | < 500ms |
| Manager Dashboard | < 500ms |
| List Requests (10 items) | < 200ms |
| Get Request by ID | < 100ms |
| Create Request | < 150ms |
| Update Request | < 150ms |
| Complete Request | < 150ms |

---

## Troubleshooting

### Server won't start
- Check if port 5099 is already in use
- Verify database connection string
- Check for compilation errors

### 401 Unauthorized
- Token expired → Login again
- Token missing → Add Authorization header
- Wrong token format → Use "Bearer {token}"

### 403 Forbidden
- Check user roles
- Verify permissions
- Contact admin

### 404 Not Found
- Check endpoint URL
- Verify resource ID exists
- Check if resource was soft-deleted

### 500 Internal Server Error
- Check server logs
- Verify database connection
- Check for null reference exceptions

---

**Happy Testing! 🚀**
