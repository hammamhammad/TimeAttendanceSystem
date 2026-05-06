# TecAxle HRMS — Administrator User Manual

**Audience:** HR administrators, system administrators, payroll administrators, recruiters, branch and department managers, operations staff

| Application | URL |
|---|---|
| **Admin Portal** (this manual) | https://hrms.tecaxle.com/ |
| Self-Service Portal (employees) | https://hrmsportal.tecaxle.com/ |

---

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Initial / Sample Login Credentials](#2-initial--sample-login-credentials)
3. [Navigating the Admin Portal](#3-navigating-the-admin-portal)
4. [Dashboard](#4-dashboard)
5. [People Area](#5-people-area)
   - 5.1 Organization
   - 5.2 HR & Lifecycle
   - 5.3 Workplace
6. [Workforce Area](#6-workforce-area)
   - 6.1 Time & Attendance
   - 6.2 Leave & Absence
   - 6.3 Performance & Growth
7. [Payroll Area](#7-payroll-area)
8. [Operations Area](#8-operations-area)
9. [Common Administrator Workflows](#9-common-administrator-workflows)
10. [Lifecycle Automation Reference](#10-lifecycle-automation-reference)
11. [Roles & Permissions](#11-roles--permissions)
12. [Status Reference](#12-status-reference)
13. [Keyboard Shortcuts & Productivity Tips](#13-keyboard-shortcuts--productivity-tips)
14. [Troubleshooting](#14-troubleshooting)
15. [Glossary](#15-glossary)

---

## 1. Getting Started

### 1.1 Browser requirements

The admin portal works in:

- **Google Chrome** (recommended) version 110 or later
- **Microsoft Edge** version 110 or later
- **Mozilla Firefox** version 110 or later
- **Apple Safari** version 16 or later

JavaScript and cookies must be enabled. If pop-up blockers prevent letter PDFs from downloading, allow the portal domain.

### 1.2 Signing in

1. Open https://hrms.tecaxle.com/ in your browser.
2. Enter your **email address** and **password**.
3. Click **Login**.

### 1.3 First-time login (forced password change)

If your account was created by an administrator or migrated from a temporary state, you will be redirected to a **Change Password** screen on first sign-in.

1. Enter your temporary password.
2. Choose a new password meeting the company password policy. Defaults are typically:
   - Minimum 8–12 characters
   - At least one uppercase letter, one digit, and one special character
   - Cannot match any of your last few passwords
3. Confirm and save. You are signed in immediately.

### 1.4 Two-factor authentication

If 2FA is enabled on your account:

1. After entering your password you are asked for a 6-digit code.
2. Open your authenticator app (Google Authenticator, Microsoft Authenticator, Authy, 1Password) and enter the current code.
3. If you have lost your authenticator device, click **Use a backup code** and enter one of the backup codes you saved at enrolment. Each backup code is single-use.

To enable 2FA on your own account, go to your avatar → **Security** → **Enable 2FA** and scan the QR code.

### 1.5 Lockout policy

After several failed sign-in attempts the account is locked for a configured duration (default 15 minutes). Successful sign-in resets the counter. A system administrator can unlock an account immediately from **People → Users**.

### 1.6 Switching language

Use the language dropdown in the top bar (top-right) to toggle between **English** and **العربية (Arabic)**. The interface fully mirrors for right-to-left in Arabic mode.

### 1.7 Signing out

Click your avatar (top-right) → **Sign out**. You return to the login screen. To force sign-out from another device, use **Operations → Reports → Sessions** → **Revoke**.

---

## 2. Initial / Sample Login Credentials

> **Important.** These are the credentials seeded when the system is first set up or when sample data is loaded. **All initial credentials must be changed on go-live**, and HR should disable any sample accounts that are not needed in production.

### 2.1 System administrator accounts (admin portal)

| Role | Email | Password | Notes |
|---|---|---|---|
| System Administrator | `systemadmin@system.local` | `TempP@ssw0rd123!` | Primary system superuser |
| System Administrator | `tecaxleadmin@system.local` | `TempP@ssw0rd123!` | Secondary system superuser |

Both accounts have the System Administrator role and full access to every branch.

**On first sign-in:** change the password immediately. Rotation every 90 days is recommended.

### 2.2 Sample employee accounts (use the self-service portal)

When sample data is loaded, the system seeds 50 employees across 5 branches and 20 departments. All sample employees share the password **`Emp@123!`** and are flagged **Must Change Password**.

#### Branch Managers (1 per branch)

| Email | Name | Branch |
|---|---|---|
| `ahmed.rashid@company.com` | Ahmed Al-Rashid | HQ Riyadh |
| `khalid.otaibi@company.com` | Khalid Al-Otaibi | Jeddah |
| `mohammed.qahtani@company.com` | Mohammed Al-Qahtani | Dammam |
| `salma.khaldi@company.com` | Salma Al-Khaldi | Madinah |
| `fahad.harbi@company.com` | Fahad Al-Harbi | Makkah |

Each Branch Manager has the Manager role, is assigned as the manager of their branch, and is scoped to that branch only.

#### Department Managers — HQ Riyadh sample

| Email | Name | Department |
|---|---|---|
| `sara.fahad@company.com` | Sara Al-Fahad | HR |
| `omar.nasser@company.com` | Omar Al-Nasser | IT |
| `fatima.zahrani@company.com` | Fatima Al-Zahrani | Finance |
| `youssef.shamrani@company.com` | Youssef Al-Shamrani | Operations |

Sample data also seeds 4 Department Managers per branch (20 total). Each has the Manager role and is assigned as the manager of their department.

#### Regular employees

The remaining 25 sample employees follow the email pattern `{firstname}.{lastname}@company.com` with password `Emp@123!`. They have the Employee role and access only the self-service portal.

#### Sample data summary

| Item | Count |
|---|---|
| Branches | 5 (HQ Riyadh, Jeddah, Dammam, Madinah, Makkah) |
| Departments | 20 (4 per branch) |
| Branch Managers | 5 |
| Department Managers | 20 |
| Regular Employees | 25 |
| **Total** | **50 employees + 2 system administrators** |

### 2.3 Removing or disabling sample accounts in production

When transitioning from a test environment to production:

1. Sign in as a system administrator.
2. **People → Users** → filter by email domain `@company.com`.
3. For each sample account, either:
   - **Deactivate** it (recommended — disables login but keeps audit trail), or
   - **Delete** it (only if no business data references the user)
4. Reset both system administrator passwords to strong, organisation-specific passwords.
5. Enable 2FA on every system administrator account.
6. Document the new credentials in your organisation's password manager.

### 2.4 Login pattern reference

```
Admin Portal:        https://hrms.tecaxle.com/
Self-Service Portal: https://hrmsportal.tecaxle.com/

System administrators: {alias}@system.local / TempP@ssw0rd123!
Sample staff:          {first}.{last}@company.com / Emp@123! (forced change)
```

---

## 3. Navigating the Admin Portal

The portal is built on a four-zone shell:

| Zone | Purpose |
|---|---|
| **Logo strip** (top-left) | Click the gradient grid logo to open the **Module Launcher** |
| **Sidebar** (left) | Menu groups and items belonging to the active *Area* |
| **Top bar** (top) | Breadcrumb, search, notifications, language switcher, your avatar |
| **Main content** | Pages, lists, forms, dashboards |

### 3.1 Areas (top-level grouping)

The sidebar shows **one area at a time**. Use the **Area Switcher** at the bottom of the sidebar to choose:

| Area | Covers |
|---|---|
| **Dashboard** | Landing page and KPIs |
| **People** | Users, employees, roles, branches, departments, lifecycle, workplace services |
| **Workforce** | Time, attendance, shifts, leave, performance, training, succession |
| **Payroll** | Salary structures, payroll periods, end-of-service policies, benefits |
| **Operations** | Approvals, work queues, reports, analytics, timesheets, settings |

Navigating to any link automatically switches to the area that owns it. Your last-used area is remembered between sessions.

### 3.2 Module Launcher

Click the gradient logo at the top-left. A drawer slides in listing every ERP module:

- **HR** — *active* (TecAxle HRMS — what this manual covers)
- **CRM** — placeholder, coming soon
- **Sales** — placeholder, coming soon
- **Inventory** — placeholder, coming soon

Click outside the drawer or press **Escape** to dismiss.

### 3.3 Sidebar

- 180 pixels wide expanded; 56 pixels collapsed.
- Click the toggle at the top of the sidebar body to collapse / expand. Your preference persists.
- Active item is highlighted in indigo with a 3-pixel accent bar.
- Long item text wraps onto a second line — labels are not cut off.

### 3.4 Top bar

- **Breadcrumb** (left): shows the current location based on the page hierarchy. Click any segment to jump to that level.
- **Search** (magnifier icon): click or press **Ctrl + K**. A search popover opens. Type a query, press **Enter** — the system searches across employees, branches, departments, requests, payroll periods, documents, candidates, and more, then routes you to the Global Search page.
- **Notifications** (bell icon): real-time count of unread items. Click to open the panel; click any item to navigate to the related record.
- **Language switcher**: English ↔ العربية.
- **Avatar menu**: profile, security, sign out.

### 3.5 Tables and lists

Most pages show data in a consistent table:

- **Search bar** at the top filters by name or main identifier.
- **Filter chips** open advanced filters (date range, status, branch, etc.).
- **Sort** by clicking column headers.
- **Pagination** at the bottom (10 / 25 / 50 / 100 rows per page).
- **Row actions** (kebab `⋮` menu) for view / edit / delete / approve / reject — visible based on your permissions and the row's status.
- **Bulk actions** appear at the top when rows are selected via the row checkbox.
- **Add / Create** button on the filter bar opens the create form.
- **Export** action exports the filtered list to CSV.

### 3.6 Forms

All create and edit forms use the modern form design:

- Labels above inputs.
- Inline validation on blur and on submit.
- Required fields marked with `*`.
- A sticky footer with **Cancel** and **Save** (or **Submit**).
- Date pickers, time pickers, searchable dropdowns, and an interactive map for branch GPS.

### 3.7 View pages

Detail pages use the modern view design:

- Card-based layout.
- Definition lists for label-value pairs.
- Status badges (colour-coded — green Approved, amber Pending, red Rejected, blue In-Progress).
- Action buttons in the page header.
- Tabs for sub-sections (e.g. Employee detail has Personal / Education / Work Experience / Bank / Visa / Dependents / Emergency Contacts / Documents / Audit).

---

## 4. Dashboard

**Area:** Dashboard

Your landing page after sign-in. The dashboard surfaces real-time operational KPIs:

### 4.1 Organisation snapshot

- Total active employees
- Total branches
- Total departments
- Pre-Hire count (offer accepted, onboarding not yet complete)
- Suspended count (offboarding in progress)

### 4.2 Attendance today

- Present
- Absent
- On Leave
- Late
- On Remote Work
- On Holiday (where applicable)

Click any tile to drill into the corresponding list filtered to today.

### 4.3 Pending approvals

A summary of open approval tasks across the company. Drill-through opens **Operations → Pending Approvals**.

### 4.4 Recent activity

The last 10–20 system events (request submitted, approved, employee onboarded, payroll processed, etc.) with a link to each record.

### 4.5 Open work queues

A summary of outstanding items:

- Overdue approvals
- Overdue onboarding tasks
- Overdue clearance items
- Unresolved alerts
- Auto-checkout review items
- PIP follow-through items

### 4.6 Quick actions

Shortcut buttons for the most-used create forms — typically **Add Employee**, **Process Payroll**, **Create Shift Assignment**, depending on your role.

The dashboard refreshes automatically. KPIs are scoped to your branch access (system administrators see everything).

---

## 5. People Area

The **People** area covers everyone who works for the company — their accounts, master records, organisational position, and lifecycle from hire to exit.

### 5.1 Organization

#### Users

Login accounts for staff who use the portals. Each user can be linked to an Employee record.

**Columns:** Email, Display Name, Linked Employee, Roles, Branch Access, Active, Last Login.

**Actions:**

| Action | Effect |
|---|---|
| **Add User** | Create a new user; optionally link to an existing Employee |
| **Edit** | Change roles, branch access, status |
| **Activate / Deactivate** | Toggle login access |
| **Force Password Change** | User is forced to change at next sign-in |
| **Reset Password** | Generates a new temporary password |
| **Unlock Account** | Clears the failed-attempts counter |
| **Manage Roles** | Assign one or more roles |
| **Manage Branch Access** | Pick branches the user can see |

**Best practice:** every operational user must have a role (drives permissions) and branch access (drives data visibility). Avoid assigning System Administrator unless the user truly needs full cross-company access.

#### Employees

The master record for every person employed by the company. **The employee record is the single source of truth** — every contract, salary, allowance, vacation, payslip — every personal record links back to this row.

**Columns:** Employee Code, Name, Email, Branch, Department, Job Title, Hire Date, Status (Active / Suspended / Inactive / Pre-Hire), Has Portal Access.

**Tabs (employee detail page):**

| Tab | Holds |
|---|---|
| **Personal** | Name (English + Arabic), photo, gender, marital status, nationality, religion, date of birth, ID and passport numbers |
| **Contact** | Email, mobile, work phone, current and permanent addresses |
| **Employment** | Branch, department, job title, hire date, contract type, probation status, line manager |
| **Lifecycle** | Active / Suspended / Pre-Hire flags, milestone timestamps |
| **Compensation** | Current base salary, salary history, current allowances, bank details |
| **Education** | Multiple education records |
| **Work Experience** | Prior employment with start/end dates |
| **Visas** | Country, type, number, issue / expiry — with expiry alerts |
| **Dependents** | Spouse, children, parents — each with relation, name, ID, DOB |
| **Emergency Contacts** | Multiple contacts with phone |
| **Documents** | Per-employee uploads (passport, contract, certifications) |
| **Profile Changes** | Pending changes the employee submitted from the self-service portal |
| **Audit** | Field-level before-and-after for every change |

**Common actions:** Add Employee, Edit, Suspend, Activate / Deactivate, View Audit, Create User (provision login), Send Welcome Email.

#### Roles

Define role names and their permission grants.

**Built-in roles:**

| Role | Access |
|---|---|
| **System Administrator** | Full — every page, every action, all branches |
| **HR Manager** | All HR data, payroll, settings |
| **HR Specialist** | HR data and lifecycle, no payroll approval |
| **Payroll Administrator** | Payroll, compensation, end-of-service |
| **Manager** | Branch / department manager — reads team data, approves team requests |
| **Employee** | Self-service portal only |

**Custom roles:** click **Add Role**, give it an English and Arabic name, and check the resource / action boxes you want to grant. Saved roles appear immediately in the user-assignment dropdown.

System Administrator cannot be edited or deleted.

#### Branches

Multi-branch organisation support.

**Each branch has:**
- Code, English name, Arabic name
- Address, contact phone, contact email
- **GPS coordinates and geofence radius** — set on an interactive map. Retained as branch metadata for the map picker.
- **Branch Manager** — used by workflows that route approvals to the branch manager.

**Map picker:** click anywhere on the map to set the branch location, or type an address into the search box. Drag the marker to fine-tune. The geofence radius is shown as a circle.

#### Departments

Hierarchical departments — a tree of parent → children.

**Each department has:**
- Code, English name, Arabic name
- Parent department (optional)
- **Department Manager** — used by workflows tagged "Department Head" or "Manager"

**Tree view:** the list page shows the hierarchy as a tree. Drag a department onto another to re-parent it.

### 5.2 HR & Lifecycle

This group bundles four sub-modules: HR Management, Recruitment, Onboarding, and Offboarding.

#### HR Management

##### Contracts

Employment contracts per employee.

**Columns:** Employee, Contract Type (Probation / Fixed-Term / Indefinite / Internship / Project), Start Date, End Date, Status (Active / Expired / Renewed / Terminated), Probation Period.

The system notifies HR before each contract expires (default 30, 15, and 7 days before). The action taken when a contract expires is configurable in **Company Configuration → Lifecycle**:

| Action | Behaviour |
|---|---|
| **Notify Only** *(default)* | Send notifications to HR; no automated change |
| **Auto-Mark Expired** | Set status to Expired; employee remains active |
| **Suspend** | Suspend the employee; portal disabled |
| **Deactivate** | Fully deactivate the employee |

##### Transfers

Audit trail for branch / department transfers. Each transfer has employee, from / to, effective date, reason, and an approval workflow. Approving a transfer updates the employee's branch and department on the effective date; the prior assignment is preserved in the audit trail.

##### Promotions

Audit trail for rank / role promotions. Each promotion has employee, from / to job title or grade, effective date, reason, and an optional salary increase (which creates a corresponding salary adjustment).

##### Salary Adjustments

Audit trail for any change to base salary.

> **Always create a salary adjustment, never edit the salary directly.** The payroll engine resolves salaries by effective date — a direct edit would not be applied to the period that overlapped the change date.

Each adjustment has employee, old salary → new salary, effective date, reason (Promotion / Annual Review / Cost-of-Living / Performance / Other), and an approval workflow.

##### Allowances

Active allowance assignments per employee. Each row represents an active assignment with employee, allowance type, amount or percentage, effective dates, and status. The current assignment for any employee × type pair is the latest record covering today.

##### Allowance Requests

Workflow-driven flow when an employee or manager requests a new allowance. On approval, an allowance assignment is created with the requested effective date and surfaces in the employee's payroll automatically from the next period.

##### Job Grades

Define grade bands with salary ranges:
- Code (e.g. G1, G2, G3) and bilingual name
- Description
- Salary minimum / maximum
- Optional midpoint and market percentile

Used in compensation planning and Career Paths.

#### Recruitment

**Pipeline:** Job Requisition → Job Posting → Candidate → Application → Interview → Offer Letter → Hire.

##### Job Requisitions

Internal request to open a position.

**Fields:** Title (EN/AR), Department, Branch, Position Type (Full-Time / Part-Time / Contract / Intern), Reason (New / Replacement / Expansion), Number of openings, Job Description, Required Skills, Preferred Skills, Experience Range, Salary Range. Requires approval.

##### Job Postings

Publish an approved requisition externally. Each posting has the linked requisition, posting title and description (rich text), posting channels, open / close dates, and a public-facing application form.

##### Candidates

Master list of every candidate who has applied or been added manually. Each candidate has personal info, resume, cover letter, source (referral / agency / direct / portal), and linked applications.

##### Applications

Candidate × Posting links with stage tracking:

| Stage | Description |
|---|---|
| **Submitted** | Candidate applied or was added manually |
| **Screening** | Recruiter is reviewing the resume |
| **Phone Screen** | First call completed |
| **Technical Interview** | Detailed interview scheduled |
| **HR Interview** | Cultural-fit / final interview |
| **Offer Pending** | Decision made, offer in preparation |
| **Offer Sent** | Offer letter sent |
| **Hired** | Offer accepted, onboarding triggered |
| **Rejected** | Application closed |
| **Withdrawn** | Candidate withdrew |

Move through stages using row actions or drag-and-drop on the kanban board view.

##### Interviews

Schedule interviews for any application: type (Phone / Video / In-Person), date / time, interviewers (multiple), location or video link. After the interview, each interviewer submits feedback — competency scores, recommendation, and notes.

##### Offers

Generate offer letters from a Letter Template:
- Linked application
- Offer details (title, salary, allowances, start date, probation period)
- Letter template
- Send to candidate (email link with PDF)

When the candidate **accepts**, the system automatically:

1. Creates a pre-hire Employee record.
2. Starts an Onboarding Process using the resolved template (department default → branch default → first default).
3. Provisions a portal user and sends a welcome email.

#### Onboarding

##### Templates

Reusable task lists, organised by category:

| Category | Examples |
|---|---|
| **Documentation** | Sign offer, submit ID copy, sign contract |
| **IT** | Provision laptop, create email, install software |
| **HR** | Bank details form, tax form, emergency contacts |
| **Training** | Welcome session, code of conduct, security awareness |
| **Equipment** | Office key, ID card, parking pass |
| **Access** | System access, building access, VPN |
| **Introduction** | Team intro, manager 1:1, buddy assignment |

Templates can be flagged as default and attached to a default branch or department.

##### Processes

Per-employee onboarding instances. Each process has the linked employee, linked template, tasks (one per template task) with status and target date, documents requested, and overall completion percentage.

##### Onboarding Dashboard

Cross-employee onboarding view: who is in onboarding today, completion percentages, overdue tasks, recent completions.

When all tasks complete, the employee's onboarding milestone is stamped. If the company has enabled the auto-activation setting, the employee becomes Active automatically.

#### Offboarding

##### Resignations

Resignation requests from employees (or HR-initiated). Each resignation has employee, last working day, reason, and an approval workflow. If the company has enabled auto-creation of terminations, approving the resignation automatically creates a termination record.

##### Terminations

Termination records — for resignations and dismissals. Each record has:
- Employee
- Termination Type (Resignation / Termination / Retirement / Death)
- Termination Date
- Reason
- Notice Period
- Linked Clearance Checklist
- Linked Final Settlement

When a termination is created, the system automatically creates a clearance checklist and suspends the employee.

##### Pending Clearance

Active clearance checklists awaiting completion.

**Default clearance items** (when no template is configured):

1. Return company laptop / equipment
2. Return company ID card
3. Return company assets (phone, vehicle, keys)
4. Hand over project documentation
5. Knowledge transfer to designated colleague
6. IT access revocation
7. Final timesheet submission
8. Exit interview completed

Each item has an assignee (department or specific user), status, completion date, and comments.

##### Final Settlements

End-of-service calculation, last salary, leave encashment, deductions, net payable.

**Components:**
- **Last Salary** — pro-rated from the start of the last payroll period to the termination date
- **Leave Encashment** — unused leave balance × daily rate
- **End-of-Service Benefit** — calculated from the active end-of-service policy (Saudi default seeded on first run)
- **Notice Period** — paid or worked
- **Outstanding Loans / Advances** — deducted
- **Other Deductions / Earnings** — manual line items

The applied policy is snapshotted at calculation time so the calculation can always be reproduced even if the policy is later updated.

When a final settlement is marked Paid, the employee is fully deactivated.

### 5.3 Workplace

This group bundles seven sub-modules: Documents, Announcements, Assets, Employee Relations, Surveys, Expenses, and Loans & Advances.

#### Documents

##### Categories

Folders for grouping documents — e.g. "Employee Personal Documents", "Company Policies", "Certifications".

##### Employee Documents

Per-employee uploads — passport, contract, certifications, signed acknowledgements. Each document has the linked employee, category, file (PDF, DOC, DOCX, JPG, PNG, XLSX up to 10 MB), description, and an optional expiry date with reminders.

##### Company Policies

Shared policy library available to all employees in the self-service portal. Each policy has title (EN/AR), description, file, effective date, version, and an acknowledgement-required flag (when set, employees must click "I have read and understood").

##### Letter Templates

Bilingual reusable templates with merge tags. Examples:

| Template | Use |
|---|---|
| **Employment Certificate** | Confirms employment for visa, bank, etc. |
| **Salary Certificate** | Confirms salary for bank loans |
| **Experience Certificate** | Certifies role and tenure |
| **No Objection Certificate (NOC)** | For travel, second job, etc. |
| **Promotion Letter** | Internal record |
| **Salary Adjustment Letter** | Internal record |

Merge tags such as `{{employee.fullName}}`, `{{employee.jobTitle}}`, `{{employee.hireDate}}` are resolved automatically at generation time.

##### Letter Requests

Employees request a generated letter from the self-service portal. HR reviews here:

1. Open the request.
2. Pick or confirm the template.
3. Click **Generate** to produce a PDF.
4. Click **Approve & Send** to deliver to the employee's portal.

#### Announcements

##### Categories

Group announcements (Company-Wide / Department / Branch / Policy / IT / HR).

##### All Announcements

Compose and publish announcements:
- Title (EN/AR), body (rich text)
- Category
- Audience (All / Specific branches / Specific departments / Specific roles / Specific employees)
- Publish date
- Expiry date (optional)
- Acknowledgement-required flag

Visible in the self-service portal. Acknowledgements are tracked.

#### Assets

Track company-issued assets (laptops, phones, vehicles, ID cards, keys).

##### All Assets

Master list with asset tag, serial number, description, category, status (Available / Assigned / In Maintenance / Retired / Lost), purchase date / price, warranty expiry, vendor, current assignee.

##### Categories

Group asset types (Laptops, Phones, Vehicles, ID Cards, Furniture, etc.).

##### Assignments

Issue / return tracking with sign-off — asset → employee, dates, condition at issue / return.

##### Maintenance

Service history — asset, maintenance date, type (Preventive / Corrective / Inspection), vendor, cost, description, next scheduled service date.

The system sends notifications for asset warranty expiry and overdue returns.

#### Employee Relations

Confidential HR-only workflows.

##### Grievances

Employee complaints with category (Workplace / Manager / Peer / Policy / Compensation / Other), severity (Low / Medium / High / Critical), description, attachments. Stages: Submitted → Under Investigation → Resolution Proposed → Closed.

##### Disciplinary Actions

Warnings, suspensions, dismissal records with type (Verbal Warning / Written Warning / Final Warning / Suspension / Dismissal), severity, reason, evidence, dates, linked grievance or investigation.

##### Investigations

Open cases:
- Subject employee(s), reporter
- Type (Misconduct / Fraud / Harassment / Theft / Performance / Other)
- Status (Open / In Progress / Closed)
- Linked documents, witnesses
- Outcome and recommendations

##### Counseling

Counselling sessions:
- Employee, counsellor (HR or external)
- Date, type (Performance / Personal / Career / Wellness)
- Notes (HR-only visibility)
- Follow-up actions

#### Surveys

##### Templates

Compose a survey:
- Title, description, instructions
- Question types: Single Choice / Multiple Choice / Likert Scale / Free Text / Number / Date
- Required vs. optional
- Anonymous flag

##### Distributions

Send a survey to a target audience — linked template, audience, open / close dates, reminder schedule. Aggregated responses appear inline; raw responses can be exported as CSV (anonymous mode strips identifiers).

#### Expenses

##### Categories

Travel, Meals, Accommodation, Training, Office Supplies, Communication, Other.

##### Policies

Per-category limits and approval rules: daily / monthly cap per employee or grade, receipt-required threshold, approval workflow.

##### Claims

Employee submissions. Admin reviews — open the claim, verify receipts and amounts, approve / reject / return for correction. Approved amounts flow into the next payroll period as a reimbursement line.

#### Loans & Advances

##### Loan Types

Define loan products (Housing / Car / Education / Emergency / Personal). Each has a name, description, and linked loan policy.

##### Loan Policies

Eligibility and limits per loan type:
- Minimum / maximum tenure (months)
- Maximum amount (absolute or × salary)
- Interest rate (zero, fixed, or variable)
- Eligibility criteria (minimum tenure with company, grade, etc.)

##### Loan Applications

Employee applications:
- Linked loan type, requested amount, requested tenure
- Computed monthly instalment
- Supporting documents
- Approval workflow
- Once approved and disbursed, the instalments are deducted from payroll automatically

##### Salary Advances

One-off salary advances:
- Employee, amount
- Deduction Start Date, Deduction End Date — the advance is recovered evenly across payroll periods overlapping this range
- Reason
- Approval workflow

---

## 6. Workforce Area

### 6.1 Time & Attendance

#### Shifts

Define every shift the company operates.

**Shift types:**

| Type | Use |
|---|---|
| **Regular** | Fixed start–end times, e.g. 09:00–17:00 |
| **Flexible** | Employee chooses arrival within a window; total hours required |
| **Split** | Multiple periods in a day, e.g. 09:00–12:00 + 16:00–20:00 |
| **Rotating** | Multi-shift pattern across days (Morning / Afternoon / Night) |
| **Night** | Spans midnight |

**Each shift has:**
- Code, English name, Arabic name
- Type
- **Periods** — one or more start–end times in a day
- **Break configuration** — paid or unpaid, fixed or flexible duration
- **Grace periods** — entry grace (late tolerance), exit grace (early-out tolerance)
- **Overtime rules** — when minutes beyond the shift count as overtime
- **Off days** — days of week that are off
- **Core hours** — hours during which the employee must be present (flexible shifts only)

#### Shift Assignments

Assign a shift to an Employee, Department, or Branch.

**Each assignment has:**
- Target (Employee, Department, or Branch)
- Shift
- Effective Start Date, Effective End Date (optional — null = ongoing)
- **Priority** — when multiple assignments overlap, the highest priority wins
- Reason (optional)

**Priority example:**

- Branch-level: Priority 1 (everyone in the branch defaults to this shift)
- Department override: Priority 5 (department-specific shift)
- Employee override: Priority 10 (this employee on a different shift)

For any given employee × date, the highest-priority active assignment wins.

#### Attendance Dashboard

Live KPI tiles for today and the current month. Drill into any tile.

#### Daily View

Day-by-day attendance grid for any date range and branch / department / employee filter.

**Columns:** Employee, Date, Shift, Check-In, Check-Out, Total Worked, Late Min, Early-Out Min, Overtime (Regular + Premium), Status, Comments.

**Statuses:**

| Status | Meaning |
|---|---|
| **Present** | Worked the shift (within tolerance) |
| **Absent** | No transaction; not on leave or holiday |
| **Late** | Worked, but checked in past grace period |
| **On Leave** | Approved vacation / excuse / remote work covers the day |
| **Holiday** | Public holiday — no expectation to work |
| **Weekend** | Off day per shift |
| **Remote** | Approved remote work day |
| **Override** | Manual administrator adjustment in effect |

**Manual override:** click an attendance row → Add / Edit Transaction:
- Pick transaction type (Check-In / Check-Out / Break Start / Break End)
- Pick time
- Add reason / comment
- Submit

The override goes through the configured approval workflow before becoming final. After approval, the system automatically recalculates working hours, late / early minutes, overtime, and final status.

#### Monthly Report

Cross-employee monthly grid for finalisation prior to payroll processing. Cells show summarised status icons; click an employee to see daily detail.

**Finalisation:** click **Lock Period** when the month is reviewed and ready for payroll. Locked records cannot be edited except via system-administrator unlock with a reason.

#### Shift Swaps

Approve or reject shift-swap requests submitted by employees. Each swap shows both employees' dates and shifts, both employees' acceptance, and approval workflow status.

#### On-Call Schedules

Plan on-call rotations:
- Calendar view per team
- Drag-and-drop to assign on-call windows to employees
- Coverage gaps highlighted
- Notifications sent to on-call employees

### 6.2 Leave & Absence

#### Employee Vacations

Master list of every vacation request.

**Filters:** Employee, Status (Pending / Approved / Rejected / Cancelled / Returned), Vacation Type, Date Range, Branch, Department.

**Each vacation has:**
- Employee, Vacation Type
- Start Date, End Date, Total Days
- Reason, attachments
- Approval workflow status, approver(s)
- Effect on attendance (which days are marked On Leave)
- Effect on balance (deducted at approval)

**Actions:** Approve, Reject, Return for Correction, Cancel (after approval, before the vacation starts), Edit (admin-only, before approval).

#### Employee Excuses

Hour-based exit requests. Same workflow as vacations but the unit is hours. Approved excuses adjust attendance for the affected hours.

#### Leave Management

##### Compensatory Offs

Track comp-off accruals (worked-on-holiday or worked-on-off-day) and requested usages. Each accrual record: employee, date worked, hours worked, reason, comp-off granted, expiry date.

Employees redeem comp-off via the self-service portal as a separate vacation type.

##### Leave Encashments

Convert remaining leave balance to cash:
- Employee, Vacation Type
- Days to Encash, Daily Rate, Total Amount
- Effective Date (which payroll period it appears in)
- Approval workflow

#### Remote Work Requests

Approve or reject remote-work requests. Configurable per Remote Work Policy:
- Maximum days per period (week / month / quarter)
- Blackout periods
- Department eligibility
- Required approver type

### 6.3 Performance & Growth

This group bundles three sub-modules: Performance, Training & Development, and Succession Planning.

#### Performance

##### Review Cycles

Define a review period. Each cycle has:
- Name, description
- Start / End dates
- Self-review window, manager-review window, calibration window
- Scope (all employees / specific departments / specific roles)
- Linked competency framework
- Linked goal framework
- Status (Draft / Active / Completed / Cancelled)

##### Reviews

Per-employee review records inside a cycle:
- Linked cycle, linked employee
- Self-review responses
- Manager-review responses
- Competency assessments
- Goal achievements
- Final rating (e.g. Exceeds / Meets / Needs Improvement)
- Calibration notes

##### Goals

SMART goal definitions with progress tracking — title, description, success criteria, linked employee / team / department, target date, weight / priority, progress percentage, status (Not Started / In Progress / On Track / At Risk / Completed / Missed).

##### Competencies

**Competency Frameworks:** named libraries (e.g. "Leadership", "Technical — Engineering", "Customer Service").

**Competencies:** named skills within a framework with proficiency levels (typically 1–5).

**Competency Assessments:** per-employee × competency × framework rating, captured during reviews.

##### Performance Improvement Plans (PIPs)

- Linked employee, manager
- Reason, expectations, success criteria
- Start date, end date (typically 30 / 60 / 90 days)
- Milestones with due dates
- Status (Active / Successful / Failed / Extended)

The **PIP Follow-Through** work queue surfaces overdue PIP milestones.

##### 360 Feedback

Multi-rater feedback:
- Subject employee
- Raters (manager, peers, direct reports, customers)
- Linked feedback template
- Send invitations
- Aggregated anonymous responses

#### Training & Development

##### Categories

Group training topics (Compliance / Technical / Soft Skills / Leadership / Onboarding / Safety).

##### Courses

Course catalogue. Each course has code, title (EN/AR), description, category, duration, delivery mode (Classroom / Online / Hybrid / Self-paced), provider, default instructor, cost, prerequisites, linked certifications produced.

##### Programs

Multi-course curriculum tracks (e.g. "New Manager Programme" = 5 courses over 3 months) — title, description, linked courses (ordered), target audience, duration, linked certifications.

##### Sessions

Scheduled deliveries — linked course, date / time, duration, instructor, location (or video link), capacity, status (Scheduled / Confirmed / Completed / Cancelled).

##### Enrollments

Employee × Session links — linked employee, linked session, status (Enrolled / Waitlisted / Confirmed / Attended / Completed / No-Show / Cancelled), completion date, final score, certificate generated.

##### Certifications

Earned credentials with linked employee, certification name, issuer, issue date, expiry date, linked course / program. Expiring certifications are surfaced with reminders.

##### Budgets

Per-department or per-program budgets — department (or program), fiscal year, allocated amount, spent (auto-tracked), remaining.

#### Succession Planning

##### Key Positions

Roles flagged as critical to the business — linked job title or department, risk score (Low / Medium / High), successor readiness (Ready Now / Ready 1Y / Ready 2Y+), notes.

##### Talent Profiles

Per-employee succession-readiness profile — performance rating (latest), potential rating, mobility, career aspirations, development plan.

##### Succession Plans

Position × Successor mapping — linked Key Position, Successor 1, 2, 3 (ordered) with readiness, development gaps and actions.

##### Career Paths

Defined progression routes between roles — From Role → To Role, required competencies (gap), average tenure, number of employees historically progressed.

##### Talent Pool

Cross-cut view of high-potential employees with filters by performance, potential, and readiness.

---

## 7. Payroll Area

> Payroll in TecAxle HRMS is **policy-driven** and **fully audited**. Every multiplier comes from configuration; every input is resolved by effective date; every run is recorded in an audit trail.

### 7.1 Salary Structures

Define base salary components per employee. Allowances are managed separately (Allowances under HR Management).

Each structure has linked employee, base salary, currency, effective date, frequency (Monthly / Bi-Weekly / Weekly).

### 7.2 Payroll Periods

Each period represents one pay run.

**Period fields:** name (e.g. "January 2026"), period type (Monthly / Bi-Weekly / Weekly / Custom), start date, end date, payment date, status.

#### Period lifecycle

```
Draft → Processing → Processed → Approved → Paid (locked)
                                                ↓
                                          [Admin Unlock] (with reason)
                                                ↓
                                          (back to Approved)
                                                ↑
                              Cancelled ← Draft / Processing
```

#### Operations on a period

| Action | Allowed when | Effect | Who can do it |
|---|---|---|---|
| **Process** | Draft | Computes payroll for every active employee in scope; creates payslip rows; transitions to Processed | Payroll Administrator, HR Manager, System Administrator |
| **Recalculate** | Processed | Re-runs the calculation; replaces line items; **do not call Process twice** | Payroll Administrator, HR Manager, System Administrator |
| **Approve** | Processed | Locks the calculation; transitions to Approved | HR Manager, System Administrator |
| **Mark Paid** | Approved | Locks the period; payslips become visible to employees | HR Manager, System Administrator |
| **Cancel** | Draft / Processing | Reverts the run; rows are removed | Payroll Administrator, HR Manager, System Administrator |
| **Admin Unlock** | Paid | Requires a written reason; logged as a system action | System Administrator only |

#### Run audit

Every Process / Recalculate / Approve / Mark Paid / Admin Unlock writes an audit row. View under the period's **Run Audit** tab. Each entry includes:
- Action, timestamp, actor (user)
- Total gross, total deductions, total net
- Rows added / changed / removed
- Reason (for Admin Unlock)

Use the **Compare with previous run** view to see exactly what a Recalculate changed.

#### What the engine does (per employee)

For each employee in the period, the engine:

1. Resolves every input by effective date — salary, allowances (active assignments), tax configuration, social insurance configuration, employee insurance, overtime configuration, calendar policy, public holidays.
2. Calculates Fixed allowances and Percentage-of-Basic allowances.
3. Calculates overtime pay using the overtime configuration day-type rates (Holiday / Weekend / Normal).
4. Calculates absence deductions: daily rate × absent days.
5. Calculates Percentage-of-Gross allowances against the provisional gross (two-pass).
6. Calculates progressive tax (applied only to allowances flagged taxable).
7. Calculates social insurance (employee + employer lines, capped at the maximum insurable salary).
8. Subtracts loan / advance instalments due in this period.
9. Writes every contribution as a payslip line with notes.
10. Stores a forensic snapshot for audit.

### 7.3 Payroll Settings

Sub-pages:

#### Tax Configurations

Progressive tax brackets per period:
- Effective date, country code (optional)
- Brackets: from amount → to amount → tax rate
- Applies to allowances flagged taxable

#### Social Insurance

- Employee SI rate (% of salary), Employer SI rate
- Maximum insurable salary cap
- Nationality filter (optional) — typically Saudis are insurable, expats might be exempt

#### Insurance Providers

Health / dental / life insurance providers:
- Provider name
- Per-employee monthly premium
- Coverage tier (Self / Self+Spouse / Self+Family)
- Effective date

#### Calendar Policies

Daily-rate basis:

| Basis | Daily Rate | Use Case |
|---|---|---|
| **Calendar Days** | Base salary / 30 (or actual month days) | Calendar-day-based countries |
| **Working Days** | Base salary / Working days in month | Where deductions are based on actual working days |
| **Fixed Basis** | Base salary / Fixed Basis (e.g. 26) | Fixed-divisor systems |

This setting eliminates the hardcoded 30-day month assumption.

### 7.4 End-of-Service Policies

End-of-service is computed automatically on Final Settlement using the active policy:
- Effective-dated policies with optional country filter (Saudi default seeded on first run)
- **Tiered structure** — years-of-service × multiplier (e.g. first 5 years × 0.5 month, after 5 years × 1 month)
- **Resignation deduction tier** — separate scale when an employee resigned (not terminated)

The applied policy is snapshotted into the final settlement so historical calculations remain reproducible even if the policy is updated.

### 7.5 Benefits

#### Benefit Plans

Define plans (Health / Dental / Vision / Life / Retirement). Each plan has type, name, description, provider, coverage details, employee contribution, employer contribution, eligibility (grade, tenure, full-time only).

#### Enrollment Periods

Open / close windows for plan changes. Outside the window, plan changes are not available except for life-event qualifying changes (marriage, birth, death of dependent) which HR enables manually.

#### Enrollments

Employee × Plan links — linked employee, linked plan, effective date, expiry date, covered dependents, status (Active / Pending / Cancelled / Expired).

#### Claims

Claim submissions:
- Employee, plan, claim type
- Amount claimed, currency
- Receipts, supporting documents
- Approval workflow
- Approved amount, payment status

---

## 8. Operations Area

### 8.1 Workflows & Approvals

#### Pending Approvals

Every active approval task assigned to **you**. Tasks include vacations, excuses, remote work, salary advances, attendance corrections, expense claims, allowance requests, letters, recruitment offers, contracts, and any other request type with a configured workflow.

**Each task shows:**
- Requester, request type, current step number
- Submission timestamp, time in queue, escalation timer
- Summary of the request (key fields)
- Attachments, comments from prior approvers
- Workflow visualisation (steps, who acted, who is current)

**Actions:**

| Action | Effect |
|---|---|
| **Approve** | Move to next step (or terminal Approved state) |
| **Reject** | Terminate as Rejected; requester notified |
| **Return for Correction** | Send back to requester with mandatory comment |
| **Delegate** | Assign the task to another approver (depth bounded; cycles rejected) |
| **Comment** | Add a comment without taking an action |

#### Approval History

Every approval task you have acted on. Filter by request type, requester, action, date range. Useful for performance reviews and audits.

### 8.2 Operations Dashboard, Alerts, Approved-Not-Executed, Global Search

#### Operations Dashboard

Cross-cut KPIs:
- Failure alerts (last 7 / 30 days)
- Overdue approvals
- Overdue onboarding tasks
- Overdue clearance items
- Auto-checkout review backlog
- PIP follow-through items
- Approved-not-executed count

Each tile drills into the corresponding queue.

#### Operational Alerts

Background-job and integration failures.

**Each alert shows:** when it fired, alert type (job name), what failed, the error message, affected entity (if applicable), resolution status (Open / Acknowledged / Resolved / Suppressed).

**Actions:** Acknowledge, Resolve (with note), Suppress (use sparingly; for false-positive alerts).

#### Approved Not Executed

Requests that were approved by the workflow engine but for which the downstream side effect has not yet been recorded — e.g. a salary adjustment approved but not yet applied to the next payroll period because the period is still in Draft.

Useful for catching execution lag.

#### Global Search

Cross-entity full-text search. Type a query (or use the top-bar magnifier — **Ctrl + K**) to find:
- Employees (by name, code, email, phone, ID)
- Branches, departments
- Vacations, excuses, remote work requests
- Payroll periods, payslips
- Job postings, candidates, applications
- Documents, letters, announcements

Results are grouped by entity type with the matched fields highlighted.

### 8.3 Work Queues

| Queue | Surfaces | Action |
|---|---|---|
| **Overdue Approvals** | Approvals past their step timeout | Open and act / delegate |
| **Overdue Onboarding Tasks** | Tasks past their target completion | Reassign / chase / close |
| **Overdue Clearance Items** | Pending clearance items past due | Reassign / chase |
| **Unresolved Alerts** | Operational alerts that remain Open | Acknowledge / resolve / suppress |
| **Auto-Checkout Review** | Days where shift-driven auto-checkout fired | Review and adjust if wrong |
| **PIP Follow-Through** | PIP milestones lapsed without progress | Update / extend / close PIP |

### 8.4 Reports

| Report | Description |
|---|---|
| **Attendance Report** | Branch / department / employee × date range; export CSV |
| **Leave Report** | Vacation / excuse / remote-work usage and balances; per type / department |
| **Sessions** | Active and historical login sessions; revoke-session action |
| **Audit Logs** | Field-level before/after for every data change |
| **Payroll Reports** | Per-period summary, per-employee detail, variance analysis, bank transfer file |
| **Compliance Reports** | Government / regulatory reports (Saudi WPS, leave compliance, end-of-service compliance, custom country-specific) |
| **Custom Reports** | User-defined queries — pick entity, fields, filters, grouping; save and schedule |

### 8.5 Analytics

Pre-built dashboards backed by the same data the operational pages use:

| Dashboard | Purpose |
|---|---|
| **Executive Dashboard** | Top-level KPIs across HR, payroll, attendance |
| **Headcount** | Trends, by branch / department, full-time / part-time / contract |
| **Attrition** | Turnover rate, voluntary vs. involuntary, by department / role |
| **Recruitment Analytics** | Time-to-fill, source effectiveness, offer accept rate |
| **Training Analytics** | Completion rates, cost per employee, certification status |
| **Leave Analytics** | Usage trends, balance distributions, by type / department |
| **Overtime Analytics** | Overtime hours and cost, by branch / department / employee |
| **Payroll Analytics** | Cost trends, by category (basic / allowances / overtime / deductions) |
| **Engagement Analytics** | Survey scores, response rates, sentiment |

Each dashboard supports filtering by branch, department, period.

### 8.6 Timesheets

#### Projects

Cost-tracking projects:
- Project code, name, description
- Client / department
- Budget, billing rate
- Start / End dates
- Status

#### Periods

Reporting windows (typically weekly or bi-weekly).

#### Timesheets

Employee × Period entries with project allocations. View, approve, reject, or unlock submitted timesheets.

### 8.7 Settings

#### Company Configuration

The **singleton** settings page — these values affect the entire company. Tabs:

##### General

- Company legal name (EN/AR), trading name, address
- Default language (English / Arabic)
- Time zone (e.g. Asia/Riyadh)
- Date format, time format
- Currency (e.g. SAR), currency symbol
- Working week definition (e.g. Sun–Thu, Mon–Fri)
- Fiscal year start month

##### Attendance

- Late thresholds (minutes)
- Grace periods (entry / exit)
- Weekend definition
- Attendance correction window (how many days back an employee can correct)
- Manual override window
- Maximum shift grace minutes

##### Leave

- Maximum vacation days per request
- Future-planning year limit
- Default accrual policy
- Carryover rules
- Excuse backward / forward windows

##### Payroll

- Default payroll calendar policy
- Default daily-rate basis
- Default probation days

##### Approval

- Workflow fallback approver role
- Workflow fallback approver user
- Maximum delegation depth (default 2)
- Maximum resubmissions (default 3)

##### Notification

- Recipient roles (CSV — e.g. HR Manager, System Administrator)
- Contract expiry alert days (default 30, 15, 7)
- Visa expiry alert days (default 90, 60, 30, 15, 7)
- Document expiry alert days
- Asset warranty expiry alert days
- Asset overdue return alert days
- Training session reminder days
- Succession plan reminder days
- Grievance SLA alert days
- Review reminder days

##### Security

- Password minimum length (default 8)
- Password complexity requirements
- Login lockout policy (max attempts, lockout duration, progressive thresholds)
- Session timeout
- 2FA requirement (none / optional / required for system administrators / required for all)

##### Business-Rule Thresholds

- Maximum upload size (MB)
- Maximum shift grace minutes
- Excuse window days
- Overtime configuration maximum future days
- Other validation thresholds

##### Lifecycle Automation

The toggle settings controlling the seven lifecycle automations — see [Section 10](#10-lifecycle-automation-reference).

#### Branch Overrides

From Company Configuration → **Branches** tab, create a per-branch override for any branch. Only attendance-related fields can be overridden per branch:
- Late thresholds
- Grace periods
- Weekend definition

Empty fields fall back to the company value.

#### Settings Dashboard

Index of every settings page with a one-line description and last-modified date.

#### Other settings pages

| Page | Purpose |
|---|---|
| **Overtime** | Per-branch overtime rates: regular + premium, daily / weekly / monthly thresholds, day-type buckets |
| **Public Holidays** | Branch-specific holidays, recurring rules, bilingual names — automatically recognised by attendance |
| **Vacation Types** | Annual, sick, casual, maternity, etc. with paid/unpaid flag and policies |
| **Excuse Policies** | Hour-based exit allowances per period |
| **Remote Work Policy** | Eligibility, max days, blackout windows, department list |
| **Workflows** | Workflow definitions with steps, approver types, timeouts, escalations, validation rules |
| **Leave Entitlements** | Per-employee or per-grade entitlement overrides |
| **Allowance Types** | Master list with taxable / social-insurable flags, basis (Fixed / Percentage of Basic / Percentage of Gross) |
| **Allowance Policies** | Eligibility and limits per allowance type |
| **End-of-Service Policies** | Effective-dated end-of-service policies and tiers |

---

## 9. Common Administrator Workflows

### 9.1 Onboard a new employee from offer to active

1. **People → Recruitment → Offers** → generate the offer letter for an Accepted application using the appropriate template.
2. The candidate clicks the offer link and accepts.
3. The system automatically:
   - Creates a pre-hire Employee record
   - Resolves and starts an Onboarding Process
   - Provisions a portal user and sends a welcome email
4. The employee logs into the self-service portal and completes onboarding tasks.
5. Track progress in **People → Onboarding → Onboarding Dashboard**.
6. When the last task is closed, the onboarding milestone is stamped.
7. If auto-activation is enabled, the employee becomes Active automatically; otherwise HR opens the employee record and activates manually.

### 9.2 Run a payroll period

1. **Payroll → Payroll Periods → New Period** — set start, end, payment date, period type.
2. Confirm all attendance for the period is finalised in **Workforce → Attendance → Monthly Report → Lock Period**.
3. Confirm all approved Salary Adjustments, Allowance Requests, and Loan disbursements have effective dates within or before the period.
4. Open the period and click **Process**. Wait for the run to complete.
5. Review per-employee records. Spot-check a few payslips for correctness.
6. If something needs adjustment, fix the underlying input and click **Recalculate**. Compare with the previous run.
7. Click **Approve** when satisfied.
8. Generate the bank transfer file from **Operations → Reports → Payroll Reports → Bank Transfer**.
9. Once payments have been disbursed, click **Mark Paid**. The period is now locked. Payslips become visible to employees.
10. Open the **Run Audit** tab to verify the action history.

### 9.3 Process an offboarding

1. **People → Offboarding → Resignations** → review the resignation request and approve.
2. If auto-creation is on, a Termination record is created automatically; otherwise create one manually in **People → Offboarding → Terminations → New Termination**.
3. The system automatically creates a **Clearance Checklist** and **suspends** the employee.
4. Department heads, IT, and HR work through clearance items in **People → Offboarding → Pending Clearance**.
5. When all items are cleared, the Final Settlement is enabled (if the gate is configured).
6. **People → Offboarding → Final Settlements → New** → select the employee.
   - System pre-fills last salary (pro-rated), leave encashment, end-of-service calculation
   - Add manual line items (other earnings, deductions)
   - Review the calculation breakdown
7. Approve the Final Settlement.
8. Once paid, click **Mark Paid**. The employee is fully off-boarded.

### 9.4 Configure a new approval workflow

1. **Operations → Settings → Workflows → New Workflow Definition**.
2. Choose the request type it applies to (Vacation, Excuse, Salary Adjustment, etc.).
3. Optionally tag it with a scope (specific branch / department / employee group).
4. Add steps in order. For each step:
   - **Approver type:**
     - **Role** — any user with the role; with optional assignment strategy:
       - First Match — first eligible user
       - Round Robin — rotates between eligible users
       - Least Pending Approvals — picks the user with fewest open tasks
       - Fixed Priority — picks by configured priority order
     - **User** — a specific user
     - **Manager** — the requester's direct manager
     - **Direct Manager** — same, with strict resolution
     - **Department Head** — the head of the requester's department
     - **Branch Manager** — the manager of the requester's branch
   - **Timeout (hours)** — how long the step waits before escalating
   - **Escalation behaviour** — Notify only / Auto-approve / Auto-reject / Escalate to next level
5. Add **Validation rules** (custom checks fired before the workflow starts).
6. Save and publish.

### 9.5 Add a public holiday

1. **Operations → Settings → Public Holidays → Add Holiday**.
2. Enter date, English name, Arabic name.
3. Pick scope — All branches / specific branches.
4. If recurring (e.g. every 1st of January), tick **Recurring** and pick the rule.
5. Save.

The next time the attendance engine runs (daily), the date will be marked Holiday for affected employees.

### 9.6 Create a custom report and schedule it

1. **Operations → Reports → Custom Reports → New Report**.
2. Pick the entity (Vacations, Employees, Payslips, etc.).
3. Pick fields.
4. Define filters (status, date range, branch, etc.).
5. Choose grouping and sorting.
6. **Save**.
7. Click **Schedule** → pick frequency (Daily / Weekly / Monthly), recipients, format (CSV / PDF).
8. Save schedule. The report is generated and delivered automatically.

### 9.7 Diagnose a missed automation

1. **Operations → Operational Alerts** → look for a failure alert at the timestamp the automation should have fired.
2. **Operations → Approved Not Executed** → find approved requests with no downstream effect.
3. Check the audit trail for the affected employee.
4. Common causes:
   - Master lifecycle kill-switch off
   - Specific automation toggle off
   - Required template / setting missing
   - A handler threw an exception (check the alert)
5. Fix the configuration, then trigger the action manually if needed.

### 9.8 Reset a locked-out user

1. **People → Users** → search for the user.
2. Open the user record.
3. Click **Unlock Account**. The lockout counter is cleared.
4. Optionally **Force Password Change** so they pick a new password on next login.
5. Optionally **Reset Password** to send a fresh temporary password.

### 9.9 Bulk-import employees

1. Download the **Employee Import Template** from **People → Employees → Import**.
2. Fill in the template (one row per employee). Required: First Name, Last Name, Email, Hire Date, Branch Code, Department Code.
3. Save as CSV.
4. Upload via **People → Employees → Import → Upload CSV**.
5. The system validates each row and shows errors inline. Fix and re-upload, or proceed with the valid subset.
6. On success, employees are created Active. To trigger onboarding, mark them pre-hire first or manually create Onboarding Processes.

---

## 10. Lifecycle Automation Reference

The system automates seven HR lifecycle transitions. Every automation is configurable, auditable, and idempotent.

**Master kill-switch:** turns all 7 off when set off (default on).

| # | Trigger | Action | Default |
|---|---|---|---|
| 1 | Offer Accepted | Create Onboarding Process from resolved template | On (always on) |
| 2 | Onboarding Completed | Activate employee (clear pre-hire flag) | Off (milestone only) |
| 3 | Resignation Approved | Create Termination record | Off |
| 4 | Termination Created | Create Clearance Checklist + suspend employee | On (always on) |
| 5 | Clearance Completed | Enable Final Settlement | Off (settlement allowed in parallel) |
| 6 | Final Settlement Paid | Deactivate employee | On (always on) |
| 7 | Contract Expired | Action per Contract Expired Action setting | Notify Only |

**Audit:** every automation attempt is logged to the lifecycle audit table whether it succeeded, was skipped (kill-switch off, condition unmet), or failed.

**Idempotency:** automations check existing state before acting. A re-fired event will not double-process.

---

## 11. Roles & Permissions

### 11.1 Built-in roles

| Role | Typical scope | Branch access |
|---|---|---|
| **System Administrator** | Full access to everything | All branches (implicit) |
| **HR Manager** | All HR areas, payroll, settings | Usually all branches |
| **HR Specialist** | HR data and lifecycle, no payroll approval | Limited to assigned branches |
| **Payroll Administrator** | Payroll, compensation, end-of-service | Limited to assigned branches |
| **Manager** | Branch / department manager | Their branches |
| **Employee** | Self-service portal only | N/A — sees only own data |

### 11.2 Permission model

Each role grants permissions per (Resource, Action) pair. Resources include Employees, Vacations, Payroll, Branches, Workflows, and many more. Actions include Create, Read, Update, Delete, Approve, Reject, Cancel, Export, Process, and many more.

A user is granted the **union** of permissions across all their assigned roles. There is no role hierarchy — assigning a higher role does not implicitly grant lower-role permissions.

### 11.3 Branch access

Every non-system-administrator user must have **Branch Access** assigning one or more branches. Lists, dashboards, and reports automatically filter to the user's access.

- **Empty access** = "all branches" (typically system administrators only)
- **One branch** = limited to that branch
- **Multiple branches** = limited to the union

Branch access applies even to read operations — a user without access to Branch X will not see employees / vacations / payslips related to Branch X.

### 11.4 Recommended role assignments

| User type | Recommended roles | Branch access |
|---|---|---|
| HR head | HR Manager + Payroll Administrator | All branches |
| HR officer | HR Specialist | Their branch(es) |
| Payroll officer | Payroll Administrator | All branches |
| Branch manager | Manager | Their branch only |
| Department head | Manager | Their branch (or scope set to all branches with department-level filtering) |
| IT admin | System Administrator | All branches |

---

## 12. Status Reference

### 12.1 Employee statuses

| Combination | Meaning |
|---|---|
| **Pre-Hire**, Active | Newly hired; in onboarding; payroll not yet active |
| **Active**, Not Suspended | Active employee; full participation |
| **Active**, Suspended | Offboarding in progress; portal disabled; data retained |
| **Inactive** | Fully off-boarded; no portal access; record retained for audit / re-hire |

### 12.2 Approval workflow statuses

| Status | Meaning |
|---|---|
| **Pending** | At least one approver action is awaited |
| **Approved** | All required approvals received; downstream effect applied |
| **Rejected** | Any approver rejected; terminal |
| **Cancelled** | Requester withdrew |
| **Returned for Correction** | Sent back to requester; awaiting resubmission |
| **Resubmitted** | Requester resubmitted; back to Pending |
| **Escalated** | Step timed out and was escalated |
| **Failed Routing** | No eligible approver could be resolved (terminal — the workflow falls back to the configured fallback approver) |

### 12.3 Vacation request statuses

Pending → Approved | Rejected | Returned for Correction → Resubmitted → … | Cancelled

### 12.4 Recruitment application stages

See Section 5.2 (Applications).

### 12.5 Payroll period statuses

See Section 7.2.

---

## 13. Keyboard Shortcuts & Productivity Tips

| Shortcut | Action |
|---|---|
| **Ctrl + K** (or **⌘ + K** on Mac) | Open global search popover |
| **Escape** | Close popovers / drawers / modals |
| **Tab / Shift + Tab** | Navigate form fields |
| **Enter** | Submit form / confirm dialog |

### Productivity tips

- **Use the breadcrumb** to quickly jump up levels in deeply nested pages.
- **Bookmark the most-used pages** in your browser. Each page has a stable URL.
- **Use the Area Switcher** rather than scrolling the sidebar — it persists your last area.
- **Open modals and drawers in a new tab** with middle-click on links — useful when comparing two records.
- **Use bulk actions** on list pages — select multiple rows with the row checkbox and use the toolbar that appears.
- **Filter chips** in the top-right of every list save complex filter combinations as named filters for re-use.
- **Schedule reports** instead of running them manually — they arrive in your inbox or portal.

---

## 14. Troubleshooting

### 14.1 Login problems

| Problem | Solution |
|---|---|
| "Invalid credentials" | Check email and password. Note the email is the full `name@company.com` form. Caps Lock off? |
| "Must change password" redirect | Set a new password meeting the policy. Cannot reuse one of your last few passwords. |
| Account locked | Wait the lockout duration (default 15 min), or ask a system administrator to unlock you in **People → Users → Unlock Account**. |
| 2FA failure | Check device clock skew (sync time on your phone); use a backup code; ask a system administrator to disable 2FA on your account if you lost the device and used all backup codes. |
| Forgot password | Click **Forgot password** on the login screen. If no email arrives, ask a system administrator to **Reset Password** for your account. |

### 14.2 Notifications not arriving

- Confirm the bell shows recent items — if older items are visible, the system is reaching you.
- Check **Settings → Company Configuration → Notification → Recipient Roles** — your role must be in the list.
- Refresh the page; the bell list is also fetched on every navigation.

### 14.3 Cannot edit a payroll record

Check the Payroll Period status. **Paid** records are **locked**. A system administrator can use **Admin Unlock** with a reason, but this is audited and visible.

### 14.4 Workflow stuck on a step

- **Operations → Pending Approvals** → filter by the requester to see who owns the task.
- If the assigned approver is unavailable, use **Delegate**.
- If no approver can be resolved, the workflow lands on the configured fallback approver.
- Validation rules can hold a workflow before its first step — check the request's last error.

### 14.5 Attendance shows wrong status

- Confirm the employee's Shift Assignment and effective date — the highest-priority active assignment wins.
- Check Public Holidays for the affected day.
- Verify the company's weekend configuration in **Settings → Company Configuration → Attendance**.
- Use **Manual Override** with a comment — the change goes through a workflow before becoming final and is fully audited.

### 14.6 Lifecycle automation didn't fire

- Master kill-switch: **Settings → Company Configuration → Lifecycle Automation** — confirm it is on.
- Each of the seven automations has its own toggle; confirm the relevant one is enabled.
- Check the audit trail for every attempt with reason on skip.

### 14.7 "Lost" data after deactivating someone

The system **does not delete employees**. Deactivation disables their portal but keeps the record. To find them:
- Clear the **Active only** filter on the Employees list (or change it to "All" or "Inactive").
- To reactivate, edit the record and toggle Active on.

### 14.8 Salary Adjustment didn't appear in payroll

- Confirm the adjustment's effective date is within or before the period start.
- Confirm the adjustment's status is **Approved**.
- Confirm the period's status is Draft (Process picks up changes) or Processed (Recalculate picks up changes). After Approved, recalculation is no longer possible without admin unlock.

### 14.9 Cannot see all branches' data

You probably have constrained branch access. Ask a system administrator to widen your access, or accept the constraint as policy.

### 14.10 Reports timing out

- Narrow the date range and try again.
- Check whether you're including all branches; filter to one branch.
- For very large reports, schedule them to run overnight via Custom Reports → Schedule.

---

## 15. Glossary

| Term | Definition |
|---|---|
| **Branch** | A physical or organisational sub-unit of the company; the primary scoping unit |
| **Branch Access** | The set of branches a user can see; enforced on every list and detail page |
| **Calendar Policy** | Rule for computing daily rate (Calendar Days / Working Days / Fixed Basis) |
| **Comp-Off** | Compensatory time off, accrued for working on holidays or off-days |
| **End-of-Service** | A statutory benefit paid on offboarding per the active policy |
| **Excuse** | Hour-based exit during a working day |
| **Lifecycle Automation** | The seven automated HR transitions (offer → onboarding, etc.) |
| **Module Launcher** | The drawer listing ERP modules (HR active; CRM/Sales/Inventory placeholder) |
| **Onboarding Process** | A per-employee instance of an Onboarding Template |
| **Pre-Hire** | Employee state after offer acceptance, before onboarding completes |
| **Performance Improvement Plan (PIP)** | A formal plan to address underperformance |
| **Run Audit** | Append-only trail of every payroll-period action |
| **Salary Adjustment** | The audit record for a base-salary change; never edit salary directly |
| **Self-Service Portal** | The employee-facing app at https://hrmsportal.tecaxle.com/ |
| **Shift Assignment** | A link from a shift to an employee / department / branch with priority |
| **System Administrator** | The superuser role with full cross-company access |
| **TOTP (2FA)** | Time-based One-Time Password — used for two-factor authentication |
| **Workflow Definition** | The configured approval chain for a request type |

---

## Reference

| Resource | URL |
|---|---|
| **Admin Portal** (this manual) | https://hrms.tecaxle.com/ |
| Self-Service Portal (employees) | https://hrmsportal.tecaxle.com/ |

For employee and manager usage of the self-service portal, see **`SELF_SERVICE_USER_MANUAL.md`**.

For escalations, contact your system administrator or HR head.

---

**Document version:** v14.9
**Last updated:** 2026-04-26
**Owner:** TecAxle HRMS — HR Operations
