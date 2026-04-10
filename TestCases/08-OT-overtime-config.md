# TC-OT: Overtime Configuration — Test Cases

## Module Overview

Overtime Configuration controls how overtime hours are calculated across the organization, including rate multipliers for different day types (normal, public holiday, off day), pre/post-shift overtime toggles, minimum thresholds, grace periods, rounding intervals, and approval requirements. Only one configuration can be active at a time, and overlapping effective date ranges are not permitted.

**Admin Pages**: `/settings/overtime`, `/settings/overtime/create`, `/settings/overtime/:id/view`, `/settings/overtime/edit/:id`
**API Endpoints**: `GET /api/v1/overtime-configurations`, `GET /api/v1/overtime-configurations/{id}`, `GET /api/v1/overtime-configurations/active`, `POST /api/v1/overtime-configurations`, `PUT /api/v1/overtime-configurations/{id}`, `PATCH /api/v1/overtime-configurations/{id}/activate`, `PATCH /api/v1/overtime-configurations/{id}/deactivate`, `GET /api/v1/overtime-configurations/summary`
**Authorization Policies**: `SettingsRead` (list/view), `SettingsManagement` (create/edit/activate/deactivate)
**Domain Entity**: `OvertimeConfiguration` (`src/Domain/.../Settings/OvertimeConfiguration.cs`)

---

## Test Environment

| Item | Value |
|------|-------|
| Backend | http://localhost:5099 |
| Admin Portal | http://localhost:4200 |

### Test Users

| Role | Email | Password | Notes |
|------|-------|----------|-------|
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | Full access, IsSystemUser=true |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | Has SettingsRead permission |
| Employee | salma.khaldi@company.com | Emp@123! | No settings permissions |

### Field Reference

| Field | Type | Default | Min | Max | Valid Values |
|-------|------|---------|-----|-----|--------------|
| enablePreShiftOvertime | Checkbox | false | - | - | true/false |
| enablePostShiftOvertime | Checkbox | true | - | - | true/false |
| normalDayRate | Number | 1.5 | 1.0 | 5.0 | Decimal, step 0.1 |
| publicHolidayRate | Number | 2.0 | 1.0 | 5.0 | Decimal, step 0.1 |
| offDayRate | Number | 2.5 | 1.0 | 5.0 | Decimal, step 0.1 |
| maxPreShiftOvertimeHours | Number | 2.0 | 0.5 | 8.0 | Decimal |
| maxPostShiftOvertimeHours | Number | 4.0 | 0.5 | 12.0 | Decimal |
| minimumOvertimeMinutes | Number | 15 | 0 | 60 | Integer |
| overtimeGracePeriodMinutes | Number | 5 | 0 | 30 | Integer |
| roundingIntervalMinutes | Number | 15 | - | - | {0, 5, 10, 15, 30} only |
| considerFlexibleTime | Checkbox | true | - | - | true/false |
| weekendAsOffDay | Checkbox | true | - | - | true/false |
| requireApproval | Checkbox | false | - | - | true/false |
| effectiveFromDate | Date | today | - | - | Required |
| effectiveToDate | Date | null | - | - | Optional; must be after fromDate |
| policyNotes | Textarea | null | - | - | Optional free text |
| isActive | Checkbox | true | - | - | true/false |

---

## Test Cases

### A. Form Fields & Validation

#### TC-OT-001: Create overtime configuration page renders correctly
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Preconditions:**
1. User is logged in with SettingsManagement permission

**Steps:**
1. Navigate to /settings/overtime
2. Click "Create" / "Add" button

**Expected Results:**
- Create form renders with all fields:
  - Checkboxes: enablePreShiftOvertime, enablePostShiftOvertime, considerFlexibleTime, weekendAsOffDay, requireApproval, isActive
  - Number inputs: normalDayRate, publicHolidayRate, offDayRate, maxPreShiftOvertimeHours, maxPostShiftOvertimeHours, minimumOvertimeMinutes, overtimeGracePeriodMinutes, roundingIntervalMinutes
  - Date inputs: effectiveFromDate, effectiveToDate
  - Textarea: policyNotes
- Default values pre-populated as per Field Reference table
- Submit and Cancel buttons visible
- Form uses modern form design system (`.app-modern-form`)

---

#### TC-OT-002: Submit form with all default values succeeds
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Preconditions:**
1. No other active overtime configurations exist with overlapping dates

**Steps:**
1. Navigate to create page
2. Leave all defaults in place
3. Set effectiveFromDate to today
4. Click Submit

**Expected Results:**
- Configuration created successfully (HTTP 201)
- Success notification displayed
- Redirect to list page or view page
- New configuration appears in the list

---

#### TC-OT-003: Both pre-shift and post-shift overtime disabled — validation error
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Steps:**
1. Uncheck enablePreShiftOvertime (already false by default)
2. Uncheck enablePostShiftOvertime
3. Fill remaining fields with valid values
4. Click Submit

**Expected Results:**
- Validation error: "At least one overtime type (pre-shift or post-shift) must be enabled"
- Form not submitted
- No configuration created

---

#### TC-OT-004: Missing effectiveFromDate — validation error
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Steps:**
1. Clear the effectiveFromDate field
2. Fill all other fields with valid values
3. Click Submit

**Expected Results:**
- Validation error indicating effectiveFromDate is required
- Form not submitted

---

#### TC-OT-005: effectiveToDate before effectiveFromDate — validation error
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Steps:**
1. Set effectiveFromDate to "2026-06-01"
2. Set effectiveToDate to "2026-05-15"
3. Fill all other fields with valid values
4. Click Submit

**Expected Results:**
- Validation error: "Effective to date must be after effective from date"
- Form not submitted

---

#### TC-OT-006: effectiveToDate equal to effectiveFromDate — validation error
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Steps:**
1. Set effectiveFromDate to "2026-06-01"
2. Set effectiveToDate to "2026-06-01"
3. Submit

**Expected Results:**
- Validation error: "Effective to date must be after effective from date"
- Domain validation: `EffectiveToDate <= EffectiveFromDate` triggers error

---

#### TC-OT-007: Rounding interval with invalid value — validation error
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Steps:**
1. Set roundingIntervalMinutes to each invalid value and attempt submission:

| # | Value | Expected |
|---|-------|----------|
| 1 | 2 | Reject — "Rounding interval must be 0, 5, 10, 15, or 30 minutes" |
| 2 | 7 | Reject |
| 3 | 12 | Reject |
| 4 | 20 | Reject |
| 5 | 45 | Reject |
| 6 | -1 | Reject — negative value |

**Expected Results:**
- Each invalid value triggers: "Rounding interval must be 0, 5, 10, 15, or 30 minutes"
- Only 0, 5, 10, 15, 30 accepted

---

#### TC-OT-008: Rounding interval with all valid values — accepted
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Steps:**
1. For each valid roundingIntervalMinutes value, create a configuration (deactivate previous first):

| # | Value | Expected |
|---|-------|----------|
| 1 | 0 | Accept — no rounding |
| 2 | 5 | Accept |
| 3 | 10 | Accept |
| 4 | 15 | Accept |
| 5 | 30 | Accept |

**Expected Results:**
- All five values accepted without validation errors
- Configuration saved successfully for each

---

#### TC-OT-009: policyNotes field is optional
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Steps:**
1. Fill all required fields with valid values
2. Leave policyNotes empty
3. Submit

**Expected Results:**
- Configuration created successfully
- policyNotes stored as null

---

#### TC-OT-010: Toggle checkbox fields independently
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Steps:**
1. Toggle each checkbox field on and off:
   - enablePreShiftOvertime: false -> true -> false
   - enablePostShiftOvertime: true -> false -> true
   - considerFlexibleTime: true -> false
   - weekendAsOffDay: true -> false
   - requireApproval: false -> true
   - isActive: true -> false -> true

**Expected Results:**
- Each checkbox toggles independently without affecting other fields
- Toggled values persist when navigating between form sections
- Form validation re-evaluates after each toggle (especially pre/post-shift rule)

---

### B. Boundary Value Tests

#### TC-OT-011: normalDayRate boundary values
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Boundary |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Steps:**
1. Test each normalDayRate value:

| # | Value | Expected | Reason |
|---|-------|----------|--------|
| 1 | 0.0 | Reject | Rate must be > 0 |
| 2 | 0.9 | Reject | Below minimum 1.0 |
| 3 | 1.0 | Accept | At minimum boundary |
| 4 | 1.5 | Accept | Default value |
| 5 | 3.0 | Accept | Mid-range |
| 6 | 5.0 | Accept | At maximum boundary |
| 7 | 5.1 | Reject | Exceeds maximum 5.0 |
| 8 | -1.0 | Reject | Negative value |

**Expected Results:**
- Values 0.0, 0.9, 5.1, -1.0 trigger validation error
- Values 1.0, 1.5, 3.0, 5.0 accepted

---

#### TC-OT-012: publicHolidayRate boundary values
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Boundary |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Steps:**
1. Test each publicHolidayRate value:

| # | Value | Expected | Reason |
|---|-------|----------|--------|
| 1 | 0.0 | Reject | Rate must be > 0 |
| 2 | 0.9 | Reject | Below minimum 1.0 |
| 3 | 1.0 | Accept | At minimum boundary |
| 4 | 2.0 | Accept | Default value |
| 5 | 5.0 | Accept | At maximum boundary |
| 6 | 5.1 | Reject | Exceeds maximum 5.0 |

**Expected Results:**
- Same boundary rules as normalDayRate (min: 1.0, max: 5.0)

---

#### TC-OT-013: offDayRate boundary values
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Boundary |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Steps:**
1. Test each offDayRate value:

| # | Value | Expected | Reason |
|---|-------|----------|--------|
| 1 | 0.0 | Reject | Rate must be > 0 |
| 2 | 0.9 | Reject | Below minimum 1.0 |
| 3 | 1.0 | Accept | At minimum boundary |
| 4 | 2.5 | Accept | Default value |
| 5 | 5.0 | Accept | At maximum boundary |
| 6 | 5.1 | Reject | Exceeds maximum 5.0 |

**Expected Results:**
- Same boundary rules as other rate fields (min: 1.0, max: 5.0)

---

#### TC-OT-014: maxPreShiftOvertimeHours boundary values
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Boundary |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Steps:**
1. Test each maxPreShiftOvertimeHours value:

| # | Value | Expected | Reason |
|---|-------|----------|--------|
| 1 | -0.5 | Reject | Negative value |
| 2 | 0.0 | Reject | Zero not meaningful |
| 3 | 0.4 | Reject | Below minimum 0.5 |
| 4 | 0.5 | Accept | At minimum boundary |
| 5 | 2.0 | Accept | Default value |
| 6 | 8.0 | Accept | At maximum boundary |
| 7 | 8.1 | Reject | Exceeds maximum 8 hours |

**Expected Results:**
- Domain validation: `MaxPreShiftOvertimeHours > 8` triggers "Maximum pre-shift overtime hours should not exceed 8 hours"
- Domain validation: `MaxPreShiftOvertimeHours < 0` triggers "Maximum pre-shift overtime hours cannot be negative"

---

#### TC-OT-015: maxPostShiftOvertimeHours boundary values
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Boundary |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Steps:**
1. Test each maxPostShiftOvertimeHours value:

| # | Value | Expected | Reason |
|---|-------|----------|--------|
| 1 | -1.0 | Reject | Negative value |
| 2 | 0.0 | Reject | Zero not meaningful |
| 3 | 0.4 | Reject | Below minimum 0.5 |
| 4 | 0.5 | Accept | At minimum boundary |
| 5 | 4.0 | Accept | Default value |
| 6 | 12.0 | Accept | At maximum boundary |
| 7 | 12.1 | Reject | Exceeds maximum 12 hours |

**Expected Results:**
- Domain validation: `MaxPostShiftOvertimeHours > 12` triggers "Maximum post-shift overtime hours should not exceed 12 hours"

---

#### TC-OT-016: minimumOvertimeMinutes boundary values
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Boundary |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Steps:**
1. Test each minimumOvertimeMinutes value:

| # | Value | Expected | Reason |
|---|-------|----------|--------|
| 1 | -1 | Reject | Negative value |
| 2 | 0 | Accept | No minimum threshold |
| 3 | 15 | Accept | Default value |
| 4 | 60 | Accept | At maximum boundary |
| 5 | 61 | Reject | Exceeds maximum 60 |
| 6 | 120 | Reject | Domain allows up to 120, but frontend caps at 60 |

**Expected Results:**
- Domain validation: `MinimumOvertimeMinutes < 0` triggers error
- Domain validation: `MinimumOvertimeMinutes > 120` triggers error (hard limit)
- Frontend validation: caps at 60 minutes

---

#### TC-OT-017: overtimeGracePeriodMinutes boundary values
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Boundary |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Steps:**
1. Test each overtimeGracePeriodMinutes value:

| # | Value | Expected | Reason |
|---|-------|----------|--------|
| 1 | -1 | Reject | Negative value |
| 2 | 0 | Accept | No grace period |
| 3 | 5 | Accept | Default value |
| 4 | 30 | Accept | At maximum boundary |
| 5 | 31 | Reject | Exceeds maximum 30 |
| 6 | 60 | Reject | Domain limit is 60, frontend caps at 30 |

**Expected Results:**
- Domain validation: `OvertimeGracePeriodMinutes < 0` triggers error
- Domain validation: `OvertimeGracePeriodMinutes > 60` triggers error (hard limit)
- Frontend validation: caps at 30 minutes

---

### C. Active Policy Business Rules

#### TC-OT-018: Only one active configuration at a time
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Preconditions:**
1. Configuration A exists and is active (effectiveFrom: 2026-01-01)

**Steps:**
1. Create Configuration B with isActive=true, non-overlapping dates
2. Submit

**Expected Results:**
- Configuration B created and activated
- Configuration A automatically deactivated
- Only Configuration B shows as active in the list
- GET /api/v1/overtime-configurations/active returns Configuration B

---

#### TC-OT-019: Activate an inactive configuration deactivates current active
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /settings/overtime |
| **Role** | System Admin |

**Preconditions:**
1. Configuration A is active
2. Configuration B exists but is inactive

**Steps:**
1. Navigate to /settings/overtime
2. Click Activate on Configuration B (or call `PATCH /api/v1/overtime-configurations/{B-id}/activate`)

**Expected Results:**
- Configuration B becomes active
- Configuration A becomes inactive
- List page reflects updated statuses
- Only one "Active" badge visible in the list

---

#### TC-OT-020: Deactivate the only active configuration
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /settings/overtime |
| **Role** | System Admin |

**Preconditions:**
1. Only one configuration exists and it is active

**Steps:**
1. Click Deactivate on the active configuration (or call `PATCH /api/v1/overtime-configurations/{id}/deactivate`)

**Expected Results:**
- Configuration deactivated
- No active configuration exists
- GET /api/v1/overtime-configurations/active returns 404
- GET /api/v1/overtime-configurations/summary returns `isConfigured: false` with default configuration

---

#### TC-OT-021: Deactivate an already inactive configuration — error
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Negative |
| **Page** | API |
| **Role** | System Admin |

**Steps:**
1. Call `PATCH /api/v1/overtime-configurations/{id}/deactivate` on an already inactive configuration

**Expected Results:**
- HTTP 400 Bad Request
- Error: "Configuration is already inactive"

---

#### TC-OT-022: Create configuration with overlapping effective dates — validation error
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Preconditions:**
1. Active Configuration A: effectiveFromDate=2026-06-01, effectiveToDate=2026-08-31

**Steps:**
1. Create Configuration B with:
   - effectiveFromDate=2026-07-15 (overlaps with A)
   - effectiveToDate=2026-09-30
   - isActive=true
2. Submit

**Expected Results:**
- Validation error about overlapping effective date ranges
- OR: Previous active config is deactivated and new one takes over (depending on business rule implementation)
- No two active configurations with overlapping date ranges exist

---

#### TC-OT-023: Edit an existing overtime configuration
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /settings/overtime/edit/:id |
| **Role** | System Admin |

**Preconditions:**
1. Configuration exists with known values

**Steps:**
1. Navigate to /settings/overtime
2. Click Edit on an existing configuration
3. Modify normalDayRate from 1.5 to 2.0
4. Modify minimumOvertimeMinutes from 15 to 30
5. Click Submit

**Expected Results:**
- Configuration updated successfully (HTTP 204)
- View page reflects updated values
- Success notification displayed
- Audit log entry created with before/after values

---

### D. List & View Pages

#### TC-OT-024: List page displays all configurations with pagination
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /settings/overtime |
| **Role** | System Admin |

**Preconditions:**
1. Multiple overtime configurations exist (at least 2)

**Steps:**
1. Navigate to /settings/overtime

**Expected Results:**
- DataTable displays configurations with columns:
  - Active status badge (Active/Inactive)
  - Rate multipliers (normalDayRate, publicHolidayRate, offDayRate)
  - Effective dates
  - Pre/post-shift overtime enabled indicators
  - Action buttons (View, Edit, Activate/Deactivate)
- Pagination controls visible when items exceed page size
- Search/filter functionality available
- Active configuration highlighted or badged distinctly

---

#### TC-OT-025: View overtime configuration detail page
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /settings/overtime/:id/view |
| **Role** | System Admin |

**Preconditions:**
1. Configuration exists with all fields populated including policyNotes

**Steps:**
1. Navigate to /settings/overtime
2. Click View on a configuration

**Expected Results:**
- View page renders with DefinitionListComponent showing all fields:
  - Pre-Shift Overtime: Enabled/Disabled
  - Post-Shift Overtime: Enabled/Disabled
  - Normal Day Rate: 1.5x
  - Public Holiday Rate: 2.0x
  - Off Day Rate: 2.5x
  - Max Pre-Shift Hours: 2.0
  - Max Post-Shift Hours: 4.0
  - Minimum Overtime: 15 minutes
  - Grace Period: 5 minutes
  - Rounding Interval: 15 minutes
  - Consider Flexible Time: Yes/No
  - Weekend As Off Day: Yes/No
  - Require Approval: Yes/No
  - Effective From: date
  - Effective To: date or "Indefinite"
  - Policy Notes: text
  - Status: Active/Inactive badge (StatusBadgeComponent)
  - Created At, Created By
- Back/Edit buttons visible

---

#### TC-OT-026: List page filter by active status
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /settings/overtime |
| **Role** | System Admin |

**Preconditions:**
1. Both active and inactive configurations exist

**Steps:**
1. Navigate to /settings/overtime
2. Filter by isActive=true
3. Observe results
4. Filter by isActive=false
5. Observe results

**Expected Results:**
- isActive=true: Only active configurations shown
- isActive=false: Only inactive configurations shown
- Clearing filter: All configurations shown

---

#### TC-OT-027: Unauthorized user cannot access overtime configuration pages
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /settings/overtime |
| **Role** | Employee |

**Steps:**
1. Login as employee without SettingsRead permission (salma.khaldi@company.com)
2. Navigate to /settings/overtime
3. Try API call: `GET /api/v1/overtime-configurations`

**Expected Results:**
- Page: Redirected to /unauthorized or 403 page
- API: HTTP 403 Forbidden
- No overtime data visible
- Settings menu items not visible in navigation for this user

---

#### TC-OT-028: Unauthorized user cannot create/edit configurations
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | API |
| **Role** | Employee |

**Steps:**
1. As employee without SettingsManagement permission:
2. Call `POST /api/v1/overtime-configurations` with valid body
3. Call `PUT /api/v1/overtime-configurations/1` with valid body
4. Call `PATCH /api/v1/overtime-configurations/1/activate`

**Expected Results:**
- All three calls return HTTP 403 Forbidden
- No data modified

---

### E. Calculation Precedence & Rounding

#### TC-OT-029: Overtime calculation follows precedence: grace -> minimum -> max cap -> rate -> rounding
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System Admin |

**Preconditions:**
1. Active configuration:
   - overtimeGracePeriodMinutes = 5
   - minimumOvertimeMinutes = 15
   - maxPostShiftOvertimeHours = 4.0
   - normalDayRate = 1.5
   - roundingIntervalMinutes = 15

**Scenario A: Grace period filters out micro-overtime**
- Employee works 3 minutes past shift end
- 3 min < 5 min grace period
- Result: 0 overtime (grace period absorbs it)

**Scenario B: Below minimum threshold after grace**
- Employee works 12 minutes past shift end
- 12 min > 5 min grace, so raw overtime = 12 min
- 12 min < 15 min minimum threshold
- Result: 0 overtime (below minimum)

**Scenario C: Full calculation pipeline**
- Employee works 198 minutes (3h 18m) past shift end
- Step 1 (Grace): 198 min > 5 min grace, raw OT = 198 min
- Step 2 (Minimum): 198 min > 15 min threshold, passes
- Step 3 (Max cap): 198 min = 3.3h < 4.0h max, not capped
- Step 4 (Rate): 3.3h x 1.5 = 4.95h equivalent
- Step 5 (Rounding): 3.3h (198 min) rounds to 3.25h or 3.5h at 15-min intervals

**Scenario D: Max cap applied**
- Employee works 300 minutes (5h) past shift end
- Step 3: 5.0h > 4.0h max cap, capped to 4.0h
- Step 4: 4.0h x 1.5 = 6.0h equivalent
- Step 5: 4.0h already at 15-min boundary, no rounding change

---

#### TC-OT-030: Rounding interval examples
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System Admin |

**Test the `RoundOvertimeHours()` domain method:**

**15-minute interval (roundingIntervalMinutes = 15):**

| Raw OT (min) | Raw OT (hrs) | Rounded (hrs) | Rounded (min) |
|--------------|--------------|---------------|----------------|
| 8 | 0.133 | 0.25 | 15 |
| 15 | 0.25 | 0.25 | 15 |
| 18 | 0.30 | 0.25 | 15 |
| 22 | 0.367 | 0.50 | 30 |
| 37 | 0.617 | 0.50 | 30 |
| 45 | 0.75 | 0.75 | 45 |

**30-minute interval (roundingIntervalMinutes = 30):**

| Raw OT (min) | Raw OT (hrs) | Rounded (hrs) | Rounded (min) |
|--------------|--------------|---------------|----------------|
| 10 | 0.167 | 0.0 | 0 |
| 20 | 0.333 | 0.5 | 30 |
| 40 | 0.667 | 0.5 | 30 |
| 50 | 0.833 | 1.0 | 60 |

**0-minute interval (roundingIntervalMinutes = 0, no rounding):**

| Raw OT (min) | Raw OT (hrs) | Rounded (hrs) |
|--------------|--------------|---------------|
| 18 | 0.30 | 0.30 (no change) |
| 42 | 0.70 | 0.70 (no change) |

**Expected Results:**
- `RoundOvertimeHours()` uses `Math.Round(overtimeHours / intervalHours) * intervalHours`
- roundingIntervalMinutes=0 returns raw hours unchanged
- Rounding uses "round half to even" (banker's rounding) as per `Math.Round` default

---

#### TC-OT-031: Summary endpoint returns active config details or default
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System Admin |

**Scenario A: Active configuration exists**

**Steps:**
1. Call `GET /api/v1/overtime-configurations/summary`

**Expected Results:**
- HTTP 200 with:
  ```json
  {
    "isConfigured": true,
    "configurationId": <id>,
    "summary": "Overtime Config: Post-shift only | Rates: Normal 1.5x, Holiday 2.0x, Off-day 2.5x | Min: 15min | Flex-aware",
    "preShiftEnabled": false,
    "postShiftEnabled": true,
    "normalDayRate": 1.5,
    "holidayRate": 2.0,
    "offDayRate": 2.5,
    "minimumMinutes": 15,
    "effectiveFromDate": "..."
  }
  ```

**Scenario B: No active configuration**

**Steps:**
1. Deactivate all configurations
2. Call `GET /api/v1/overtime-configurations/summary`

**Expected Results:**
- HTTP 200 with:
  ```json
  {
    "isConfigured": false,
    "message": "No active overtime configuration found",
    "defaultConfiguration": "..."
  }
  ```

---

#### TC-OT-032: i18n — all labels display correctly in Arabic (RTL)
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /settings/overtime/create |
| **Role** | System Admin |

**Steps:**
1. Switch language to Arabic
2. Navigate to /settings/overtime/create
3. Observe all labels and buttons
4. Navigate to /settings/overtime (list page)
5. Navigate to /settings/overtime/:id/view

**Expected Results:**
- All text rendered in Arabic using i18n translation keys
- RTL layout applied correctly (form fields, buttons, table)
- No hardcoded English strings visible
- Date pickers respect locale
- Number inputs accept Western numerals only (not Eastern Arabic)

---

## Summary

| Section | Test Cases | P0 | P1 | P2 |
|---------|-----------|----|----|-----|
| A. Form Fields & Validation | 10 | 4 | 4 | 2 |
| B. Boundary Value Tests | 7 | 5 | 2 | 0 |
| C. Active Policy Business Rules | 6 | 3 | 1 | 2 |
| D. List & View Pages | 5 | 3 | 1 | 1 |
| E. Calculation Precedence & Rounding | 4 | 0 | 3 | 1 |
| **TOTAL** | **32** | **15** | **11** | **6** |
