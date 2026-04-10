# TC-DASH: Dashboards & Analytics — Test Cases

## Module Overview

The Dashboards & Analytics module provides role-based dashboard views across three applications (Admin Portal, Self-Service Portal, and 9 analytics sub-dashboards). The admin dashboard aggregates organization, HR, attendance, leave, shift, and system statistics. The employee dashboard shows personal data. The manager dashboard shows team data. Analytics dashboards (executive, headcount, attrition, engagement, leave, overtime, payroll, recruitment, training) require the Analytics module entitlement and `analytics.read` permission.

**Admin Pages**: `/dashboard` (admin), `/analytics`, `/analytics/headcount`, `/analytics/attrition`, `/analytics/recruitment`, `/analytics/training`, `/analytics/leave`, `/analytics/overtime`, `/analytics/payroll`, `/analytics/engagement`
**Self-Service Pages**: `/dashboard` (employee), `/manager-dashboard`
**API Endpoints**: `GET /api/v1/dashboard/overview`, `GET /api/v1/portal/employee-dashboard`, `GET /api/v1/portal/manager-dashboard`
**Backend Handler**: `DashboardController`, `PortalController`

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
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | Full dashboard access |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | Manager + employee dashboards |
| Department Manager | sara.fahad@company.com | Emp@123! | Manager dashboard visible |
| Employee | salma.khaldi@company.com | Emp@123! | Employee dashboard only |

---

## Summary Table

| ID | Title | Priority | Category |
|----|-------|----------|----------|
| TC-DASH-001 | Admin dashboard renders organization stats widget | P0 | UI |
| TC-DASH-002 | Admin dashboard renders HR statistics | P0 | UI |
| TC-DASH-003 | Admin dashboard renders attendance stats (present/absent/late today) | P0 | UI |
| TC-DASH-004 | Admin dashboard renders leave statistics | P1 | UI |
| TC-DASH-005 | Admin dashboard renders system health widget | P1 | UI |
| TC-DASH-006 | Admin dashboard renders weekly attendance trends chart | P1 | UI |
| TC-DASH-007 | Employee dashboard shows personal attendance stats | P0 | UI |
| TC-DASH-008 | Employee dashboard shows leave balance summary | P0 | UI |
| TC-DASH-009 | Employee dashboard shows recent activity timeline | P1 | UI |
| TC-DASH-010 | Employee dashboard shows upcoming vacations | P1 | UI |
| TC-DASH-011 | Employee dashboard shows pending requests status | P1 | UI |
| TC-DASH-012 | Manager dashboard shows team size (direct + indirect) | P0 | UI |
| TC-DASH-013 | Manager dashboard shows pending approvals count | P0 | UI |
| TC-DASH-014 | Manager dashboard shows team members list | P1 | UI |
| TC-DASH-015 | Manager dashboard shows team attendance overview | P1 | UI |
| TC-DASH-016 | Manager dashboard requires manager role (guard) | P0 | Authorization |
| TC-DASH-017 | Executive analytics dashboard renders | P1 | UI |
| TC-DASH-018 | Headcount analytics dashboard renders | P1 | UI |
| TC-DASH-019 | Attrition analytics dashboard renders | P1 | UI |
| TC-DASH-020 | Engagement analytics dashboard renders | P2 | UI |
| TC-DASH-021 | Leave analytics dashboard renders | P1 | UI |
| TC-DASH-022 | Overtime analytics dashboard renders | P1 | UI |
| TC-DASH-023 | Payroll analytics dashboard renders | P1 | UI |
| TC-DASH-024 | Recruitment analytics dashboard renders | P2 | UI |
| TC-DASH-025 | Training analytics dashboard renders | P2 | UI |

---

## Test Cases

### A. Admin Dashboard

#### TC-DASH-001: Admin dashboard renders organization stats widget
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /dashboard |
| **Role** | System Admin |

**Steps:**
1. Log in as System Admin
2. Navigate to `/dashboard` (or auto-redirect from `/`)

**Expected Results:**
- Organization statistics widget renders with:
  - Total branches count
  - Total departments count
  - Total employees count
- Data fetched via `GET /api/v1/dashboard/overview`
- `CanViewOrganizationData()` returns true for admin
- Branch/department filter dropdowns available

---

#### TC-DASH-002: Admin dashboard renders HR statistics
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /dashboard |
| **Role** | System Admin |

**Steps:**
1. Navigate to admin `/dashboard`

**Expected Results:**
- HR statistics widget renders with:
  - Total active employees
  - Total users
  - Total roles
- `CanViewHumanResourcesData()` returns true for admin
- Counts are accurate and match database

---

#### TC-DASH-003: Admin dashboard renders attendance stats (present/absent/late today)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /dashboard |
| **Role** | System Admin |

**Preconditions:**
1. Attendance records exist for today

**Steps:**
1. Navigate to admin `/dashboard`
2. Observe attendance statistics section

**Expected Results:**
- Attendance widget shows today's stats:
  - Total present employees
  - Total absent employees
  - Total late arrivals
  - Total early departures
- Stats update based on branch/department filter
- `CanViewAttendanceData()` returns true for admin

---

#### TC-DASH-004: Admin dashboard renders leave statistics
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /dashboard |
| **Role** | System Admin |

**Steps:**
1. Navigate to admin `/dashboard`

**Expected Results:**
- Leave statistics widget renders with:
  - Pending vacation requests count
  - Approved vacations this month
  - Employees on leave today
- `CanViewVacationData()` returns true for admin

---

#### TC-DASH-005: Admin dashboard renders system health widget
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /dashboard |
| **Role** | System Admin |

**Steps:**
1. Navigate to admin `/dashboard`

**Expected Results:**
- System health widget renders with:
  - Active sessions count
  - Recent system activities
- `CanViewSystemData()` returns true for System Admin
- Widget hidden for non-admin roles

---

#### TC-DASH-006: Admin dashboard renders weekly attendance trends chart
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /dashboard |
| **Role** | System Admin |

**Preconditions:**
1. Attendance data exists for the past 7 days

**Steps:**
1. Navigate to admin `/dashboard`
2. Observe the weekly trends section

**Expected Results:**
- Chart/graph renders showing attendance trends over the past 7 days
- Data includes present, absent, and late counts per day
- Chart is responsive and readable
- Data fetched from the `weekAgo` range in dashboard overview

---

### B. Employee Dashboard (Self-Service)

#### TC-DASH-007: Employee dashboard shows personal attendance stats
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /dashboard (self-service) |
| **Role** | Employee |

**Steps:**
1. Log in to Self-Service Portal at http://localhost:4201
2. Dashboard loads automatically (redirect from `/`)

**Expected Results:**
- Personal attendance widget shows:
  - Days present this month
  - Days absent this month
  - Late arrivals this month
  - Total overtime hours
- Data fetched via `GET /api/v1/portal/employee-dashboard`
- Only shows the logged-in employee's data

---

#### TC-DASH-008: Employee dashboard shows leave balance summary
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /dashboard (self-service) |
| **Role** | Employee |

**Steps:**
1. Navigate to employee dashboard in Self-Service Portal

**Expected Results:**
- Leave balance widget shows:
  - Annual leave remaining / total
  - Sick leave remaining / total
  - Other leave types with balances
- Balances are current and accurate
- Visual indicators (progress bars or numbers)

---

#### TC-DASH-009: Employee dashboard shows recent activity timeline
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /dashboard (self-service) |
| **Role** | Employee |

**Steps:**
1. Navigate to employee dashboard

**Expected Results:**
- Recent activity timeline shows:
  - Recent check-in/check-out times
  - Recent request submissions
  - Recent approval/rejection notifications
- Activities in reverse chronological order
- Limited to the employee's own activities

---

#### TC-DASH-010: Employee dashboard shows upcoming vacations
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /dashboard (self-service) |
| **Role** | Employee |

**Preconditions:**
1. Employee has approved upcoming vacation requests

**Steps:**
1. Navigate to employee dashboard

**Expected Results:**
- Upcoming vacations section shows:
  - Vacation type
  - Start and end dates
  - Number of days
  - Status (Approved)
- Only future vacations displayed
- Sorted by start date ascending

---

#### TC-DASH-011: Employee dashboard shows pending requests status
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /dashboard (self-service) |
| **Role** | Employee |

**Preconditions:**
1. Employee has pending (not yet approved/rejected) requests

**Steps:**
1. Navigate to employee dashboard

**Expected Results:**
- Pending requests section shows:
  - Request type (vacation, excuse, remote work)
  - Submission date
  - Current status (Pending, InProgress)
  - Current approval step
- Quick link to view request details

---

### C. Manager Dashboard (Self-Service)

#### TC-DASH-012: Manager dashboard shows team size (direct + indirect)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /manager-dashboard (self-service) |
| **Role** | Branch Manager |

**Steps:**
1. Log in as Branch Manager (ahmed.rashid@company.com) in Self-Service Portal
2. Navigate to `/manager-dashboard`

**Expected Results:**
- Team size widget shows:
  - Direct reports count
  - Indirect reports count (total team)
  - Total team size
- Data fetched via `GET /api/v1/portal/manager-dashboard`
- Counts reflect the manager's actual reporting hierarchy

---

#### TC-DASH-013: Manager dashboard shows pending approvals count
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /manager-dashboard (self-service) |
| **Role** | Branch Manager |

**Steps:**
1. Navigate to manager dashboard

**Expected Results:**
- Pending approvals widget shows:
  - Total pending approvals count
  - Breakdown by type (vacations, excuses, remote work)
- Count matches actual pending workflow steps assigned to this manager
- Quick action link to navigate to pending approvals page

---

#### TC-DASH-014: Manager dashboard shows team members list
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /manager-dashboard (self-service) |
| **Role** | Branch Manager |

**Steps:**
1. Navigate to manager dashboard

**Expected Results:**
- Team members section displays:
  - Employee name
  - Department
  - Position/title
  - Current status (present, absent, on leave)
- List is searchable/filterable
- Click on a team member shows their details

---

#### TC-DASH-015: Manager dashboard shows team attendance overview
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /manager-dashboard (self-service) |
| **Role** | Branch Manager |

**Steps:**
1. Navigate to manager dashboard

**Expected Results:**
- Team attendance overview shows:
  - Number of team members present today
  - Number absent today
  - Number on leave today
  - Number working remotely today
- Data reflects only the manager's team (direct and indirect reports)

---

#### TC-DASH-016: Manager dashboard requires manager role (guard)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /manager-dashboard (self-service) |
| **Role** | Employee |

**Steps:**
1. Log in as regular employee (salma.khaldi@company.com) in Self-Service Portal
2. Attempt to navigate to `/manager-dashboard`

**Expected Results:**
- Access denied — route guard blocks non-manager users
- Redirected to employee dashboard or unauthorized page
- Manager dashboard menu item not visible in navigation for regular employees

---

### D. Analytics Dashboards

#### TC-DASH-017: Executive analytics dashboard renders
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /analytics |
| **Role** | System Admin |

**Preconditions:**
1. Analytics module enabled in subscription
2. User has `analytics.read` permission

**Steps:**
1. Navigate to `/analytics`

**Expected Results:**
- Executive dashboard renders with high-level KPIs
- Key metrics: headcount, attrition rate, average attendance, leave utilization
- moduleGuard allows access (Analytics module enabled)
- Loading states shown while data fetches

---

#### TC-DASH-018: Headcount analytics dashboard renders
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /analytics/headcount |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/analytics/headcount`

**Expected Results:**
- Headcount dashboard renders with:
  - Total headcount
  - Headcount by department
  - Headcount by branch
  - Headcount trends over time
- Data visualized with charts/graphs
- Route requires Analytics module and analytics.read permission

---

#### TC-DASH-019: Attrition analytics dashboard renders
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /analytics/attrition |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/analytics/attrition`

**Expected Results:**
- Attrition dashboard renders with:
  - Attrition rate (monthly/quarterly/annual)
  - Attrition by department
  - Attrition by reason
  - Retention metrics
- Charts and trend lines displayed

---

#### TC-DASH-020: Engagement analytics dashboard renders
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /analytics/engagement |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/analytics/engagement`

**Expected Results:**
- Engagement dashboard renders with relevant metrics
- Route requires Analytics module entitlement
- moduleGuard blocks access if Analytics module disabled

---

#### TC-DASH-021: Leave analytics dashboard renders
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /analytics/leave |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/analytics/leave`

**Expected Results:**
- Leave analytics renders with:
  - Leave utilization rates
  - Leave by type breakdown
  - Leave trends over time
  - Department comparison

---

#### TC-DASH-022: Overtime analytics dashboard renders
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /analytics/overtime |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/analytics/overtime`

**Expected Results:**
- Overtime analytics renders with:
  - Total overtime hours
  - Overtime by department/branch
  - Overtime trends
  - Cost analysis

---

#### TC-DASH-023: Payroll analytics dashboard renders
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /analytics/payroll |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/analytics/payroll`

**Expected Results:**
- Payroll analytics renders with:
  - Total payroll cost
  - Cost by department
  - Cost trends over time
  - Component breakdown
- Route requires Analytics module entitlement

---

#### TC-DASH-024: Recruitment analytics dashboard renders
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /analytics/recruitment |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/analytics/recruitment`

**Expected Results:**
- Recruitment analytics renders with:
  - Pipeline metrics
  - Time-to-hire
  - Source effectiveness
  - Hiring funnel visualization
- Route requires Analytics module and analytics.read permission

---

#### TC-DASH-025: Training analytics dashboard renders
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /analytics/training |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/analytics/training`

**Expected Results:**
- Training analytics renders with relevant training/certification metrics
- Route requires Analytics module entitlement
- moduleGuard blocks access if Analytics module disabled
- `analytics.read` permission required
