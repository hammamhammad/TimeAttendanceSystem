# TC-I18N: Internationalization, Navigation & Responsive Layout — Test Cases

## Module Overview

These test cases cover the cross-cutting concerns of internationalization (English/Arabic), RTL layout support, grouped sidebar navigation, and responsive design. The TecAxle HRMS supports full bilingual operation with ~2,700+ translation keys per language, RTL layout for Arabic, and a 12-group sidebar navigation system with module-aware filtering.

**Translation Files**: `time-attendance-frontend/src/app/core/i18n/translations/` (en.json, ar.json)
**Self-Service Translations**: `time-attendance-selfservice-frontend/src/app/core/i18n/translations/`
**Menu Service**: `time-attendance-frontend/src/app/core/menu/menu.service.ts`
**CSS Architecture**: `styles/variables.css` -> `styles/erp-tokens.css` -> `styles/components.css` -> `styles/patterns.css`
**RTL Overrides**: Component CSS uses `:host-context([dir="rtl"])`, global overrides in `styles.css`

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
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | Full access to all pages |
| Employee | salma.khaldi@company.com | Emp@123! | Self-service access |

---

## Test Cases

### A. Translation Coverage

#### TC-I18N-001: English translation file has ~2,700+ keys with no missing values
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | i18n |
| **Page** | All |
| **Role** | Any |

**Steps:**
1. Open `time-attendance-frontend/src/app/core/i18n/translations/en.json`
2. Count total keys (including nested)
3. Search for empty string values (`""`)
4. Search for `null` or `undefined` values

**Expected Results:**
- Total keys >= 2,700
- Zero empty string values
- Zero null/undefined values
- Every key has a meaningful English translation
- Self-service en.json is also complete and consistent

---

#### TC-I18N-002: Arabic translation file fully synchronized with English — zero missing keys
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | i18n |
| **Page** | All |
| **Role** | Any |

**Steps:**
1. Open en.json and ar.json for both admin and self-service frontends
2. Compare key structures
3. Verify every key in en.json exists in ar.json and vice versa

**Expected Results:**
- ar.json has identical key structure to en.json
- Zero keys present in en.json but missing from ar.json
- Zero keys present in ar.json but missing from en.json
- Arabic values are actual Arabic translations (not English placeholders)
- Self-service ar.json also fully synchronized

---

#### TC-I18N-003: All templates use i18n.t('key') — no hardcoded English strings
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | i18n |
| **Page** | All |
| **Role** | Any |

**Steps:**
1. Search all `.html` template files for hardcoded English text in user-facing elements
2. Check for patterns like `>Some Text<` that should be `>{{ i18n.t('key') }}<`
3. Search for `|| 'Fallback Text'` patterns (forbidden — use i18n.t() for fallbacks)

**Expected Results:**
- Zero hardcoded English strings in templates (except HTML attribute placeholders used with i18n)
- All user-facing text uses `i18n.t('key')` pattern
- No `|| 'Fallback Text'` patterns (use `i18n.t('fallback.key')` instead)
- Button labels, table headers, form labels, error messages — all translated

---

#### TC-I18N-004: Numbers always display as Western (0-9) — never Eastern Arabic numerals
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | i18n |
| **Page** | All |
| **Role** | Any |

**Preconditions:**
1. Language set to Arabic

**Steps:**
1. Switch to Arabic language
2. Navigate to dashboard — check attendance counts
3. Navigate to employee list — check employee IDs
4. Navigate to attendance — check times, hours, minutes
5. Navigate to leave balances — check day counts
6. Check pagination numbers
7. Check date displays

**Expected Results:**
- ALL numbers display as Western digits: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
- NEVER Eastern Arabic: (no use of characters in range U+0660-U+0669)
- Applies to: counts, IDs, times, dates, pagination, currency amounts
- This is a firm user preference that overrides locale defaults

---

#### TC-I18N-005: Bilingual entity names display correctly
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | i18n |
| **Page** | /branches, /departments, /vacation-types |
| **Role** | System Admin |

**Steps:**
1. In English mode: Navigate to /branches
2. Verify branch names display in English (e.g., "Headquarters - Riyadh")
3. Switch to Arabic
4. Verify branch names display in Arabic (e.g., "المقر الرئيسي - الرياض")
5. Repeat for departments and vacation types

**Expected Results:**
- Entities with bilingual fields (NameEn/NameAr) show correct language
- English mode: NameEn displayed
- Arabic mode: NameAr displayed (falls back to NameEn if NameAr is empty)
- Applies to: branches, departments, vacation types, excuse types, roles

---

### B. RTL Layout

#### TC-I18N-006: dir="rtl" attribute set on body when Arabic selected
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | RTL |
| **Page** | All |
| **Role** | Any |

**Steps:**
1. Set language to English — inspect `<html>` or `<body>` element
2. Set language to Arabic — inspect `<html>` or `<body>` element

**Expected Results:**
- English: `dir="ltr"` (or no dir attribute, defaults to LTR)
- Arabic: `dir="rtl"` set on document element
- All child elements inherit RTL direction
- CSS that depends on `[dir="rtl"]` activates

---

#### TC-I18N-007: Sidebar flips to right side in RTL mode
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | RTL |
| **Page** | Layout |
| **Role** | Any authenticated |

**Steps:**
1. Login, verify sidebar is on the LEFT in English
2. Switch to Arabic
3. Observe sidebar position

**Expected Results:**
- English: Sidebar on left, content on right
- Arabic: Sidebar on right, content on left
- Sidebar items text-aligned to right
- Sidebar icons aligned correctly
- Submenu arrows flip direction
- Collapse/expand animation mirrors

---

#### TC-I18N-008: Topbar layout reversed in RTL
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | RTL |
| **Page** | Layout |
| **Role** | Any authenticated |

**Steps:**
1. In English: observe topbar layout
2. Switch to Arabic

**Expected Results:**
- English: hamburger/logo left, user menu/notifications right
- Arabic: hamburger/logo right, user menu/notifications left
- Language toggle, notification bell, user dropdown all reposition
- No overlapping elements

---

#### TC-I18N-009: Form fields align correctly in RTL
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | RTL |
| **Page** | Any form page |
| **Role** | Any |

**Steps:**
1. Switch to Arabic
2. Navigate to a form page (e.g., /employees/create or /vacation-requests/new)
3. Observe form layout

**Expected Results:**
- Labels right-aligned (text-align: right)
- Input text starts from right side
- Floating labels position from right (not left)
- Validation error messages right-aligned
- Form sections flow right-to-left
- `.app-modern-form` RTL overrides active (from `styles.css` under `:root[dir="rtl"]`)

---

#### TC-I18N-010: Data tables render correctly in RTL
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | RTL |
| **Page** | Any list page |
| **Role** | Any |

**Steps:**
1. Switch to Arabic
2. Navigate to /employees (or any list page)

**Expected Results:**
- Table header text right-aligned
- Table cell content right-aligned
- Action buttons column on the LEFT (reversed from LTR)
- Sorting arrows positioned correctly
- Pagination controls mirrored (prev/next arrows flip)
- No text overflow or truncation issues

---

#### TC-I18N-011: Component CSS uses :host-context([dir="rtl"]) not :root[dir="rtl"]
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | RTL |
| **Page** | All components |
| **Role** | Developer verification |

**Steps:**
1. Search all `.component.css` files for RTL selectors
2. Check for `:root[dir="rtl"]` usage (incorrect in component CSS)
3. Check for `:host-context([dir="rtl"])` usage (correct)

**Expected Results:**
- All component-level RTL styles use `:host-context([dir="rtl"])` selector
- Zero instances of `:root[dir="rtl"]` in component CSS files
- Global `styles.css` and `components.css` may use `:root[dir="rtl"]` (that is correct for global styles)
- Angular view encapsulation requires `:host-context()` for component styles

---

#### TC-I18N-012: UL elements have padding-right:0 in RTL
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | RTL |
| **Page** | Sidebar, any page with lists |
| **Role** | Any |

**Steps:**
1. Switch to Arabic
2. Inspect `<ul>` elements in sidebar and content areas
3. Check computed padding-right value

**Expected Results:**
- `<ul>` elements have `padding-right: 0` in RTL mode
- No unwanted indentation on the right side
- Browser default padding-left (which becomes padding-right in RTL) is reset
- Lists display flush against right edge

---

#### TC-I18N-013: Status badges and buttons render correctly in RTL
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | RTL |
| **Page** | Any page with badges/buttons |
| **Role** | Any |

**Steps:**
1. Switch to Arabic
2. Navigate to a page with status badges (e.g., /employees, /vacation-requests)
3. Observe badge dot position and text alignment
4. Check button icon positions

**Expected Results:**
- StatusBadge: dot indicator on right side of text (mirrored from LTR left-dot)
- Badge text right-aligned
- Buttons with icons: icon position mirrors (start icon goes to right)
- Button groups maintain correct order
- No text/icon overlap

---

### C. Navigation

#### TC-I18N-014: Admin sidebar has 12 grouped sections
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Navigation |
| **Page** | Admin Layout |
| **Role** | System Admin |

**Preconditions:**
1. Logged in as System Admin with Enterprise plan (all modules)

**Steps:**
1. Expand the admin portal sidebar
2. Count section group headers

**Expected Results:**
- 12 groups visible with uppercase section headers:
  1. **Main** (nav_group.main): Dashboard
  2. **Platform** (nav_group.platform): Tenants, Subscription Plans
  3. **Organization** (nav_group.organization): Users, Employees, Roles, Branches, Departments
  4. **Time & Attendance** (nav_group.timeAttendance): Shifts, Attendance, Overtime
  5. **Leave & Absence** (nav_group.leaveAbsence): Vacations, Excuses, Leave Balances
  6. **HR & Lifecycle** (nav_group.hrLifecycle): Contracts, Promotions, Transfers, etc.
  7. **Compensation** (nav_group.compensation): Payroll, Salary Structures, Allowances
  8. **Performance & Growth** (nav_group.performanceGrowth): Reviews, Goals, PIPs, Training
  9. **Workplace** (nav_group.workplace): Remote Work, NFC Tags
  10. **Workflows & Approvals** (nav_group.workflowsApprovals): Workflows, Approvals
  11. **Reports & Analytics** (nav_group.reportsAnalytics): Reports, Audit Logs, Sessions
  12. **Settings** (nav_group.settings): Configuration pages
- Groups defined in `MenuService` via `MenuGroup` interface

---

#### TC-I18N-015: Empty groups hidden when permissions/modules missing
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Navigation |
| **Page** | Admin Layout |
| **Role** | Limited role user |

**Preconditions:**
1. Logged in as user with limited permissions (e.g., only attendance permissions)
2. Tenant on Starter plan (5 modules)

**Steps:**
1. Observe sidebar groups

**Expected Results:**
- Groups with no visible items are completely hidden
- `hasVisibleGroup()` returns false for groups where all items are permission-gated or module-disabled
- No empty section headers displayed
- Platform group hidden for non-platform users
- HR & Lifecycle group hidden if EmployeeLifecycle module disabled

---

#### TC-I18N-016: Collapsed sidebar shows dividers instead of section headers
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Navigation |
| **Page** | Admin Layout |
| **Role** | Any authenticated |

**Steps:**
1. Collapse the sidebar (click collapse button or hamburger)
2. Observe group separators

**Expected Results:**
- Expanded mode: uppercase text labels for each group (e.g., "TIME & ATTENDANCE")
- Collapsed mode: subtle horizontal dividers between groups
- Group headers hidden when collapsed (not enough space for text)
- Icons remain visible and clickable
- Tooltip shows item name on hover (collapsed mode)

---

#### TC-I18N-017: Language preference persists across page refreshes
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | i18n |
| **Page** | All |
| **Role** | Any |

**Steps:**
1. Set language to Arabic
2. Verify Arabic is active (RTL, Arabic text)
3. Refresh the page (F5)
4. Close and reopen browser tab
5. Navigate to a different page

**Expected Results:**
- Language preference stored in localStorage
- After refresh: Arabic still active
- After new tab: Arabic still active (reads from localStorage)
- All pages respect the stored language preference
- Login page also respects stored language

---

#### TC-I18N-018: Module-tagged items filtered by entitlement in sidebar
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Navigation |
| **Page** | Admin Layout |
| **Role** | Tenant Admin |

**Preconditions:**
1. Tenant on Professional plan (13 modules, missing some like SuccessionPlanning)

**Steps:**
1. Login as tenant admin
2. Observe sidebar items

**Expected Results:**
- Menu items with `module` property checked against `EntitlementService.isModuleEnabled()`
- Items for disabled modules hidden from navigation
- Items for enabled modules visible
- Example: if SuccessionPlanning disabled, "Career Planning" item hidden
- Core items (no module tag) always visible

---

#### TC-I18N-019: Platform admin sees only Platform menu items
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Navigation |
| **Page** | Admin Layout |
| **Role** | Platform Admin |

**Preconditions:**
1. Logged in as Platform Admin (is_platform_user=true)

**Steps:**
1. Observe sidebar

**Expected Results:**
- Only Platform group items visible: Tenants, Subscription Plans
- All tenant-specific groups hidden (Organization, Time & Attendance, etc.)
- `platformPaths` and `platformGroupKeys` filter in sidenav.component.ts
- FilterRegistryService and NotificationBellComponent skip tenant-only API calls

---

#### TC-I18N-020: Tenant admin does NOT see Platform menu items
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Navigation |
| **Page** | Admin Layout |
| **Role** | Tenant Admin |

**Steps:**
1. Login as tenant System Admin (not platform admin)
2. Observe sidebar

**Expected Results:**
- Platform group (Tenants, Subscription Plans) NOT visible
- All tenant business groups visible based on permissions/modules
- No "Platform" section header in sidebar

---

### D. Responsive Design

#### TC-I18N-021: Tablet view — sidebar auto-collapses
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Responsive |
| **Page** | Admin Layout |
| **Role** | Any authenticated |

**Steps:**
1. Resize browser to tablet width (~768px)
2. Observe sidebar behavior

**Expected Results:**
- Sidebar auto-collapses to icon-only mode
- Content area expands to fill available space
- Sidebar can be expanded by clicking hamburger
- Expanding sidebar overlays content (does not push)

---

#### TC-I18N-022: Mobile view — hamburger menu toggle
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Responsive |
| **Page** | Admin Layout |
| **Role** | Any authenticated |

**Steps:**
1. Resize browser to mobile width (~375px)
2. Observe sidebar behavior
3. Click hamburger menu icon

**Expected Results:**
- Sidebar hidden by default on mobile
- Hamburger icon visible in topbar
- Clicking hamburger slides sidebar in as overlay
- Backdrop/overlay behind sidebar when open
- Clicking outside or on backdrop closes sidebar
- Navigation works — selecting item closes sidebar

---

#### TC-I18N-023: Data tables scroll horizontally on narrow screens
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Responsive |
| **Page** | Any list page |
| **Role** | Any |

**Steps:**
1. Resize browser to narrow width (~400px)
2. Navigate to /employees or any page with wide table

**Expected Results:**
- Table container has horizontal scroll
- Table does not overflow outside its container
- Column headers remain visible
- Horizontal scroll indicator visible
- Table actions column still accessible

---

#### TC-I18N-024: Form pages stack fields vertically on mobile
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Responsive |
| **Page** | Any form page |
| **Role** | Any |

**Steps:**
1. Resize browser to mobile width
2. Navigate to a create/edit form (e.g., /employees/create)

**Expected Results:**
- Multi-column layouts (col-md-6 + col-md-6) stack to single column
- All form fields span full width
- Labels above inputs (not beside)
- Form sections have appropriate spacing
- Submit/Cancel buttons full width or appropriately sized

---

#### TC-I18N-025: Modals display full-width on mobile
| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Category** | Responsive |
| **Page** | Any page with modals |
| **Role** | Any |

**Steps:**
1. Resize browser to mobile width
2. Open a modal (e.g., confirmation dialog, change password)

**Expected Results:**
- Modal takes near-full width of screen
- Modal content scrollable if taller than viewport
- Close button accessible
- Form inputs within modal usable
- Backdrop covers full viewport

---

## Summary

| Section | Test Cases | P0 | P1 | P2 | P3 |
|---------|-----------|----|----|----|----|
| A. Translation Coverage | 5 | 2 | 3 | 0 | 0 |
| B. RTL Layout | 8 | 1 | 4 | 3 | 0 |
| C. Navigation | 7 | 1 | 5 | 1 | 0 |
| D. Responsive Design | 5 | 0 | 0 | 4 | 1 |
| **TOTAL** | **25** | **4** | **12** | **8** | **1** |
