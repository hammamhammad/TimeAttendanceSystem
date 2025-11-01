# Security Tests

## Overview
This test suite covers security vulnerabilities, authentication bypass attempts, authorization exploits, input validation, injection attacks, and security best practices.

---

## Test Case SEC-001: SQL Injection Prevention

**Priority:** High
**Type:** Security
**Module:** Data Access

### Description
Verify that application is protected against SQL injection attacks.

### Preconditions
- Application uses parameterized queries
- Entity Framework ORM configured

### Test Steps
Attempt SQL injection in various inputs:
1. Login username field:
   ```
   username: systemadmin' OR '1'='1' --
   password: anything
   ```
2. Employee search:
   ```
   GET /api/v1/employees?search=test'; DROP TABLE Employees; --
   ```
3. Attendance filter:
   ```
   GET /api/v1/attendance?employeeId=1 OR 1=1
   ```

### Expected Results
- All injection attempts fail
- No SQL syntax executed
- HTTP Status Code: 400 Bad Request or 401 Unauthorized
- Parameterized queries prevent injection
- Entity Framework sanitizes inputs
- Error messages don't reveal database structure
- Logs capture injection attempts for security monitoring

---

## Test Case SEC-002: Cross-Site Scripting (XSS) Prevention

**Priority:** High
**Type:** Security
**Module:** Frontend

### Description
Verify that application is protected against XSS attacks.

### Preconditions
- Angular application with built-in sanitization
- Content Security Policy configured

### Test Steps
Attempt XSS injection in various fields:
1. Employee name:
   ```javascript
   <script>alert('XSS')</script>
   ```
2. Excuse reason:
   ```html
   <img src=x onerror="alert('XSS')">
   ```
3. Vacation notes:
   ```html
   <iframe src="javascript:alert('XSS')"></iframe>
   ```

### Expected Results
- All XSS payloads sanitized:
  - Scripts not executed
  - HTML encoded: `&lt;script&gt;alert('XSS')&lt;/script&gt;`
  - Displayed as text, not executed
- Angular DomSanitizer active
- Content Security Policy blocks inline scripts
- HTTP headers:
  - X-XSS-Protection: 1; mode=block
  - X-Content-Type-Options: nosniff

---

## Test Case SEC-003: Authorization Bypass Attempt

**Priority:** High
**Type:** Security
**Module:** Authorization

### Description
Verify that users cannot bypass authorization by manipulating requests.

### Preconditions
- User with "Employee" role (read-only access)
- Admin-only endpoints exist

### Test Steps
1. Login as Employee user
2. Extract access token
3. Attempt to access admin endpoint:
   - DELETE `/api/v1/employees/10`
4. Attempt to modify token claims (role escalation)
5. Attempt to access other employee's data:
   - GET `/api/v1/attendance?employeeId=999`

### Expected Results
- Step 3:
  - HTTP Status Code: 403 Forbidden
  - Error: "Insufficient permissions"
  - Permission check enforced
- Step 4:
  - Modified token rejected
  - Token signature validation fails
  - HTTP Status Code: 401 Unauthorized
- Step 5:
  - HTTP Status Code: 403 Forbidden OR 404 Not Found
  - Cannot access other employee's data
  - EmployeeUserLink validation enforced

---

## Test Case SEC-004: JWT Token Manipulation

**Priority:** High
**Type:** Security
**Module:** Authentication

### Description
Verify that JWT tokens cannot be tampered with.

### Preconditions
- JWT signed with HS256 and secret key

### Test Steps
1. Obtain valid JWT token
2. Decode token (base64)
3. Modify claims:
   - Change role from "Employee" to "SystemAdmin"
   - Change userId
4. Re-encode token (without re-signing)
5. Send request with modified token

### Expected Results
- Modified token rejected
- HTTP Status Code: 401 Unauthorized
- Error: "Invalid token signature"
- Token signature validation prevents tampering
- HMAC-SHA256 signature verified on every request
- Secret key secure (not in source code, in environment variables)

---

## Test Case SEC-005: CSRF Protection

**Priority:** Medium
**Type:** Security
**Module:** API

### Description
Verify that state-changing operations are protected against CSRF attacks.

### Preconditions
- SameSite cookie attribute configured
- CORS properly configured

### Test Steps
1. Create malicious page that attempts CSRF:
   ```html
   <form action="http://localhost:5099/api/v1/employees" method="POST">
     <input type="hidden" name="code" value="HACK001">
   </form>
   <script>document.forms[0].submit();</script>
   ```
2. User visits malicious page while logged in
3. Observe if employee is created

### Expected Results
- CSRF attack fails
- No employee created
- Protection mechanisms:
  - SameSite cookie attribute (Strict or Lax)
  - CORS checks origin header
  - Anti-forgery tokens (if implemented)
- Refresh token cookie: HttpOnly, Secure, SameSite=Strict

---

## Test Case SEC-006: Password Security and Hashing

**Priority:** High
**Type:** Security
**Module:** Authentication

### Description
Verify that passwords are securely hashed and stored.

### Preconditions
- User registration available

### Test Steps
1. Register user with password: "TestPassword123!"
2. Query database directly for user record
3. Check password field
4. Attempt to use password hash directly for login
5. Change password and verify different hash

### Expected Results
- Password not stored in plaintext
- Hashing algorithm: PBKDF2-SHA256 or bcrypt
- Password field contains hash:
  - Long string (>60 characters)
  - Includes salt (unique per user)
  - Format: `$algorithm$iterations$salt$hash`
- Direct hash login fails (hash is not password)
- Different hash generated on password change (different salt)
- Minimum password requirements enforced:
  - Length: 8+ characters
  - Complexity: uppercase, lowercase, number, special character

---

## Test Case SEC-007: Rate Limiting and Brute Force Protection

**Priority:** High
**Type:** Security
**Module:** Authentication

### Description
Verify that rate limiting prevents brute force attacks.

### Preconditions
- Rate limiting configured: 10 requests per minute for /auth endpoints

### Test Steps
1. Attempt 15 consecutive failed login attempts within 1 minute
2. Observe responses

### Expected Results
- First 10 attempts: Normal processing (401 Unauthorized)
- Attempts 11-15:
  - HTTP Status Code: 429 Too Many Requests
  - Error: "Rate limit exceeded. Try again in X seconds."
  - Retry-After header present
- Rate limit resets after 1 minute
- Account lockout after 5 failed attempts (separate mechanism)
- IP-based rate limiting protects against distributed attacks

---

## Test Case SEC-008: Sensitive Data Exposure

**Priority:** High
**Type:** Security
**Module:** API

### Description
Verify that sensitive data is not exposed in API responses or logs.

### Preconditions
- User account with password, tokens, and personal data

### Test Steps
1. GET `/api/v1/users/{id}`
2. Check response for sensitive fields
3. Trigger error and check error response
4. Check application logs

### Expected Results
- API response excludes:
  - Password hash
  - Refresh tokens
  - JWT secrets
  - Internal IDs (if applicable)
- Error responses:
  - Generic messages (not stack traces)
  - No database schema information
  - No file paths
- Logs:
  - No passwords logged (even during debug)
  - Tokens redacted ([REDACTED])
  - Personal data minimized

---

## Test Case SEC-009: File Upload Security

**Priority:** High
**Type:** Security
**Module:** File Upload

### Description
Verify that file uploads are secure and validated.

### Preconditions
- File upload enabled for excuse requests

### Test Steps
1. Upload valid PDF file (2 MB)
2. Upload executable file (.exe)
3. Upload oversized file (10 MB)
4. Upload file with double extension (document.pdf.exe)
5. Upload file with malicious content (PHP script renamed to .pdf)

### Expected Results
- Step 1: Success
- Step 2:
  - Rejected - invalid file type
  - File extension validation
- Step 3:
  - Rejected - exceeds size limit (5 MB)
- Step 4:
  - Rejected - double extension detection
- Step 5:
  - Content-type validation (MIME type check)
  - File signature verification (magic numbers)
  - Virus scanning (if configured)
- Files stored outside web root
- Filenames sanitized (no path traversal)
- Access controlled via API (no direct file URLs)

---

## Test Case SEC-010: HTTPS and Secure Communication

**Priority:** High
**Type:** Security
**Module:** Infrastructure

### Description
Verify that all communication uses HTTPS and secure protocols.

### Preconditions
- Production environment
- SSL certificate configured

### Test Steps
1. Attempt HTTP request to API
2. Check SSL certificate validity
3. Verify security headers
4. Test for mixed content

### Expected Results
- HTTP requests:
  - Redirect to HTTPS (301 Moved Permanently) OR
  - Rejected entirely
- HTTPS enforced for all requests
- SSL certificate:
  - Valid and not expired
  - Issued by trusted CA
  - Matches domain name
- Security headers:
  - Strict-Transport-Security: max-age=31536000; includeSubDomains
  - X-Frame-Options: DENY or SAMEORIGIN
  - X-Content-Type-Options: nosniff
  - Content-Security-Policy: [appropriate policy]
- No mixed content (HTTP resources on HTTPS page)

---

## Test Execution Notes

### Test Data Requirements
- Test user accounts with different roles
- Malicious payloads for injection testing
- Test files (valid and malicious)

### Testing Tools
- OWASP ZAP or Burp Suite (vulnerability scanning)
- Postman or curl (API testing)
- Browser DevTools (header inspection)
- Database client (direct database access)

### Environment Setup
- Testing environment with security logging enabled
- Production-like configuration
- SSL certificate (even if self-signed for testing)

### Compliance Considerations
- OWASP Top 10 coverage
- PCI DSS (if handling payments)
- GDPR (data protection)
- SOC 2 (if required)

---

## Traceability Matrix

| Test Case | OWASP Category | Priority | Status |
|-----------|----------------|----------|--------|
| SEC-001 | A03:Injection | High | ⬜ Not Run |
| SEC-002 | A03:Injection (XSS) | High | ⬜ Not Run |
| SEC-003 | A01:Broken Access Control | High | ⬜ Not Run |
| SEC-004 | A07:Identification Failures | High | ⬜ Not Run |
| SEC-005 | A01:Broken Access Control | Medium | ⬜ Not Run |
| SEC-006 | A02:Cryptographic Failures | High | ⬜ Not Run |
| SEC-007 | A07:Identification Failures | High | ⬜ Not Run |
| SEC-008 | A02:Cryptographic Failures | High | ⬜ Not Run |
| SEC-009 | A04:Insecure Design | High | ⬜ Not Run |
| SEC-010 | A02:Cryptographic Failures | High | ⬜ Not Run |
