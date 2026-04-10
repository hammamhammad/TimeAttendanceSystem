# TC-PLAT: Platform Management — Test Cases

## Module Overview

Platform Management is the TecAxle-level administration layer that controls multi-tenant operations: creating and managing tenants, configuring subscription plans with module entitlements, and assigning/changing/cancelling subscriptions. Only platform admin users (TecAxleAdmin / TecAxleSupport) can access these features. Tenant provisioning auto-creates a dedicated PostgreSQL database per tenant, seeds system admin users, and assigns the selected subscription plan.

**Admin Pages**: `/tenants`, `/tenants/create`, `/tenants/:id/view`, `/tenants/:id/edit`, `/subscription-plans`, `/subscription-plans/create`, `/subscription-plans/:id/edit`
**API Endpoints**: `GET/POST/PUT /api/v1/tenants`, `POST /api/v1/tenants/{id}/activate`, `POST /api/v1/tenants/{id}/suspend`, `GET/POST/PUT/DELETE /api/v1/subscription-plans`, `GET/POST /api/v1/tenants/{tenantId}/subscription`, `PUT /api/v1/tenants/{tenantId}/subscription/change-plan`, `POST /api/v1/tenants/{tenantId}/subscription/cancel`
**Backend Handlers**: `CreateTenantCommandHandler.cs`, `UpdateTenantCommandHandler.cs`, `TenantProvisioningService.cs`, `ChangePlanCommandHandler.cs`, `CancelSubscriptionCommandHandler.cs`

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
| Platform Admin | (from master seed) | (from master seed) | `is_platform_user=true`, `platform_role=TecAxleAdmin` in JWT |
| Platform Support | (from master seed) | (from master seed) | `platform_role=TecAxleSupport` in JWT |
| Tenant SystemAdmin | systemadmin@{domain} | TecAxle@Sys2026! | IsSystemUser=true, tenant-scoped JWT |
| Tenant Employee | salma.khaldi@company.com | Emp@123! | Regular tenant user |

---

## Test Cases

### A. Platform Admin UI Isolation & Authorization

#### TC-PLAT-001: Platform admin sees only Platform menu items
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Module** | Platform Management |
| **Page** | Admin Portal (all pages) |
| **Role** | Platform Admin |

**Preconditions:**
1. Platform admin user exists in master `PlatformUsers` table
2. Admin Portal is running on port 4200

**Steps:**
1. Login to Admin Portal as Platform Admin
2. Observe the sidebar navigation

**Expected Results:**
- Sidebar shows ONLY the "Platform" menu group containing:
  - Tenants
  - Subscription Plans
- All other menu groups are hidden (Organization, Time & Attendance, Leave & Absence, HR & Lifecycle, etc.)
- `platformPaths` and `platformGroupKeys` sets in `sidenav.component.ts` control visibility
- No tenant-specific data is loaded

---

#### TC-PLAT-002: Platform admin — FilterRegistryService skips tenant-only API calls
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Module** | Platform Management |
| **Page** | Admin Portal |
| **Role** | Platform Admin |

**Preconditions:**
1. Logged in as Platform Admin

**Steps:**
1. Login as Platform Admin
2. Open browser DevTools Network tab
3. Observe API calls made after login

**Expected Results:**
- `FilterRegistryService` auth effect detects `isPlatformUser` and skips tenant-only API calls
- No calls made to `/api/v1/branches`, `/api/v1/departments`, `/api/v1/employees`, etc.
- No calls made to `/api/v1/entitlements` (entitlement loading skipped for platform admin)
- No console errors related to missing tenant context

---

#### TC-PLAT-003: Platform admin — NotificationBellComponent skipped
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Module** | Platform Management |
| **Page** | Admin Portal topbar |
| **Role** | Platform Admin |

**Preconditions:**
1. Logged in as Platform Admin

**Steps:**
1. Observe the topbar after login

**Expected Results:**
- Notification bell component either hidden or does not make API calls to `/api/v1/notifications`
- No errors in console related to notification fetching
- SignalR notification hub connection is not established (no tenant context)

---

#### TC-PLAT-004: Tenant admin does NOT see Platform menu items
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Module** | Platform Management |
| **Page** | Admin Portal sidebar |
| **Role** | Tenant SystemAdmin |

**Preconditions:**
1. Logged in as tenant SystemAdmin (e.g., systemadmin@company.com)

**Steps:**
1. Login to Admin Portal as tenant SystemAdmin
2. Observe the sidebar navigation

**Expected Results:**
- "Platform" menu group is NOT visible
- Tenants page and Subscription Plans page are NOT accessible
- All tenant-specific menu groups are visible (Organization, Time & Attendance, etc.)
- Navigating to `/tenants` directly returns 403 or redirects to unauthorized page

---

#### TC-PLAT-005: Regular employee cannot access tenant management API
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Module** | Platform Management |
| **Page** | API |
| **Role** | Tenant Employee |

**Preconditions:**
1. Logged in as regular employee

**Steps:**
1. Call `GET /api/v1/tenants` with employee's JWT token
2. Call `POST /api/v1/tenants` with employee's JWT token
3. Call `GET /api/v1/subscription-plans` with employee's JWT token

**Expected Results:**
- All calls return HTTP 403 Forbidden
- Error response: `{ "statusCode": 403, "message": "...", "traceId": "..." }`
- Only TecAxleAdmin/TecAxleSupport platform roles are authorized

---

#### TC-PLAT-006: Unauthenticated access to platform APIs returns 401
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Module** | Platform Management |
| **Page** | API |
| **Role** | Unauthenticated |

**Steps:**
1. Call `GET /api/v1/tenants` without Authorization header
2. Call `GET /api/v1/subscription-plans` without Authorization header

**Expected Results:**
- HTTP 401 Unauthorized for both calls
- No data returned

---

### B. Tenant List & CRUD UI

#### TC-PLAT-007: Tenant list page renders correctly
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Module** | Platform Management |
| **Page** | /tenants |
| **Role** | Platform Admin |

**Preconditions:**
1. At least one tenant exists in master DB
2. Logged in as Platform Admin

**Steps:**
1. Navigate to /tenants

**Expected Results:**
- Page renders with:
  - Page header: "Tenants" (or translated equivalent)
  - UnifiedFilterComponent with search input, refresh button, and "Create Tenant" button
  - DataTableComponent showing tenant list
  - Table columns include: Name, Subdomain, Email, Status, Plan, Created Date, Actions
  - PaginationComponent at bottom
- Data loaded from `GET /api/v1/tenants`

---

#### TC-PLAT-008: Tenant list — search filter
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Module** | Platform Management |
| **Page** | /tenants |
| **Role** | Platform Admin |

**Preconditions:**
1. Multiple tenants exist with different names

**Steps:**
1. Navigate to /tenants
2. Type "Nadek" in the search field
3. Observe filtered results

**Expected Results:**
- Table filters to show only tenants matching "Nadek" (by name, subdomain, or email)
- Pagination updates to reflect filtered count
- Clearing search shows all tenants again

---

#### TC-PLAT-009: Tenant list — status filter
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Module** | Platform Management |
| **Page** | /tenants |
| **Role** | Platform Admin |

**Preconditions:**
1. Tenants exist in Active and Suspended statuses

**Steps:**
1. Navigate to /tenants
2. Select "Active" from status filter dropdown
3. Observe filtered results
4. Select "Suspended" from status filter
5. Observe filtered results

**Expected Results:**
- Active filter: Only active tenants displayed
- Suspended filter: Only suspended tenants displayed
- "All" option shows all tenants regardless of status

---

#### TC-PLAT-010: Tenant list — pagination
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Module** | Platform Management |
| **Page** | /tenants |
| **Role** | Platform Admin |

**Preconditions:**
1. More tenants exist than the default page size

**Steps:**
1. Navigate to /tenants
2. Observe page 1 results
3. Click "Next" / page 2
4. Change page size

**Expected Results:**
- Pagination controls visible when total items > page size
- Navigating pages loads correct data
- Page size change reloads data with new size
- Total count displayed correctly

---

#### TC-PLAT-011: Navigate to create tenant page
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Module** | Platform Management |
| **Page** | /tenants/create |
| **Role** | Platform Admin |

**Steps:**
1. Navigate to /tenants
2. Click "Create Tenant" button (from UnifiedFilterComponent)

**Expected Results:**
- Navigates to /tenants/create
- Create tenant form rendered with sections:
  - Basic Info (Name, NameAr, Subdomain, Logo upload)
  - Company Info (Email, Phone, Website, Address, Registration Number, Tax ID, Industry, Country, City)
  - Plan Selection (SubscriptionPlanId dropdown)
  - Default Settings (DefaultTimezone, DefaultLanguage, DefaultCurrency, BillingCycle)
- Form uses modern form design system (.app-modern-form)

---

### C. Tenant Creation — Field Validation

#### TC-PLAT-012: Name field — required validation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Module** | Platform Management |
| **Page** | /tenants/create |
| **Role** | Platform Admin |

**Steps:**
1. Navigate to /tenants/create
2. Leave Name field empty
3. Fill all other required fields with valid data
4. Click Submit

**Expected Results:**
- Validation error: "Tenant name is required."
- Form does not submit
- Name field highlighted with error styling (red border)

---

#### TC-PLAT-013: Name field — maxLength(200) boundary
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Module** | Platform Management |
| **Page** | /tenants/create |
| **Role** | Platform Admin |

**Boundary Value Tests:**

| # | Input | Length | Valid? | Reason |
|---|-------|--------|--------|--------|
| 1 | "" | 0 | No | Required field |
| 2 | "A" | 1 | Yes | Minimum valid |
| 3 | 200 chars | 200 | Yes | At max length |
| 4 | 201 chars | 201 | No | Exceeds maxLength(200) |

**Steps:**
1. Enter a 201-character string in the Name field
2. Submit the form

**Expected Results:**
- Frontend truncates input or shows validation error at 200 characters
- Backend returns 400 if 201+ chars sent via API

---

#### TC-PLAT-014: NameAr field — maxLength(200) boundary
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Module** | Platform Management |
| **Page** | /tenants/create |
| **Role** | Platform Admin |

**Steps:**
1. Enter a 201-character Arabic string in NameAr field
2. Submit the form

**Expected Results:**
- Validation error at 201+ characters
- NameAr is optional — empty is acceptable
- 200 Arabic characters is accepted

---

#### TC-PLAT-015: Subdomain field — pattern validation (lowercase, numbers, hyphens only)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Module** | Platform Management |
| **Page** | /tenants/create |
| **Role** | Platform Admin |

**Pattern**: `^[a-z0-9-]+$`

**Boundary Value Tests:**

| # | Input | Valid? | Reason |
|---|-------|--------|--------|
| 1 | "nadek" | Yes | Lowercase letters |
| 2 | "nadek-company" | Yes | Lowercase + hyphens |
| 3 | "nadek123" | Yes | Lowercase + numbers |
| 4 | "my-company-2026" | Yes | All allowed chars |
| 5 | "Nadek" | No | Contains uppercase |
| 6 | "nadek_company" | No | Contains underscore |
| 7 | "nadek company" | No | Contains space |
| 8 | "nadek@com" | No | Contains special char |
| 9 | "" | Yes | Optional field (empty allowed) |
| 10 | 51 chars | No | Exceeds maxLength(50) |
| 11 | 50 chars | Yes | At max length |

**Steps:**
1. Enter "Nadek-Company" (uppercase N) in Subdomain field
2. Submit the form

**Expected Results:**
- Validation error: subdomain must contain only lowercase letters, numbers, and hyphens
- Form does not submit

---

#### TC-PLAT-016: Email field — required and valid email format
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Module** | Platform Management |
| **Page** | /tenants/create |
| **Role** | Platform Admin |

**Boundary Value Tests:**

| # | Input | Valid? | Reason |
|---|-------|--------|--------|
| 1 | "" | No | "Email is required" |
| 2 | "invalid" | No | "Invalid email address" |
| 3 | "user@" | No | Invalid format |
| 4 | "@domain.com" | No | Invalid format |
| 5 | "user@domain.com" | Yes | Valid email |
| 6 | "user@nadek.com" | Yes | Valid email |
| 7 | 201-char email | No | Exceeds maxLength(200) |

**Steps:**
1. Leave Email field empty, submit
2. Enter "invalid-email", submit
3. Enter valid "admin@newcompany.com", submit

**Expected Results:**
- Empty: "Email is required"
- Invalid format: "Invalid email address"
- Valid email: passes validation (proceeds to other field checks)

---

#### TC-PLAT-017: Email domain uniqueness enforcement
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Module** | Platform Management |
| **Page** | /tenants/create |
| **Role** | Platform Admin |

**Preconditions:**
1. Tenant already exists with email "admin@nadek.com" (domain: nadek.com)

**Steps:**
1. Navigate to /tenants/create
2. Fill in all required fields
3. Enter email "hr@nadek.com" (same domain: nadek.com)
4. Submit the form

**Expected Results:**
- Error: email domain "nadek.com" is already in use by another tenant
- Tenant not created
- `TenantUserEmails` conflict prevented
- Each tenant must use a unique email domain

---

#### TC-PLAT-018: Phone field — maxLength(50) boundary
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Module** | Platform Management |
| **Page** | /tenants/create |
| **Role** | Platform Admin |

**Steps:**
1. Enter a 51-character string in Phone field
2. Submit the form

**Expected Results:**
- Validation error at 51+ characters
- Phone is optional — empty is acceptable
- 50 characters accepted

---

#### TC-PLAT-019: Website field — maxLength(500) boundary
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Module** | Platform Management |
| **Page** | /tenants/create |
| **Role** | Platform Admin |

**Steps:**
1. Enter a 501-character URL in Website field

**Expected Results:**
- Validation error at 501+ characters
- Website is optional — empty is acceptable
- 500 characters accepted

---

#### TC-PLAT-020: DefaultTimezone — required validation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Module** | Platform Management |
| **Page** | /tenants/create |
| **Role** | Platform Admin |

**Steps:**
1. Leave DefaultTimezone field empty
2. Fill all other required fields
3. Submit

**Expected Results:**
- Validation error: "Default timezone is required"
- Form does not submit

---

#### TC-PLAT-021: DefaultLanguage — must be "en" or "ar"
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Module** | Platform Management |
| **Page** | /tenants/create |
| **Role** | Platform Admin |

**Boundary Value Tests:**

| # | Input | Valid? | Reason |
|---|-------|--------|--------|
| 1 | "" | No | Required |
| 2 | "en" | Yes | English |
| 3 | "ar" | Yes | Arabic |
| 4 | "fr" | No | "must be 'en' or 'ar'" |
| 5 | "EN" | No | Case sensitive — must be lowercase |

**Steps:**
1. Leave DefaultLanguage empty — submit
2. Set DefaultLanguage to "fr" via API

**Expected Results:**
- Empty: "Default language is required" (or similar required error)
- "fr": Validation error "must be 'en' or 'ar'"
- "en" or "ar": passes validation

---

#### TC-PLAT-022: DefaultCurrency — required, maxLength(10)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Module** | Platform Management |
| **Page** | /tenants/create |
| **Role** | Platform Admin |

**Steps:**
1. Leave DefaultCurrency empty — submit
2. Enter 11-character string

**Expected Results:**
- Empty: required validation error
- 11+ chars: maxLength validation error
- "SAR", "AED", "USD" (3 chars): accepted

---

#### TC-PLAT-023: BillingCycle — must be null, "Monthly", or "Annual"
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Module** | Platform Management |
| **Page** | /tenants/create |
| **Role** | Platform Admin |

**Boundary Value Tests:**

| # | Input | Valid? | Reason |
|---|-------|--------|--------|
| 1 | null / not set | Yes | Optional |
| 2 | "Monthly" | Yes | Valid billing cycle |
| 3 | "Annual" | Yes | Valid billing cycle |
| 4 | "Weekly" | No | Invalid value |
| 5 | "monthly" | No | Case sensitive |

**Steps:**
1. Set BillingCycle to "Weekly" via API
2. Submit

**Expected Results:**
- Invalid values rejected with validation error
- null, "Monthly", and "Annual" accepted

---

#### TC-PLAT-024: Additional optional fields — maxLength boundaries
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Module** | Platform Management |
| **Page** | /tenants/create |
| **Role** | Platform Admin |

**Field Boundary Summary:**

| Field | MaxLength | Required |
|-------|-----------|----------|
| Address | 500 | No |
| CompanyRegistrationNumber | 100 | No |
| TaxIdentificationNumber | 100 | No |
| Industry | 100 | No |
| Country | 100 | No |
| City | 100 | No |

**Steps:**
1. For each field, enter a string exceeding its maxLength by 1 character
2. Submit the form

**Expected Results:**
- Each field rejects input exceeding its maxLength
- All fields accept empty values (optional)
- All fields accept values at exactly maxLength

---

#### TC-PLAT-025: Logo upload on create tenant form
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Functional |
| **Module** | Platform Management |
| **Page** | /tenants/create |
| **Role** | Platform Admin |

**Steps:**
1. Navigate to /tenants/create
2. Click logo upload area
3. Select a valid image file (PNG, JPG, < 10MB)
4. Observe preview
5. Submit the form with all other required fields valid

**Expected Results:**
- Logo preview displayed after selection
- File uploaded via `POST /api/v1/files/upload`
- Logo URL stored with tenant record
- Supported types: JPG, JPEG, PNG
- Files > 10MB rejected

---

### D. Tenant Provisioning — Business Rules

#### TC-PLAT-026: Successful tenant creation with full provisioning
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Module** | Platform Management |
| **Page** | /tenants/create |
| **Role** | Platform Admin |

**Steps:**
1. Navigate to /tenants/create
2. Fill in:
   - Name: "Nadek Corporation"
   - Email: "admin@nadek.com"
   - DefaultTimezone: "Asia/Riyadh"
   - DefaultLanguage: "ar"
   - DefaultCurrency: "SAR"
   - SubscriptionPlanId: (select Professional plan)
3. Submit the form

**Expected Results:**
- Tenant record created in master DB `Tenants` table with Status = Active
- Dedicated PostgreSQL database created: `ta_nadek_com` (derived from email domain "nadek.com")
- EF Core migrations applied to tenant DB
- Business data seeded in tenant DB (roles, permissions, shifts, workflows, vacation types)
- Local Tenant record created in tenant DB (for FK on TenantSettings/SetupSteps)
- TenantSettings defaults created in tenant DB
- 9 SetupSteps created in tenant DB
- Two system admin users created:
  - `tecaxleadmin@nadek.com` with `IsSystemUser=true`, SystemAdmin role
  - `systemadmin@nadek.com` with `IsSystemUser=true`, SystemAdmin role
- Both admin emails mapped in master `TenantUserEmails` table
- Connection string encrypted with AES-256 and stored in `Tenants.EncryptedConnectionString`
- `DatabaseName`, `DatabaseCreatedAt`, `DatabaseMigrationVersion` populated on tenant record
- Subscription plan assigned (Professional)
- Redirect to tenant view page or tenant list

---

#### TC-PLAT-027: Database name derived from email domain — non-alphanumeric replaced
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Module** | Platform Management |
| **Page** | /tenants/create |
| **Role** | Platform Admin |

**Test Cases:**

| Email | Expected DB Name |
|-------|-----------------|
| admin@nadek.com | ta_nadek_com |
| hr@my-company.org | ta_my_company_org |
| info@test.co.uk | ta_test_co_uk |
| admin@company123.com | ta_company123_com |

**Steps:**
1. Create tenant with email "hr@my-company.org"
2. Check master DB `Tenants` table for `DatabaseName`

**Expected Results:**
- Non-alphanumeric characters in domain replaced with underscore
- Database name prefixed with `ta_`
- Database created in PostgreSQL with the derived name

---

#### TC-PLAT-028: Database name collision — numeric suffix appended
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Module** | Platform Management |
| **Page** | /tenants/create |
| **Role** | Platform Admin |

**Preconditions:**
1. An orphaned database `ta_nadek_com` already exists in PostgreSQL (from a previous deleted tenant)

**Steps:**
1. Create a new tenant with email "admin@nadek.com"
2. Check the created database name

**Expected Results:**
- System detects `ta_nadek_com` already exists
- Creates `ta_nadek_com_2` instead
- If `ta_nadek_com_2` also exists, creates `ta_nadek_com_3`
- `Tenants.DatabaseName` stores the actual name used

---

#### TC-PLAT-029: System admin users seeded with IsSystemUser protection
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Module** | Platform Management |
| **Page** | API / Database |
| **Role** | Platform Admin |

**Preconditions:**
1. Tenant created with email domain "nadek.com"

**Steps:**
1. After tenant creation, connect to tenant DB `ta_nadek_com`
2. Query Users table for system admin accounts
3. Try to edit `tecaxleadmin@nadek.com` via `PUT /api/v1/users/{id}`
4. Try to delete `systemadmin@nadek.com` via `DELETE /api/v1/users/{id}`

**Expected Results:**
- Two users exist: `tecaxleadmin@nadek.com` and `systemadmin@nadek.com`
- Both have `IsSystemUser = true`
- Both have SystemAdmin role with all branch access
- Edit attempt blocked: "System users cannot be edited"
- Delete attempt blocked: "System users cannot be deleted"
- Frontend hides edit/delete buttons for these users in user-table.component.ts

---

#### TC-PLAT-030: TenantUserEmails mapping created for both system admins
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Module** | Platform Management |
| **Page** | Database |
| **Role** | Platform Admin |

**Preconditions:**
1. Tenant created with email domain "nadek.com" and tenant ID = X

**Steps:**
1. Query master DB `TenantUserEmails` table
2. Look for entries with TenantId = X

**Expected Results:**
- Two entries exist:
  - Email: "tecaxleadmin@nadek.com", TenantId: X
  - Email: "systemadmin@nadek.com", TenantId: X
- Both system admin users can login via the standard email-based login flow

---

#### TC-PLAT-031: Plan assignment is non-fatal — tenant created Active even if plan fails
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Module** | Platform Management |
| **Page** | /tenants/create |
| **Role** | Platform Admin |

**Preconditions:**
1. Subscription plan exists but has an issue (e.g., stale cache, concurrent modification)

**Steps:**
1. Create a new tenant with a valid SubscriptionPlanId
2. Simulate plan assignment failure (e.g., invalid plan ID that was deleted mid-request)

**Expected Results:**
- Tenant is still created with Status = Active
- Database is provisioned, system admins seeded
- Plan assignment failure logged but does not block tenant creation
- Admin can assign plan later from the tenant view page (Subscription tab)
- Notification or warning shown that plan assignment failed

---

#### TC-PLAT-032: Connection string encrypted with AES-256
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Security |
| **Module** | Platform Management |
| **Page** | Database |
| **Role** | Platform Admin |

**Steps:**
1. Create a new tenant
2. Query master DB `Tenants` table for the `EncryptedConnectionString` column

**Expected Results:**
- `EncryptedConnectionString` is NOT a plaintext connection string
- Value is a Base64-encoded AES-256 encrypted string
- `ConnectionStringEncryption` service can decrypt it back to valid PostgreSQL connection string
- Connection string points to the tenant's dedicated database

---

### E. Subscription Plans — CRUD

#### TC-PLAT-033: Subscription plans list page renders correctly
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Module** | Platform Management |
| **Page** | /subscription-plans |
| **Role** | Platform Admin |

**Preconditions:**
1. Default seeded plans exist: Starter, Professional, Enterprise

**Steps:**
1. Navigate to /subscription-plans

**Expected Results:**
- Page renders with card-based pricing layout
- Three default plans displayed:
  - **Starter**: 5 modules, 50 employee limit
  - **Professional**: 13 modules, 500 employee limit
  - **Enterprise**: All 26 modules, unlimited employees
- Each card shows: plan name, tier, pricing, module count, employee limit
- "Create Plan" button visible
- Edit and Delete actions available per plan

---

#### TC-PLAT-034: Default seeded plans — correct module and limit configuration
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Module** | Platform Management |
| **Page** | /subscription-plans |
| **Role** | Platform Admin |

**Steps:**
1. Navigate to /subscription-plans
2. Click on each plan to view details
3. Verify module entitlements and limits

**Expected Results:**

| Plan | Tier | Modules | Employee Limit |
|------|------|---------|---------------|
| Starter | Starter | 5 core modules | 50 |
| Professional | Professional | 13 modules | 500 |
| Enterprise | Enterprise | All 26 modules | Unlimited |

- Each plan has correct `PlanModuleEntitlements` entries
- Each plan has correct `PlanLimits` entries
- Feature flags configured per plan

---

#### TC-PLAT-035: Create new subscription plan
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Module** | Platform Management |
| **Page** | /subscription-plans/create |
| **Role** | Platform Admin |

**Steps:**
1. Navigate to /subscription-plans
2. Click "Create Plan"
3. Fill in:
   - Name: "Custom Plan"
   - Tier: Custom
   - Price: 199.99
   - Select 10 modules from the 26 available
   - Set employee limit to 200
   - Configure feature flags
4. Submit

**Expected Results:**
- Plan created in master DB `SubscriptionPlans` table
- Module entitlements saved in `PlanModuleEntitlements`
- Feature flags saved in `PlanFeatureFlags`
- Usage limits saved in `PlanLimits`
- Plan appears in the subscription plans list
- All 26 `SystemModule` options available for selection

---

#### TC-PLAT-036: Edit existing subscription plan
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Module** | Platform Management |
| **Page** | /subscription-plans/:id/edit |
| **Role** | Platform Admin |

**Steps:**
1. Navigate to /subscription-plans
2. Click Edit on an existing plan
3. Modify the name, add a module, change employee limit
4. Submit

**Expected Results:**
- Plan updated in master DB
- Module entitlements updated
- Limits updated
- Changes reflected in the list view
- Tenants currently on this plan inherit the changes (via cached entitlements with 5-min TTL)

---

#### TC-PLAT-037: Delete subscription plan — no active subscribers
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Module** | Platform Management |
| **Page** | /subscription-plans |
| **Role** | Platform Admin |

**Preconditions:**
1. Plan exists with NO active tenant subscriptions

**Steps:**
1. Navigate to /subscription-plans
2. Click Delete on the plan with no subscribers
3. Confirm deletion

**Expected Results:**
- Confirmation dialog displayed (via ConfirmationService)
- Plan deleted from `SubscriptionPlans` table
- Related `PlanModuleEntitlements`, `PlanFeatureFlags`, `PlanLimits` also deleted
- Plan removed from list view

---

#### TC-PLAT-038: Delete subscription plan — blocked when active subscribers exist
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Module** | Platform Management |
| **Page** | /subscription-plans |
| **Role** | Platform Admin |

**Preconditions:**
1. Plan has at least one tenant with an active subscription

**Steps:**
1. Navigate to /subscription-plans
2. Click Delete on the plan with active subscribers
3. Confirm deletion

**Expected Results:**
- Error: "Cannot delete plan with active subscribers" (or similar)
- Plan NOT deleted
- Active tenant subscriptions are not affected

---

### F. Tenant Subscription Management

#### TC-PLAT-039: View tenant — Overview tab
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Module** | Platform Management |
| **Page** | /tenants/:id/view |
| **Role** | Platform Admin |

**Steps:**
1. Navigate to /tenants
2. Click "View" on a tenant

**Expected Results:**
- View page renders with two tabs: Overview and Subscription
- Overview tab shows DefinitionList with:
  - Name, NameAr, Subdomain, Email, Phone, Website
  - Address, Registration Number, Tax ID
  - Industry, Country, City
  - Status (StatusBadgeComponent), Database Name
  - Default Timezone, Language, Currency
  - Created Date
- Logo displayed if uploaded

---

#### TC-PLAT-040: View tenant — Subscription tab
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Module** | Platform Management |
| **Page** | /tenants/:id/view |
| **Role** | Platform Admin |

**Steps:**
1. Navigate to tenant view page
2. Click Subscription tab

**Expected Results:**
- Current subscription plan details displayed:
  - Plan name, tier, billing cycle, status
  - Start date, end date (if applicable)
  - Enabled modules list
  - Usage limits (employee count vs limit)
- Action buttons: Assign Plan (if none), Change Plan, Cancel Subscription
- Buttons conditionally visible based on current subscription state

---

#### TC-PLAT-041: Assign subscription plan to tenant
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Module** | Platform Management |
| **Page** | /tenants/:id/view (Subscription tab) |
| **Role** | Platform Admin |

**Preconditions:**
1. Tenant exists with no active subscription

**Steps:**
1. Navigate to tenant view page, Subscription tab
2. Click "Assign Plan"
3. Select "Professional" plan
4. Confirm assignment

**Expected Results:**
- `TenantSubscription` created in master DB:
  - TenantId = tenant's ID
  - SubscriptionPlanId = Professional plan ID
  - Status = Active
  - BillingCycle set
  - PeriodStart = now
- `EntitlementChangeLog` entry created with `EntitlementChangeType = PlanAssigned`
- Tenant now has access to Professional plan's modules
- Entitlement cache invalidated for this tenant

---

#### TC-PLAT-042: Change tenant's subscription plan
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Module** | Platform Management |
| **Page** | /tenants/:id/view (Subscription tab) |
| **Role** | Platform Admin |

**Preconditions:**
1. Tenant has active subscription on Starter plan

**Steps:**
1. Navigate to tenant view page, Subscription tab
2. Click "Change Plan"
3. Select "Enterprise" plan
4. Confirm change

**Expected Results:**
- `TenantSubscription` updated to new plan
- `EntitlementChangeLog` entry created with:
  - `EntitlementChangeType = PlanChanged`
  - Before/after JSON snapshots stored
- New modules from Enterprise plan now accessible
- Entitlement cache invalidated for this tenant
- Previously available data under old plan still accessible

---

#### TC-PLAT-043: Plan downgrade — module dependency validation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Module** | Platform Management |
| **Page** | /tenants/:id/view (Subscription tab) |
| **Role** | Platform Admin |

**Preconditions:**
1. Tenant on Enterprise plan (all 26 modules)
2. Tenant has data in modules that depend on other modules (via `ModuleDependencyRules`)

**Steps:**
1. Attempt to change from Enterprise to Starter plan
2. Starter plan disables modules that other enabled modules depend on

**Expected Results:**
- `ChangePlanCommandHandler` validates `ModuleDependencyRules.GetDependentModules()`
- If downgrade would disable a module that active modules depend on → error returned
- Error message identifies the dependency conflict
- Plan change blocked until dependencies resolved
- Example: cannot disable "Core" module if "TimeAttendance" depends on it

---

#### TC-PLAT-044: Cancel tenant subscription
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Module** | Platform Management |
| **Page** | /tenants/:id/view (Subscription tab) |
| **Role** | Platform Admin |

**Preconditions:**
1. Tenant has active subscription

**Steps:**
1. Navigate to tenant view page, Subscription tab
2. Click "Cancel Subscription"
3. Confirm cancellation

**Expected Results:**
- `TenantSubscription` status set to Cancelled
- `EntitlementChangeLog` entry created with `EntitlementChangeType = SubscriptionCancelled`
- Before/after JSON snapshots recorded
- Tenant modules deactivated (via `IModuleDeactivationService`)
- In-flight workflows frozen (`WorkflowStatus.Frozen = 7`)
- Entitlement cache invalidated

---

#### TC-PLAT-045: EntitlementChangeLog audit trail — all transitions recorded
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Module** | Platform Management |
| **Page** | Database |
| **Role** | Platform Admin |

**Steps:**
1. Assign plan to tenant (PlanAssigned)
2. Change plan (PlanChanged)
3. Cancel subscription (SubscriptionCancelled)
4. Query master DB `EntitlementChangeLogs` table

**Expected Results:**
- Three entries exist for this tenant:
  - Type: PlanAssigned, with before (null) and after (plan details) JSON
  - Type: PlanChanged, with before (old plan) and after (new plan) JSON
  - Type: SubscriptionCancelled, with before (active plan) and after (cancelled) JSON
- Each entry has: TenantId, ChangeType, BeforeJson, AfterJson, ChangedByUserId, ChangedAtUtc
- Entries are append-only (immutable audit trail)

---

#### TC-PLAT-046: Activate suspended tenant
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Module** | Platform Management |
| **Page** | /tenants/:id/view |
| **Role** | Platform Admin |

**Preconditions:**
1. Tenant exists with Status = Suspended

**Steps:**
1. Navigate to tenant view page
2. Click "Activate"
3. Confirm activation

**Expected Results:**
- `POST /api/v1/tenants/{id}/activate` called
- Tenant status changed to Active
- Tenant users can now login again
- StatusBadge updates to show Active (green)

---

#### TC-PLAT-047: Suspend active tenant
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Module** | Platform Management |
| **Page** | /tenants/:id/view |
| **Role** | Platform Admin |

**Preconditions:**
1. Tenant exists with Status = Active

**Steps:**
1. Navigate to tenant view page
2. Click "Suspend"
3. Confirm suspension

**Expected Results:**
- `POST /api/v1/tenants/{id}/suspend` called
- Tenant status changed to Suspended
- Tenant users cannot login (TenantUserEmails query filters by `IsActive`)
- StatusBadge updates to show Suspended (warning/orange)

---

#### TC-PLAT-048: Edit tenant — subdomain is read-only
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Module** | Platform Management |
| **Page** | /tenants/:id/edit |
| **Role** | Platform Admin |

**Preconditions:**
1. Tenant exists with subdomain "nadek"

**Steps:**
1. Navigate to /tenants/:id/edit
2. Observe the Subdomain field

**Expected Results:**
- Subdomain field is displayed but disabled/read-only
- Cannot be modified after creation
- All other editable fields (Name, Phone, Address, etc.) are modifiable
- Submit updates the tenant without changing subdomain

---

#### TC-PLAT-049: Edit tenant — update name and settings
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Module** | Platform Management |
| **Page** | /tenants/:id/edit |
| **Role** | Platform Admin |

**Steps:**
1. Navigate to /tenants/:id/edit
2. Change Name from "Nadek Corporation" to "Nadek Holdings"
3. Change City from "Riyadh" to "Jeddah"
4. Submit

**Expected Results:**
- `PUT /api/v1/tenants/{id}` called
- Tenant updated in master DB
- Changes reflected on view page
- Redirect to tenant view or list page

---

#### TC-PLAT-050: Tenant discovery endpoint — public, no auth required
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Module** | Platform Management |
| **Page** | API |
| **Role** | Unauthenticated |

**Steps:**
1. Call `GET /api/v1/tenants/discover` without Authorization header

**Expected Results:**
- HTTP 200 OK (no authentication required)
- Returns tenant discovery information for mobile app tenant resolution
- Only public tenant info returned (name, subdomain, logo) — no sensitive data
- Does not expose database names, connection strings, or internal IDs

---

## Summary

| Section | Test Cases | P0 | P1 | P2 |
|---------|-----------|----|----|-----|
| A. Platform Admin UI Isolation & Authorization | 6 | 4 | 1 | 1 |
| B. Tenant List & CRUD UI | 5 | 2 | 3 | 0 |
| C. Tenant Creation — Field Validation | 14 | 3 | 4 | 7 |
| D. Tenant Provisioning — Business Rules | 7 | 2 | 4 | 1 |
| E. Subscription Plans — CRUD | 6 | 2 | 3 | 1 |
| F. Tenant Subscription Management | 12 | 4 | 7 | 1 |
| **TOTAL** | **50** | **17** | **22** | **11** |
