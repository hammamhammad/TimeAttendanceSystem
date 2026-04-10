# TC-ENT: Module Entitlements & Access Control — Test Cases

## Module Overview

Module Entitlements enforce subscription-based access control across the entire TecAxle HRMS system. Each tenant's subscription plan determines which of the 26 system modules are enabled, what features are available, and what usage limits apply. Enforcement occurs at three layers: backend MediatR pipeline behaviors (`ModuleEntitlementBehavior`, `UsageLimitBehavior`), frontend route guards (`moduleGuard`), and UI element visibility (sidenav filtering, button hiding, read-only banners). When a module is deactivated, in-flight workflows are frozen and data remains accessible in read-only mode for historical queries.

**Backend Enforcement**: `[RequiresModule]` attribute on 173 commands/queries, `[RequiresLimit]` on creation commands, `ReportsController` per-endpoint checks
**Frontend Enforcement**: `moduleGuard` on 201 routes, `EntitlementService` signal-based service, `ModuleStatusBannerComponent`, sidenav module filtering
**Module Deactivation**: `IModuleDeactivationService` freezes/unfreezes workflows, `FrozenWorkflowCleanupJob` auto-cancels after 90 days
**Subscription Tiers**: Starter (5 modules, 50 employees), Professional (13 modules, 500 employees), Enterprise (all 26 modules, unlimited)

**API Endpoints**: `GET /api/v1/entitlements`, `GET /api/v1/entitlements/modules`, `GET /api/v1/entitlements/usage`
**Backend Behaviors**: `ModuleEntitlementBehavior.cs`, `UsageLimitBehavior.cs`
**Frontend Services**: `entitlement.service.ts`, `module.guard.ts`, `ModuleStatusBannerComponent`

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
| Platform Admin | (from master seed) | (from master seed) | `is_platform_user=true`, no `tenant_id` claim |
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | IsSystemUser=true, bypasses all module checks |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | Regular tenant user |
| Employee | salma.khaldi@company.com | Emp@123! | Regular tenant user |

### Subscription Plans (Default)

| Plan | Modules | Max Employees | Key Modules |
|------|---------|---------------|-------------|
| Starter | 5 | 50 | Core, Organization, TimeAttendance, ShiftManagement, LeaveManagement |
| Professional | 13 | 500 | Starter + Excuses, RemoteWork, Approvals, Notifications, Dashboards, Reporting, Documents, NfcManagement |
| Enterprise | 26 | Unlimited | All modules |

---

## Test Cases

### A. Backend Module Entitlement Enforcement (MediatR Pipeline)

#### TC-ENT-001: Command blocked when module is disabled
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant is on Starter plan (does NOT include RemoteWork module)
2. User is logged in with valid JWT containing `tenant_id`

**Steps:**
1. Call `POST /api/v1/remote-work-requests` with a valid remote work request body
2. Observe the response

**Expected Results:**
- HTTP 403 Forbidden
- Response message: "The 'RemoteWork' module is not available in your current subscription plan."
- No remote work request is created in the database
- `ModuleEntitlementBehavior` intercepts the command before the handler executes

---

#### TC-ENT-002: Query with AllowReadWhenDisabled=true succeeds when module disabled
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant was previously on Enterprise plan with RemoteWork enabled
2. Remote work requests exist in the database from that period
3. Tenant is now downgraded to Starter plan (RemoteWork disabled)

**Steps:**
1. Call `GET /api/v1/remote-work-requests` (list query with `AllowReadWhenDisabled=true`)
2. Observe the response

**Expected Results:**
- HTTP 200 OK
- Response contains historical remote work request data
- Data is read-only (no modification actions available)
- `ModuleEntitlementBehavior` allows the query because `AllowReadWhenDisabled=true`

---

#### TC-ENT-003: Query without AllowReadWhenDisabled blocked when module disabled
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant on Starter plan (Recruitment module disabled)
2. A query handler for Recruitment exists with `[RequiresModule(SystemModule.Recruitment)]` but WITHOUT `AllowReadWhenDisabled=true`

**Steps:**
1. Call a Recruitment query endpoint that does not allow read-when-disabled
2. Observe the response

**Expected Results:**
- HTTP 403 Forbidden
- Response message: "The 'Recruitment' module is not available in your current subscription plan."

---

#### TC-ENT-004: SystemAdmin bypasses all module checks
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System Admin |

**Preconditions:**
1. Tenant on Starter plan (RemoteWork module disabled)
2. Logged in as SystemAdmin user

**Steps:**
1. Call `POST /api/v1/remote-work-requests` with a valid request body
2. Call `GET /api/v1/remote-work-requests`
3. Call any endpoint decorated with `[RequiresModule]` for a disabled module

**Expected Results:**
- All three calls succeed (HTTP 200/201)
- SystemAdmin is exempt from `ModuleEntitlementBehavior` checks
- SystemAdmin can create, read, update, and delete data in all modules regardless of subscription plan

---

#### TC-ENT-005: Usage limit blocks creation when max employees reached
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant on Starter plan (MaxEmployees = 50)
2. Tenant currently has exactly 50 active employees

**Steps:**
1. Call `POST /api/v1/employees` with a valid new employee payload
2. Observe the response

**Expected Results:**
- HTTP 403 Forbidden
- Response message: "You have reached the maximum limit of 50 for 'MaxEmployees'."
- No new employee created in the database
- `UsageLimitBehavior` intercepts the command

---

#### TC-ENT-006: Usage limit allows creation when below limit
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant on Starter plan (MaxEmployees = 50)
2. Tenant currently has 49 active employees

**Steps:**
1. Call `POST /api/v1/employees` with a valid new employee payload
2. Observe the response

**Expected Results:**
- HTTP 201 Created
- Employee created successfully
- `UsageLimitBehavior` allows the creation (49 < 50)

---

#### TC-ENT-007: Enterprise plan has unlimited employees (no limit enforcement)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant on Enterprise plan (MaxEmployees = unlimited / -1 / null)
2. Tenant already has 1000+ employees

**Steps:**
1. Call `POST /api/v1/employees` with a valid new employee payload
2. Observe the response

**Expected Results:**
- HTTP 201 Created
- Employee created successfully
- No usage limit check triggered for unlimited plans

---

#### TC-ENT-008: Reports controller checks module entitlement per endpoint
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant on Starter plan (has TimeAttendance, does NOT have Payroll, EmployeeLifecycle, Training, Documents)

**Steps:**
1. Call `GET /api/v1/reports/attendance` (requires TimeAttendance module)
2. Call `GET /api/v1/reports/leave` (requires LeaveManagement module)
3. Call `GET /api/v1/reports/payroll` (requires Payroll module)
4. Call `GET /api/v1/reports/contracts` (requires EmployeeLifecycle module)
5. Call `GET /api/v1/reports/documents` (requires Documents module)
6. Call `GET /api/v1/reports/certifications` (requires Training module)
7. Call `GET /api/v1/reports/compliance` (requires EmployeeLifecycle module)

**Expected Results:**
- Steps 1-2: HTTP 200 OK (TimeAttendance and LeaveManagement enabled in Starter)
- Steps 3-7: HTTP 403 Forbidden with message indicating the required module is not in the subscription plan
- `ReportsController` calls `IEntitlementService.IsModuleEnabledAsync()` per endpoint

---

#### TC-ENT-009: Reports controller — SystemAdmin bypasses report entitlement checks
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System Admin |

**Preconditions:**
1. Tenant on Starter plan
2. Logged in as SystemAdmin

**Steps:**
1. Call `GET /api/v1/reports/payroll` (Payroll module disabled for Starter)

**Expected Results:**
- HTTP 200 OK
- SystemAdmin bypasses ReportsController entitlement checks
- Payroll report data returned

---

#### TC-ENT-010: Entitlement cache — 5-minute TTL per tenant
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant on Starter plan
2. Entitlement has been queried at least once (cache populated)

**Steps:**
1. Call `GET /api/v1/entitlements` — note the response
2. Directly change the tenant's subscription plan in the database (bypassing the API, simulating a DB-level update without cache invalidation)
3. Immediately call `GET /api/v1/entitlements` again
4. Wait 5 minutes
5. Call `GET /api/v1/entitlements` again

**Expected Results:**
- Step 3: Returns cached (old) entitlement data — plan change not reflected yet
- Step 5: Cache expired, fresh data loaded from database — new plan reflected
- Cache key is per-tenant (different tenants have independent caches)

---

#### TC-ENT-011: Entitlement cache invalidated on subscription change via API
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System Admin |

**Preconditions:**
1. Tenant on Starter plan
2. Entitlement cache is populated

**Steps:**
1. Call `GET /api/v1/entitlements` — returns Starter plan entitlements
2. Call `PUT /api/v1/tenants/{tenantId}/subscription/change-plan` to upgrade to Professional
3. Immediately call `GET /api/v1/entitlements` again

**Expected Results:**
- Step 3: Returns Professional plan entitlements (not cached Starter data)
- `ChangePlanCommandHandler` calls `InvalidateCache(tenantId)` after plan change
- No need to wait for TTL expiry

---

### B. Frontend Module Guards & UI Enforcement

#### TC-ENT-012: moduleGuard blocks disabled module route (strict mode)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | Admin Portal |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant on Starter plan (Recruitment module disabled)
2. User logged in to Admin Portal

**Steps:**
1. Navigate to `/recruitment/create` (a route with `moduleStrict: true`)
2. Observe the browser behavior

**Expected Results:**
- `moduleGuard` checks `entitlementService.isModuleEnabled('Recruitment')` — returns false
- Route is `moduleStrict: true` → user is redirected to `/module-disabled?module=Recruitment`
- Module disabled page displays with message indicating Recruitment is not in the subscription plan
- No Recruitment create form is rendered

---

#### TC-ENT-013: moduleGuard allows disabled module list/view routes (read-only)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | Admin Portal |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant was on Enterprise plan, had Recruitment data
2. Tenant downgraded to Starter (Recruitment disabled)
3. Historical recruitment data exists

**Steps:**
1. Navigate to `/recruitment` (list route, NOT `moduleStrict`)
2. Observe the page behavior

**Expected Results:**
- `moduleGuard` allows access (non-strict route, read-only mode)
- Recruitment list page renders with historical data
- `ModuleStatusBannerComponent` shows a warning banner: module is read-only
- No "Create" or "Add" button visible
- Edit/delete actions are hidden or disabled

---

#### TC-ENT-014: ModuleStatusBannerComponent renders in read-only mode
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | Admin Portal |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant on Starter plan (RemoteWork module disabled)
2. Historical remote work data exists

**Steps:**
1. Navigate to `/remote-work` (list page)
2. Observe the top of the page

**Expected Results:**
- `ModuleStatusBannerComponent` is visible at the top of the content area
- Banner displays a warning message indicating the module is disabled/read-only
- Banner styled with warning color (`--app-warning` or similar)
- Banner text mentions upgrading the subscription plan

---

#### TC-ENT-015: Sidenav hides menu items for disabled modules
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | Admin Portal |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant on Starter plan (5 modules: Core, Organization, TimeAttendance, ShiftManagement, LeaveManagement)

**Steps:**
1. Login to Admin Portal
2. Observe the sidebar navigation menu
3. Check for presence/absence of module-specific menu items

**Expected Results:**
- Visible: Dashboard, Branches, Departments, Employees, Attendance, Shifts, Vacations, Leave Balances
- Hidden: Remote Work, Recruitment, Onboarding, Performance, Payroll, Contracts, Offboarding, and all other disabled module menu items
- Menu groups with zero visible items are entirely hidden (e.g., "Compensation" group hidden if Payroll module disabled)
- `hasVisibleGroup()` in sidenav returns false for groups with only disabled module items

---

#### TC-ENT-016: UnifiedFilterComponent hides Add button in read-only mode
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | Admin Portal |
| **Role** | Branch Manager |

**Preconditions:**
1. Module is disabled but historical data exists
2. List page uses `UnifiedFilterComponent` with `[readOnly]="true"`

**Steps:**
1. Navigate to a list page for a disabled module (e.g., `/remote-work`)
2. Observe the filter bar area

**Expected Results:**
- Search field is visible and functional
- Refresh button is visible and functional
- "Add" / "Create" button is NOT visible
- `[showAddButton]` is overridden by `[readOnly]` input set to true

---

#### TC-ENT-017: EntitlementService loads on login via FilterRegistryService
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Admin Portal |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant user (not platform admin)

**Steps:**
1. Login to Admin Portal
2. Open browser DevTools > Network tab
3. Observe API calls made after successful login

**Expected Results:**
- `GET /api/v1/entitlements` is called automatically after login
- `EntitlementService.isLoaded()` signal becomes `true`
- `isModuleEnabled()` returns correct values for each module
- `isModuleReadOnly()` returns correct values based on plan
- No console errors related to entitlement loading

---

#### TC-ENT-018: EntitlementService skipped for platform admin login
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Admin Portal |
| **Role** | Platform Admin |

**Preconditions:**
1. Platform admin user (has `is_platform_user=true` in JWT)

**Steps:**
1. Login to Admin Portal as platform admin
2. Open browser DevTools > Network tab
3. Observe API calls after login

**Expected Results:**
- `GET /api/v1/entitlements` is NOT called
- `FilterRegistryService` auth effect detects platform admin and skips entitlement loading
- Platform admin sees only Platform menu items (Tenants, Subscription Plans)
- No module guard checks applied to platform admin routes

---

#### TC-ENT-019: Platform admin sees only Platform menu items
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | Admin Portal |
| **Role** | Platform Admin |

**Steps:**
1. Login to Admin Portal as platform admin
2. Observe sidebar navigation

**Expected Results:**
- Only "Platform" group visible: Tenants, Subscription Plans
- All tenant-specific groups hidden: Organization, Time & Attendance, Leave & Absence, HR & Lifecycle, Compensation, Performance & Growth, Workplace, Workflows & Approvals, Reports & Analytics, Settings
- `platformPaths` and `platformGroupKeys` sets in `sidenav.component.ts` control visibility
- Dashboard accessible but shows platform-level data only

---

#### TC-ENT-020: Tenant admin does NOT see Platform menu items
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | Admin Portal |
| **Role** | System Admin (Tenant) |

**Steps:**
1. Login to Admin Portal as tenant SystemAdmin
2. Observe sidebar navigation

**Expected Results:**
- Platform group NOT visible (no Tenants, no Subscription Plans)
- All tenant business groups visible (based on subscription plan + permissions)
- Tenant admin cannot navigate to `/tenants` or `/subscription-plans` even via direct URL
- Route guard redirects to unauthorized page

---

#### TC-ENT-021: moduleGuard on 201 routes — all module-tagged routes protected
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Admin Portal |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant on Starter plan

**Steps:**
1. Attempt to navigate to each of the following route families for disabled modules via direct URL entry:
   - `/remote-work/*` (RemoteWork module)
   - `/recruitment/*` (Recruitment module)
   - `/onboarding/*` (Onboarding module)
   - `/performance/*` (Performance module)
   - `/payroll/*` (Payroll module)
   - `/contracts/*` (EmployeeLifecycle module)
2. For each, try both list route and create route

**Expected Results:**
- List routes for disabled modules: allowed in read-only mode (if historical data exists) with `ModuleStatusBannerComponent` warning
- Create/edit routes (`moduleStrict: true`): redirected to `/module-disabled?module=X`
- All 201 module-tagged routes are protected by `moduleGuard`

---

### C. Module Deactivation & Workflow Freeze

#### TC-ENT-022: Disabling a module freezes in-flight workflows
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System Admin |

**Preconditions:**
1. Tenant on Enterprise plan with RemoteWork module enabled
2. There are 3 in-flight remote work approval workflows (WorkflowStatus = InProgress)

**Steps:**
1. Change tenant's plan to one that does NOT include RemoteWork
2. Query the workflow instances for remote work entity type

**Expected Results:**
- All 3 in-flight remote work workflows now have `WorkflowStatus = Frozen` (value 7)
- `ContextJson` stores the previous status (e.g., `InProgress`) for each workflow
- `IModuleDeactivationService` called during plan change
- Frozen workflows cannot be approved, rejected, or modified

---

#### TC-ENT-023: Frozen workflow — CanBeModified returns false
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Branch Manager |

**Preconditions:**
1. A workflow instance exists with `WorkflowStatus = Frozen`

**Steps:**
1. Call the approval endpoint to try to approve/reject the frozen workflow
2. Observe the response

**Expected Results:**
- API returns an error indicating the workflow cannot be modified
- `WorkflowInstance.CanBeModified()` returns false for frozen workflows
- No state change occurs on the workflow

---

#### TC-ENT-024: Re-enabling module unfreezes workflows
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System Admin |

**Preconditions:**
1. Tenant had RemoteWork disabled, 3 workflows are frozen
2. ContextJson contains previous status for each workflow

**Steps:**
1. Upgrade tenant's plan to one that includes RemoteWork
2. Query the workflow instances for remote work entity type

**Expected Results:**
- All 3 workflows restored to their previous status from `ContextJson` (e.g., back to `InProgress`)
- `WorkflowStatus` is no longer Frozen
- Workflows can now be approved/rejected normally
- `IModuleDeactivationService` handles the reactivation

---

#### TC-ENT-025: FrozenWorkflowCleanupJob auto-cancels workflows frozen > 90 days
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Workflow instances exist with `WorkflowStatus = Frozen`
2. Some workflows have been frozen for > 90 days
3. Some workflows have been frozen for < 90 days

**Steps:**
1. Trigger or wait for `FrozenWorkflowCleanupJob` execution (runs daily at 3:00 AM)
2. Query workflow instances

**Expected Results:**
- Workflows frozen > 90 days: `WorkflowStatus` changed to `Cancelled`
- Workflows frozen < 90 days: remain with `WorkflowStatus = Frozen` (unchanged)
- Job runs as `TenantIteratingJob`, processing all active tenants

---

#### TC-ENT-026: Cross-module dependency prevents disabling depended-upon module
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Platform Admin |

**Preconditions:**
1. Tenant on a custom plan with modules A and B, where module B depends on module A
2. Example: Approvals module depends on Core module

**Steps:**
1. Attempt to change the tenant's plan to one that disables module A but keeps module B
2. Observe the response

**Expected Results:**
- HTTP 400 Bad Request or 422 Unprocessable Entity
- Error message indicates module A cannot be disabled because module B depends on it
- `ChangePlanCommandHandler` validates `ModuleDependencyRules.GetDependentModules()` before allowing the downgrade
- No plan change occurs

---

#### TC-ENT-027: EntitlementChangeLog records plan assignment
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Platform Admin |

**Preconditions:**
1. Tenant exists without a subscription plan

**Steps:**
1. Call `POST /api/v1/tenants/{tenantId}/subscription` to assign Starter plan
2. Query `EntitlementChangeLogs` table in master DB

**Expected Results:**
- New `EntitlementChangeLog` entry created with:
  - `ChangeType` = `PlanAssigned`
  - `TenantId` = the tenant's ID
  - Before JSON snapshot = null or empty (no previous plan)
  - After JSON snapshot = Starter plan details (modules, limits, features)
  - Timestamp of the change

---

#### TC-ENT-028: EntitlementChangeLog records plan change
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Platform Admin |

**Preconditions:**
1. Tenant on Starter plan

**Steps:**
1. Call `PUT /api/v1/tenants/{tenantId}/subscription/change-plan` to upgrade to Professional
2. Query `EntitlementChangeLogs` table in master DB

**Expected Results:**
- New `EntitlementChangeLog` entry with:
  - `ChangeType` = `PlanChanged`
  - Before JSON = Starter plan snapshot
  - After JSON = Professional plan snapshot
  - Append-only — previous log entries preserved

---

#### TC-ENT-029: EntitlementChangeLog records subscription cancellation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Platform Admin |

**Preconditions:**
1. Tenant on Professional plan with active subscription

**Steps:**
1. Call `POST /api/v1/tenants/{tenantId}/subscription/cancel`
2. Query `EntitlementChangeLogs` table

**Expected Results:**
- New `EntitlementChangeLog` entry with:
  - `ChangeType` = `SubscriptionCancelled`
  - Before JSON = Professional plan snapshot
  - After JSON = null or cancellation record
  - `CancelSubscriptionCommandHandler` creates the log entry

---

#### TC-ENT-030: WorkflowEntityType to SystemModule mapping covers all entity types
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System |

**Preconditions:**
1. Multiple workflow types exist (Vacation, Excuse, RemoteWork, SalaryAdjustment, etc.)

**Steps:**
1. Verify `ModuleMetadata.GetModuleForEntityType()` returns correct SystemModule for each WorkflowEntityType:
   - Vacation workflows → LeaveManagement
   - Excuse workflows → ExcuseManagement
   - RemoteWork workflows → RemoteWork
   - SalaryAdjustment workflows → Payroll
2. Disable each module and verify the corresponding workflows are frozen

**Expected Results:**
- Each WorkflowEntityType maps to exactly one SystemModule
- Disabling a module freezes only workflows of the mapped entity type
- No orphaned workflows (all entity types have a mapping)

---

### D. Subscription Tier & Entitlement API Testing

#### TC-ENT-031: GET /api/v1/entitlements returns full entitlement summary
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant on Professional plan

**Steps:**
1. Call `GET /api/v1/entitlements` with valid JWT
2. Inspect the response body

**Expected Results:**
- Response includes:
  - `plan` object with plan name, tier, and details
  - `modules` array listing all enabled module names (13 for Professional)
  - `features` object with feature flags and their values
  - `limits` object with usage limits (e.g., `maxEmployees: 500`)
- HTTP 200 OK

---

#### TC-ENT-032: GET /api/v1/entitlements/modules returns enabled module names
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant on Starter plan (5 modules)

**Steps:**
1. Call `GET /api/v1/entitlements/modules`
2. Inspect the response

**Expected Results:**
- Response is an array of 5 module name strings
- Contains: "Core", "Organization", "TimeAttendance", "ShiftManagement", "LeaveManagement"
- Does NOT contain: "RemoteWork", "Recruitment", "Payroll", etc.

---

#### TC-ENT-033: GET /api/v1/entitlements/usage returns usage vs limits
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant on Starter plan (MaxEmployees = 50)
2. Tenant has 35 active employees

**Steps:**
1. Call `GET /api/v1/entitlements/usage`
2. Inspect the response

**Expected Results:**
- Response includes usage metrics:
  - `maxEmployees`: `{ "limit": 50, "current": 35, "remaining": 15 }`
- All limit types reported with current usage counts

---

#### TC-ENT-034: Starter plan — only 5 modules enabled
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Admin Portal |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant on Starter plan

**Steps:**
1. Login to Admin Portal
2. Navigate through all module areas
3. Verify sidebar menu items
4. Call `GET /api/v1/entitlements/modules`

**Expected Results:**
- Exactly 5 modules accessible: Core, Organization, TimeAttendance, ShiftManagement, LeaveManagement
- 21 other modules are disabled
- Sidebar shows only items for enabled modules
- API confirms 5-module list

---

#### TC-ENT-035: Professional plan — 13 modules enabled
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Admin Portal |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant on Professional plan

**Steps:**
1. Login to Admin Portal
2. Verify sidebar shows additional module items beyond Starter
3. Call `GET /api/v1/entitlements/modules`

**Expected Results:**
- 13 modules accessible (Starter 5 + Excuses, RemoteWork, Approvals, Notifications, Dashboards, Reporting, Documents, NfcManagement)
- 13 modules still disabled
- Professional-exclusive features accessible

---

#### TC-ENT-036: Enterprise plan — all 26 modules enabled, unlimited employees
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Admin Portal |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant on Enterprise plan

**Steps:**
1. Login to Admin Portal
2. Verify all sidebar menu groups and items are visible
3. Call `GET /api/v1/entitlements/modules`
4. Call `GET /api/v1/entitlements/usage`

**Expected Results:**
- All 26 modules accessible
- All sidebar groups visible with all menu items
- No module guard blocks any route
- No `ModuleStatusBannerComponent` shown on any page
- Usage endpoint shows unlimited employee limit (or very high value)

---

#### TC-ENT-037: Plan upgrade — newly enabled modules become accessible immediately
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Admin Portal |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant on Starter plan
2. User is logged into Admin Portal

**Steps:**
1. Verify RemoteWork module is not accessible (navigate to `/remote-work/create` — redirected)
2. Platform admin upgrades tenant to Professional plan (via API or admin UI)
3. User refreshes the Admin Portal page (or re-logs in)
4. Navigate to `/remote-work/create`

**Expected Results:**
- Before upgrade: `/remote-work/create` blocked by `moduleGuard`
- After upgrade + refresh: `/remote-work/create` loads normally
- `EntitlementService` reloads entitlements on page refresh / re-login
- Sidebar now shows Remote Work menu item
- No read-only banner on Remote Work pages

---

#### TC-ENT-038: Plan downgrade — disabled modules become read-only
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Admin Portal |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant on Professional plan with RemoteWork data
2. User is logged into Admin Portal

**Steps:**
1. Verify RemoteWork module is fully accessible
2. Platform admin downgrades tenant to Starter plan
3. User refreshes the Admin Portal
4. Navigate to `/remote-work` (list page)
5. Navigate to `/remote-work/create`

**Expected Results:**
- `/remote-work` (list): loads in read-only mode with `ModuleStatusBannerComponent` warning, historical data visible
- `/remote-work/create`: redirected to `/module-disabled?module=RemoteWork`
- Sidebar may still show RemoteWork item (dimmed/read-only indicator) or hide it entirely
- Backend commands for RemoteWork return 403

---

#### TC-ENT-039: Unauthenticated request to entitlements endpoint returns 401
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Negative |
| **Page** | API |
| **Role** | Unauthenticated |

**Steps:**
1. Call `GET /api/v1/entitlements` without Authorization header
2. Call `GET /api/v1/entitlements/modules` without Authorization header
3. Call `GET /api/v1/entitlements/usage` without Authorization header

**Expected Results:**
- All three return HTTP 401 Unauthorized
- Standard error response format: `{ "statusCode": 401, "message": "...", "traceId": "..." }`

---

#### TC-ENT-040: Tenant with no active subscription — all non-Core modules blocked
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant's subscription has been cancelled
2. No active `TenantSubscription` record exists

**Steps:**
1. Login to Admin Portal (login still works via Core module)
2. Call `GET /api/v1/entitlements/modules`
3. Try to access any non-Core module endpoint (e.g., `POST /api/v1/employee-vacations`)
4. Observe the sidebar

**Expected Results:**
- `GET /api/v1/entitlements/modules` returns empty array or Core-only modules
- Non-Core commands return 403 with subscription error message
- Sidebar shows only minimal Core navigation (if any)
- User can still login and access basic profile/dashboard
- Historical data may be accessible in read-only mode

---

## Summary

| Section | Test Cases | P0 | P1 | P2 | P3 |
|---------|-----------|----|----|----|----|
| A. Backend Module Enforcement | 11 | 5 | 6 | 0 | 0 |
| B. Frontend Guards & UI | 10 | 5 | 4 | 0 | 0 |
| C. Module Deactivation & Workflows | 9 | 3 | 6 | 0 | 0 |
| D. Subscription Tier & API | 10 | 6 | 3 | 0 | 0 |
| **TOTAL** | **40** | **19** | **19** | **0** | **0** |
