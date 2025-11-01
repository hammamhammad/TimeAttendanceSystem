# Authentication Tests

## Overview
This test suite covers authentication-related functionality including login, logout, token management, and session handling.

---

## Test Case AUTH-001: Successful User Login with Valid Credentials

**Priority:** High
**Type:** Functional
**Module:** Authentication

### Description
Verify that a user can successfully log in with valid username and password.

### Preconditions
- Employee exists in database:
  - Code: EMP001
  - Name: John Doe
  - Email: john.doe@company.com
  - Department and Branch assigned
- User account created and linked to employee:
  - Username: john.doe
  - Password: Test@123456
  - Role: Employee
  - Email verified: true
  - IsActive: true
  - Two-factor authentication: disabled
- EmployeeUserLink exists between user and employee

### Test Steps
1. Send POST request to `/api/v1/auth/login`
2. Provide valid credentials:
   ```json
   {
     "username": "john.doe",
     "password": "Test@123456"
   }
   ```
3. Observe the response

### Expected Results
- HTTP Status Code: 200 OK
- Response contains:
  - `accessToken` (JWT, 15-minute expiration)
  - `refreshToken` (30-day expiration)
  - User details (id, username, email, roles, permissions)
  - `employeeId` (from EmployeeUserLink)
- Access token contains claims: UserId, Username, Roles, Permissions, BranchIds, EmployeeId
- Refresh token is stored in HTTP-only, Secure, SameSite=Strict cookie
- User session is created in database
- Login attempt counter is reset to 0
- Employee can access portal with this account

---

## Test Case AUTH-002: Failed Login with Invalid Password

**Priority:** High
**Type:** Functional
**Module:** Authentication

### Description
Verify that login fails when an invalid password is provided and failed attempt is tracked.

### Preconditions
- Employee and user account exist (john.doe from AUTH-001)
- User account is active
- Account is not locked (AccessFailedCount < 5)

### Test Steps
1. Send POST request to `/api/v1/auth/login`
2. Provide valid username with invalid password:
   ```json
   {
     "username": "john.doe",
     "password": "WrongPassword123!"
   }
   ```
3. Check database for LoginAttempt record
4. Observe the response

### Expected Results
- HTTP Status Code: 401 Unauthorized
- Response contains error message: "Invalid username or password"
- No access token or refresh token returned
- LoginAttempt record created with:
  - AccessFailedCount incremented by 1
  - Timestamp of failed attempt
  - IP address logged
- No user session created
- User account remains active (not locked yet)

---

## Test Case AUTH-003: Account Lockout After 5 Failed Login Attempts

**Priority:** High
**Type:** Functional
**Module:** Authentication

### Description
Verify that user account is locked after 5 consecutive failed login attempts.

### Preconditions
- User account exists in the database
- User account is active
- AccessFailedCount is 4 (4 previous failed attempts)

### Test Steps
1. Send POST request to `/api/v1/auth/login` with invalid password (5th attempt)
2. Check user account status in database
3. Attempt to login with correct password
4. Observe both responses

### Expected Results
- After 5th failed attempt:
  - HTTP Status Code: 401 Unauthorized
  - AccessFailedCount = 5
  - LockoutEnd timestamp set to 30 minutes from now
  - Account status indicates lockout
- Subsequent login with valid credentials:
  - HTTP Status Code: 403 Forbidden
  - Response message: "Account is locked. Please try again after [timestamp]"
  - No access token returned
- Account automatically unlocks after 30 minutes

---

## Test Case AUTH-004: Token Refresh Flow

**Priority:** High
**Type:** Functional
**Module:** Authentication

### Description
Verify that access token can be refreshed using valid refresh token.

### Preconditions
- User is logged in
- Valid refresh token exists in cookie
- Refresh token is not expired
- Refresh token is not revoked

### Test Steps
1. Wait for access token to expire (15 minutes) or use expired token
2. Send POST request to `/api/v1/auth/refresh`
3. Include refresh token in cookie header
4. Observe the response
5. Check database for token rotation

### Expected Results
- HTTP Status Code: 200 OK
- New access token issued (15-minute expiration)
- New refresh token issued (30-day expiration)
- Old refresh token is revoked in database (Revoked = true)
- Token rotation completed successfully
- New tokens contain updated user claims
- User session updated with new token metadata

---

## Test Case AUTH-005: Logout and Token Revocation

**Priority:** High
**Type:** Functional
**Module:** Authentication

### Description
Verify that logout properly revokes tokens and ends user session.

### Preconditions
- User is logged in with valid access and refresh tokens
- Active session exists in database

### Test Steps
1. Send POST request to `/api/v1/auth/logout`
2. Include access token in Authorization header
3. Include refresh token in cookie
4. Check database for token status
5. Attempt to use revoked tokens for API requests

### Expected Results
- HTTP Status Code: 200 OK
- Response message: "Logout successful"
- Refresh token marked as Revoked in database
- Access token added to blacklist (valid until expiration)
- User session status set to Inactive
- Subsequent API requests with revoked tokens:
  - HTTP Status Code: 401 Unauthorized
  - Error: "Invalid or expired token"

---

## Test Case AUTH-006: Expired Token Handling

**Priority:** Medium
**Type:** Functional
**Module:** Authentication

### Description
Verify that expired access tokens are properly rejected and refresh is required.

### Preconditions
- User was previously logged in
- Access token has expired (>15 minutes old)
- Refresh token is still valid

### Test Steps
1. Send GET request to any protected endpoint with expired access token
2. Observe the error response
3. Send refresh token request
4. Retry original request with new access token

### Expected Results
- Step 1:
  - HTTP Status Code: 401 Unauthorized
  - Error: "Token has expired"
  - WWW-Authenticate header indicates token expiration
- Step 3:
  - New tokens issued successfully
- Step 4:
  - Protected endpoint accessible with new token
  - HTTP Status Code: 200 OK

---

## Test Case AUTH-007: Concurrent Session Management

**Priority:** Medium
**Type:** Functional
**Module:** Authentication

### Description
Verify that multiple concurrent sessions are tracked and managed correctly.

### Preconditions
- User account exists
- No active sessions currently

### Test Steps
1. Login from Device 1 (Browser Chrome)
2. Login from Device 2 (Browser Firefox)
3. Login from Device 3 (Mobile App)
4. Query `/api/v1/auth/sessions` to list active sessions
5. Revoke session from Device 2
6. Attempt API call from Device 2
7. Verify Devices 1 and 3 still work

### Expected Results
- Step 4:
  - HTTP Status Code: 200 OK
  - Returns 3 active sessions with:
    - Session ID
    - Device information (user agent)
    - IP address
    - Login timestamp
    - Last activity timestamp
- Step 5:
  - Session 2 marked as Inactive
  - Refresh token revoked
- Step 6:
  - HTTP Status Code: 401 Unauthorized
  - Error: "Session terminated"
- Step 7:
  - Devices 1 and 3 continue working normally
  - API calls succeed

---

## Test Execution Notes

### Test Data Requirements
- Test user accounts (see TEST_DATA_SETUP_GUIDE.md):
  - systemadmin / TempP@ssw0rd123!
  - john.doe / Test@123456
  - alice.manager / Manager@123
- All users must have EmployeeUserLink configured

### Environment Setup
- Backend running on http://localhost:5099
- Database seeded with test users and employees
- JWT secret configured in appsettings.json

### Dependencies
- PostgreSQL database
- JWT authentication middleware
- Employee and EmployeeUserLink entities

---

## Traceability Matrix

| Test Case | Requirement | Priority | Status |
|-----------|-------------|----------|--------|
| AUTH-001 | User Login | High | ⬜ Not Run |
| AUTH-002 | Failed Login Tracking | High | ⬜ Not Run |
| AUTH-003 | Account Lockout | High | ⬜ Not Run |
| AUTH-004 | Token Refresh | High | ⬜ Not Run |
| AUTH-005 | Logout | High | ⬜ Not Run |
| AUTH-006 | Expired Token | Medium | ⬜ Not Run |
| AUTH-007 | Concurrent Sessions | Medium | ⬜ Not Run |
