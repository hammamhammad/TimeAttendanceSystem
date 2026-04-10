# TC-SET: Settings & Configuration — Test Cases

## Module Overview

The Settings & Configuration module manages tenant-level operational settings, policy templates, public holidays, and onboarding setup tracking. Settings follow a 4-tier inheritance chain: Platform Defaults -> Tenant Settings -> Branch Overrides -> Department Overrides. The system ships with 8 seeded policy templates (Saudi Standard, UAE Standard, and 6 industry-specific). Public holidays support 4 recurrence patterns (OneTime, Annual, Monthly, Floating) with branch-scoped or national scope.

**Admin Pages**: `/settings/tenant-config` (9 child routes: general, attendance, leave, approval, notification, mobile, security, templates, setup-status), `/settings/public-holidays`, `/settings/public-holidays/create`, `/settings/public-holidays/:id/edit`, `/settings/public-holidays/:id/view`
**API Endpoints**: `GET/PUT /api/v1/tenant-configuration`, `GET /api/v1/tenant-configuration/resolved`, `GET/PUT/DELETE /api/v1/tenant-configuration/branches/{id}`, `GET/POST /api/v1/tenant-configuration/setup-status`, `GET/POST/PUT/DELETE /api/v1/policy-templates`, `POST /api/v1/policy-templates/{id}/apply`
**Backend Handlers**: `UpdateTenantSettingsCommandHandler`, `GetResolvedSettingsQueryHandler`, `ApplyPolicyTemplateCommandHandler`, `TenantSettingsResolver`

---

## Test Environment

| Item | Value |
|------|-------|
| Backend | http://localhost:5099 |
| Admin Portal | http://localhost:4200 |

### Test Users

| Role | Email | Password | Notes |
|------|-------|----------|-------|
| Platform Admin | (from master seed) | (from master seed) | `is_platform_user=true` in JWT |
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | IsSystemUser=true, full access |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | MustChangePassword=true |
| Employee | salma.khaldi@company.com | Emp@123! | No settings access |

---

## Summary Table

| ID | Title | Priority | Category |
|----|-------|----------|----------|
| TC-SET-001 | Resolved settings return tenant values when no branch override exists | P0 | Business Rule |
| TC-SET-002 | Branch override replaces tenant value for overridden field | P0 | Business Rule |
| TC-SET-003 | Branch override null field inherits from tenant settings | P0 | Business Rule |
| TC-SET-004 | Department override replaces branch value for limited-scope fields | P1 | Business Rule |
| TC-SET-005 | Resolved endpoint includes source tracking per field | P1 | API |
| TC-SET-006 | Settings inheritance respects 5-min cache TTL | P2 | Performance |
| TC-SET-007 | Creating branch override via API persists correctly | P1 | API |
| TC-SET-008 | Deleting branch override reverts field to tenant value | P1 | API |
| TC-SET-009 | Department override scope limited to default shift and approval comments | P1 | Business Rule |
| TC-SET-010 | Resolved settings with branchId and deptId applies full chain | P0 | Business Rule |
| TC-SET-011 | General settings page renders and saves | P0 | UI |
| TC-SET-012 | Attendance settings page renders grace period fields | P0 | UI |
| TC-SET-013 | Attendance settings save grace period values | P0 | Functional |
| TC-SET-014 | Leave settings page renders balance and carryover fields | P0 | UI |
| TC-SET-015 | Leave settings save carryover configuration | P1 | Functional |
| TC-SET-016 | Approval settings page renders comment and timeout fields | P1 | UI |
| TC-SET-017 | Approval settings save timeout configuration | P1 | Functional |
| TC-SET-018 | Notification settings page renders email/push/in-app toggles | P1 | UI |
| TC-SET-019 | Notification settings save toggle states | P1 | Functional |
| TC-SET-020 | Mobile settings page renders NFC and GPS configuration | P1 | UI |
| TC-SET-021 | Mobile settings save NFC/GPS configuration | P1 | Functional |
| TC-SET-022 | Security settings page renders password policy and session fields | P1 | UI |
| TC-SET-023 | Security settings save 2FA and session configuration | P1 | Functional |
| TC-SET-024 | Tenant config sidebar navigation shows 9 child routes | P1 | UI |
| TC-SET-025 | Policy templates page lists 8 seeded templates | P0 | UI |
| TC-SET-026 | Saudi Standard template has 12 items | P1 | Business Rule |
| TC-SET-027 | UAE Standard template has 11 items | P1 | Business Rule |
| TC-SET-028 | Filter templates by region returns correct subset | P1 | Functional |
| TC-SET-029 | Apply template to tenant creates expected entities | P0 | Business Rule |
| TC-SET-030 | Apply template to branch scopes entities to branch | P1 | Business Rule |
| TC-SET-031 | System templates cannot be deleted | P0 | Authorization |
| TC-SET-032 | System templates require SystemAdmin to edit | P0 | Authorization |
| TC-SET-033 | Custom template CRUD — create | P1 | Functional |
| TC-SET-034 | Custom template CRUD — update | P1 | Functional |
| TC-SET-035 | Custom template CRUD — delete | P1 | Functional |
| TC-SET-036 | Template supports all 7 PolicyTypes | P1 | Business Rule |
| TC-SET-037 | Public holiday create — OneTime with specificDate | P0 | Functional |
| TC-SET-038 | Public holiday create — Annual with month and day | P0 | Functional |
| TC-SET-039 | Public holiday create — Monthly with day | P1 | Functional |
| TC-SET-040 | Public holiday create — Floating with month, weekOfMonth, dayOfWeek | P1 | Functional |
| TC-SET-041 | Public holiday name required, maxLength 200 | P1 | Validation |
| TC-SET-042 | Public holiday isActive defaults to true | P2 | Business Rule |
| TC-SET-043 | Public holiday priority range 1-100, default 1 | P2 | Validation |
| TC-SET-044 | Public holiday branch-specific vs national | P1 | Business Rule |
| TC-SET-045 | Setup status page shows 9 onboarding steps | P1 | UI |
| TC-SET-046 | Setup status auto-detection checks DB for actual data | P1 | Business Rule |
| TC-SET-047 | Marking setup step complete via API persists | P1 | Functional |
| TC-SET-048 | Setup steps created automatically on tenant provisioning | P0 | Business Rule |
| TC-SET-049 | TenantSettings created automatically on tenant provisioning | P0 | Business Rule |

---

## Test Cases

### A. Settings Inheritance

#### TC-SET-001: Resolved settings return tenant values when no branch override exists
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Preconditions:**
1. Tenant exists with TenantSettings configured (e.g., `AttendanceLateGraceMinutes = 15`)
2. No BranchSettingsOverride exists for the target branch

**Steps:**
1. Call `GET /api/v1/tenant-configuration/resolved?branchId={branchId}`
2. Inspect the response for `attendanceLateGraceMinutes`

**Expected Results:**
- Response returns `attendanceLateGraceMinutes = 15` (from tenant settings)
- Source tracking shows `"source": "tenant"` for this field

---

#### TC-SET-002: Branch override replaces tenant value for overridden field
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Preconditions:**
1. Tenant settings has `AttendanceLateGraceMinutes = 15`
2. BranchSettingsOverride exists for branch with `AttendanceLateGraceMinutes = 10`

**Steps:**
1. Call `GET /api/v1/tenant-configuration/resolved?branchId={branchId}`

**Expected Results:**
- Response returns `attendanceLateGraceMinutes = 10` (from branch override)
- Source tracking shows `"source": "branch"` for this field

---

#### TC-SET-003: Branch override null field inherits from tenant settings
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Preconditions:**
1. Tenant settings has `AttendanceLateGraceMinutes = 15`
2. BranchSettingsOverride exists with `AttendanceLateGraceMinutes = null` (not overridden)

**Steps:**
1. Call `GET /api/v1/tenant-configuration/resolved?branchId={branchId}`

**Expected Results:**
- Response returns `attendanceLateGraceMinutes = 15` (inherited from tenant)
- Source tracking shows `"source": "tenant"` for this field
- Other overridden fields show `"source": "branch"`

---

#### TC-SET-004: Department override replaces branch value for limited-scope fields
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Preconditions:**
1. Tenant settings has a default shift configured
2. Branch override has a different default shift
3. DepartmentSettingsOverride exists with its own default shift

**Steps:**
1. Call `GET /api/v1/tenant-configuration/resolved?branchId={branchId}&deptId={deptId}`

**Expected Results:**
- Default shift value comes from department override
- Source tracking shows `"source": "department"` for default shift
- Non-department-scope fields still show branch or tenant source

---

#### TC-SET-005: Resolved endpoint includes source tracking per field
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | API |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Steps:**
1. Call `GET /api/v1/tenant-configuration/resolved?branchId={branchId}&deptId={deptId}`
2. Inspect JSON response structure

**Expected Results:**
- Each setting field has an associated `source` property
- Source values are one of: `"tenant"`, `"branch"`, `"department"`
- Source accurately reflects which tier provided the value

---

#### TC-SET-006: Settings inheritance respects 5-min cache TTL
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Performance |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Steps:**
1. Call `GET /api/v1/tenant-configuration/resolved?branchId={branchId}` and note response
2. Update tenant settings via `PUT /api/v1/tenant-configuration`
3. Immediately call resolved endpoint again
4. Wait 5+ minutes, then call resolved endpoint again

**Expected Results:**
- Step 3: May return cached (old) values within TTL
- Step 4: Returns updated values after cache expiry

---

#### TC-SET-007: Creating branch override via API persists correctly
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | API |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Steps:**
1. Call `PUT /api/v1/tenant-configuration/branches/{branchId}` with override JSON
2. Call `GET /api/v1/tenant-configuration/branches/{branchId}`

**Expected Results:**
- PUT returns 200 OK
- GET returns the saved override values
- Only provided fields are set; others remain null

---

#### TC-SET-008: Deleting branch override reverts field to tenant value
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | API |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Preconditions:**
1. BranchSettingsOverride exists for branch

**Steps:**
1. Call `DELETE /api/v1/tenant-configuration/branches/{branchId}`
2. Call `GET /api/v1/tenant-configuration/resolved?branchId={branchId}`

**Expected Results:**
- DELETE returns 200 OK
- Resolved settings now return tenant values for all fields
- All sources show `"tenant"`

---

#### TC-SET-009: Department override scope limited to default shift and approval comments
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Steps:**
1. Inspect `DepartmentSettingsOverride` entity properties
2. Attempt to set a field outside limited scope (e.g., attendance grace period)

**Expected Results:**
- DepartmentSettingsOverride only has nullable properties for: default shift and approval comment settings
- Fields outside its scope are not available and cannot be overridden at department level

---

#### TC-SET-010: Resolved settings with branchId and deptId applies full chain
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Preconditions:**
1. Tenant settings configured with all categories
2. Branch override exists with some fields overridden
3. Department override exists with default shift overridden

**Steps:**
1. Call `GET /api/v1/tenant-configuration/resolved?branchId={branchId}&deptId={deptId}`

**Expected Results:**
- Full 4-tier chain applied: Platform -> Tenant -> Branch -> Department
- Department-scope fields show department source when overridden
- Branch-scope fields show branch source when overridden
- Remaining fields show tenant source

---

### B. Tenant Configuration Categories (7 Categories)

#### TC-SET-011: General settings page renders and saves
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /settings/tenant-config/general |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/tenant-config/general`
2. Verify general settings fields render (company defaults, regional settings)
3. Modify a field value
4. Click Save

**Expected Results:**
- General settings form renders with current values populated
- Save triggers `PUT /api/v1/tenant-configuration`
- Success notification displayed
- Reloading the page shows saved values

---

#### TC-SET-012: Attendance settings page renders grace period fields
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /settings/tenant-config/attendance |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/tenant-config/attendance`

**Expected Results:**
- Page renders with attendance-related fields:
  - Late grace period (minutes)
  - Early departure grace period (minutes)
  - Auto-checkout settings
  - Attendance calculation mode
- Fields populated with current tenant settings

---

#### TC-SET-013: Attendance settings save grace period values
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Functional |
| **Page** | /settings/tenant-config/attendance |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/tenant-config/attendance`
2. Set late grace period to 10 minutes
3. Set early departure grace to 5 minutes
4. Click Save
5. Reload the page

**Expected Results:**
- API call `PUT /api/v1/tenant-configuration` succeeds
- Success notification shown
- Reloaded page shows grace period = 10 and early departure = 5

---

#### TC-SET-014: Leave settings page renders balance and carryover fields
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /settings/tenant-config/leave |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/tenant-config/leave`

**Expected Results:**
- Page renders with leave-related fields:
  - Default leave balance settings
  - Carryover rules (enabled/disabled, max days)
  - Accrual configuration
  - Leave year start

---

#### TC-SET-015: Leave settings save carryover configuration
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /settings/tenant-config/leave |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/tenant-config/leave`
2. Enable carryover and set max carryover days to 5
3. Click Save
4. Reload the page

**Expected Results:**
- Settings saved successfully
- Reloaded page shows carryover enabled with max 5 days

---

#### TC-SET-016: Approval settings page renders comment and timeout fields
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /settings/tenant-config/approval |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/tenant-config/approval`

**Expected Results:**
- Page renders with approval-related fields:
  - Require comments on approval
  - Require comments on rejection
  - Approval timeout (hours)
  - Escalation settings

---

#### TC-SET-017: Approval settings save timeout configuration
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /settings/tenant-config/approval |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/tenant-config/approval`
2. Set approval timeout to 48 hours
3. Enable require comments on rejection
4. Click Save

**Expected Results:**
- Settings saved via API
- Success notification shown

---

#### TC-SET-018: Notification settings page renders email/push/in-app toggles
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /settings/tenant-config/notification |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/tenant-config/notification`

**Expected Results:**
- Page renders with notification toggles:
  - Email notifications enabled/disabled
  - Push notifications enabled/disabled
  - In-app notifications enabled/disabled
  - Notification frequency settings

---

#### TC-SET-019: Notification settings save toggle states
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /settings/tenant-config/notification |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/tenant-config/notification`
2. Toggle email notifications off
3. Click Save
4. Reload the page

**Expected Results:**
- Settings saved successfully
- Email notifications toggle shows disabled on reload

---

#### TC-SET-020: Mobile settings page renders NFC and GPS configuration
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /settings/tenant-config/mobile |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/tenant-config/mobile`

**Expected Results:**
- Page renders with mobile-related fields:
  - NFC verification required toggle
  - GPS geofence radius settings
  - Mobile check-in enabled/disabled
  - Device registration settings

---

#### TC-SET-021: Mobile settings save NFC/GPS configuration
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /settings/tenant-config/mobile |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/tenant-config/mobile`
2. Enable NFC verification
3. Set GPS geofence radius
4. Click Save

**Expected Results:**
- Settings saved successfully via API
- Success notification shown

---

#### TC-SET-022: Security settings page renders password policy and session fields
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /settings/tenant-config/security |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/tenant-config/security`

**Expected Results:**
- Page renders with security-related fields:
  - Password minimum length
  - Password complexity requirements
  - Session timeout (minutes)
  - Max concurrent sessions
  - 2FA enforcement settings
  - Account lockout threshold

---

#### TC-SET-023: Security settings save 2FA and session configuration
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /settings/tenant-config/security |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/tenant-config/security`
2. Set session timeout to 30 minutes
3. Enable 2FA enforcement
4. Click Save

**Expected Results:**
- Settings saved successfully
- New security settings take effect on next login

---

#### TC-SET-024: Tenant config sidebar navigation shows 9 child routes
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /settings/tenant-config |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/tenant-config`
2. Inspect the sidebar/tab navigation

**Expected Results:**
- 9 navigation items visible: General, Attendance, Leave, Approval, Notification, Mobile, Security, Policy Templates, Setup Status
- Default route redirects to `general`
- Clicking each item loads the corresponding child component
- Active item is visually highlighted

---

### C. Policy Templates

#### TC-SET-025: Policy templates page lists 8 seeded templates
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /settings/tenant-config/templates |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/tenant-config/templates`
2. Observe the template list

**Expected Results:**
- 8 seeded templates displayed:
  - Saudi Standard (SA)
  - UAE Standard (AE)
  - Healthcare (SA)
  - Construction (SA)
  - Technology (SA)
  - Retail (SA)
  - Government (SA)
  - Education (SA)
- Each template shows name, region, and item count

---

#### TC-SET-026: Saudi Standard template has 12 items
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Steps:**
1. Call `GET /api/v1/policy-templates` and find the `saudi-standard` template
2. Call `GET /api/v1/policy-templates/{id}` to get full details

**Expected Results:**
- Template has code `saudi-standard`, region `SA`
- Contains exactly 12 items:
  - 1 TenantSettings
  - 7 VacationType (Annual, Sick, Marriage, Maternity, Paternity, Bereavement, Hajj)
  - 1 ExcusePolicy
  - 1 Shift (Sun-Thu 08:00-17:00)
  - 1 OffDay (Fri-Sat)
  - 1 OvertimeConfiguration

---

#### TC-SET-027: UAE Standard template has 11 items
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Steps:**
1. Call `GET /api/v1/policy-templates` and find the `uae-standard` template
2. Call `GET /api/v1/policy-templates/{id}`

**Expected Results:**
- Template has code `uae-standard`, region `AE`
- Contains exactly 11 items:
  - 1 TenantSettings
  - 6 VacationType (per UAE Decree-Law 33/2021)
  - 1 ExcusePolicy
  - 1 Shift (Mon-Fri 09:00-18:00)
  - 1 OffDay (Sat-Sun)
  - 1 OvertimeConfiguration

---

#### TC-SET-028: Filter templates by region returns correct subset
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Steps:**
1. Call `GET /api/v1/policy-templates?region=SA`
2. Call `GET /api/v1/policy-templates?region=AE`

**Expected Results:**
- `region=SA` returns 7 templates (Saudi Standard + 6 industry)
- `region=AE` returns 1 template (UAE Standard)

---

#### TC-SET-029: Apply template to tenant creates expected entities
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Steps:**
1. Call `POST /api/v1/policy-templates/{saudiStandardId}/apply` (no branchId)
2. Verify vacation types, shifts, off days, etc. created in tenant DB

**Expected Results:**
- TenantSettings updated with template values
- 7 vacation types created matching Saudi labor law
- Excuse policy created
- Shift created (Sun-Thu 08:00-17:00)
- Off days created (Fri-Sat)
- Overtime configuration created
- All entities scoped to tenant (no branch restriction)

---

#### TC-SET-030: Apply template to branch scopes entities to branch
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Steps:**
1. Call `POST /api/v1/policy-templates/{id}/apply?branchId={branchId}`

**Expected Results:**
- Created entities (shifts, off days, overtime config) are scoped to the specified branch
- Branch-specific configuration applied

---

#### TC-SET-031: System templates cannot be deleted
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Preconditions:**
1. Template has `IsSystemTemplate = true`

**Steps:**
1. Call `DELETE /api/v1/policy-templates/{systemTemplateId}`

**Expected Results:**
- Returns 400 or 403 error
- Error message indicates system templates cannot be deleted
- Template still exists after the call

---

#### TC-SET-032: System templates require SystemAdmin to edit
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | N/A (API) |
| **Role** | Branch Manager |

**Preconditions:**
1. Template has `IsSystemTemplate = true`
2. Logged in as non-SystemAdmin user

**Steps:**
1. Call `PUT /api/v1/policy-templates/{systemTemplateId}` with updated data

**Expected Results:**
- Returns 403 Forbidden
- System template remains unchanged

---

#### TC-SET-033: Custom template CRUD — create
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Steps:**
1. Call `POST /api/v1/policy-templates` with custom template data:
   - Name: "Custom Test Template"
   - Region: "SA"
   - IsSystemTemplate: false
   - Items: 1 TenantSettings item with ConfigurationJson

**Expected Results:**
- Returns 201 Created with template ID
- Template retrievable via `GET /api/v1/policy-templates/{id}`
- `IsSystemTemplate = false`

---

#### TC-SET-034: Custom template CRUD — update
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Preconditions:**
1. Custom template exists (from TC-SET-033)

**Steps:**
1. Call `PUT /api/v1/policy-templates/{id}` with updated name and items

**Expected Results:**
- Returns 200 OK
- Template name and items updated

---

#### TC-SET-035: Custom template CRUD — delete
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Preconditions:**
1. Custom template exists (IsSystemTemplate = false)

**Steps:**
1. Call `DELETE /api/v1/policy-templates/{id}`
2. Call `GET /api/v1/policy-templates/{id}`

**Expected Results:**
- DELETE returns 200 OK
- GET returns 404 Not Found

---

#### TC-SET-036: Template supports all 7 PolicyTypes
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Steps:**
1. Create a custom template with items covering all 7 PolicyTypes:
   - TenantSettings
   - VacationType
   - ExcusePolicy
   - Shift (with ShiftPeriods in ConfigurationJson)
   - OffDay
   - OvertimeConfiguration
   - RemoteWorkPolicy

**Expected Results:**
- Template created successfully with all 7 item types
- Each item has valid `ConfigurationJson` for its type
- Applying the template creates entities for each type

---

### D. Public Holidays

#### TC-SET-037: Public holiday create — OneTime with specificDate
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Functional |
| **Page** | /settings/public-holidays/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/public-holidays/create`
2. Enter Name: "Company Anniversary"
3. Select HolidayType: OneTime
4. Set SpecificDate: 2026-06-15
5. Click Save

**Expected Results:**
- Holiday created successfully
- `GetHolidayDateForYear(2026)` returns 2026-06-15
- Holiday appears in the list page
- HolidayType stored as `OneTime` (0)

---

#### TC-SET-038: Public holiday create — Annual with month and day
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Functional |
| **Page** | /settings/public-holidays/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/public-holidays/create`
2. Enter Name: "Saudi National Day"
3. Enter NameAr: Arabic name
4. Select HolidayType: Annual
5. Set Month: 9, Day: 23
6. Click Save

**Expected Results:**
- Holiday created with `HolidayType = Annual` (1)
- Month = 9, Day = 23 stored
- `GetHolidayDateForYear(2026)` returns 2026-09-23
- `GetHolidayDateForYear(2027)` returns 2027-09-23

---

#### TC-SET-039: Public holiday create — Monthly with day
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /settings/public-holidays/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/public-holidays/create`
2. Enter Name: "Monthly Team Day"
3. Select HolidayType: Monthly
4. Set Day: 15
5. Click Save

**Expected Results:**
- Holiday created with `HolidayType = Monthly` (2)
- Day = 15 stored
- Recurs on the 15th of every month

---

#### TC-SET-040: Public holiday create — Floating with month, weekOfMonth, dayOfWeek
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /settings/public-holidays/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/public-holidays/create`
2. Enter Name: "First Monday of March"
3. Select HolidayType: Floating
4. Set Month: 3, WeekOccurrence: 1, DayOfWeek: Monday (1)
5. Click Save

**Expected Results:**
- Holiday created with `HolidayType = Floating` (3)
- Month = 3, WeekOccurrence = 1, DayOfWeek = Monday stored
- `GetHolidayDateForYear(2026)` calculates the first Monday of March 2026

---

#### TC-SET-041: Public holiday name required, maxLength 200
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /settings/public-holidays/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/public-holidays/create`
2. Leave Name empty, attempt to save
3. Enter a 201-character Name, attempt to save

**Expected Results:**
- Empty name: Validation error, form does not submit
- 201-character name: Validation error or truncation at 200 characters
- Name field is required

---

#### TC-SET-042: Public holiday isActive defaults to true
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /settings/public-holidays/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/public-holidays/create`
2. Observe the IsActive toggle/checkbox default state

**Expected Results:**
- IsActive defaults to `true` (checked/enabled)
- Inactive holidays do not affect overtime calculations

---

#### TC-SET-043: Public holiday priority range 1-100, default 1
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Page** | /settings/public-holidays/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/public-holidays/create`
2. Observe Priority field default value
3. Enter 0 and attempt to save
4. Enter 101 and attempt to save
5. Enter 50 and save

**Expected Results:**
- Default Priority value is 1
- Priority 0: Validation error or clamped to 1
- Priority 101: Validation error or clamped to 100
- Priority 50: Saves successfully

---

#### TC-SET-044: Public holiday branch-specific vs national
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /settings/public-holidays/create |
| **Role** | System Admin |

**Steps:**
1. Create holiday with IsNational = true (no BranchId)
2. Create holiday with IsNational = false and BranchId = 101

**Expected Results:**
- National holiday: `IsNational = true`, `BranchId = null`, applies to all branches
- Branch-specific holiday: `IsNational = false`, `BranchId = 101`, only applies to that branch

---

### E. Setup Status

#### TC-SET-045: Setup status page shows 9 onboarding steps
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /settings/tenant-config/setup-status |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/settings/tenant-config/setup-status`

**Expected Results:**
- 9 setup steps displayed:
  1. company_info
  2. branches
  3. departments
  4. shifts
  5. vacation_types
  6. excuse_policies
  7. workflows
  8. employees
  9. payroll
- Each step shows completion status (completed/pending)

---

#### TC-SET-046: Setup status auto-detection checks DB for actual data
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Preconditions:**
1. Branches exist in the tenant database
2. "branches" setup step is marked as incomplete

**Steps:**
1. Call `GET /api/v1/tenant-configuration/setup-status`

**Expected Results:**
- Auto-detection logic checks actual data in DB
- "branches" step shows as completed because branches exist
- Steps without data show as pending

---

#### TC-SET-047: Marking setup step complete via API persists
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Steps:**
1. Call `POST /api/v1/tenant-configuration/setup-status` with step name and completion status
2. Call `GET /api/v1/tenant-configuration/setup-status`

**Expected Results:**
- POST returns success
- GET shows the step as completed
- CompletedAt timestamp is set

---

#### TC-SET-048: Setup steps created automatically on tenant provisioning
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | N/A (Backend) |
| **Role** | Platform Admin |

**Preconditions:**
1. Platform admin creates a new tenant

**Steps:**
1. Create a new tenant via `POST /api/v1/tenants`
2. Query the new tenant's database for SetupStep records

**Expected Results:**
- 9 SetupStep rows automatically created in the tenant database
- All steps initially marked as incomplete
- Steps match the expected set (company_info through payroll)

---

#### TC-SET-049: TenantSettings created automatically on tenant provisioning
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | N/A (Backend) |
| **Role** | Platform Admin |

**Preconditions:**
1. Platform admin creates a new tenant

**Steps:**
1. Create a new tenant via `POST /api/v1/tenants`
2. Call `GET /api/v1/tenant-configuration` against the new tenant

**Expected Results:**
- TenantSettings row exists in the new tenant database
- Default values populated for all 7 categories
- Settings are immediately accessible via API
