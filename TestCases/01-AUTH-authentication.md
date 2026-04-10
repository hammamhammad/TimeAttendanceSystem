# TC-AUTH: Authentication & Session Management — Test Cases

## Module Overview

Authentication is the gateway to the entire TecAxle HRMS system. It uses email-based tenant resolution from a master database, JWT tokens with role/permission claims, progressive account lockout, two-factor authentication, and password policy enforcement. This module covers both the Admin Portal and Self-Service Portal login flows.

**Admin Pages**: `/login`, `/auth/change-password`
**Self-Service Pages**: `/login`, `/auth/change-password`
**API Endpoints**: `POST /api/v1/auth/login`, `POST /api/v1/auth/refresh`, `POST /api/v1/auth/logout`, `POST /api/v1/auth/change-password`, `POST /api/v1/auth/verify-2fa`
**Backend Handler**: `LoginCommandHandler.cs`

---

## Test Environment

| Item | Value |
|------|-------|
| Backend | http://localhost:5099 |
| Admin Portal | http://localhost:4200 |
| Self-Service Portal | http://localhost:4201 |

### Test Users

| Role | Email | Password | Notes |
|------|-------|----------|-------|
| Platform Admin | (from master seed) | (from master seed) | `is_platform_user=true` in JWT |
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | IsSystemUser=true |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | MustChangePassword=true |
| Employee | salma.khaldi@company.com | Emp@123! | MustChangePassword=true |

---

## Test Cases

### A. Login Page UI

#### TC-AUTH-001: Login page renders correctly (Admin Portal)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /login |
| **Role** | Unauthenticated |

**Preconditions:**
1. User is not logged in
2. Admin Portal is running on port 4200

**Steps:**
1. Open http://localhost:4200/login in browser

**Expected Results:**
- Login page renders with:
  - Email input field (type="email")
  - Password input field (type="password")
  - "Login" button
  - Language toggle (EN/AR)
  - TecAxle HRMS branding/logo
- Email field has focus on page load
- Login button is visible and styled correctly

---

#### TC-AUTH-002: Login page renders correctly (Self-Service Portal)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /login |
| **Role** | Unauthenticated |

**Preconditions:**
1. Self-Service Portal is running on port 4201

**Steps:**
1. Open http://localhost:4201/login in browser

**Expected Results:**
- Login page renders with same fields as admin portal
- Self-service branding/styling applied

---

#### TC-AUTH-003: Login button disabled when email field is empty
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /login |
| **Role** | Unauthenticated |

**Steps:**
1. Navigate to /login
2. Leave email field empty
3. Enter "SomePassword123!" in password field
4. Observe Login button state

**Expected Results:**
- Login button is disabled OR form validation prevents submission
- No API call is made

---

#### TC-AUTH-004: Login button disabled when password field is empty
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /login |
| **Role** | Unauthenticated |

**Steps:**
1. Navigate to /login
2. Enter "test@company.com" in email field
3. Leave password field empty
4. Observe Login button state

**Expected Results:**
- Login button is disabled OR form validation prevents submission

---

#### TC-AUTH-005: Password field masks input characters
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /login |
| **Role** | Unauthenticated |

**Steps:**
1. Navigate to /login
2. Type "MyPassword123!" in the password field

**Expected Results:**
- Characters are masked (shown as dots/bullets)
- Input type is "password"

---

#### TC-AUTH-006: Language toggle switches between EN and AR
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /login |
| **Role** | Unauthenticated |

**Steps:**
1. Navigate to /login (default: English)
2. Click the language toggle to switch to Arabic
3. Observe the page layout and text
4. Click toggle again to switch back to English

**Expected Results:**
- Arabic: Page direction changes to RTL, all labels in Arabic
- English: Page direction LTR, all labels in English
- Language preference persists across page refreshes

---

#### TC-AUTH-007: Login form field length validation
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Page** | /login |
| **Role** | Unauthenticated |

**Steps:**
1. Navigate to /login
2. Enter 101-character string in email field (maxLength: 100)
3. Enter 501-character string in password field (maxLength: 500)

**Expected Results:**
- Email field truncates or shows validation error at 100 characters
- Password field truncates or shows validation error at 500 characters

---

### B. Email-Based Tenant Resolution

#### TC-AUTH-008: Tenant user login resolves tenant from TenantUserEmails
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /login |
| **Role** | Tenant User |

**Preconditions:**
1. Tenant exists with provisioned database
2. User email "ahmed.rashid@company.com" is mapped in master `TenantUserEmails` table
3. Tenant is Active and not Deleted

**Steps:**
1. Navigate to Admin Portal /login
2. Enter "ahmed.rashid@company.com" in email field
3. Enter "Emp@123!" in password field
4. Click Login

**Expected Results:**
- System queries master DB `TenantUserEmails` table
- Finds tenant mapping for this email
- Authenticates user against the tenant's dedicated database
- Login succeeds (redirect to change password if MustChangePassword=true)
- JWT token contains `tenant_id` claim

---

#### TC-AUTH-009: Platform admin login falls back to PlatformUsers table
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /login |
| **Role** | Platform Admin |

**Preconditions:**
1. Platform admin email exists in master `PlatformUsers` table
2. Email does NOT exist in `TenantUserEmails` table

**Steps:**
1. Navigate to Admin Portal /login
2. Enter platform admin email
3. Enter platform admin password
4. Click Login

**Expected Results:**
- System checks `TenantUserEmails` first — no match
- Falls back to `PlatformUsers` table in master DB
- Authenticates successfully
- JWT contains `is_platform_user=true` claim
- JWT contains `platform_role` claim
- JWT does NOT contain `tenant_id` claim
- Roles = ["SystemAdmin"], Permissions = ["*"]
- Redirect to admin dashboard (Platform menu only visible)

---

#### TC-AUTH-010: Email not found in any table returns error
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Negative |
| **Page** | /login |
| **Role** | Unauthenticated |

**Steps:**
1. Navigate to /login
2. Enter "nonexistent@unknown.com" in email field
3. Enter "SomePassword1!" in password field
4. Click Login

**Expected Results:**
- System checks `TenantUserEmails` — no match
- System checks `PlatformUsers` — no match
- Error displayed: "Invalid credentials."
- No JWT token issued
- User remains on login page

---

#### TC-AUTH-011: Email mapped to multiple tenants returns tenant selection
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /login |
| **Role** | Multi-Tenant User |

**Preconditions:**
1. Same email address mapped in `TenantUserEmails` for 2+ tenants

**Steps:**
1. Navigate to /login
2. Enter the multi-tenant email
3. Enter password
4. Click Login

**Expected Results:**
- API returns response with `requiresTenantSelection=true`
- Response includes list of tenant options (id, name)
- UI shows tenant selection dialog/dropdown
- User selects a tenant and re-submits
- Authentication proceeds against selected tenant's DB

---

#### TC-AUTH-012: Email normalization — case insensitive
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /login |
| **Role** | Tenant User |

**Steps:**
1. Navigate to /login
2. Enter "Ahmed.Rashid@COMPANY.COM" (mixed case)
3. Enter correct password
4. Click Login

**Expected Results:**
- Email normalized to lowercase: "ahmed.rashid@company.com"
- Tenant resolution succeeds
- Login succeeds (same as lowercase email)

---

#### TC-AUTH-013: Inactive tenant — email mapping skipped
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /login |
| **Role** | Tenant User |

**Preconditions:**
1. Tenant exists but `IsActive=false`
2. User email exists in `TenantUserEmails` for this tenant

**Steps:**
1. Navigate to /login
2. Enter the user's email
3. Enter correct password
4. Click Login

**Expected Results:**
- `TenantUserEmails` query filters by `tue.Tenant.IsActive && !tue.Tenant.IsDeleted`
- Inactive tenant's mapping is excluded
- If no other tenant mapping exists → falls back to PlatformUsers
- If not a platform user → "Invalid credentials."

---

#### TC-AUTH-014: Deleted tenant — email mapping skipped
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /login |
| **Role** | Tenant User |

**Preconditions:**
1. Tenant exists but `IsDeleted=true`

**Steps:**
1. Same as TC-AUTH-013 but with deleted tenant

**Expected Results:**
- Same as TC-AUTH-013 — deleted tenant's mapping excluded

---

#### TC-AUTH-015: TenantId provided in login request — validated against mappings
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Tenant User |

**Steps:**
1. Call `POST /api/v1/auth/login` with body:
   ```json
   { "email": "ahmed.rashid@company.com", "password": "Emp@123!", "tenantId": 999 }
   ```
   Where tenantId 999 does NOT match the user's actual tenant

**Expected Results:**
- System resolves email to tenant X, but request specifies tenant 999
- Validation fails — tenant mismatch
- Error response returned

---

### C. JWT Token Structure & Claims

#### TC-AUTH-016: Tenant user JWT contains required claims
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Tenant User |

**Preconditions:**
1. Valid tenant user exists

**Steps:**
1. Login via API: `POST /api/v1/auth/login`
2. Decode the returned `accessToken` (JWT)

**Expected Results:**
JWT payload contains:
- `jti` — unique token ID (GUID)
- `sub` — user ID
- `email` — user's email
- `tenant_id` — tenant ID (number)
- `role` — array of role names (e.g., ["SystemAdmin", "Admin"])
- `permission` — array of permission keys (e.g., ["user.read", "employee.read"])
- `branch_scope` — array of branch IDs (e.g., ["101", "102"])
- `preferred_language` — "en" or "ar"
- `iss` — issuer (from config)
- `aud` — audience (from config)
- `exp` — expiration timestamp
- `iat` — issued at timestamp

---

#### TC-AUTH-017: Platform admin JWT contains platform-specific claims
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Platform Admin |

**Steps:**
1. Login as platform admin via API
2. Decode the returned `accessToken`

**Expected Results:**
JWT payload contains:
- `is_platform_user` = "true"
- `platform_role` — e.g., "TecAxleAdmin"
- `role` = ["SystemAdmin"]
- `permission` = ["*"]
- `branch_scope` = [] (empty)
- Does NOT contain `tenant_id` claim

---

#### TC-AUTH-018: Access token expires per configuration
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Any |

**Steps:**
1. Login and get access token
2. Decode JWT — note `exp` claim
3. Wait until expiration time passes
4. Call any protected API endpoint with the expired token

**Expected Results:**
- Default expiry: 15 minutes (configurable via `Jwt:ExpiryMinutes`)
- After expiry: API returns 401 Unauthorized
- Token cannot be used for any authenticated endpoint

---

#### TC-AUTH-019: Refresh token has 7-day expiry
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Any |

**Steps:**
1. Login and receive refresh token
2. Verify in database: `RefreshTokens` table has entry with `ExpiresAtUtc` = login time + 7 days

**Expected Results:**
- Refresh token stored in DB with:
  - `Token` = the refresh token string
  - `ExpiresAtUtc` = creation time + 7 days
  - `UserId` = logged-in user ID
  - `DeviceInfo` = request device info (if provided)
  - `CreatedAtUtc` = current UTC time

---

#### TC-AUTH-020: Refresh token flow issues new access + refresh tokens
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Any |

**Steps:**
1. Login and get accessToken + refreshToken
2. Wait for access token to expire (or use expired token)
3. Call `POST /api/v1/auth/refresh` with: `{ "refreshToken": "<token>" }`

**Expected Results:**
- New accessToken issued (different from original)
- New refreshToken issued
- Old refresh token invalidated
- New tokens have fresh expiration times

---

### D. Password Verification & Account Lockout

#### TC-AUTH-021: Valid credentials — successful login
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /login |
| **Role** | Any |

**Steps:**
1. Navigate to /login
2. Enter valid email and correct password
3. Click Login

**Expected Results:**
- Login succeeds
- Redirect to dashboard (or change password page if MustChangePassword=true)
- JWT tokens stored in browser (localStorage/cookie)
- User info displayed in topbar (name, role)

---

#### TC-AUTH-022: Invalid password — error message
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Negative |
| **Page** | /login |
| **Role** | Any |

**Steps:**
1. Navigate to /login
2. Enter valid email "ahmed.rashid@company.com"
3. Enter incorrect password "WrongPassword1!"
4. Click Login

**Expected Results:**
- Error message displayed: "Invalid credentials."
- No JWT tokens issued
- User remains on login page
- `FailedLoginAttempts` incremented by 1 in database
- `LastFailedLoginAtUtc` updated to current time

---

#### TC-AUTH-023: Disabled user account — specific error
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Negative |
| **Page** | /login |
| **Role** | Any |

**Preconditions:**
1. User account exists with `IsActive=false`

**Steps:**
1. Navigate to /login
2. Enter disabled user's email and correct password
3. Click Login

**Expected Results:**
- Error message: "User account is disabled."
- No JWT tokens issued
- Login fails regardless of correct password

---

#### TC-AUTH-024: Locked user account — specific error
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Negative |
| **Page** | /login |
| **Role** | Any |

**Preconditions:**
1. User account has `LockoutEndUtc` set to a future time

**Steps:**
1. Navigate to /login
2. Enter locked user's email and correct password
3. Click Login

**Expected Results:**
- Error message: "User account is locked."
- No JWT tokens issued
- Login fails even with correct password

---

#### TC-AUTH-025: Progressive lockout — 5 failed attempts = 15 minute lock
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /login |
| **Role** | Any |

**Steps:**
1. Navigate to /login
2. Enter valid email
3. Enter wrong password 5 times consecutively
4. Attempt 6th login with CORRECT password

**Expected Results:**
- Attempts 1-4: "Invalid credentials." each time
- Attempt 5: "Invalid credentials." AND `LockoutEndUtc` set to `UtcNow + 15 minutes`
- Attempt 6 (with correct password): "User account is locked."
- After 15 minutes: login succeeds with correct password

---

#### TC-AUTH-026: Progressive lockout — 10 failed attempts = 1 hour lock
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /login |
| **Role** | Any |

**Steps:**
1. After 15-minute lockout expires from TC-AUTH-025
2. Continue with 5 more wrong password attempts (total 10)

**Expected Results:**
- At 10th failed attempt: `LockoutEndUtc` set to `UtcNow + 1 hour`
- Account locked for 1 hour

---

#### TC-AUTH-027: Progressive lockout — 15 failed attempts = 24 hour lock
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /login |
| **Role** | Any |

**Steps:**
1. After 1-hour lockout expires
2. Continue with 5 more wrong password attempts (total 15)

**Expected Results:**
- At 15th failed attempt: `LockoutEndUtc` set to `UtcNow + 24 hours`
- Account locked for 24 hours

**Lockout Summary Table:**

| Failed Attempts | Lockout Duration |
|----------------|-----------------|
| < 5 | No lockout |
| 5-9 | 15 minutes |
| 10-14 | 1 hour |
| 15+ | 24 hours |

---

#### TC-AUTH-028: Successful login resets failed attempt counter
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /login |
| **Role** | Any |

**Preconditions:**
1. User has 3 failed login attempts (below lockout threshold)

**Steps:**
1. Login with correct credentials

**Expected Results:**
- Login succeeds
- In database:
  - `FailedLoginAttempts` = 0
  - `LockoutEndUtc` = null
  - `LastFailedLoginAtUtc` = null

---

#### TC-AUTH-029: Lockout expiry — user can login after lock period
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /login |
| **Role** | Any |

**Preconditions:**
1. User locked for 15 minutes (5 failed attempts)
2. 15 minutes have passed

**Steps:**
1. Login with correct credentials after lockout period

**Expected Results:**
- `LockoutEndUtc` is now in the past
- Login succeeds
- Failed attempts counter resets

---

#### TC-AUTH-030: Platform admin lockout — 5 attempts = 15 min
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /login |
| **Role** | Platform Admin |

**Steps:**
1. Enter platform admin email
2. Enter wrong password 5 times

**Expected Results:**
- Lockout rule for platform admin: 5 attempts → 15 minute lock
- Same error messages as tenant user lockout

---

### E. Two-Factor Authentication

#### TC-AUTH-031: 2FA enabled user — login requires verification
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /login |
| **Role** | Any |

**Preconditions:**
1. User has `TwoFactorEnabled=true`

**Steps:**
1. Login with correct email and password

**Expected Results:**
- Login response includes flag: "Two-factor authentication required."
- No JWT tokens issued yet
- UI shows 2FA verification screen/field

---

#### TC-AUTH-032: Valid 2FA code — tokens issued
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /login |
| **Role** | Any |

**Steps:**
1. After TC-AUTH-031, enter valid 2FA code
2. Call `POST /api/v1/auth/verify-2fa` with code

**Expected Results:**
- 2FA code verified successfully
- JWT accessToken and refreshToken issued
- Login completes — redirect to dashboard

---

#### TC-AUTH-033: Invalid 2FA code — rejection
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Negative |
| **Page** | /login |
| **Role** | Any |

**Steps:**
1. After 2FA prompt, enter invalid code "000000"
2. Submit

**Expected Results:**
- Error message indicating invalid code
- No tokens issued
- User can retry

---

#### TC-AUTH-034: 2FA backup code usage
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /login |
| **Role** | Any |

**Preconditions:**
1. User has generated 2FA backup codes

**Steps:**
1. Login, get 2FA prompt
2. Enter a valid backup code instead of TOTP code

**Expected Results:**
- Backup code accepted
- Login succeeds
- Used backup code is invalidated (cannot be reused)

---

#### TC-AUTH-035: 2FA setup and disable flow
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | Settings |
| **Role** | Any |

**Steps:**
1. Navigate to security settings
2. Enable 2FA — get QR code / secret
3. Scan with authenticator app
4. Enter verification code to confirm setup
5. Logout and login again — verify 2FA prompt appears
6. Disable 2FA from settings

**Expected Results:**
- Enable: `TwoFactorEnabled` set to true, secret stored
- Login now requires 2FA code
- Disable: `TwoFactorEnabled` set to false
- Login no longer requires 2FA

---

### F. MustChangePassword Flow

#### TC-AUTH-036: User with MustChangePassword=true forced to change password
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /auth/change-password |
| **Role** | Any |

**Preconditions:**
1. User has `MustChangePassword=true` (all sample data employees)

**Steps:**
1. Login with "salma.khaldi@company.com" / "Emp@123!"
2. Observe redirect behavior

**Expected Results:**
- Login succeeds (token issued)
- Immediately redirected to /auth/change-password
- Cannot navigate to any other page until password changed
- Change password page displays

---

#### TC-AUTH-037: Cannot access other pages before changing password
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Any |
| **Role** | Any |

**Preconditions:**
1. Logged in with MustChangePassword=true

**Steps:**
1. Try to navigate to /dashboard directly (via URL)
2. Try to navigate to /employees
3. Try to call any API endpoint

**Expected Results:**
- All navigation redirected back to /auth/change-password
- API calls may be restricted or return error

---

#### TC-AUTH-038: After password change, MustChangePassword set to false
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /auth/change-password |
| **Role** | Any |

**Steps:**
1. On change password page (redirected from login)
2. Enter current password: "Emp@123!"
3. Enter new password: "NewPass@2026!"
4. Confirm new password: "NewPass@2026!"
5. Submit

**Expected Results:**
- Password changed successfully
- `MustChangePassword` set to false in database
- Redirect to dashboard
- Can navigate freely to all permitted pages
- Next login uses new password

---

#### TC-AUTH-039: All sample data employees have MustChangePassword=true
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /login |
| **Role** | Sample Employee |

**Steps:**
1. Login as any sample employee (e.g., ahmed.rashid@company.com)
2. Observe behavior

**Expected Results:**
- All 50 sample employees have `MustChangePassword=true`
- First login always redirects to change password
- Default password for all: "Emp@123!"

---

### G. Password Change & Policy Enforcement

#### TC-AUTH-040: Password requirements — minimum 8 characters with complexity
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /auth/change-password |
| **Role** | Any |

**Password Policy:**
```
Pattern: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$

Requirements:
- Minimum 8 characters
- At least one lowercase letter (a-z)
- At least one uppercase letter (A-Z)
- At least one digit (0-9)
- At least one special character (!@#$%^&*()-_+=)
```

**Boundary Value Tests:**

| # | Password | Valid? | Reason |
|---|----------|--------|--------|
| 1 | `Abc1!` | No | Too short (5 chars) |
| 2 | `Abcdefg1` | No | Missing special character |
| 3 | `abcdefg1!` | No | Missing uppercase |
| 4 | `ABCDEFG1!` | No | Missing lowercase |
| 5 | `Abcdefgh!` | No | Missing digit |
| 6 | `Abc1234!` | Yes | 8 chars, all types present |
| 7 | `MyP@ssw0rd` | Yes | 10 chars, all types present |
| 8 | `a` (1 char) | No | Too short, missing types |
| 9 | 128 chars (valid) | Yes | At max length |
| 10 | 129 chars | No | Exceeds maxLength(128) |

---

#### TC-AUTH-041: Change password — current password must match
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /auth/change-password |
| **Role** | Any |

**Steps:**
1. Navigate to change password page
2. Enter wrong current password: "WrongPassword1!"
3. Enter valid new password: "NewPass@2026!"
4. Confirm new password: "NewPass@2026!"
5. Submit

**Expected Results:**
- Error: current password does not match
- Password not changed

---

#### TC-AUTH-042: Change password — new and confirm must match
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /auth/change-password |
| **Role** | Any |

**Steps:**
1. Enter correct current password
2. Enter new password: "NewPass@2026!"
3. Enter confirm password: "DifferentPass@2026!"
4. Submit

**Expected Results:**
- Error: passwords do not match
- Password not changed

---

#### TC-AUTH-043: Password history — cannot reuse recent passwords
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /auth/change-password |
| **Role** | Any |

**Preconditions:**
1. User previously had password "OldPass@2025!"
2. Password was changed to current password

**Steps:**
1. Try to change password back to "OldPass@2025!"

**Expected Results:**
- Error: cannot reuse recent password
- Password history tracked in `PasswordHistory` table

---

#### TC-AUTH-044: Password field lengths
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Page** | /auth/change-password |
| **Role** | Any |

**Boundary Tests:**

| Field | Min | Max | Test Values |
|-------|-----|-----|-------------|
| Current Password | 1 | 500 | "" (empty) → required error |
| New Password | 8 | 128 | 7 chars → too short; 8 chars → ok; 128 chars → ok; 129 chars → too long |
| Confirm Password | — | — | Must match new password exactly |

---

### H. Session Management

#### TC-AUTH-045: Logout blacklists current token
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Any |

**Steps:**
1. Login and get access token
2. Call `POST /api/v1/auth/logout`
3. Attempt to use the same access token for any API call

**Expected Results:**
- Logout succeeds (200 OK)
- Token added to `BlacklistedTokens` table
- Subsequent API calls with this token return 401 Unauthorized

---

#### TC-AUTH-046: Blacklisted token rejected on subsequent requests
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Any |

**Steps:**
1. After logout (TC-AUTH-045)
2. Call `GET /api/v1/employees` with the blacklisted token

**Expected Results:**
- 401 Unauthorized response
- Token check: system validates against `BlacklistedTokens` table

---

#### TC-AUTH-047: Audit log created on successful login
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Any |

**Steps:**
1. Login successfully
2. Check `AuditLogs` table in tenant DB

**Expected Results:**
- New `AuditLog` entry created with:
  - `ActorUserId` = logged-in user ID
  - `Action` = "Login"
  - `EntityName` = "User"
  - `EntityId` = user ID
  - `CreatedAtUtc` = login time

---

#### TC-AUTH-048: Multiple concurrent sessions supported
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /login |
| **Role** | Any |

**Steps:**
1. Login from Browser A — get tokens
2. Login from Browser B (same user) — get different tokens
3. Use tokens from Browser A — still valid
4. Use tokens from Browser B — also valid

**Expected Results:**
- Both sessions active simultaneously
- Each has its own access + refresh tokens
- Actions in one session don't invalidate the other

---

#### TC-AUTH-049: Unauthenticated access to protected routes — redirect to login
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | Any protected page |
| **Role** | Unauthenticated |

**Steps:**
1. Clear all tokens/cookies
2. Navigate to http://localhost:4200/dashboard
3. Navigate to http://localhost:4200/employees

**Expected Results:**
- Redirected to /login page
- No data displayed
- Auth guard (`authGuard`) intercepts and redirects

---

#### TC-AUTH-050: API call without token returns 401
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | API |
| **Role** | Unauthenticated |

**Steps:**
1. Call `GET /api/v1/employees` without Authorization header

**Expected Results:**
- HTTP 401 Unauthorized
- Response body: `{ "statusCode": 401, "message": "...", "traceId": "..." }`

---

### I. Error Response Format

#### TC-AUTH-051: Login validation error returns standardized format
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | API |
| **Role** | Unauthenticated |

**Steps:**
1. Call `POST /api/v1/auth/login` with empty body: `{}`

**Expected Results:**
- HTTP 400 Bad Request
- Response format:
  ```json
  {
    "statusCode": 400,
    "message": "Email is required for auth.; Password is required for auth.",
    "traceId": "0HN5AQFUGG8N4:00000001"
  }
  ```
- In Development mode, also includes `detail` and `stackTrace`

---

#### TC-AUTH-052: Server error returns 500 with traceId
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Edge Case |
| **Page** | API |
| **Role** | Any |

**Steps:**
1. Simulate a server error (e.g., database unreachable)

**Expected Results:**
- HTTP 500 Internal Server Error
- Response:
  ```json
  {
    "statusCode": 500,
    "message": "An unexpected error occurred. Please try again later.",
    "traceId": "..."
  }
  ```
- No stack trace in production mode
- Stack trace included in development mode

---

### J. Self-Service Portal Login

#### TC-AUTH-053: Self-service login with employee credentials
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Self-Service /login |
| **Role** | Employee |

**Steps:**
1. Open http://localhost:4201/login
2. Enter "salma.khaldi@company.com"
3. Enter password
4. Click Login

**Expected Results:**
- Login succeeds
- Redirect to employee dashboard (or change password)
- Employee-specific navigation shown (no admin menus)
- Same JWT token structure as admin login

---

#### TC-AUTH-054: Manager sees additional menu items in self-service
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Authorization |
| **Page** | Self-Service |
| **Role** | Manager |

**Steps:**
1. Login to self-service as "ahmed.rashid@company.com" (Branch Manager)

**Expected Results:**
- Standard employee menu items visible
- Additional manager items visible: Manager Dashboard, Team Members, Pending Approvals
- `managerGuard` allows access to `/manager-dashboard`, `/team-members`, `/pending-approvals`

---

#### TC-AUTH-055: Non-manager cannot access manager routes
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | Self-Service |
| **Role** | Employee |

**Steps:**
1. Login to self-service as regular employee (salma.khaldi@company.com)
2. Try to navigate to /manager-dashboard
3. Try to navigate to /team-members
4. Try to navigate to /pending-approvals

**Expected Results:**
- Redirected to /unauthorized page
- Manager-specific menu items NOT visible in navigation
- `managerGuard` blocks access

---

## Summary

| Section | Test Cases | P0 | P1 | P2 | P3 |
|---------|-----------|----|----|----|----|
| A. Login Page UI | 7 | 2 | 2 | 3 | 0 |
| B. Tenant Resolution | 8 | 4 | 4 | 0 | 0 |
| C. JWT Claims | 5 | 2 | 3 | 0 | 0 |
| D. Password & Lockout | 9 | 4 | 4 | 1 | 0 |
| E. Two-Factor Auth | 5 | 0 | 3 | 2 | 0 |
| F. MustChangePassword | 4 | 2 | 2 | 0 | 0 |
| G. Password Change | 5 | 0 | 3 | 2 | 0 |
| H. Session Management | 6 | 2 | 3 | 1 | 0 |
| I. Error Response | 2 | 0 | 1 | 1 | 0 |
| J. Self-Service Login | 3 | 2 | 1 | 0 | 0 |
| **TOTAL** | **54** | **18** | **26** | **10** | **0** |
