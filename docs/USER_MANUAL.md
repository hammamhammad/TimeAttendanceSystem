# TecAxle HRMS — Complete User Manual

**Version:** v14.9
**Last updated:** 2026-04-26
**Owner:** TecAxle HRMS — HR Operations

| Application | URL |
|---|---|
| Admin Portal | https://hrms.tecaxle.com/ |
| Self-Service Portal | https://hrmsportal.tecaxle.com/ |

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [System Overview](#2-system-overview)
3. [Getting Started](#3-getting-started)
4. [User Roles and Permissions](#4-user-roles-and-permissions)
5. [Module-by-Module User Guide](#5-module-by-module-user-guide)
6. [Admin Guide](#6-admin-guide)
7. [Workflow and Approval Guide](#7-workflow-and-approval-guide)
8. [Reports and Exports](#8-reports-and-exports)
9. [Notifications](#9-notifications)
10. [Troubleshooting](#10-troubleshooting)
11. [Frequently Asked Questions](#11-frequently-asked-questions)
12. [Glossary](#12-glossary)
13. [Appendix](#13-appendix)

---

# 1. Introduction

## 1.1 Purpose of the System

TecAxle HRMS is a comprehensive enterprise Human Resource Management System (HRMS) and workforce-management platform. It is designed to manage the complete employee lifecycle — from recruitment and onboarding, through daily attendance, leave, performance, payroll, and benefits, all the way to offboarding and final settlement.

The system replaces a patchwork of spreadsheets, paper forms, biometric device exports, and disconnected payroll tools with a single source of truth. Every action is audited; every approval is configurable; every business rule is policy-driven rather than hard-coded.

## 1.2 Target Users

| User type | What they do |
|---|---|
| **HR administrators** | Manage employees, contracts, lifecycle events, payroll, benefits, settings |
| **System administrators** | Configure the system, manage users / roles, monitor operational health |
| **Payroll administrators** | Run payroll periods, manage tax / social-insurance / calendar policies |
| **Recruiters** | Manage requisitions, postings, candidates, interviews, offers |
| **Branch and department managers** | Approve their team's requests; review team attendance |
| **Employees** | Use the self-service portal for attendance, leave, payslips, services |
| **Operations / IT** | Monitor alerts, work queues, reports, integrations |

## 1.3 Main Business Value

- **Single source of truth** for every employee record, contract, and transaction.
- **Automated lifecycle transitions** — offer → onboarding → activation → resignation → clearance → settlement → deactivation.
- **Policy-driven payroll** — every multiplier comes from configuration; nothing is hard-coded.
- **Configurable approval workflows** — multi-step, role-based, with delegation and escalation.
- **Branch-scoped data access** — users only see the branches they are entitled to.
- **Bilingual interface** — English and Arabic, with full right-to-left support.
- **Real-time notifications** — request approvals, expiry alerts, system events.
- **Comprehensive audit trail** — every change is logged with field-level before/after.

## 1.4 Scope of the Manual

This manual covers:

- All **139** API controller modules (every business module in the system).
- All **114** permission resources and **27** permission actions.
- All **4** seeded roles and how each is used.
- All **68** status / lifecycle enums for every entity in the system.
- All **41** background jobs (scheduled tasks).
- All **10** notification types and their triggers.
- All **7** lifecycle domain events.
- All **85** company configuration settings.
- The complete approval-workflow framework with all **6** approver types.
- Both portals — admin (https://hrms.tecaxle.com/) and self-service (https://hrmsportal.tecaxle.com/).

> **Note:** Some features of the system are partially implemented or reserved for future enhancement. Where this is the case it is clearly marked as **Needs confirmation** or **Implementation unclear**.

---

# 2. System Overview

## 2.1 High-Level Description

TecAxle HRMS is a **single-company HRMS**: one organisation, one database, one set of settings. The system supports **multi-branch organisations** within that single company, with branch-scoped data access.

The system has three main components:

| Component | URL | Purpose |
|---|---|---|
| **Backend API** | (internal) | Business logic, data, security, scheduled jobs |
| **Admin Portal** | https://hrms.tecaxle.com/ | Full management for HR / payroll / IT / managers |
| **Self-Service Portal** | https://hrmsportal.tecaxle.com/ | Employee and manager self-service |

`[Screenshot needed: Login screen of both portals side by side]`

## 2.2 Main Modules

The system contains the following main modules (organised by area):

### Dashboard
- Operational dashboard
- KPIs and quick actions

### People
- **Organisation:** Users, Employees, Roles, Branches, Departments
- **HR Lifecycle:** Contracts, Transfers, Promotions, Salary Adjustments, Allowances, Allowance Requests, Job Grades
- **Recruitment:** Job Requisitions, Job Postings, Candidates, Applications, Interviews, Interview Feedback, Offer Letters
- **Onboarding:** Templates, Processes, Tasks, Dashboard
- **Offboarding:** Resignations, Terminations, Clearance, Final Settlements, End-of-Service, Exit Interviews
- **Workplace:** Documents (Categories, Employee Documents, Company Policies, Letter Templates, Letter Requests), Announcements, Assets (incl. Categories, Assignments, Maintenance), Employee Relations (Grievances, Disciplinary Actions, Investigations, Counselling), Surveys (Templates, Distributions, Responses), Expenses, Loans & Advances

### Workforce
- **Time & Attendance:** Shifts, Shift Assignments, Attendance, Daily View, Monthly Report, Shift Swaps, On-Call Schedules, Attendance Correction Requests
- **Leave & Absence:** Employee Vacations, Employee Excuses, Compensatory Offs, Leave Encashments, Remote Work Requests, Leave Balances
- **Performance:** Review Cycles, Reviews, Goals, Competency Frameworks, Performance Improvement Plans (PIPs), 360 Feedback Requests
- **Training:** Categories, Courses, Programs, Sessions, Enrollments, Evaluations, Attendance, Certifications, Budgets
- **Succession:** Key Positions, Talent Profiles, Succession Plans, Career Paths

### Payroll
- Salary Structures
- Payroll Periods (Process / Recalculate / Approve / Mark Paid / Cancel / Admin Unlock)
- Payroll Settings (Tax, Social Insurance, Insurance Providers, Calendar Policies)
- End-of-Service Policies
- Benefits (Plans, Open Enrollment Periods, Enrollments, Claims)

### Operations
- **Approvals:** Pending Approvals, Approval History, Delegations
- **Operations Dashboard, Alerts, Approved Not Executed, Global Search**
- **Work Queues:** Overdue Approvals, Overdue Onboarding Tasks, Overdue Clearance Items, Unresolved Alerts, Auto-Checkout Review, PIP Follow-Through
- **Reports:** Attendance, Leave, Sessions, Audit Logs, Payroll, Compliance, Custom Reports, Scheduled Reports
- **Analytics:** Executive Dashboard, Headcount, Attrition, Recruitment, Training, Leave, Overtime, Payroll, Engagement
- **Timesheets:** Projects, Project Tasks, Periods, Timesheets
- **Settings:** Company Configuration, Overtime Configuration, Public Holidays, Vacation Types, Excuse Policies, Remote Work Policies, Workflows, Allowance Types, Allowance Policies, End-of-Service Policies, Leave Entitlements

## 2.3 User Types

| User type | Portal | Default role |
|---|---|---|
| HR administrator | Admin | Admin |
| System administrator | Admin | SystemAdmin |
| Manager (branch / department) | Admin + Self-Service | Manager |
| Recruiter | Admin | Admin (typically) |
| Employee | Self-Service only | Employee |

## 2.4 Access and Permission Model

Access is controlled by three layers:

1. **Authentication** — JWT-based login (email + password). Optional Two-Factor Authentication (TOTP).
2. **Authorisation** — Role + permission policies. Each API endpoint requires an authorisation policy. There are **141** unique policies enforced across **456** endpoint decorators.
3. **Branch scope** — Even authorised users see only the branches they are scoped to. System administrators have implicit access to all branches.

`[Screenshot needed: Roles and permissions matrix screen]`

---

# 3. Getting Started

## 3.1 Login Process

### Standard sign-in

1. Open the appropriate portal:
   - HR / managers / system administrators → **https://hrms.tecaxle.com/**
   - Employees → **https://hrmsportal.tecaxle.com/**
2. Enter your **email address** and **password**.
3. Click **Login**.

`[Screenshot needed: Login form]`

### Two-Factor Authentication (TOTP)

If 2FA is enabled on your account:

1. After your password is accepted, you are prompted for a **6-digit code**.
2. Open your authenticator app (Google Authenticator, Microsoft Authenticator, Authy, 1Password) and enter the current code.
3. If you have lost your authenticator device, click **Use a backup code**.

To enable 2FA on yourself: avatar menu → **Security** → **Enable 2FA** → scan the QR code → save the backup codes.

### Forgot password

1. Click **Forgot password** on the login screen.
2. Enter your work email.
3. A reset link is emailed to you.
4. Click the link, set a new password, and sign in.

If no email arrives within 5 minutes, check Junk / Spam, then contact HR. A system administrator can reset your password manually from **People → Users**.

## 3.2 First-Time Access

If your account was newly created or migrated, you will be redirected to a **Change Password** screen on first login.

1. Enter the temporary password.
2. Choose a new password meeting the company password policy:
   - Minimum length (typically 8 characters; configurable)
   - At least one uppercase letter, one digit, one special character (configurable)
   - Cannot match any of your last few passwords (history is tracked)
3. Click **Change Password**.

You are signed in immediately. From this point on, you can use the new password.

## 3.3 Dashboard Overview

### Admin Dashboard

`[Screenshot needed: Admin dashboard]`

Tiles include:

- **Organisation Snapshot** — total active employees, branches, departments, pre-hires, suspended.
- **Attendance Today** — Present, Absent, On Leave, Late, On Remote, On Holiday.
- **Pending Approvals** — total tasks waiting on action.
- **Recent Activity** — latest 10–20 system events.
- **Open Work Queues** — Overdue Approvals, Overdue Onboarding Tasks, Overdue Clearance, Unresolved Alerts, Auto-Checkout Review, PIP Follow-Through.
- **Quick Actions** — Add Employee, Process Payroll, Create Shift Assignment.

### Self-Service Dashboard

`[Screenshot needed: Self-service dashboard]`

Tiles include:

- **Today's Attendance** — your check-in / out, status.
- **Leave Balance** — annual, sick, casual.
- **My Pending Requests** — vacations, excuses, expenses, letters.
- **Upcoming Events** — training sessions, certifications expiring.
- **Recent Payslips** — last few periods.
- **Latest Announcements**.
- **Quick Action Buttons** — Request Vacation, Request Excuse, Submit Correction, Submit Expense.

## 3.4 Navigation Menu

### Layout zones

| Zone | Purpose |
|---|---|
| **Logo strip** (top-left) | Click the gradient logo to open the **Module Launcher** |
| **Sidebar** (left) | Menu items grouped under the active *Area* |
| **Top bar** (top) | Breadcrumb (left), search, notifications, language, avatar |
| **Main content** | Pages, lists, forms, dashboards |

### Areas

The sidebar shows menu groups for **one area at a time**. Use the **Area Switcher** at the bottom of the sidebar to change area.

**Admin portal areas:**

| Area | Covers |
|---|---|
| **Dashboard** | Landing page |
| **People** | Users, employees, roles, branches, departments, lifecycle, workplace |
| **Workforce** | Time, attendance, shifts, leave, performance, training, succession |
| **Payroll** | Salary structures, payroll periods, EOS policies, benefits |
| **Operations** | Approvals, work queues, reports, analytics, timesheets, settings |

**Self-service portal areas:**

| Area | Covers |
|---|---|
| **Me** | Dashboard, profile, attendance, leave & requests |
| **Pay** | Payslips, salary, allowances, benefits |
| **Services** | HR services, training, engagement |
| **Approvals** | Pending approvals (everyone) and team management (managers only) |

### Module Launcher

Click the gradient logo at the top-left to open the launcher. Currently active: **HR**. Placeholder modules for future: **CRM**, **Sales**, **Inventory**.

## 3.5 Common Buttons / Actions

These appear consistently across the system:

| Button | Effect |
|---|---|
| **Add / Create** | Open the create form |
| **Edit** | Open the edit form for a row |
| **View** | Open the read-only detail page |
| **Delete** | Soft-delete a row (after confirmation) |
| **Save** | Persist form changes |
| **Submit** | Submit a form (e.g. a request) for processing |
| **Cancel** | Discard form changes / close a dialog |
| **Approve** | Approve a workflow step |
| **Reject** | Reject a workflow step |
| **Return for Correction** | Send a request back to the requester |
| **Delegate** | Reassign a workflow task to another approver |
| **Resubmit** | Resubmit a returned request |
| **Export** | Export the current list to CSV |
| **Import** | Bulk-upload data from a CSV template |
| **Search** | Filter the current list by text |
| **Filter** | Open advanced filters (date, status, branch, etc.) |
| **Activate / Deactivate** | Toggle status |
| **Lock / Unlock** | Lock or unlock a record (e.g. payroll period) |
| **Reset Password** | Set a temporary password for a user |
| **Force Password Change** | Force the user to change at next login |
| **Download** | Download a generated PDF or CSV |
| **Mark Paid** | Move a payroll period to Paid (final lock) |
| **Recalculate** | Re-run payroll calculation in Processed status |

`[Screenshot needed: Typical list page with toolbar buttons]`

`[Screenshot needed: Typical edit form with sticky save / cancel footer]`

---

# 4. User Roles and Permissions

## 4.1 Seeded Roles

The system seeds **four** roles on first run.

### SystemAdmin

- **System role** (cannot be edited / deleted).
- **Full access** to every resource × action combination, including system management.
- Default branch access: all branches (implicit).
- Used by IT and the seeded system users.

### Admin

- **System role**.
- **Full HR / payroll / settings access**, but excluded from low-level system management actions.
- Used as the default for HR managers.

### Manager

- **Editable role** (HR can adjust permissions).
- **Default permissions:** read team-related resources, approve team requests.
- Sample grants: `(Attendance, Read)`, `(Vacation, Approve)`, `(Employee, Read)`.
- Should be paired with branch access limited to the user's branch.

### Employee

- **Editable role**.
- **Default permissions:** create their own requests, read their own data.
- Sample grants: `(Vacation, Create)`, `(Excuse, Create)`, `(Dashboard, Read)`.
- Used by every regular employee for self-service access.

> Custom roles can be created from **People → Roles → Add Role**. They are saved with bilingual names (English + Arabic) and a check-box matrix of (Resource, Action) grants.

## 4.2 Permission Resources (114 total)

The system defines **114** permission resources covering every entity. Examples:

`User`, `Role`, `Employee`, `Branch`, `Department`, `Shift`, `Attendance`, `Schedule`, `Report`, `Settings`, `Dashboard`, `Permission`, `Audit`, `Notification`, `System`, `PublicHoliday`, `VacationType`, `Vacation`, `ExcusePolicy`, `Excuse`, `Session`, `Workflow`, `Approval`, `LeaveBalance`, `Contract`, `Transfer`, `Promotion`, `SalaryAdjustment`, `JobGrade`, `Payroll`, `SalaryStructure`, `TaxConfiguration`, `SocialInsurance`, `Insurance`, `Resignation`, `Termination`, `Clearance`, `EndOfService`, `FinalSettlement`, `ExitInterview`, `AllowanceType`, `AllowancePolicy`, `AllowanceAssignment`, `AllowanceRequest`, `JobRequisition`, `JobPosting`, `Candidate`, `JobApplication`, `Interview`, `OfferLetter`, `OnboardingTemplate`, `OnboardingProcess`, `DocumentCategory`, `EmployeeDocument`, `CompanyPolicy`, `LetterRequest`, `LetterTemplate`, `ExpenseCategory`, `ExpensePolicy`, `ExpenseClaim`, `LoanType`, `LoanPolicy`, `LoanApplication`, `SalaryAdvance`, `AnnouncementCategory`, `Announcement`, `TrainingCategory`, `TrainingCourse`, `TrainingProgram`, `TrainingSession`, `TrainingEnrollment`, `TrainingEvaluation`, `EmployeeCertification`, `TrainingBudget`, `Grievance`, `DisciplinaryAction`, `Investigation`, `CounselingRecord`, `AssetCategory`, `Asset`, `AssetAssignment`, `AssetMaintenance`, `SurveyTemplate`, `SurveyDistribution`, `SurveyResponse`, `Analytics`, `SavedDashboard`, `Project`, `ProjectTask`, `TimesheetPeriod`, `Timesheet`, `KeyPosition`, `TalentProfile`, `SuccessionPlan`, `CareerPath`, `BenefitPlan`, `BenefitEnrollment`, `OpenEnrollmentPeriod`, `BenefitClaim`, `ShiftSwapRequest`, `OnCallSchedule`, `CompensatoryOff`, `LeaveEncashment`, `CustomReport`, `ScheduledReport`, and others.

> A small number of legacy resources (`SubscriptionPlan`, `TenantSubscription`, `Entitlement`) remain in the enum from the pre-v14.0 multi-tenant version of the system but are no longer used in the application. **Implementation unclear** — they should not be granted on any role.

## 4.3 Permission Actions (27 total)

Each action represents what a user can do on a resource:

| Action | Meaning |
|---|---|
| **Read** | View / list records |
| **View** | View a single record (alternate naming) |
| **Create** | Create new records |
| **Update** | Modify records |
| **Delete** | Remove records (typically soft-delete) |
| **Export** | Export to CSV |
| **Import** | Bulk-import from CSV |
| **Approve** | Approve a request / workflow step |
| **Reject** | Reject a request / workflow step |
| **Lock** | Lock a record (e.g. payroll period) |
| **Unlock** | Unlock a record |
| **ResetPassword** | Reset another user's password |
| **AssignRole** | Assign a role to a user |
| **RemoveRole** | Remove a role from a user |
| **AssignPermission** | Grant a permission to a role |
| **RemovePermission** | Revoke a permission from a role |
| **Download** | Download a generated file |
| **Upload** | Upload a file |
| **Archive** | Archive a record |
| **Restore** | Restore an archived record |
| **Activate** | Activate a record / user |
| **Deactivate** | Deactivate a record / user |
| **Assign** | Assign a record to someone |
| **Unassign** | Unassign |
| **Manage** | Combined Create+Read+Update+Delete |
| **Configure** | Edit configuration |
| **BulkCreate** | Create multiple records at once |

## 4.4 Role-Based Limitations

- **SystemAdmin** has implicit branch access to ALL branches and ALL permissions. Other roles must be explicitly granted permissions and branch access.
- **Branch access** is enforced on every list and detail page — a user without access to Branch X will not see employees, vacations, or payslips related to Branch X, even with full Read permissions.
- **Self-approval** is governed by the company-wide **Allow Self-Approval** setting (default off — users cannot approve their own requests).
- The **Workflow Fallback Approver** is invoked when no eligible approver can be resolved; configurable by role and / or specific user.

## 4.5 Permission Checks in Frontend and Backend

### Frontend
- The admin sidebar dynamically hides menu items the user has no permission to access.
- Action buttons (Create, Edit, Delete, Approve) are hidden / disabled per row based on permission.
- Route guards prevent users from navigating to a page they cannot access.

### Backend
- Every API endpoint is decorated with an `[Authorize(Policy = "...")]` attribute mapping to the required permission.
- **141** unique policies govern **456** endpoint actions.
- **Branch scope** is enforced in every list and detail query — even an authorised user cannot see data for a branch they are not scoped to.
- **Audit logging** records the user, action, and field-level before-and-after values for every mutation.

---

# 5. Module-by-Module User Guide

This section covers every business module in the system. For each module, the module purpose, who can use it, the relevant pages / routes, fields, validations, step-by-step instructions, business workflow, statuses, related notifications, and common errors are described.

## 5.1 Authentication and Account Management

**Purpose:** sign-in, sign-out, password management, two-factor authentication.

**Who:** every user.

**Routes / endpoints:**

- `POST /api/v1/auth/login` — sign in with email + password.
- `POST /api/v1/auth/refresh` — refresh access token.
- `POST /api/v1/auth/logout` — sign out.
- `POST /api/v1/auth/request-password-reset` — request password reset email.
- `POST /api/v1/auth/reset-password` — reset password using token.
- `POST /api/v1/auth/change-password` — change own password.
- `POST /api/v1/auth/enable-2fa` — start 2FA enrolment.
- `POST /api/v1/auth/confirm-2fa` — confirm 2FA enrolment.
- `POST /api/v1/auth/verify-2fa` — verify a 2FA code on login.
- `POST /api/v1/auth/register` — register a new user (SystemAdmin only — **Needs confirmation** whether enabled in production).
- `POST /api/v1/auth/verify-email` — verify email address using emailed token.
- `POST /api/v1/auth/resend-email-verification` — resend verification.

**Validations:**

- Email format must be valid.
- Password must meet the company password policy.
- After several failed attempts the account locks for the configured duration.

**Common errors:**

- `Invalid credentials` — wrong email or password.
- `Account locked` — wait the lockout duration or contact a SystemAdmin.
- `Must change password` — first-login redirect to the change-password screen.

`[Screenshot needed: Change password screen]`

## 5.2 Users (`/users`)

**Purpose:** manage portal user accounts.

**Who:** SystemAdmin, Admin (HR with the User permission).

**Page:** `/users`

**Fields:**

| Field | Required | Description |
|---|---|---|
| Email | Yes | Login email — must be unique |
| Display Name | Yes | Full name shown in UI |
| Linked Employee | No | Optional link to an Employee record |
| Roles | Yes (≥ 1) | One or more assigned roles |
| Branch Access | Conditional | Required for non-SystemAdmin users |
| Active | Yes | Login is enabled when on |
| Must Change Password | No | Forces password change on next sign-in |

**Actions:** Add User, Edit, Activate / Deactivate, Force Password Change, Reset Password, Unlock Account, Manage Roles, Manage Branch Access.

**Common errors:**
- `Email already in use` — pick a different address.
- `User must have at least one role` — assign a role.

## 5.3 Employees (`/employees`)

**Purpose:** master record for every person employed by the company.

**Who:** Admin, SystemAdmin, HR roles. Managers see their team only via the self-service portal.

**Page:** `/employees`

**Tabs:** Personal, Contact, Employment, Lifecycle, Compensation, Education, Work Experience, Visas, Dependents, Emergency Contacts, Documents, Profile Changes, Audit.

**Required fields (create form):** First Name, Last Name, Email, Hire Date, Branch, Department.

**Statuses (combined):**

| Combination | Meaning |
|---|---|
| Pre-Hire = true, Active = true | Newly hired; in onboarding; payroll inactive |
| Active = true, Suspended = false | Active employee; full participation |
| Active = true, Suspended = true | Offboarding in progress; portal disabled |
| Active = false | Fully off-boarded; record retained |

**EmploymentStatus values:** `Active`, `FullTime`, `PartTime`, `Contract`, `Intern`, `Consultant`, `Terminated`, `Inactive`, `Suspended`, `OnProbation`, `Resigned`.

**ProbationStatus values:** `NotApplicable`, `InProgress`, `Passed`, `Failed`, `Extended`.

**Step-by-step: add an employee**

1. **People → Employees → Add Employee**.
2. Fill the required fields.
3. Set the optional fields under each tab.
4. Click **Save**. The employee is created with `Active=true`.
5. Optionally, **Create User** to provision portal access.
6. Optionally, mark **Pre-Hire** if you want to start onboarding.

**Step-by-step: bulk import**

1. **People → Employees → Import**.
2. Download the CSV template.
3. Fill the template (one row per employee). Required columns: First Name, Last Name, Email, Hire Date, Branch Code, Department Code.
4. Save as CSV.
5. Click **Upload CSV**.
6. The system validates each row and shows errors inline. Fix and re-upload, or proceed with the valid subset.

**Common errors:**
- `Email already exists`
- `Branch / Department not found`
- `Hire Date in the future` (if not allowed by policy)
- `Invalid date format`

`[Screenshot needed: Employee detail page with tabs]`

## 5.4 Roles (`/roles`)

**Purpose:** define role names and their permission grants.

**Who:** SystemAdmin only (typically — controlled by the Role management permission).

**Page:** `/roles`

**Fields:**
- Role Name (English)
- Role Name (Arabic)
- Description
- (Resource, Action) check-box matrix — 114 × 27 = 3,078 possible combinations

**Built-in roles (cannot be deleted):** SystemAdmin, Admin, Manager, Employee.

**Common error:** `Role is in use — cannot delete` (revoke from all users first).

## 5.5 Branches (`/branches`)

**Purpose:** multi-branch organisation support.

**Who:** Admin, SystemAdmin.

**Page:** `/branches`

**Fields:**
- Code (unique)
- English Name, Arabic Name
- Address
- Contact phone, contact email
- GPS coordinates (latitude, longitude)
- Geofence radius (metres)
- Branch Manager (optional — used by workflows that route to "BranchManager")

**Map picker:** click anywhere on the map to set GPS, or type an address to search. The geofence circle visualises the radius. GPS coordinates are retained as **branch metadata only** (the system no longer enforces GPS-based attendance).

`[Screenshot needed: Branch map picker]`

## 5.6 Departments (`/departments`)

**Purpose:** hierarchical departments (parent-child tree).

**Page:** `/departments`

**Fields:** Code, English Name, Arabic Name, Parent Department, Department Manager.

**Tree view:** drag-and-drop to re-parent.

## 5.7 HR Lifecycle Management

### 5.7.1 Contracts (`/employee-contracts`)

**Purpose:** track every employment contract.

**Fields:** Employee, Contract Type (Probation / FixedTerm / Indefinite / Internship / Project), Start Date, End Date, Status, Probation Period.

**ContractStatus values:** `Draft`, `Active`, `Expired`, `Terminated`, `Renewed`, `Suspended`.

**Background job:** `ContractExpiryAlertJob` runs daily at 03:00 UTC and notifies HR before contract expiry using the configured **Contract Expiry Alert Days** (default 30, 15, 7 days).

**Action on contract expiry** is configurable in **Company Configuration → Lifecycle**:
- `NotifyOnly` — send notifications only (default)
- `AutoMarkExpired` — set status Expired
- `Suspend` — suspend the employee
- `Deactivate` — fully deactivate

### 5.7.2 Transfers (`/employee-transfers`)

**Purpose:** branch / department transfers with audit trail.

**Status values:** `Pending`, `Approved`, `Rejected`, `InProgress`, `Completed`, `Cancelled`.

### 5.7.3 Promotions (`/employee-promotions`)

**Purpose:** rank / role promotions audit trail.

**Status values:** `Pending`, `Approved`, `Rejected`, `Effective`, `Cancelled`.

### 5.7.4 Salary Adjustments (`/salary-adjustments`)

**Purpose:** record every change to base salary.

**Status values:** `Draft`, `Pending`, `Approved`, `Rejected`, `Applied`, `Cancelled`.

> **Always create a salary adjustment** — never edit the salary directly. The payroll engine resolves salary by effective date, so a direct edit would not be applied to a period overlapping the change.

### 5.7.5 Allowances (`/allowances` and `/allowance-requests`)

**Allowance Assignments** are effective-dated, with statuses: `Active`, `Suspended`, `Expired`, `Cancelled`.

**Allowance Requests** go through a workflow with statuses: `Pending`, `Approved`, `Rejected`, `Applied`, `Withdrawn`, `Cancelled`.

### 5.7.6 Job Grades (`/job-grades`)

**Fields:** Code, English Name, Arabic Name, Description, Min/Max Salary, Optional Midpoint and Market Percentile.

## 5.8 Recruitment

### 5.8.1 Job Requisitions (`/recruitment/requisitions`)

**Purpose:** internal request to open a position.

**Status values:** `Draft`, `PendingApproval`, `Approved`, `Rejected`, `Open`, `OnHold`, `Filled`, `Cancelled`.

### 5.8.2 Job Postings (`/recruitment/postings`)

**Purpose:** publish an approved requisition.

**Status values:** `Draft`, `Published`, `Closed`, `Cancelled`.

### 5.8.3 Candidates (`/recruitment/candidates`)

**Purpose:** master list of candidates.

### 5.8.4 Applications (`/recruitment/applications`)

**Purpose:** candidate × posting links.

**ApplicationStatus values:** `New`, `Screening`, `ShortListed`, `InterviewScheduled`, `Interviewing`, `OfferPending`, `OfferExtended`, `OfferAccepted`, `OfferDeclined`, `Hired`, `Rejected`, `Withdrawn`.

### 5.8.5 Interviews (`/recruitment/interviews`)

**Purpose:** schedule interviews and capture feedback.

**InterviewResult values:** `Pending`, `Passed`, `Failed`, `NoShow`, `Rescheduled`.

### 5.8.6 Offers (`/recruitment/offers`)

**Purpose:** generate offer letters and manage acceptance.

**OfferStatus values:** `Draft`, `PendingApproval`, `Approved`, `Sent`, `Accepted`, `Declined`, `Expired`, `Withdrawn`.

**Domain event:** when an offer is **Accepted**, `OfferAcceptedEvent` fires. The system creates a pre-hire Employee, starts an onboarding process, and provisions a portal user (lifecycle automation).

## 5.9 Onboarding

### 5.9.1 Templates (`/onboarding/templates`)

**Purpose:** reusable task lists by category (Documentation, IT, HR, Training, Equipment, Access, Introduction).

### 5.9.2 Processes (`/onboarding/processes`)

**Purpose:** per-employee onboarding instances.

**OnboardingStatus values:** `NotStarted`, `InProgress`, `Completed`, `Cancelled`, `OnHold`.

**OnboardingTaskStatus values:** `Pending`, `InProgress`, `Completed`, `Skipped`, `Overdue`.

**DocumentCollectionStatus values:** `Pending`, `Submitted`, `Verified`, `Rejected`, `Expired`.

**Background job:** `OnboardingTaskOverdueJob` runs daily at 05:00 UTC and marks overdue tasks.

**Domain event:** `OnboardingCompletedEvent` fires when all required tasks complete. If `AutoActivateEmployeeOnOnboardingComplete` is enabled, the employee becomes Active automatically.

### 5.9.3 Onboarding Dashboard (`/onboarding/dashboard`)

Cross-employee view of who is in onboarding, completion percentages, overdue tasks.

## 5.10 Offboarding

### 5.10.1 Resignations (`/offboarding/resignations`)

**ResignationStatus values:** `Pending`, `Approved`, `Rejected`, `Withdrawn`.

**Domain event:** when approved, `ResignationApprovedEvent` fires. If `AutoCreateTerminationOnResignationApproved` is on, a Termination record is created automatically.

### 5.10.2 Terminations (`/offboarding/terminations`)

**TerminationType values:** `Resignation`, `Termination`, `EndOfContract`, `Retirement`, `Redundancy`, `MutualAgreement`.

**Domain event:** `TerminationCreatedEvent`. If `AutoCreateClearanceOnTermination` is on (default), a Clearance Checklist is created. If `AutoSuspendEmployeeOnTerminationCreated` is on, the employee is suspended.

### 5.10.3 Pending Clearance (`/offboarding/pending-clearance`)

**ClearanceStatus values:** `Pending`, `InProgress`, `Completed`.

**Default clearance items** when no template is configured:
1. Return company laptop / equipment
2. Return company ID card
3. Return company assets (phone, vehicle, keys)
4. Hand over project documentation
5. Knowledge transfer to designated colleague
6. IT access revocation
7. Final timesheet submission
8. Exit interview completed

**Domain event:** `ClearanceCompletedEvent`. Enables the Final Settlement (gated by `RequireClearanceCompleteBeforeFinalSettlement` if configured).

### 5.10.4 Final Settlements (`/offboarding/final-settlements`)

**SettlementStatus values:** `Draft`, `Calculated`, `PendingApproval`, `Approved`, `Paid`, `Cancelled`.

**Components:** Last salary (pro-rated), Leave Encashment, End-of-Service Benefit (per active policy), Notice Period, Outstanding Loans, Other line items.

**Domain event:** `FinalSettlementPaidEvent`. If `AutoDeactivateEmployeeOnFinalSettlementPaid` is on (default), the employee is deactivated.

### 5.10.5 End-of-Service Policies

Effective-dated policies with optional country filter. Saudi default seeded on first run. Tier-based: years-of-service × multiplier. Resignation deduction tier separately scaled.

The applied policy is snapshotted at calculation time, so historical EOS calculations are reproducible.

## 5.11 Time and Attendance

### 5.11.1 Shifts (`/shifts`)

**Shift types:** Regular, Flexible, Split, Rotating, Night (data-driven on `ShiftType.TimeBased` or `HoursOnly`).

**ShiftStatus values:** `Active`, `Inactive`, `Draft`, `Archived`.

### 5.11.2 Shift Assignments (`/shifts/assign`)

**ShiftAssignmentStatus values:** `Pending`, `Active`, `Inactive`, `Expired`, `Cancelled`.

**Priority rule:** when multiple assignments overlap on a date, the highest-priority active assignment wins.

### 5.11.3 Attendance Dashboard (`/attendance`) and Daily View (`/attendance/daily`)

**AttendanceStatus values:** `Present`, `Absent`, `Late`, `EarlyLeave`, `OnLeave`, `DayOff`, `Overtime`, `Incomplete`, `Holiday`, `SickLeave`, `Pending`, `OnDuty`, `Excused`, `RemoteWork`.

**Background jobs:**
- `DailyAttendanceGenerationJob` — daily 02:00 UTC — generates daily records for all active employees.
- `EndOfDayAttendanceFinalizationJob` — daily 23:59 UTC — converts pending → absent for past dates.
- `ShiftDrivenAutoCheckOutJob` — hourly — auto-checks out employees after shift end + grace period (branch-timezone aware).

### 5.11.4 Attendance Correction Requests

**Purpose:** employees submit corrections for missed scans. Admin reviews / approves.

Configurable retroactive window via `AttendanceCorrectionMaxRetroactiveDays` (default 14 days).

### 5.11.5 Monthly Report (`/attendance/monthly-report`)

Lock the period when ready for payroll. Locked records cannot be edited except via a SystemAdmin override.

### 5.11.6 Shift Swap Requests (`/attendance/shift-swaps`)

**ShiftSwapStatus values:** `Pending`, `AcceptedByPeer`, `DeclinedByPeer`, `Approved`, `Rejected`, `Cancelled`.

### 5.11.7 On-Call Schedules (`/attendance/on-call`)

Plan rotations with calendar view; coverage gaps highlighted.

## 5.12 Leave and Absence

### 5.12.1 Employee Vacations (`/employee-vacations`)

**ApprovalStatus values:** `Pending`, `Approved`, `Rejected`, `Cancelled`.

**Validation:** uses `VacationBalanceRule` — checks the balance before approval.

**Calendar view:** `GET /api/v1/employee-vacations/calendar`.

**Bulk-create endpoint:** `POST /api/v1/employee-vacations/bulk` (HR can submit multiple at once).

### 5.12.2 Employee Excuses (`/employee-excuses`)

Hour-based excuses. Same workflow / status set as vacations.

### 5.12.3 Compensatory Offs (`/leave-management/compensatory-offs`)

**CompensatoryOffStatus values:** `Available`, `Used`, `Expired`, `Cancelled`.

**Background job:** `CompensatoryOffExpiryJob` — daily 02:30 UTC.

### 5.12.4 Leave Encashments (`/leave-management/leave-encashments`)

**LeaveEncashmentStatus values:** `Pending`, `Approved`, `Rejected`, `Processed`, `Paid`, `Cancelled`.

### 5.12.5 Remote Work Requests (`/remote-work`)

**RemoteWorkRequestStatus values:** `Pending`, `Approved`, `Rejected`, `Cancelled`.

### 5.12.6 Leave Balances (`/leave-balances`)

Read-only summary per employee per leave type.

**Background job:** `MonthlyLeaveAccrualJob` — monthly on day 1 at 01:00 UTC. `LeaveCarryoverExpiryJob` — daily 04:00 UTC, claws back unused carry-over.

## 5.13 Performance Management

### 5.13.1 Review Cycles (`/performance/cycles`)

**ReviewCycleStatus values:** `Planning`, `Active`, `InReview`, `Calibration`, `Completed`, `Cancelled`.

### 5.13.2 Reviews (`/performance/reviews`)

**ReviewStatus values:** `Draft`, `SelfAssessmentPending`, `SelfAssessmentCompleted`, `ManagerReviewPending`, `ManagerReviewCompleted`, `PendingApproval`, `Approved`, `Acknowledged`, `Disputed`.

**Background job:** `ReviewCycleReminderJob` — daily 07:00 UTC.

### 5.13.3 Goals (`/performance/goals`)

**GoalStatus values:** `Draft`, `Active`, `InProgress`, `Completed`, `Cancelled`, `Deferred`.

### 5.13.4 Competencies (`/performance/competencies`)

Frameworks → competencies → assessments.

### 5.13.5 Performance Improvement Plans (`/performance/pips`)

**PipStatus values:** `Draft`, `Active`, `Extended`, `CompletedSuccessful`, `CompletedUnsuccessful`, `Cancelled`.

**Background jobs:**
- `PIPExpiryCheckJob` — daily 06:00 UTC — notifies manager when end date reached.
- `PipFollowThroughJob` — hourly — creates pending Resignation Request when a PIP transitions to `CompletedUnsuccessful` (per business rules).

### 5.13.6 360 Feedback (`/performance/feedback-requests`)

**FeedbackStatus values:** `Requested`, `Submitted`, `Expired`, `Declined`.

## 5.14 Training and Development

### 5.14.1 Categories, Courses, Programs, Sessions

**TrainingProgramStatus values:** `Draft`, `Active`, `Completed`, `Archived`.

**TrainingSessionStatus values:** `Scheduled`, `InProgress`, `Completed`, `Cancelled`.

### 5.14.2 Enrollments

**TrainingEnrollmentStatus values:** `Pending`, `Approved`, `Rejected`, `InProgress`, `Completed`, `Cancelled`, `NoShow`.

**Background job:** `TrainingSessionReminderJob` — daily 11:00 UTC.

### 5.14.3 Certifications

**CertificationStatus values:** `Active`, `Expired`, `Revoked`, `Pending`.

**Background job:** `CertificationExpiryAlertJob` — daily 10:00 UTC.

### 5.14.4 Budgets

Per-department or per-program; spent auto-tracked.

## 5.15 Succession Planning

### 5.15.1 Key Positions, Talent Profiles, Plans, Career Paths

**SuccessionPlanStatus values:** `Draft`, `Active`, `UnderReview`, `Approved`, `Archived`.

**CandidateSuccessionStatus values:** `Active`, `Promoted`, `Removed`, `OnHold`.

**Background jobs:**
- `SuccessionPlanReviewReminderJob` — monthly day 1 at 05:00 UTC.
- `TalentProfileSyncJob` — monthly day 1 at 04:00 UTC — syncs latest performance ratings.

## 5.16 Payroll

### 5.16.1 Salary Structures (`/payroll/salary-structures`)

Define base salary per employee, currency, effective date, frequency.

### 5.16.2 Payroll Periods (`/payroll/periods`)

**PayrollPeriodStatus values:** `Draft`, `Processing`, `Processed`, `PendingApproval`, `Approved`, `Paid`, `Cancelled`.

**Period actions and endpoints:**

| Action | Endpoint | When | Effect |
|---|---|---|---|
| Create | `POST /api/v1/payroll-periods` | — | New period in Draft |
| Process | `POST /api/v1/payroll-periods/{id}/process` | Draft | Computes payslips; → Processed |
| Recalculate | `POST /api/v1/payroll-periods/{id}/recalculate` | Processed | Re-runs calc; replaces line items |
| Approve | `POST /api/v1/payroll-periods/{id}/approve` | Processed | Locks calc; → Approved |
| Mark Paid | `POST /api/v1/payroll-periods/{id}/mark-paid` | Approved | Locks period; payslips visible to employees |
| Cancel | `POST /api/v1/payroll-periods/{id}/cancel` | Draft / Processing | Reverts |
| Admin Unlock | `POST /api/v1/payroll-periods/{id}/admin-unlock` | Paid | SystemAdmin only; requires reason |
| View records | `GET /api/v1/payroll-periods/{id}/records` | Any | Employee payslips for period |
| Run audit | `GET /api/v1/payroll-periods/{id}/run-audit` | Any | Append-only action history |

**PayrollRecordStatus values:** `Pending`, `Calculated`, `Adjusted`, `Finalized`.

**PayrollRunStatus values:** `Running`, `Completed`, `Failed`, `CompletedWithWarnings`.

**PayrollRunItemStatus values:** `Succeeded`, `SkippedNoSalary`, `SkippedInactive`, `FailedWithError`, `CompletedWithWarnings`.

`[Screenshot needed: Payroll period detail with action toolbar]`

`[Screenshot needed: Payslip line-item breakdown]`

### 5.16.3 Payroll Settings (`/payroll/settings`)

Sub-pages: Tax Configurations, Social Insurance, Insurance Providers, Calendar Policies.

**Calendar Policy basis:** `CalendarDays`, `WorkingDays`, `FixedBasis` (e.g. 26).

### 5.16.4 End-of-Service Policies

CRUD pages for policies and tiers. Saudi default seeded.

## 5.17 Benefits

### 5.17.1 Plans (`/benefits/plans`)

Define Health / Dental / Vision / Life / Retirement plans with provider, coverage, contributions.

### 5.17.2 Enrollment Periods (`/benefits/enrollment-periods`)

**EnrollmentPeriodStatus values:** `Upcoming`, `Open`, `Closed`, `Cancelled`.

**Background job:** `OpenEnrollmentPeriodActivatorJob` — daily 00:05 UTC — opens / closes periods automatically.

### 5.17.3 Enrollments (`/benefits/enrollments`)

**BenefitEnrollmentStatus values:** `Pending`, `Active`, `Suspended`, `Terminated`, `Cancelled`, `PendingApproval`.

**Background job:** `BenefitEnrollmentExpiryJob` — daily 01:15 UTC — terminates expired enrollments.

### 5.17.4 Claims (`/benefits/claims`)

**BenefitClaimStatus values:** `Submitted`, `UnderReview`, `Approved`, `PartiallyApproved`, `Rejected`, `Paid`, `Cancelled`.

**Background job:** `BenefitDeductionSyncJob` — monthly day 1 at 03:00 UTC — syncs benefit deductions to payroll.

## 5.18 Workplace Services

### 5.18.1 Documents

- **Categories** — folders.
- **Employee Documents** — `DocumentVerificationStatus`: `Pending`, `Verified`, `Rejected`, `Expired`. Background job: `DocumentExpiryAlertJob` — daily 08:00 UTC.
- **Company Policies** — `PolicyStatus`: `Draft`, `Published`, `Archived`. Acknowledgement-required flag enforces user click.
- **Letter Templates** — bilingual reusable templates.
- **Letter Requests** — `LetterRequestStatus`: `Pending`, `Approved`, `Generated`, `Rejected`, `Cancelled`.

### 5.18.2 Announcements

**AnnouncementStatus values:** `Draft`, `Scheduled`, `Published`, `Expired`, `Archived`.

**Background jobs:**
- `AnnouncementSchedulerJob` — publishes scheduled announcements when start date passes.
- `AnnouncementExpiryJob` — daily — marks expired announcements.

### 5.18.3 Assets

- **Assets** — `AssetStatus`: `Available`, `Assigned`, `InMaintenance`, `Retired`, `Lost`, `Damaged`, `Disposed`.
- **Assignments** — `AssetAssignmentStatus`: `Active`, `Returned`, `Overdue`, `Lost`, `Damaged`.
- **Maintenance** — `MaintenanceStatus`: `Scheduled`, `InProgress`, `Completed`, `Cancelled`.

**Background jobs:**
- `AssetWarrantyExpiryAlertJob` — daily 14:00 UTC.
- `OverdueAssetReturnAlertJob` — daily 15:00 UTC.

### 5.18.4 Employee Relations

- **Grievances** — `GrievanceStatus`: `Filed`, `UnderReview`, `InvestigationStarted`, `PendingResolution`, `Resolved`, `Escalated`, `Closed`, `Withdrawn`. Background job: `GrievanceSlaAlertJob` — daily 12:00 UTC.
- **Disciplinary Actions** — `DisciplinaryActionStatus`: `Draft`, `Pending`, `Approved`, `Acknowledged`, `Appealed`, `AppealResolved`, `Completed`, `Cancelled`.
- **Investigations** — `InvestigationStatus`: `Open`, `InProgress`, `PendingReview`, `Completed`, `Closed`, `Cancelled`.
- **Counseling** — Background job: `CounselingFollowUpReminderJob` — daily 13:00 UTC.

### 5.18.5 Surveys

**SurveyDistributionStatus values:** `Draft`, `Scheduled`, `Active`, `Closed`, `Cancelled`.

**SurveyParticipantStatus values:** `Invited`, `Started`, `Completed`, `Declined`, `Expired`.

**Background jobs:**
- `SurveyDistributionActivatorJob` — hourly.
- `SurveyExpiryJob` — hourly.
- `SurveyReminderJob` — daily 09:00 UTC.

### 5.18.6 Expenses

**ExpenseClaimStatus values:** `Draft`, `Submitted`, `PendingApproval`, `Approved`, `Rejected`, `Reimbursed`, `PartiallyReimbursed`, `Cancelled`.

### 5.18.7 Loans and Salary Advances

**LoanApplicationStatus values:** `Draft`, `Pending`, `Approved`, `Rejected`, `Active`, `FullyPaid`, `DefaultedPayment`, `Cancelled`.

**LoanRepaymentStatus values:** `Scheduled`, `Paid`, `Overdue`, `Waived`.

**SalaryAdvanceStatus values:** `Pending`, `Approved`, `Rejected`, `Deducted`, `Cancelled`.

**Background job:** `LoanRepaymentReminderJob` — daily 09:00 UTC.

## 5.19 Timesheets

**TimesheetPeriodStatus values:** `Open`, `Closed`, `Locked`.

**TimesheetStatus values:** `Draft`, `Submitted`, `Approved`, `Rejected`, `Recalled`.

**Background jobs:**
- `TimesheetPeriodGenerationJob` — daily 03:00 UTC — auto-creates next period.
- `TimesheetPeriodClosureJob` — daily 01:30 UTC — auto-closes overdue periods.
- `TimesheetSubmissionReminderJob` — daily 08:00 UTC — reminds employees near deadline.

## 5.20 Self-Service Portal Features

The self-service portal at https://hrmsportal.tecaxle.com/ surfaces a personalised view of every relevant module. Refer to the **Self-Service User Manual** (`SELF_SERVICE_USER_MANUAL.md`) for end-user step-by-step guidance.

Pages include:

**Me area:** Employee Dashboard, My Profile, My Attendance, Attendance Corrections, Shift Swap Requests, My On-Call, My Timesheets, Vacation Requests, Excuse Requests, Remote Work Requests, My Compensatory Offs, My Leave Encashments.

**Pay area:** My Payslips, My Salary, My Allowances, My Benefits.

**Services area:** My Resignation, My Documents, My Letters, My Expenses, My Loans, My Assets, My Grievances, My Disciplinary, My Training, Training Catalog, My Certifications, My Career, Announcements, My Surveys.

**Approvals area:** Pending Approvals, Manager Dashboard (managers only), Team Members (managers only).

---

# 6. Admin Guide

## 6.1 System Setup and Configuration

### Initial setup checklist

After deployment:

1. Sign in with the seeded SystemAdmin account (see Appendix A).
2. **Settings → Company Configuration → General** — set company name (English + Arabic), time zone, currency, working week, fiscal year start.
3. Create your **Branches** — one row per physical / organisational unit.
4. Create your **Departments** — set parent-child hierarchy.
5. Create your **Job Grades** if you use grade-based compensation.
6. Create at least one **Vacation Type** beyond the seeded defaults if needed.
7. Create your **Shifts** and assign them at the branch / department / employee level.
8. Configure **Public Holidays** for each branch.
9. Configure **Overtime Configuration** per branch.
10. Set up **Workflow Definitions** — at least one per request type (vacation, excuse, etc.).
11. Configure **Allowance Types** with taxable / social-insurable flags.
12. Configure **Tax Configurations**, **Social Insurance**, **Insurance Providers**, **Calendar Policies**.
13. Configure your **End-of-Service Policy** (Saudi default is seeded).
14. Set up **Benefit Plans** if applicable.
15. Define **Onboarding Templates** (default + branch / department specific).
16. Define **Letter Templates** for HR letters.
17. Disable / replace seeded sample accounts before going live.

## 6.2 Master Data Management

| Master data | Page | Notes |
|---|---|---|
| Branches | `/branches` | GPS / map picker |
| Departments | `/departments` | Hierarchical |
| Job Grades | `/job-grades` | Salary bands |
| Shifts | `/shifts` | Multiple types |
| Public Holidays | `/settings/public-holidays` | Per-branch |
| Vacation Types | `/vacation-types` | Paid / unpaid flag, balance rules |
| Allowance Types | `/settings/allowance-types` | Taxable, social-insurable, basis |
| Allowance Policies | `/settings/allowance-policies` | Eligibility |
| Excuse Policies | `/settings/excuse-policies` | Hour balance per period |
| Remote Work Policies | `/settings/remote-work-policy` | Eligibility, blackouts |
| Tax Configurations | `/payroll/settings → tax-configs` | Brackets |
| Social Insurance | `/payroll/settings → social-insurance` | Rates, max, nationality filter |
| Insurance Providers | `/payroll/settings → insurance-providers` | Premiums |
| Calendar Policies | `/payroll/settings → calendar-policies` | Daily-rate basis |
| End-of-Service Policies | (settings) | Tiers |

## 6.3 User Management

See [Section 5.2](#52-users-users) and [Roles](#54-roles-roles).

## 6.4 Role / Permission Management

See [Section 4](#4-user-roles-and-permissions) for the full permission system. Manage from **People → Roles**.

## 6.5 Lookup / Configuration Screens

All under the **Operations → Settings** area:
- Company Configuration (singleton)
- Settings Dashboard
- Overtime
- Public Holidays
- Vacation Types
- Excuse Policies
- Remote Work Policy
- Workflows
- Leave Entitlements
- Allowance Types
- Allowance Policies
- End-of-Service Policies

## 6.6 Audit Logs

**Page:** **Operations → Reports → Audit Logs** (`/reports/audit-logs`).

Every mutation (create / update / delete) is logged with:
- Timestamp
- User who acted
- Entity type, entity ID
- Action (Create / Update / Delete)
- Before-value, after-value (field-level)
- IP address (where available)

`[Screenshot needed: Audit log page with filters]`

## 6.7 Background Jobs (Admin Visibility)

The system runs **41** scheduled jobs. Job execution failures surface in **Operations → Operational Alerts**.

| Job | Schedule | Purpose |
|---|---|---|
| AnalyticsSnapshotJob | Daily 01:00 UTC | Pre-computes analytics snapshots |
| AnnouncementExpiryJob | Daily | Expires announcements |
| AnnouncementSchedulerJob | (scheduled) | Publishes scheduled announcements |
| ApplyScheduledProfileChangesJob | Daily 01:00 UTC | Applies effective-dated profile changes |
| AssetWarrantyExpiryAlertJob | Daily 14:00 UTC | Asset warranty alerts |
| BenefitDeductionSyncJob | Monthly day 1, 03:00 | Syncs benefit deductions to payroll |
| BenefitEnrollmentExpiryJob | Daily 01:15 UTC | Terminates expired benefit enrollments |
| CertificationExpiryAlertJob | Daily 10:00 UTC | Certification expiry alerts |
| CompensatoryOffExpiryJob | Daily 02:30 UTC | Expires comp-off |
| ContractExpiryAlertJob | Daily 03:00 UTC | Contract expiry alerts; fires `ContractExpiredEvent` |
| CounselingFollowUpReminderJob | Daily 13:00 UTC | Counsellor follow-up reminders |
| DailyAttendanceGenerationJob | Daily 02:00 UTC | Generates daily attendance |
| DocumentExpiryAlertJob | Daily 08:00 UTC | Document expiry alerts |
| EndOfDayAttendanceFinalizationJob | Daily 23:59 UTC | Finalises Pending → Absent |
| ExpireTemporaryAllowancesJob | Daily 02:00 UTC | Expires temporary allowances |
| FrozenWorkflowCleanupJob | Daily 03:00 UTC | Cancels long-frozen workflows (>90 days) |
| GrievanceSlaAlertJob | Daily 12:00 UTC | Grievance SLA alerts |
| LeaveCarryoverExpiryJob | Daily 04:00 UTC | Claws back expired carry-over |
| LoanRepaymentReminderJob | Daily 09:00 UTC | Loan repayment reminders |
| MonthlyAnalyticsRollupJob | Monthly day 1, 02:00 | Aggregates monthly analytics |
| MonthlyLeaveAccrualJob | Monthly day 1, 01:00 | Monthly leave accrual |
| OnboardingTaskOverdueJob | Daily 05:00 UTC | Marks overdue onboarding tasks |
| OpenEnrollmentPeriodActivatorJob | Daily 00:05 UTC | Opens / closes benefit enrollment |
| OperationalFailureSurfacerJob | Hourly | Surfaces lifecycle automation failures |
| OverdueAssetReturnAlertJob | Daily 15:00 UTC | Overdue asset return alerts |
| PIPExpiryCheckJob | Daily 06:00 UTC | PIP end-date notifications |
| PipFollowThroughJob | Hourly | Triggers downstream actions on failed PIPs |
| ReviewCycleReminderJob | Daily 07:00 UTC | Performance review reminders |
| ScheduledReportExecutionJob | Hourly | Runs scheduled reports |
| ShiftDrivenAutoCheckOutJob | Hourly | Auto-checkout (shift-driven) |
| SuccessionPlanReviewReminderJob | Monthly day 1, 05:00 | Succession plan review |
| SurveyDistributionActivatorJob | Hourly | Activates survey distributions |
| SurveyExpiryJob | Hourly | Closes survey distributions |
| SurveyReminderJob | Daily 09:00 UTC | Survey reminders |
| TalentProfileSyncJob | Monthly day 1, 04:00 | Sync performance ratings |
| TimesheetPeriodClosureJob | Daily 01:30 UTC | Auto-close timesheet periods |
| TimesheetPeriodGenerationJob | Daily 03:00 UTC | Auto-generate next timesheet period |
| TimesheetSubmissionReminderJob | Daily 08:00 UTC | Timesheet reminders |
| TrainingSessionReminderJob | Daily 11:00 UTC | Training session reminders |
| VisaExpiryAlertJob | Daily 04:00 UTC | Visa expiry alerts |
| WorkflowTimeoutProcessingJob | Hourly | Workflow step timeouts (Expire / Escalate / AutoApprove / AutoReject) |

> All times are UTC unless overridden. **Needs confirmation:** the precise schedule of `AnnouncementSchedulerJob` is not visible in the central scheduler — assumed to be on the same hourly tick as other publication jobs.

## 6.8 Operational Alerts (`/operational-alerts`)

Background-job and lifecycle-automation failures show here. Each alert has:
- Timestamp
- Alert type (job name)
- Error
- Affected entity
- Resolution status (Open / Acknowledged / Resolved / Suppressed)

Actions: Acknowledge, Resolve (with note), Suppress.

## 6.9 Approved Not Executed (`/approved-not-executed`)

Workflow-approved requests whose downstream side-effect has not been recorded yet. Useful for catching execution lag.

## 6.10 Work Queues

Six queues surface items needing administrator attention:

1. Overdue Approvals
2. Overdue Onboarding Tasks
3. Overdue Clearance Items
4. Unresolved Alerts
5. Auto-Checkout Review
6. PIP Follow-Through

`[Screenshot needed: Work queue list page]`

---

# 7. Workflow and Approval Guide

## 7.1 Workflow Engine Overview

The system runs a **configurable, multi-step approval workflow engine**. Every request type (vacation, excuse, expense, salary advance, etc.) can have one or more workflow definitions. When a request is submitted, a workflow instance is created from the active definition, and approvers act on each step in sequence.

## 7.2 Approver Types (6 total)

| ApproverType | Resolves to |
|---|---|
| **DirectManager** | The requester's direct line manager |
| **Role** | Any user with the configured role (with optional assignment strategy) |
| **SpecificUser** | A specific user |
| **DepartmentHead** | The manager of the requester's department |
| **BranchManager** | The manager of the requester's branch |
| **System** | An automated system step (no human approver) |

For Role-based steps, an optional **role assignment strategy** picks among multiple eligible users:
- First Match
- Round Robin
- Least Pending Approvals
- Fixed Priority

## 7.3 Seeded Workflow Definitions (4 total)

| Name | Applies to | Steps | Approver chain |
|---|---|---|---|
| Default Vacation Approval | Vacation requests | 1 | DirectManager (48h timeout) |
| Default Excuse Approval | Excuse requests | 1 | DirectManager (24h timeout) |
| Default Remote Work Approval | Remote work requests | 1 | DirectManager (48h timeout) |
| Default Attendance Correction Approval | Attendance correction requests | 1 | DirectManager (24h timeout) |

> Additional workflow definitions can be created in **Operations → Settings → Workflows**. Workflow definitions are versioned; existing in-flight workflow instances continue to use the snapshot at submission time.

## 7.4 Workflow Statuses

**WorkflowStatus values:** `Pending`, `InProgress`, `Approved`, `Rejected`, `Cancelled`, `Expired`, `Frozen`, `ReturnedForCorrection`, `FailedRouting`.

| Status | Meaning |
|---|---|
| **Pending** | Initial state; waiting on first approver |
| **InProgress** | At least one step approved; awaiting next |
| **Approved** | All steps approved; downstream effect applied |
| **Rejected** | Any approver rejected — terminal |
| **Cancelled** | Requester withdrew |
| **Expired** | Step timed out and was set to terminal expire |
| **Frozen** | Temporarily paused (rare; cleaned up after 90 days by `FrozenWorkflowCleanupJob`) |
| **ReturnedForCorrection** | Sent back to requester; awaiting Resubmit |
| **FailedRouting** | No eligible approver could be resolved; falls to fallback approver |

## 7.5 Approval Actions

**ApprovalAction values:** `Approved`, `Rejected`, `Delegated`, `Skipped`, `TimedOut`, `AutoApproved`, `AutoRejected`, `Escalated`, `ReturnedForCorrection`, `FailedNoApprover`, `Resubmitted`.

## 7.6 Possible Decisions

When an approver opens a pending task, they can:

1. **Approve** — `POST /api/v1/approvals/{id}/approve` — moves to next step or terminal Approved.
2. **Reject** — `POST /api/v1/approvals/{id}/reject` — terminates as Rejected.
3. **Return for Correction** — `POST /api/v1/approvals/{id}/return-for-correction` — sends back with comment.
4. **Delegate** — `POST /api/v1/approvals/{id}/delegate` — re-assigns to another user.
5. **Cancel** — `POST /api/v1/approvals/{id}/cancel` — cancels the workflow (rare, typically administrator-only).

The requester can:

6. **Resubmit** — `POST /api/v1/approvals/{id}/resubmit` — resubmits a returned request.

## 7.7 Standing Delegations

Approvers can configure a standing delegation that automatically routes incoming tasks to an alternate user during a date range:

- `POST /api/v1/approvals/delegations` — create a standing delegation.
- `DELETE /api/v1/approvals/delegations/{id}` — remove.

Delegation depth is bounded (default max 2). Cycles are rejected.

## 7.8 What Happens After Approval / Rejection

After a workflow reaches **Approved**, downstream business effects are applied:

- **Vacation:** balance is deducted; attendance is updated for the requested days.
- **Excuse:** attendance for the affected hours is adjusted.
- **Remote Work:** attendance status is set to Remote on the affected day.
- **Attendance Correction:** the underlying transaction is updated; the day's attendance is recalculated.
- **Salary Advance / Loan / Allowance Request:** the configured downstream record is created or updated.
- **Resignation:** triggers `ResignationApprovedEvent` → optionally creates Termination → triggers Clearance.
- **Salary Adjustment / Promotion / Transfer:** applied on the effective date.

After **Rejected** or **Cancelled**, no downstream effect occurs. The requester is notified.

## 7.9 Validation Rules

Workflows can run validation rules before they start.

Currently implemented:

- **VacationBalanceRule** — verifies the employee has sufficient leave balance for the requested vacation. Rejects the request submission if the rule fails.

> **Implementation unclear:** other validation rules may be added in future. The framework supports custom rules, but only `VacationBalanceRule` is shipped today.

## 7.10 Workflow Timeouts and Escalation

Each step has a configurable timeout (default per request type — see seeded definitions above). When a step times out, the system can:

- **Escalate** to the next step
- **Auto-Approve**
- **Auto-Reject**
- **Notify only** (default — does nothing automatic)

**Background job:** `WorkflowTimeoutProcessingJob` runs hourly to apply step timeouts.

## 7.11 Fallback Approver

When no eligible approver can be resolved (e.g. the role has no users in the requester's branch scope), the workflow falls back to:

- `WorkflowFallbackApproverRole` — any user with this role, or
- `WorkflowFallbackApproverUserId` — a specific user

## 7.12 Workflow Diagnostics

Operations administrators have access to:

- `GET /api/v1/workflows/validation-rules` — list of registered rules.
- `GET /api/v1/workflows/system-actions` — system-action audit trail.
- `GET /api/v1/workflows/role-assignment-stats` — per-user pending-approval counts (for the role assignment strategy).

## 7.13 Common Workflow Errors

| Error | Cause | Resolution |
|---|---|---|
| `Insufficient balance` | Vacation balance below request | Reduce days or wait for accrual |
| `Workflow stuck — no approver` | Branch / role has no eligible users | Configure fallback approver |
| `Cannot delegate — depth exceeded` | Reached max delegation depth (default 2) | Use Return for Correction or Reject instead |
| `Cannot resubmit — max resubmissions reached` | Default 3 resubmissions exceeded | Submit a new request |
| `Self-approval not allowed` | Approver is the same as requester | Reassign workflow |

`[Screenshot needed: Pending approvals with workflow visualisation]`

---

# 8. Reports and Exports

## 8.1 Available Reports (`/reports/...`)

| Report | Route | Filters | Export |
|---|---|---|---|
| Attendance | `/reports/attendance` | Branch, Department, Employee, Date Range, Status | CSV |
| Leave | `/reports/leaves` | Type, Status, Date, Branch, Employee | CSV |
| Sessions | `/reports/sessions` | User, Date, IP | CSV |
| Audit Logs | `/reports/audit-logs` | Entity, User, Action, Date | CSV |
| Payroll Reports | `/reports/payroll` | Period, Branch, Employee | CSV / PDF |
| Compliance Reports | `/reports/compliance` | Country, Period | CSV / PDF |
| Custom Reports | `/reports/custom-reports` | User-defined | CSV / PDF |

## 8.2 Custom Reports

**Page:** `/reports/custom-reports`

**To create a custom report:**

1. Click **New Report**.
2. Pick the entity (e.g. Vacations, Employees, Payslips).
3. Pick the fields.
4. Define filters.
5. Choose grouping and sorting.
6. Save.

**To schedule a custom report:**

1. Open the saved custom report.
2. Click **Schedule**.
3. Pick frequency (Daily / Weekly / Monthly).
4. Pick recipients (email addresses or specific users).
5. Pick format (CSV / PDF).
6. Save schedule.

The `ScheduledReportExecutionJob` runs hourly and dispatches due reports.

## 8.3 Analytics Dashboards (`/analytics/...`)

| Dashboard | Route |
|---|---|
| Executive | `/analytics` |
| Headcount | `/analytics/headcount` |
| Attrition | `/analytics/attrition` |
| Recruitment Analytics | `/analytics/recruitment` |
| Training Analytics | `/analytics/training` |
| Leave Analytics | `/analytics/leave` |
| Overtime Analytics | `/analytics/overtime` |
| Payroll Analytics | `/analytics/payroll` |
| Engagement Analytics | `/analytics/engagement` |

Backed by daily snapshots from `AnalyticsSnapshotJob` and monthly rollups from `MonthlyAnalyticsRollupJob`.

## 8.4 Report Access Control

| Report | Default audience |
|---|---|
| Attendance / Leave / Audit | HR Admin, Manager (limited to team / branch), SystemAdmin |
| Payroll / Compliance | Payroll Administrator, HR Manager, SystemAdmin |
| Sessions | SystemAdmin only |
| Custom Reports | Per-report grant — creator + explicitly shared users |
| Analytics | HR Admin, SystemAdmin (drill-through scoped) |

---

# 9. Notifications

## 9.1 In-App Notifications (SignalR)

The system uses **SignalR** for real-time in-app notifications. **All 10** notification types are delivered as in-app notifications (the bell icon in the top bar).

| NotificationType | Triggered when |
|---|---|
| **RequestSubmitted** | A request / workflow instance is submitted (vacation, excuse, expense, etc.) |
| **RequestApproved** | A request is fully approved (workflow reaches Approved state) |
| **RequestRejected** | A request is rejected at any step |
| **RequestDelegated** | An approval task is delegated to another user |
| **RequestEscalated** | A request escalates due to timeout or SLA breach |
| **ApprovalPending** | A new approval task is awaiting action (sent to the assigned approver) |
| **DelegationReceived** | An approval task has been delegated to this user |
| **ApprovalReminder** | Reminder for pending approvals (used by background jobs) |
| **Broadcast** | Admin broadcast to multiple recipients (enum present) |
| **SystemAlert** | Operational system alert (e.g. lifecycle automation failure) |

## 9.2 Email Notifications

The system sends emails for **authentication-related events only**:

- Password reset emails
- Email verification
- Two-factor authentication codes (where applicable)

> **Needs confirmation:** business-event email notifications (e.g. vacation approved) are **not** currently sent via email. Recipients see them only in-app via the bell icon.

## 9.3 Notification Recipients

Each notification has explicit recipients depending on the event:

| Event | Recipients |
|---|---|
| Request submitted | The requester (confirmation) and the first-step approvers |
| Approval pending | Each newly-routed approver |
| Request approved | The requester (and possibly their manager) |
| Request rejected | The requester |
| Delegation received | The new approver |
| System alert | Roles in `NotificationRecipientRolesCsv` (default `HRManager,SystemAdmin`) |
| Reminder (background jobs) | Per-job specific (employee, manager, HR) |

## 9.4 Notification Settings

In **Settings → Company Configuration → Notification**:

- **Enable Email Notifications** — master toggle (auth emails always send).
- **Enable SMS Notifications** — master toggle (**Implementation unclear** — SMS provider not configured by default).
- **Notify Manager on Leave Request** — toggle.
- **Notify Employee on Approval** — toggle.
- **Daily Attendance Summary Enabled** — toggle.
- **Notification Recipient Roles CSV** — comma-separated role names.
- **Alert window CSVs** — see Appendix C.

---

# 10. Troubleshooting

## 10.1 Login Issues

| Problem | Resolution |
|---|---|
| `Invalid credentials` | Confirm email and password. Caps Lock off? |
| `Must change password` redirect | Set a new password meeting policy |
| Account locked | Wait the lockout duration; SystemAdmin can unlock from **People → Users** |
| `2FA failed` | Sync device clock; use a backup code; SystemAdmin can disable 2FA |
| Forgot password — no email arriving | Check Junk; SystemAdmin can reset password |

## 10.2 Permission Issues

| Problem | Resolution |
|---|---|
| `403 Forbidden` on action | The role does not grant the required (Resource, Action) — request from SystemAdmin |
| `404 Not Found` on a known record | Branch access excludes the record's branch — request branch-access widening |
| Cannot see menu item | Permission missing — request the appropriate Read/Manage permission |

## 10.3 Validation Errors

| Error | Resolution |
|---|---|
| `Required field` | Fill the field marked with `*` |
| `Invalid date format` | Use the date picker; do not type freeform |
| `Date out of range` | Confirm against the configured planning windows / retroactive limits |
| `Insufficient balance` | Reduce days requested or wait for accrual |
| `Email already exists` | Use a different email |
| `Branch / Department not found` | Confirm the record exists |

## 10.4 Workflow Errors

| Error | Resolution |
|---|---|
| `Workflow stuck` | Check Pending Approvals; delegate if approver is unavailable |
| `Failed routing — no approver` | Configure fallback approver in Company Configuration |
| `Self-approval not allowed` | Workflow needs reassignment |
| `Max resubmissions reached` | Submit a new request |
| `Max delegation depth reached` | Approve, Reject, or Return; cannot delegate further |

## 10.5 Missing Data Issues

| Problem | Resolution |
|---|---|
| Payslip not visible to employee | Period not yet Approved / Marked Paid — wait |
| Vacation balance wrong | Verify entitlement, accrued, used, pending; raise grievance if disputed |
| Employee disappeared from list | Filter to "All" / "Inactive" — record is retained, not deleted |
| Attendance status unexpected | Check Shift Assignment, Public Holidays, weekend definition; use Manual Override |

## 10.6 Integration / Background Job Issues

| Problem | Resolution |
|---|---|
| Job didn't run | Check **Operations → Operational Alerts** for failures |
| Approved request didn't take effect | Check **Operations → Approved Not Executed**; lifecycle automation may be disabled |
| Notifications not arriving | Confirm SignalR connection is not blocked by corporate proxy; refresh |

## 10.7 Suggested Actions

**For end users:**
1. Refresh the page.
2. Try a different browser / Incognito window.
3. Clear browser cache.
4. Switch language and switch back if RTL layout looks off.
5. Contact your manager / HR.

**For administrators:**
1. Check Operational Alerts and Work Queues.
2. Check the audit log for the affected entity.
3. Inspect Company Configuration for unexpected setting changes.
4. Confirm seeded roles and branch access.
5. Escalate to IT if jobs are failing systemically.

---

# 11. Frequently Asked Questions

### Why can't I see my latest payslip?

The payroll period has not yet reached **Approved** / **Paid**. Payslips become visible only after the payroll administrator approves the period. Check back after the announced pay date.

### My vacation balance looks wrong.

Balance = entitlement + accrued + carryover − used − pending. Pending requests are held against your balance. If you believe a transaction is wrong, raise a grievance.

### Can I edit a request after submitting?

- Pending: open and Cancel, then submit a new one.
- Returned for Correction: edit and Resubmit.
- Approved: contact HR.

### Who approves my request?

Open the request after submitting; the **Workflow** tab shows every step, who has acted, and who is currently responsible.

### My manager is on leave — will my request be stuck?

Workflows have configurable timeouts and escalations. After timeout, the task auto-escalates or routes to the fallback approver. Your manager can also configure a standing delegation.

### Can my colleagues see my salary or payslips?

No. Salary and payslip information is visible to you, HR Manager / Payroll Administrator, your manager (limited fields per company configuration), and SystemAdmin. Peers cannot see your compensation.

### How do I file a confidential grievance?

**Self-Service → Services → My Grievances → New Grievance**. Grievances are routed to HR only.

### What happens to my data when I leave?

Your record is **retained** (not deleted) for legal, audit, and re-hire purposes. Portal access is suspended on offboarding.

### Why is the system in the wrong language?

Click the language switcher in the top bar. Your choice persists.

### How do I download all my payslips for the year?

**Pay → My Payslips**, filter by year, and download each PDF. **Implementation unclear:** bulk-download as a single ZIP is not currently provided — request from HR if needed.

### Why don't I see the Approvals area?

You only see Pending Approvals if a workflow has routed a task to you. If you are a manager but the area is missing, you may not be configured as a Branch / Department Manager — ask HR.

### What's the Module Launcher?

The drawer that opens when you click the gradient logo at top-left. **HR** is active. **CRM**, **Sales**, and **Inventory** are placeholders for future modules.

### Are there mobile apps?

No. Both portals work on phone browsers. Add to home screen for one-tap access.

### Where do I configure SMS notifications?

**Settings → Company Configuration → Notification → Enable SMS Notifications**. **Needs confirmation:** an SMS provider must be integrated; this is not configured out of the box.

---

# 12. Glossary

| Term | Definition |
|---|---|
| **2FA** | Two-Factor Authentication using a TOTP authenticator app |
| **Allowance** | A regular pay component beyond base salary (housing, transport, etc.) |
| **Allowance Assignment** | A specific employee × allowance type × period link |
| **Allowance Request** | A workflow-driven request to grant or change an allowance |
| **API** | Application Programming Interface (the backend) |
| **Approver Type** | The kind of approver a workflow step uses (DirectManager, Role, etc.) |
| **Audit Log** | Append-only record of every data mutation |
| **Background Job** | A scheduled task running on the server |
| **Branch** | A physical or organisational sub-unit of the company |
| **Branch Scope / Branch Access** | The set of branches a user is entitled to see |
| **Calendar Policy** | The rule for computing daily rate (CalendarDays, WorkingDays, FixedBasis) |
| **Clearance** | The checklist completed during offboarding |
| **Comp-Off** | Compensatory time off accrued for working on holidays / off-days |
| **Company Configuration** | The singleton settings record |
| **Domain Event** | An in-process event that lifecycle automation listens to |
| **End-of-Service / EOS** | Statutory benefit paid on offboarding |
| **Excuse** | An hour-based exit during a working day |
| **HR** | Human Resources |
| **HRMS** | Human Resource Management System |
| **JWT** | JSON Web Token (used for authentication) |
| **Lifecycle Automation** | Automatic actions on lifecycle events (offer accepted, etc.) |
| **Module Launcher** | The drawer listing ERP modules (HR active; CRM/Sales/Inventory placeholder) |
| **Onboarding Process** | Per-employee instance of an Onboarding Template |
| **PIP** | Performance Improvement Plan |
| **Pre-Hire** | Employee state after offer acceptance, before onboarding completes |
| **Resource** | A permission resource (Employee, Vacation, etc.) |
| **Role** | A named set of permission grants |
| **Role Assignment Strategy** | How a Role-typed approver is picked among eligible users |
| **Run Audit** | Append-only trail of every payroll-period action |
| **Salary Adjustment** | The audit record for a base-salary change |
| **Self-Service Portal** | The employee-facing application |
| **SignalR** | The real-time messaging technology used for in-app notifications |
| **Suspended** | The employee state during offboarding (data retained, portal disabled) |
| **System Administrator** | The superuser role with full cross-company access |
| **Timesheet** | Per-period log of hours worked on projects |
| **TOTP** | Time-based One-Time Password (used in 2FA) |
| **Workflow Definition** | A configured approval chain for a request type |
| **Workflow Instance** | A single in-flight request following a workflow definition |

---

# 13. Appendix

## Appendix A — Initial / Seeded Login Credentials

> **Security:** these credentials are seeded for first-time setup and sample data. **Change passwords on go-live and disable any sample accounts not needed in production.**

### A.1 System administrator accounts

| Email | Password | Role |
|---|---|---|
| `systemadmin@system.local` | `TempP@ssw0rd123!` | SystemAdmin |
| `tecaxleadmin@system.local` | `TempP@ssw0rd123!` | SystemAdmin |

### A.2 Sample employees (loaded by `RunSampleData` tool)

All sample employees share password **`Emp@123!`** with **Must Change Password** flagged.

**Branch Managers:**

| Email | Name | Branch |
|---|---|---|
| `ahmed.rashid@company.com` | Ahmed Al-Rashid | HQ Riyadh |
| `khalid.otaibi@company.com` | Khalid Al-Otaibi | Jeddah |
| `mohammed.qahtani@company.com` | Mohammed Al-Qahtani | Dammam |
| `salma.khaldi@company.com` | Salma Al-Khaldi | Madinah |
| `fahad.harbi@company.com` | Fahad Al-Harbi | Makkah |

**Sample Department Managers (HQ Riyadh):**

| Email | Name | Department |
|---|---|---|
| `sara.fahad@company.com` | Sara Al-Fahad | HR |
| `omar.nasser@company.com` | Omar Al-Nasser | IT |
| `fatima.zahrani@company.com` | Fatima Al-Zahrani | Finance |
| `youssef.shamrani@company.com` | Youssef Al-Shamrani | Operations |

**Regular employees:** pattern `{firstname}.{lastname}@company.com`, password `Emp@123!`.

## Appendix B — Screens / Routes List

### Admin Portal (https://hrms.tecaxle.com/)

**Dashboard:**
- `/dashboard`

**People — Organisation:**
- `/users`
- `/employees`
- `/roles`
- `/branches`
- `/departments`

**People — HR Lifecycle:**
- `/employee-contracts`
- `/employee-transfers`
- `/employee-promotions`
- `/salary-adjustments`
- `/allowances`
- `/allowance-requests`
- `/job-grades`
- `/recruitment/requisitions`
- `/recruitment/postings`
- `/recruitment/candidates`
- `/recruitment/applications`
- `/recruitment/offers`
- `/recruitment/interviews`
- `/onboarding/templates`
- `/onboarding/processes`
- `/onboarding/dashboard`
- `/offboarding/resignations`
- `/offboarding/terminations`
- `/offboarding/pending-clearance`
- `/offboarding/final-settlements`

**People — Workplace:**
- `/documents/categories`
- `/documents/employee-documents`
- `/documents/company-policies`
- `/documents/letter-templates`
- `/documents/letter-requests`
- `/announcements/categories`
- `/announcements`
- `/assets`
- `/assets/categories`
- `/assets/assignments`
- `/assets/maintenance`
- `/employee-relations/grievances`
- `/employee-relations/disciplinary-actions`
- `/employee-relations/investigations`
- `/employee-relations/counseling`
- `/surveys/templates`
- `/surveys/distributions`
- `/expenses/categories`
- `/expenses/policies`
- `/expenses/claims`
- `/loans/types`
- `/loans/policies`
- `/loans/applications`
- `/loans/salary-advances`

**Workforce:**
- `/shifts`
- `/shifts/assign`
- `/attendance`
- `/attendance/daily`
- `/attendance/monthly-report`
- `/attendance/shift-swaps`
- `/attendance/on-call`
- `/employee-vacations`
- `/employee-excuses`
- `/leave-management/compensatory-offs`
- `/leave-management/leave-encashments`
- `/remote-work`
- `/performance/cycles`
- `/performance/reviews`
- `/performance/goals`
- `/performance/competencies`
- `/performance/pips`
- `/performance/feedback-requests`
- `/training/categories`
- `/training/courses`
- `/training/programs`
- `/training/sessions`
- `/training/enrollments`
- `/training/certifications`
- `/training/budgets`
- `/succession/key-positions`
- `/succession/talent-profiles`
- `/succession/plans`
- `/succession/career-paths`
- `/succession/talent-pool`

**Payroll:**
- `/payroll/salary-structures`
- `/payroll/periods`
- `/payroll/settings`
- `/benefits/plans`
- `/benefits/enrollment-periods`
- `/benefits/enrollments`
- `/benefits/claims`

**Operations:**
- `/approvals`
- `/approvals/history`
- `/ops-dashboard`
- `/operational-alerts`
- `/approved-not-executed`
- `/global-search`
- `/work-queues/overdue-approvals`
- `/work-queues/overdue-onboarding-tasks`
- `/work-queues/overdue-clearance-items`
- `/work-queues/unresolved-alerts`
- `/work-queues/auto-checkout-review`
- `/work-queues/pip-follow-through`
- `/reports/attendance`
- `/reports/leaves`
- `/reports/sessions`
- `/reports/audit-logs`
- `/reports/payroll`
- `/reports/compliance`
- `/reports/custom-reports`
- `/analytics`
- `/analytics/headcount`
- `/analytics/attrition`
- `/analytics/recruitment`
- `/analytics/training`
- `/analytics/leave`
- `/analytics/overtime`
- `/analytics/payroll`
- `/analytics/engagement`
- `/timesheets/projects`
- `/timesheets/periods`
- `/timesheets/timesheets`
- `/settings`
- `/settings/company-config`
- `/settings/overtime`
- `/settings/public-holidays`
- `/vacation-types`
- `/settings/excuse-policies`
- `/settings/remote-work-policy`
- `/settings/workflows`
- `/settings/leave-entitlements`
- `/settings/allowance-types`
- `/settings/allowance-policies`

### Self-Service Portal (https://hrmsportal.tecaxle.com/)

**Me:**
- `/dashboard`
- `/my-profile`
- `/my-attendance`
- `/attendance-corrections`
- `/shift-swap-requests`
- `/my-on-call`
- `/my-timesheets`
- `/vacation-requests`
- `/excuse-requests`
- `/remote-work-requests`
- `/my-compensatory-offs`
- `/my-leave-encashments`

**Pay:**
- `/my-payslips`
- `/my-salary`
- `/my-allowances`
- `/my-benefits`

**Services:**
- `/my-resignation`
- `/my-documents`
- `/my-letters`
- `/my-expenses`
- `/my-loans`
- `/my-assets`
- `/my-grievances`
- `/my-disciplinary`
- `/my-training`
- `/training-catalog`
- `/my-certifications`
- `/my-career`
- `/announcements`
- `/my-surveys`

**Approvals:**
- `/pending-approvals`
- `/manager-dashboard` (managers only)
- `/team-members` (managers only)

## Appendix C — Status Lifecycle Tables

### Payroll Period

```
Draft → Processing → Processed → Approved → Paid (locked)
                        ↑                       ↓
                        └─ Recalculate          └─ Admin Unlock (with reason)
                                                     ↓
                                               (back to Approved)
                                                     ↑
              Cancelled ← Draft / Processing
```

### Workflow Instance

```
Pending → InProgress → Approved
                    ↘ Rejected
                    ↘ ReturnedForCorrection → Resubmitted (back to Pending)
                    ↘ Cancelled
                    ↘ Expired
                    ↘ FailedRouting (terminal — fallback approver)
```

### Vacation / Excuse / Remote Work

```
Pending → Approved | Rejected | Cancelled
        ↘ ReturnedForCorrection → Resubmitted → Pending
```

### Onboarding Process

```
NotStarted → InProgress → Completed
                       ↘ OnHold → InProgress
                       ↘ Cancelled
```

### Application (Recruitment)

```
New → Screening → ShortListed → InterviewScheduled → Interviewing → OfferPending → OfferExtended → OfferAccepted → Hired
                                                                                                ↘ OfferDeclined
                                                                                                ↘ Withdrawn
       ↘ Rejected (any stage)
```

### Final Settlement

```
Draft → Calculated → PendingApproval → Approved → Paid
                                                ↘ Cancelled
```

### Loan Application

```
Draft → Pending → Approved → Active → FullyPaid
                ↘ Rejected
                ↘ Cancelled
                ↘ DefaultedPayment
```

### Expense Claim

```
Draft → Submitted → PendingApproval → Approved → Reimbursed | PartiallyReimbursed
                                    ↘ Rejected
                                    ↘ Cancelled
```

### Asset

```
Available → Assigned → Returned (back to Available) | Lost | Damaged
         ↘ InMaintenance → Available
         ↘ Retired
         ↘ Disposed
```

## Appendix D — Role / Permission Matrix (sample)

| Resource × Action | SystemAdmin | Admin | Manager | Employee |
|---|---|---|---|---|
| Employee, Read | Y | Y | Team only | Self only |
| Employee, Create | Y | Y | — | — |
| Employee, Update | Y | Y | — | Self profile (subject to approval) |
| Vacation, Approve | Y | Y | Team requests | — |
| Vacation, Create | Y | Y | Y | Self only |
| Payroll, Process | Y | Y | — | — |
| Payroll, Approve | Y | Y | — | — |
| Settings, Configure | Y | (depends) | — | — |
| User, Manage | Y | (depends) | — | — |
| Role, Manage | Y | — | — | — |
| Permission, Manage | Y | — | — | — |
| System, Configure | Y | — | — | — |
| Audit, Access | Y | (depends) | — | — |

`Y` = full access. The Manager and Employee roles are **editable** — HR adjusts the matrix to fit company policy.

## Appendix E — Configuration Reference (Company Settings)

The system has **85** company-configuration settings, grouped as follows.

### General (6)
- FiscalYearStartMonth
- WeekStartDay
- DateFormat
- TimeFormat
- NumberFormat
- DefaultTimeZoneId

### Attendance (7)
- AttendanceDuplicateSuppressionSeconds
- EnableBiometricAttendance
- EnableManualAttendance
- LateGracePeriodMinutes
- EarlyLeaveGracePeriodMinutes
- TrackBreakTime
- MinimumWorkingHoursForPresent

### Leave (6)
- AllowNegativeLeaveBalance
- RequireAttachmentForSickLeave
- MinDaysBeforeLeaveRequest
- AllowHalfDayLeave
- AllowLeaveEncashment
- LeaveYearStart

### Payroll (4)
- PayrollCutOffDay
- PayrollCurrency
- EnableEndOfServiceCalc
- SalaryCalculationBasis

### Approval (6)
- AutoApproveAfterTimeout
- DefaultApprovalTimeoutHours
- AllowSelfApproval
- RequireApprovalComments
- WorkflowFallbackApproverRole
- WorkflowFallbackApproverUserId

### Notification (7)
- EnableEmailNotifications
- EnableSmsNotifications
- NotifyManagerOnLeaveRequest
- NotifyEmployeeOnApproval
- DailyAttendanceSummaryEnabled
- NotificationRecipientRolesCsv
- (plus alert window CSVs — see below)

### Security (7)
- PasswordExpiryDays
- MaxLoginAttempts
- SessionTimeoutMinutes
- Require2FA
- PasswordHistoryCount
- PasswordMinLength
- LoginLockoutPolicyJson

### Lifecycle Automation (15)
- LifecycleAutomationEnabled (master kill-switch)
- AutoCreateOnboardingOnOfferAcceptance
- DefaultOnboardingTemplateId
- CreateEmployeeInactiveAtOfferAcceptance
- AutoActivateEmployeeOnOnboardingComplete
- OnboardingCompletionRequiresAllRequiredTasks
- OnboardingCompletionRequiresAllRequiredDocuments
- AutoCreateTerminationOnResignationApproved
- AutoCreateClearanceOnTermination
- DefaultClearanceTemplateId
- AutoSuspendEmployeeOnTerminationCreated
- RequireClearanceCompleteBeforeFinalSettlement
- AutoEnableFinalSettlementCalcOnClearanceComplete
- AutoDeactivateEmployeeOnFinalSettlementPaid
- ContractExpiredAction (NotifyOnly / AutoMarkExpired / Suspend / Deactivate)

### Validation / Limits (10)
- MaxUploadSizeMb
- MaxVacationDaysPerRequest
- MaxVacationFuturePlanningYears
- MaxShiftGracePeriodMinutes
- ExcuseBackwardWindowDays
- ExcuseForwardWindowDays
- OvertimeConfigMaxFutureDays
- AttendanceCorrectionMaxRetroactiveDays
- MaxWorkflowDelegationDepth (default 2)
- MaxWorkflowResubmissions (default 3)

### Alert / Reminder Windows (12)
- ContractExpiryAlertDaysCsv (default `30,15,7`)
- VisaExpiryAlertDaysCsv (default `90,60,30,15,7`)
- ReviewReminderDaysCsv
- LoanRepaymentReminderDays
- FrozenWorkflowCleanupDays
- DocumentExpiryAlertDaysCsv
- AssetWarrantyExpiryAlertDaysCsv
- AssetOverdueReturnAlertDaysCsv
- TrainingSessionReminderDaysCsv
- SuccessionPlanReminderDaysCsv
- TimesheetSubmissionReminderDaysBefore
- GrievanceSlaAlertDaysCsv

### Default Values (1)
- DefaultProbationDays

## Appendix F — Module → Controller Mapping

The full controller list comprises **139** files. A condensed mapping of module to primary controller(s):

| Module | Primary controller(s) |
|---|---|
| Authentication | AuthController |
| Users | UsersController |
| Employees | EmployeesController, EmployeeDetailsController |
| Roles & Permissions | RolesController, PermissionsController |
| Branches & Departments | BranchesController, DepartmentsController |
| Shifts | ShiftsController, ShiftAssignmentsController, ShiftSwapRequestsController, OnCallSchedulesController |
| Attendance | AttendanceController, AttendanceCorrectionRequestsController |
| Vacations | EmployeeVacationsController, VacationTypesController, LeaveBalancesController |
| Excuses | EmployeeExcusesController, ExcusePoliciesController |
| Remote Work | RemoteWorkRequestsController, RemoteWorkPoliciesController |
| Compensatory Off / Encashment | CompensatoryOffsController, LeaveEncashmentsController |
| Public Holidays | PublicHolidaysController |
| Contracts | EmployeeContractsController |
| Transfers / Promotions | EmployeeTransfersController, EmployeePromotionsController |
| Salary Adjustments / Salary Structures | SalaryAdjustmentsController, SalaryStructuresController, EmployeeSalariesController |
| Allowances | AllowanceTypesController, AllowancePoliciesController, AllowanceAssignmentsController, AllowanceRequestsController |
| Job Grades | JobGradesController |
| Recruitment | JobRequisitionsController, JobPostingsController, CandidatesController, JobApplicationsController, InterviewSchedulesController, InterviewFeedbacksController, OfferLettersController |
| Onboarding | OnboardingTemplatesController, OnboardingProcessesController, OnboardingTasksController |
| Offboarding | ResignationRequestsController, TerminationsController, ClearanceController, FinalSettlementsController, EndOfServiceController, ExitInterviewsController, EndOfServicePoliciesController |
| Payroll | PayrollPeriodsController, PayrollSettingsController, OvertimeConfigurationController |
| Benefits | BenefitPlansController, BenefitEnrollmentsController, BenefitClaimsController, OpenEnrollmentPeriodsController |
| Documents | DocumentCategoriesController, EmployeeDocumentsController, CompanyPoliciesController, LetterTemplatesController, LetterRequestsController |
| Announcements | AnnouncementCategoriesController, AnnouncementsController |
| Assets | AssetCategoriesController, AssetsController, AssetAssignmentsController, AssetMaintenanceController |
| Employee Relations | GrievancesController, DisciplinaryActionsController, InvestigationsController, CounselingRecordsController |
| Surveys | SurveyTemplatesController, SurveyDistributionsController, SurveyResponsesController |
| Expenses | ExpenseCategoriesController, ExpensePoliciesController, ExpenseClaimsController |
| Loans | LoanTypesController, LoanPoliciesController, LoanApplicationsController, SalaryAdvancesController |
| Performance | PerformanceReviewCyclesController, PerformanceReviewsController, GoalDefinitionsController, CompetencyFrameworksController, PerformanceImprovementPlansController, FeedbackRequestsController |
| Training | TrainingCategoriesController, TrainingCoursesController, TrainingProgramsController, TrainingSessionsController, TrainingEnrollmentsController, TrainingEvaluationsController, TrainingAttendanceController, EmployeeCertificationsController, TrainingBudgetsController |
| Succession | KeyPositionsController, TalentProfilesController, SuccessionPlansController, CareerPathsController |
| Timesheets | ProjectsController, ProjectTasksController, TimesheetPeriodsController, TimesheetsController |
| Approvals & Workflows | ApprovalsController, ApprovalExecutionController, WorkflowsController |
| Operations | OpsDashboardController, OperationalAlertsController, GlobalSearchController, LifecycleAutomationController |
| Reports & Analytics | ReportsController, AnalyticsController, CustomReportsController, SavedDashboardsController, AuditLogsController, SessionsController |
| Notifications | NotificationsController |
| Self-Service | PortalController |
| Files | FilesController |
| Configuration | CompanyConfigurationController |

## Appendix G — Domain Events (Lifecycle Automation)

The system raises **7** domain events powering lifecycle automation:

| Event | Triggered when | Default downstream action |
|---|---|---|
| **OfferAcceptedEvent** | Offer letter accepted by candidate | Create pre-hire Employee + start Onboarding Process |
| **OnboardingCompletedEvent** | All required onboarding tasks complete | Stamp milestone; activate employee (if auto-activate is on) |
| **ResignationApprovedEvent** | Resignation Request approved | Create Termination record (if auto-create is on) |
| **TerminationCreatedEvent** | Termination record created | Create Clearance Checklist + suspend employee (if auto-suspend is on) |
| **ClearanceCompletedEvent** | Clearance checklist complete | Enable Final Settlement (if gated) |
| **FinalSettlementPaidEvent** | Final Settlement marked Paid | Deactivate employee (if auto-deactivate is on) |
| **ContractExpiredEvent** | `ContractExpiryAlertJob` finds an expired contract | Action per `ContractExpiredAction` setting |

Every automation attempt is recorded in the lifecycle audit log with a `LifecycleAutomationStatus`: `Succeeded`, `Skipped`, `Failed`, `DuplicateSuppressed`, `Disabled`, `MissingPrerequisite`.

## Appendix H — Companion Manuals

This document is the master User Manual. Two role-targeted manuals also exist:

- **`ADMIN_USER_MANUAL.md`** — focused, user-friendly walkthrough for HR / payroll / IT / managers using the admin portal.
- **`SELF_SERVICE_USER_MANUAL.md`** — focused, user-friendly walkthrough for regular employees and team managers using the self-service portal.

---

**Document version:** v14.9
**Last updated:** 2026-04-26
**Owner:** TecAxle HRMS — HR Operations
