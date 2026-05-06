# TecAxle HRMS — Self-Service Portal User Manual

**Audience:** All employees, team managers, branch and department heads

| Application | URL |
|---|---|
| **Self-Service Portal** (this manual) | https://hrmsportal.tecaxle.com/ |
| Admin Portal (HR / administrators) | https://hrms.tecaxle.com/ |

---

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Initial / Sample Login Credentials](#2-initial--sample-login-credentials)
3. [Navigating the Portal](#3-navigating-the-portal)
4. [Me Area](#4-me-area)
   - 4.1 My Portal (Employee Dashboard, My Profile)
   - 4.2 Time & Attendance (My Attendance, Attendance Corrections, Shift Swap Requests, My On-Call, My Timesheets)
   - 4.3 Leave & Requests (Vacation Requests, Excuse Requests, Remote Work Requests, My Compensatory Offs, My Leave Encashments)
5. [Pay Area](#5-pay-area) (My Payslips, My Salary, My Allowances, My Benefits)
6. [Services Area](#6-services-area)
   - 6.1 HR Services (My Resignation, My Documents, My Letters, My Expenses, My Loans, My Assets, My Grievances, My Disciplinary)
   - 6.2 Development (My Training, Training Catalog, My Certifications, My Career)
   - 6.3 Engagement (Announcements, My Surveys)
7. [Approvals Area](#7-approvals-area) (Pending Approvals, Manager Dashboard, Team Members)
8. [Common Employee Workflows](#8-common-employee-workflows)
9. [Common Manager Workflows](#9-common-manager-workflows)
10. [Notifications](#10-notifications)
11. [Frequently Asked Questions](#11-frequently-asked-questions)
12. [Status Reference](#12-status-reference)
13. [Troubleshooting](#13-troubleshooting)
14. [Glossary](#14-glossary)

---

## 1. Getting Started

### 1.1 Browser requirements

The self-service portal works in:

- **Google Chrome** (recommended) version 110 or later
- **Microsoft Edge** version 110 or later
- **Mozilla Firefox** version 110 or later
- **Apple Safari** version 16 or later

The portal is fully responsive: desktop, laptop, tablet, and modern phone browsers all work.

> There is no separate mobile app. On phones, open https://hrmsportal.tecaxle.com/ in your phone browser and add it to your home screen for one-tap access.

### 1.2 Signing in

1. Open https://hrmsportal.tecaxle.com/ in your browser.
2. Enter your **work email** and **password**.
3. Optionally tick **Remember me** so you stay signed in on this device.
4. Click **Login**.

### 1.3 First-time login

If this is your first sign-in, the system will redirect you to a **Change Password** screen.

1. Enter the temporary password you were given.
2. Choose a new password meeting the company password policy. Defaults are typically:
   - Minimum 8 characters (often more)
   - At least one uppercase letter, one digit, and one special character
   - Cannot match any of your last few passwords
3. Click **Change Password**. You are signed in immediately.

### 1.4 Two-factor authentication

If 2FA is enabled on your account:

1. After your password is accepted, you will be prompted for a 6-digit code.
2. Open your authenticator app (Google Authenticator, Microsoft Authenticator, Authy, 1Password) and enter the current code.
3. If you have lost your authenticator device, click **Use a backup code** and enter one of the backup codes you saved at enrolment. Each backup code is single-use.

To enable 2FA on your own account, go to your avatar → **Security** → **Enable 2FA** and scan the QR code with your authenticator app. Save the backup codes somewhere safe.

### 1.5 Forgot password

1. Click **Forgot password** on the login screen.
2. Enter your work email.
3. A reset link will be sent to your inbox.
4. Click the link, set a new password, and sign in.

If you do not receive the email within 5 minutes, check your Junk / Spam folder, verify the email matches HR's records, then contact HR.

### 1.6 Switching language

Use the language dropdown in the top bar (top-right) to toggle between **English** and **العربية (Arabic)**. The portal fully supports right-to-left layout in Arabic — sidebars, navigation arrows, and tables mirror automatically.

Your language choice is saved on your account and follows you across browsers and devices.

### 1.7 Signing out

Click your avatar (top-right) → **Sign out**. You are returned to the login screen.

For security, also sign out of any device that is not yours. If you forget, contact HR — a system administrator can revoke your sessions remotely.

---

## 2. Initial / Sample Login Credentials

> **Important.** These are the credentials seeded when the system is first set up or when sample data is loaded. After your organisation goes live, **HR will create real accounts for every employee** and disable / replace these defaults. If you are still using one of these credentials on the production system, change your password immediately and ask HR to provision your real account.

### 2.1 Sample employee accounts (self-service portal)

When sample data is loaded, the system seeds 50 employees across 5 branches (HQ Riyadh, Jeddah, Dammam, Madinah, Makkah) and 20 departments (4 per branch). All sample employees share the password **`Emp@123!`** and are flagged **Must Change Password** — they will be forced to set a new password at first login.

#### Branch Managers (1 per branch)

| Email | Name | Branch |
|---|---|---|
| `ahmed.rashid@company.com` | Ahmed Al-Rashid | HQ Riyadh |
| `khalid.otaibi@company.com` | Khalid Al-Otaibi | Jeddah |
| `mohammed.qahtani@company.com` | Mohammed Al-Qahtani | Dammam |
| `salma.khaldi@company.com` | Salma Al-Khaldi | Madinah |
| `fahad.harbi@company.com` | Fahad Al-Harbi | Makkah |

#### Department Managers — HQ Riyadh sample

| Email | Name | Department |
|---|---|---|
| `sara.fahad@company.com` | Sara Al-Fahad | HR |
| `omar.nasser@company.com` | Omar Al-Nasser | IT |
| `fatima.zahrani@company.com` | Fatima Al-Zahrani | Finance |
| `youssef.shamrani@company.com` | Youssef Al-Shamrani | Operations |

#### Regular employees

Sample employees follow the email pattern `{firstname}.{lastname}@company.com`, all with password `Emp@123!`. There are 5 regular employees per branch (25 in total).

### 2.2 Login pattern

```
Email:    {firstname}.{lastname}@company.com
Password: Emp@123!  (forced change on first login)
```

### 2.3 What happens on first login

1. The system accepts your email and temporary password.
2. You are immediately redirected to **Change Password**.
3. Choose a new password meeting policy.
4. You land on the **Employee Dashboard**.
5. If 2FA is required for your role (typically managers and above), you will also be guided through 2FA enrolment.

---

## 3. Navigating the Portal

The portal layout has four parts:

| Zone | What it does |
|---|---|
| **Logo strip** (top-left) | Click the gradient logo to open the **Module Launcher** (HR / CRM / Sales / Inventory) |
| **Sidebar** (left) | Menu items grouped under the active *Area* |
| **Top bar** (top) | Breadcrumb (left), notifications, language switcher, your avatar (right) |
| **Main content** | Your pages and forms |

### 3.1 Areas (top-level grouping)

The sidebar shows menu groups for **one area at a time**. Use the **Area Switcher** at the bottom of the sidebar to choose:

| Area | Covers |
|---|---|
| **Me** | Your dashboard, profile, attendance, leave & absence requests |
| **Pay** | Payslips, salary, allowances, benefits |
| **Services** | HR services, documents, training, engagement |
| **Approvals** | Pending approvals (for everyone) and team management (managers only) |

When you click a link, the portal switches automatically to the area that owns it. Your last-used area persists across sessions.

### 3.2 Sidebar collapse

Click the toggle in the sidebar header to collapse it to a 56-pixel icon-only strip — useful on smaller screens. Hover an icon to see its name. Your collapse preference persists.

### 3.3 Notifications

The bell icon in the top bar shows the count of unread notifications. Click it to see the notification panel. Each item shows:

- The event (request approved, letter ready, training session tomorrow, etc.)
- The timestamp
- A link to the related record

Notifications arrive in real time. Click an item to jump straight to the related page.

### 3.4 Language switcher

Toggle between English and Arabic in the top bar.

### 3.5 Module Launcher

Click the gradient logo at the top-left to see all installed ERP modules. **HR** is the active one — that is this portal. **CRM**, **Sales**, and **Inventory** are placeholders for future modules.

---

## 4. Me Area

The **Me** area is your personal workspace. It bundles three groups: My Portal, Time & Attendance, and Leave & Requests.

### 4.1 My Portal

#### Employee Dashboard

Your at-a-glance landing page showing:

- **Today's attendance status** — checked in / checked out, late, on remote, on leave
- **Leave balance summary** — annual, sick, casual (current entitled, accrued, used, remaining)
- **My pending requests** — vacations, excuses, expenses, letters waiting on approval
- **Upcoming events** — training sessions, expiring certifications, contract milestones
- **Recent payslips** — quick links to recently published payslips
- **Latest company announcements** — newest items from the company-wide feed
- **Quick action buttons** — Request Vacation, Request Excuse, Submit Correction, Submit Expense

The dashboard refreshes automatically. Numbers and counts are always specific to you.

#### My Profile

Your full personal record. Tabs:

##### Personal

- Full name (English and Arabic)
- Photo — click to upload a new one (JPG / PNG)
- Gender, marital status, nationality, religion, date of birth
- ID and passport numbers (read-only — managed by HR)

##### Contact

- Personal email, mobile number
- Current address, permanent address

##### Employment

- Branch, department, job title, hire date — read-only
- Contract type, probation status — read-only
- Line manager — read-only

##### Education

Multiple education records:
- Degree, field of study
- Institution
- Start year, graduation year
- Grade / GPA
- Country
- Optional certificate / degree document attachment

Click **Add Education** to enter a new record.

##### Work Experience

Prior employment records:
- Company, role
- Start date, end date
- Country
- Description of responsibilities
- Reason for leaving (optional)

##### Visas

Visa records (visible to you, primarily managed by HR):
- Country, visa type, visa number
- Issue date, expiry date
- Status

You will receive a notification before your visa expires (default 90, 60, 30, 15, and 7 days before).

##### Dependents

Spouse, children, parents — each with:
- Relation, name (EN/AR)
- Date of birth
- ID / passport
- Optional benefit-coverage flag

##### Emergency Contacts

Multiple contacts:
- Name, relation
- Phone, alternate phone
- Address (optional)

##### Bank Details

For payroll deposit:
- Bank name
- Account number / IBAN
- SWIFT code
- Account holder name

> Bank detail changes typically require HR approval before they take effect — you will see "Pending HR review" until the change is applied.

##### My Profile Changes

Pending changes you have submitted that are awaiting HR approval. Each entry shows:
- Field changed
- Old value → New value
- Submission date
- Approval status

### 4.2 Time & Attendance

#### My Attendance

A daily grid of your attendance for any date range.

**Columns:**

| Column | Meaning |
|---|---|
| **Date** | The day |
| **Day** | Monday / Tuesday / etc. |
| **Shift** | The shift you were assigned |
| **Check-In** | First check-in time of the day |
| **Check-Out** | Last check-out time of the day |
| **Total Worked** | Hours and minutes actually worked |
| **Late Min** | Minutes late beyond grace period |
| **Early-Out Min** | Minutes left early before shift end |
| **Overtime (Reg)** | Approved regular overtime |
| **Overtime (Premium)** | Approved premium overtime |
| **Status** | Present / Absent / Late / On Leave / Holiday / Weekend / Remote |
| **Comments** | Any notes from you, your manager, or HR |

**Date range:** use the date picker at the top to switch the range. Default is current month.

**Filters:** filter by status (e.g. show only Late or Absent days).

**Export:** click the export icon to download the displayed range as CSV.

**Click a row** to see the full transaction detail — every check-in, check-out, break-in, break-out for that day.

#### Attendance Corrections

If a check-in or check-out is wrong (forgot to scan, biometric device offline, manually adjusted by mistake), submit a correction:

1. Click **New Correction**.
2. Pick the date.
3. Pick the type of correction:
   - **Add transaction** — add a missing check-in / check-out / break
   - **Modify transaction** — change an existing time
   - **Remove transaction** — delete a wrong scan
4. Enter the correct details.
5. Add a **Reason** (mandatory, e.g. "Forgot to scan after meeting", "Biometric device was offline").
6. Optionally attach supporting evidence.
7. Submit.

The request goes to your manager (and possibly HR) through the approval workflow. The retroactive window — how far back you can go — is set by your administrator (typically 7–14 days).

After approval, the system **automatically recalculates** your working hours, late / early minutes, overtime, and final status for the affected day.

#### Shift Swap Requests

Swap a shift with a colleague:

1. Click **New Swap**.
2. Choose the date you want to swap.
3. Pick the colleague who will cover for you. The system filters to colleagues with compatible shifts.
4. Optionally pick the date you will cover for them in return.
5. Add a reason.
6. Submit.

The request needs:

1. Your colleague's **acceptance** (they receive a notification)
2. Your manager's (and possibly your colleague's manager's) **approval**

Once both are received, the swap is applied and both employees' attendance schedules are updated automatically.

#### My On-Call

If you are part of an on-call rotation, this page shows your upcoming on-call windows:
- Date range
- On-call type (e.g. Primary / Secondary / Backup)
- Coverage area
- Compensation rate (if applicable)

Conflicts with your approved leave are highlighted. Contact your manager to swap if needed.

#### My Timesheets

If your role requires project-time logging:

1. Click the active **Timesheet Period** at the top.
2. For each day in the period, allocate your worked hours across active projects:
   - Click a day to add an entry
   - Pick the project, enter hours, optionally add a description
3. **Save Draft** as you go.
4. At the end of the period, click **Submit** for manager approval.

Once submitted, you cannot edit until either:
- The manager **returns** the timesheet for correction
- The manager **approves** (approved timesheets are read-only)

### 4.3 Leave & Requests

#### Vacation Requests

Submit and track vacation requests.

**To submit a new request:**

1. Click **New Request**.
2. Select the **Vacation Type**. The portal lists only the types you are eligible for. Common types:

| Type | Notes |
|---|---|
| **Annual Leave** | Standard paid vacation |
| **Sick Leave** | May require medical certificate |
| **Casual Leave** | Short-notice personal time |
| **Maternity Leave** | Per company policy and statutory entitlement |
| **Paternity Leave** | Per company policy |
| **Bereavement Leave** | For immediate family loss |
| **Hajj Leave** | Where applicable; once-per-employment |
| **Marriage Leave** | One-time; per policy |
| **Compensatory Off** | Redeem accrued comp-off (worked-on-holiday) |
| **Unpaid Leave** | Does not deduct from balance; salary deducted |

3. Pick **Start Date** and **End Date**. The portal shows:
   - Your current balance for the type
   - Days requested
   - Projected balance after approval
4. Add a **Reason** (helps your manager).
5. Attach supporting documents (medical certificate, travel itinerary, etc.).
6. Click **Submit**.

**Tracking your request:**

Each request shows the workflow visualisation: every step in order, who has acted, and who is currently responsible. You receive notifications at each step.

**Status meanings:**

| Status | Meaning |
|---|---|
| **Pending** | Awaiting approval |
| **Approved** | Approved; balance deducted; attendance updated |
| **Rejected** | Rejected by an approver |
| **Returned for Correction** | Sent back to you with comments — edit and resubmit |
| **Cancelled** | You or HR cancelled it |

**Common rules:**

- Requests must be submitted within the configured planning window (e.g. up to 12 months in the future).
- Maximum days per request is limited by company policy.
- Sick leave often requires a medical certificate attachment.
- Some types do not deduct from balance (special leave, paid maternity, bereavement).

**Cancelling an approved vacation:**

If your plans change, open the approved request and click **Cancel** before the start date. The system automatically restores your balance and updates attendance.

**Editing a returned request:**

If your manager returns it for correction, open the request, read their comment, edit your details, and click **Resubmit**. The original audit trail is preserved.

#### Excuse Requests

Hour-based exits during a working day (medical appointment, urgent personal matter):

1. Click **New Excuse**.
2. Pick the **Date**.
3. Pick start and end **times** within the day.
4. Choose the **Excuse Type** per the company's policy:
   - Medical Appointment
   - Personal
   - Family
   - Government / Official Errand
5. Add a **Reason** and optional attachments.
6. Submit.

**Rules:**

- Excuse hour balance is governed by your company's excuse policy — typically a per-month or per-quarter cap.
- The portal shows your current balance and projected balance after approval.
- Backward and forward windows — how far in the past or future you can submit — are set by your administrator.

Approved excuses adjust your attendance for the affected hours; you will not be marked late or absent for those minutes.

#### Remote Work Requests

Request to work from home / remotely:

1. Click **New Request**.
2. Pick the date(s) — single day or range.
3. Optionally specify the **location** (city / address).
4. Pick the **type** (Full Day Remote / Hybrid Half-Day).
5. Add a reason.
6. Submit.

**Subject to your company's Remote Work Policy:**

- **Maximum days** — per week / month / quarter
- **Blackout windows** — peak season, year-end close, audit periods
- **Department eligibility** — some departments may not be eligible (e.g. front desk, manufacturing)
- **Required approver** — typically your direct manager

The portal shows your remaining remote-day quota. Submit early — popular dates fill up.

Approved remote-work days mark your attendance status as **Remote** on the affected day.

#### My Compensatory Offs

If you worked on a public holiday or a designated off-day, you accrue compensatory time. This page shows:

- **Accrued comp-off** — total earned, with date of earning and reason
- **Used comp-off** — already redeemed
- **Expiring comp-off** — comp-off close to expiry per policy
- **Expired comp-off** — past expiry; no longer redeemable

To **redeem** comp-off, submit a Vacation Request with type "Compensatory Off". The system deducts from your comp-off balance instead of annual leave.

#### My Leave Encashments

If your company allows encashing unused leave:

1. Click **New Encashment Request**.
2. Pick the **Vacation Type** (typically Annual Leave only).
3. Enter the **Days to Encash**.
4. The portal shows your daily rate and the total amount.
5. Add a reason.
6. Submit.

Once approved, the amount appears on your next payslip as a Leave Encashment line item.

---

## 5. Pay Area

### 5.1 My Payslips

A list of every payslip generated for you, with per-period detail.

> Payslips become visible only after the corresponding payroll period reaches **Approved** status (and typically after **Mark Paid**). Until then, the period is still being processed by HR — check back after the announced pay date.

**Click a period** to open the payslip detail.

#### Payslip components

##### Earnings

| Line | Source |
|---|---|
| **Basic Salary** | Your contracted base salary, pro-rated if you joined / left mid-period |
| **Housing Allowance** | If assigned |
| **Transport Allowance** | If assigned |
| **Communication Allowance** | If assigned |
| **Other Fixed Allowances** | Per active assignments |
| **Percentage-of-Basic Allowances** | Calculated from Basic |
| **Percentage-of-Gross Allowances** | Calculated from provisional gross |
| **Overtime — Regular** | Approved overtime hours × regular rate |
| **Overtime — Premium** | Approved premium overtime hours × premium rate |
| **Bonus** | One-off bonuses approved by HR |
| **Reimbursements** | Approved expense claims |
| **Leave Encashment** | Approved encashment requests |
| **Comp-Off Cash-Out** | Where applicable |

##### Deductions

| Line | Source |
|---|---|
| **Tax** | Progressive tax brackets applied to taxable allowances |
| **Social Insurance — Employee** | Employee social-insurance rate × insurable salary |
| **Insurance Premium** | Health / dental / life — your contribution |
| **Loan Instalment** | Active loans' monthly instalments |
| **Salary Advance Deduction** | Spread across the deduction range |
| **Absence Deduction** | Days absent × daily rate |
| **Other Deductions** | Manually added by HR (penalties, recoveries, etc.) |

##### Totals

- **Gross Salary** — sum of all earnings
- **Total Deductions** — sum of all deductions
- **Net Salary** — gross minus deductions; this is what is paid to your bank

##### Employer contributions (for your information)

- **Social Insurance — Employer** — what the company paid on your behalf
- **Insurance Premium — Employer** — employer's share of health insurance premium

#### Download

Each payslip can be downloaded as a **PDF** with the company logo and authorised signature. Click **Download PDF** at the top of the payslip detail.

#### Notes on every line

Every line item shows a **note** explaining how it was calculated. Click a line for the breakdown — for example:

> Housing Allowance: SAR 2,000 (Fixed amount per active assignment, effective from 2026-01-01)

> Overtime — Regular: SAR 450 = 5 hours × SAR 90/hour (Hourly rate = Basic / Hours-in-month × overtime multiplier 1.5)

This transparency is by design — every multiplier comes from configuration; nothing is hidden.

### 5.2 My Salary

Your current base salary and salary history. Each entry shows:
- Effective date
- Old salary → New salary
- Adjustment type (Promotion / Annual Review / Cost-of-Living / Performance / Other)
- Reason

For confidentiality, only your own record is shown. Salary information is not visible to peers.

### 5.3 My Allowances

Active allowances assigned to you:
- Allowance type (Housing, Transport, Communication, Education, etc.)
- Amount or percentage
- Basis (Fixed / Percentage of Basic / Percentage of Gross)
- Effective Start Date / End Date
- Status

If your role allows requesting allowances, this page also shows your **past allowance requests** with their workflow status.

### 5.4 My Benefits

Your enrolled benefit plans:

- **Health insurance** — provider, coverage tier, dependents covered, effective date, expiry
- **Dental insurance** — same
- **Life insurance** — coverage amount, beneficiary
- **Retirement / Provident Fund** — current balance, employee contribution, employer contribution

#### Submitting a claim

1. Click **New Claim** (where supported).
2. Pick the plan and claim type (Outpatient / Inpatient / Dental / Vision / Pharmacy).
3. Enter the claim amount and currency.
4. Attach receipts and supporting documents.
5. Submit.

Claims go through an approval workflow. Approved amounts are reimbursed via payroll or directly per the plan's terms.

#### Open enrolment

When an open-enrolment period is active (typically annual), you will see a banner with the period's dates and the available actions:
- Switch plans
- Add or remove dependents
- Change coverage tier

Outside the window, plan changes are not available except for **life-event qualifying changes** (marriage, birth, death of dependent, divorce) which HR enables manually — contact HR to trigger one.

---

## 6. Services Area

The **Services** area bundles three groups: HR Services, Development, and Engagement.

### 6.1 HR Services

#### My Resignation

Submit a resignation request:

1. Click **New Resignation**.
2. Pick your **Last Working Day** (must respect your contract's notice period).
3. State your **Reason** for leaving.
4. Submit.

The request goes to your manager and HR for approval through the configured workflow.

**What happens after approval:**

1. HR creates a **Termination** record (automatically if your company has enabled this automation).
2. A **Clearance Checklist** is created with default items (return assets, hand over work, knowledge transfer, etc.).
3. You are temporarily **suspended** — your portal access is disabled. Your data is retained.
4. Department heads, IT, and HR work through clearance items.
5. When all items are cleared, your **Final Settlement** is calculated:
   - Pro-rated last salary
   - Leave encashment for unused balance
   - End-of-Service Benefit per the active policy
   - Notice period payment
   - Outstanding loan / advance deductions
6. HR shares the Final Settlement with you, processes payment, and marks your record fully off-boarded.

You can track your offboarding progress in this page until your portal is suspended.

#### My Documents

Personal documents stored by HR (employment letter, ID copies, certifications) and any documents **you** uploaded.

**Tabs:**
- **All Documents** — everything visible to you
- **HR Uploaded** — documents added by HR
- **My Uploads** — documents you uploaded
- **Required Documents** — items HR has requested from you (not yet uploaded)

**To upload a document:**

1. Click **Upload Document**.
2. Pick the **Category** (ID, Certificate, Contract, Tax, Other).
3. Add a **Description**.
4. Optionally set an **Expiry Date** (for documents that expire).
5. Pick the file (PDF, DOC, DOCX, JPG, JPEG, PNG, XLSX up to the configured size limit, default 10 MB).
6. Click **Upload**.

You will receive expiry reminders before the date.

#### My Letters

Request HR-issued letters.

**Available letter types** (depends on your company's templates):

| Letter | Use |
|---|---|
| **Employment Certificate** | Confirms employment for visa, bank, etc. |
| **Salary Certificate** | Confirms salary for bank loans |
| **Experience Certificate** | Certifies role and tenure |
| **No Objection Certificate (NOC)** | For travel, second job, etc. |
| **Promotion Letter** | Internal record |

**To request a letter:**

1. Click **Request Letter**.
2. Pick the **Template**.
3. Fill any prompts:
   - Purpose (free text — what you need it for)
   - Addressee (name and title of the recipient)
   - Language (English / Arabic / both)
4. Submit.

HR reviews, generates the letter (with your details merged in), signs it, and uploads the PDF. You will be notified when it is ready and can download it from this page.

**Status:**
- **Pending** — HR has not yet processed
- **In Progress** — HR is generating
- **Ready** — Available for download
- **Rejected** — HR rejected (with comment)

#### My Expenses

Submit expense claims for reimbursement.

**To submit a claim:**

1. Click **New Claim**.
2. Pick a **Category** (Travel / Meals / Accommodation / Training / Office Supplies / Communication / Other).
3. Enter the **Date** of expense.
4. Enter the **Amount** and **Currency**.
5. Add a **Description**.
6. Attach receipts (PDF, JPG, PNG).
7. Submit.

Each claim goes through the approval workflow defined for expenses (typically your manager → finance). Approved amounts flow into your next payroll as a **Reimbursement** line.

**Per-category limits** are enforced by the company's expense policy — exceeding the limit is rejected with a clear message.

#### My Loans

Apply for company loans (housing, car, education, emergency, personal) per the loan policies your administrator has set up.

**To apply:**

1. Click **New Application**.
2. Pick the **Loan Type**. Only types you qualify for are shown — eligibility is checked against:
   - Minimum tenure with the company
   - Job grade (where applicable)
   - Outstanding loans (some types require no other active loans)
3. Enter the **Amount** and **Tenure (months)**.
4. The portal computes the indicative **monthly instalment** based on the loan policy.
5. Attach supporting documents (income certificate, marriage certificate for housing, etc.).
6. Submit.

**After approval:**
- The disbursement is processed via payroll or bank transfer.
- The instalments appear on your future payslips automatically.
- This page shows your **active loans**, repayment schedule, and remaining balance.

**Outstanding loans during offboarding** are deducted from your Final Settlement.

#### My Assets

Company-issued assets assigned to you (laptop, phone, vehicle, ID card, keys).

Each entry shows:
- Asset Tag, Serial Number
- Description, Category
- Assignment Date
- Expected Return Date (if temporary)
- Condition at Issue
- Status

If you need to **return an asset** (e.g. you got a new laptop), use the listed **Initiate Return** action and follow your company's process. On offboarding, asset return is part of your clearance checklist.

If an asset is **lost or damaged**, contact HR or IT immediately; do not delay the report.

#### My Grievances

Confidential channel for filing a workplace grievance.

**To file a grievance:**

1. Click **New Grievance**.
2. Pick a **Category**:
   - **Workplace** — environment, safety
   - **Manager** — relationship with line manager
   - **Peer** — peer conflict
   - **Policy** — disagreement with policy
   - **Compensation** — pay, allowances, benefits
   - **Other**
3. Pick **Severity** (Low / Medium / High / Critical).
4. Describe the issue (free text — be specific, dates and people if relevant).
5. Optionally attach evidence.
6. Click **Submit**.

**What happens next:**

- Your grievance is routed to HR (and only HR — not your manager unless you specify).
- An investigator is assigned.
- You can add comments and supplementary information at any time.
- HR investigates and proposes a resolution.
- The grievance is closed with an outcome.

**Confidentiality:** grievances are visible only to HR and the assigned investigator. They are not visible to your manager unless you explicitly include them.

#### My Disciplinary

Any disciplinary records on file involving you (warnings, suspensions). Each record shows:
- Type (Verbal Warning / Written Warning / Final Warning / Suspension)
- Date issued
- Effective date, expiry date (warnings often lapse after 6–12 months)
- Reason
- HR comments

You can **view** but not edit. To **appeal** a disciplinary action, contact HR within the appeal window (typically 7–14 days).

### 6.2 Development

#### My Training

Training sessions you have been enrolled in.

**Each entry shows:**
- Course name, category
- Session date / time / duration
- Instructor, location (or video link)
- Your enrolment status:
  - **Enrolled** — confirmed
  - **Waitlisted** — pending capacity
  - **Confirmed** — instructor / HR has confirmed
  - **Attended** — you joined the session
  - **Completed** — finished with completion criteria met
  - **No-Show** — did not attend
  - **Cancelled** — enrolment cancelled

**Mark sessions as completed** where applicable (some sessions auto-complete via attendance scan).

**Upcoming sessions** appear at the top with reminders sent before the date.

#### Training Catalog

Browse the full company training catalogue:
- Filter by category, delivery mode (Classroom / Online / Hybrid / Self-paced), duration
- Search by title
- See course details: description, prerequisites, certifications produced, cost

**Self-enrol** in available sessions where the policy permits — click **Enrol** on a session and confirm.

For sessions requiring approval, the request goes to your manager first.

#### My Certifications

Your earned credentials:
- Certification name, issuer
- Issue date, expiry date
- Linked course / program (if produced from training)
- Certificate document (download)

**Renewing certifications** appear with a warning before expiry — the system reminds you in advance.

#### My Career

Your career development view (visible if Succession Planning is configured for your company):
- **Current role** — your job title and grade
- **Next eligible role** — the role you are positioned to grow into
- **Required competencies** — what you need to develop
- **Competency gap** — your current vs. required level for each competency
- **Development plan** — recommended training, mentoring, projects

Use this page in your 1:1s with your manager to discuss growth.

### 6.3 Engagement

#### Announcements

Company-wide and targeted announcements from HR or management.

**Filters:**
- Category (Company-Wide / Department / Branch / Policy / IT / HR / Other)
- Date range

**Each announcement shows:**
- Title, body (rich text)
- Category, audience
- Posted date, posted by
- Acknowledgement required (yes / no)

**Acknowledgement-required announcements** display an "I have read and understood" button. You must click it before navigating away. Your acknowledgement is recorded with timestamp.

#### My Surveys

Active and past surveys you are invited to.

**To respond:**

1. Click **Respond** on an active survey.
2. Answer each question:
   - Single-choice
   - Multiple-choice
   - Likert scale (typically 1–5)
   - Free text
   - Number / Date
3. Required questions are marked. Optional questions can be skipped.
4. Click **Submit** when complete.

**Anonymity:** surveys flagged Anonymous strip your identity from the response. Surveys flagged Identified link the response to your employee record.

**Past surveys** show your submitted responses where applicable.

---

## 7. Approvals Area

### 7.1 Pending Approvals

**Visible to anyone** who has been routed an approval task — most commonly managers, but can include peers (peer review), department heads, branch managers, or designated approvers depending on the workflow.

**Each pending task shows:**
- The **requester** (employee)
- The **request type** (vacation, excuse, expense, salary advance, attendance correction, etc.)
- The **current step** you are responsible for
- The **submission timestamp** and any **timeout** countdown
- A **summary** of the request and any attachments
- A **workflow visualisation** showing every step, who acted, and who is current

**Filters:** request type, requester, branch, department, status, urgency.

**Actions:**

| Action | Effect |
|---|---|
| **Approve** | Moves the request to the next step (or terminal Approved state) |
| **Reject** | Terminates the request as Rejected; the requester is notified |
| **Return for Correction** | Sends the request back to the requester with a mandatory comment; the workflow is paused until they resubmit |
| **Delegate** | Assigns the task to another approver if you are unavailable |
| **Comment** | Add a comment without taking action |

You **must** add a comment when:
- Rejecting (so the requester knows why)
- Returning for correction (to tell them what to fix)

### 7.2 Manager (manager-only)

If you are a manager (department head, branch manager, or otherwise have direct reports), additional pages appear under the Approvals area.

#### Manager Dashboard

KPIs for your team:

- **Team size** — total reports, by status (Active / Suspended / Pre-Hire)
- **Today's attendance** — present, absent, late, on remote, on leave
- **This week's attendance** — average per day
- **Pending approvals** — your open tasks, by request type
- **Upcoming team vacations** — next 30 days
- **Overdue items** — overdue corrections, overdue tasks
- **Team announcements** — items relevant to your team

Click any tile to drill into the underlying records.

#### Team Members

A roster of your direct reports.

**For each member:**
- Name, photo, job title
- Branch, department
- Status (Active / Suspended / Pre-Hire)
- Today's attendance
- Current vacation status
- Contract end date (if approaching)
- Pending requests count

**Click into a member** to see deeper detail (subject to your branch and HR-permission scope):
- Attendance history (read-only)
- Leave balance
- Vacation requests
- Onboarding progress (if Pre-Hire)
- Certifications
- Performance reviews (if you are an authorised reviewer)

You **cannot edit** the underlying employee record — that lives in HR's admin portal. You can only **view, approve / reject requests**, and add comments.

---

## 8. Common Employee Workflows

### 8.1 Submit a vacation request

1. Sidebar → **Me → Vacation Requests** → **New Request**.
2. Pick **Vacation Type**. The portal shows your eligible types only.
3. Pick **Start Date** and **End Date**. The portal shows total days requested and your projected balance.
4. Add a **Reason** (helps your manager) and any attachments (medical, travel itinerary).
5. Click **Submit**.
6. Track the status on the same page. You will be notified when each approval step completes.

If your manager **returns it for correction**, open the request, read the comment, edit your details, and resubmit. The original audit trail is preserved.

### 8.2 Check today's attendance and fix a missed scan

1. Sidebar → **Me → My Attendance**. Today's row shows your current state.
2. If a check-in is missing or wrong, sidebar → **Me → Attendance Corrections** → **New Correction**.
3. Pick today's date, enter the correct times, add a reason ("Forgot to scan after meeting").
4. Submit. Your manager sees the correction in their pending approvals.
5. Once approved, your attendance is automatically recalculated.

### 8.3 Download last month's payslip

1. Sidebar → **Pay → My Payslips**.
2. Find the period in the list.
3. Click the row to open the payslip detail with line-item breakdown.
4. Click **Download PDF**.

If a payslip you expect is missing, the payroll period is likely still being processed — check back after the announced pay date.

### 8.4 Request a letter from HR

1. Sidebar → **Services → My Letters → Request Letter**.
2. Pick the template (e.g. **Employment Certificate**, **Salary Certificate**, **Experience Letter**).
3. Fill in any prompts (addressee, purpose, language).
4. Submit.
5. You will be notified when the letter is ready. Download it from the same page.

### 8.5 Resign

1. Sidebar → **Services → My Resignation → New Resignation**.
2. Pick your **Last Working Day** (respect your notice period).
3. Provide a **Reason**.
4. Submit.
5. Track approval. Once approved, HR will start your offboarding (clearance, suspension, settlement).

### 8.6 Apply for a loan

1. Sidebar → **Services → My Loans → New Application**.
2. Pick the **Loan Type** (only types you qualify for are shown).
3. Enter **Amount** and **Tenure (months)**.
4. The portal computes the indicative monthly instalment based on the loan policy.
5. Attach any required documents (income certificate, etc.).
6. Submit.
7. Once approved and disbursed, the instalments appear on your future payslips automatically.

### 8.7 Update your personal information

1. Sidebar → **Me → My Profile**.
2. Pick the relevant tab (Personal, Address, Bank Details, Dependents, …).
3. Click **Edit** on the field group.
4. Update and save.
5. Some changes are accepted instantly (phone, address); others require HR approval (typically bank details, marital status, dependents, ID changes). You will see "Pending HR review" until the change is applied.

### 8.8 Submit an expense claim

1. Sidebar → **Services → My Expenses → New Claim**.
2. Pick the **Category** (Travel, Meals, etc.).
3. Enter the **Date** of expense, **Amount**, **Currency**.
4. Add a **Description** ("Client lunch — Project X kickoff").
5. Attach receipts.
6. Submit.
7. Once approved, the amount appears on your next payslip as a Reimbursement line.

### 8.9 Enrol in a training session

1. Sidebar → **Services → Training Catalog**.
2. Filter / search to find a session.
3. Click into the session to see details.
4. Click **Enrol**.
5. If approval is required, the request goes to your manager.
6. Once confirmed, the session appears on your **My Training** page with reminders before the date.

### 8.10 File a confidential grievance

1. Sidebar → **Services → My Grievances → New Grievance**.
2. Pick the **Category** and **Severity**.
3. Describe the issue thoroughly — include dates, people, and what you would like to see resolved.
4. Attach evidence if available.
5. Submit.
6. HR receives the grievance confidentially. You will see status updates here as the investigation progresses.

### 8.11 Acknowledge a company policy

1. The bell shows a notification: "New policy: [Title] requires acknowledgement".
2. Open the announcement (or visit **Services → Announcements**).
3. Read the policy.
4. Click **I have read and understood**.
5. Your acknowledgement is recorded with timestamp.

---

## 9. Common Manager Workflows

### 9.1 Approve a team request

1. The bell shows a new notification: "[Employee] submitted a Vacation Request".
2. Click the notification — or open Sidebar → **Approvals → Pending Approvals**.
3. Open the request. Review:
   - Dates and reason
   - Attachments
   - Employee's current balance
   - Overlap with other team members' approved leave (avoid coverage gaps)
4. Choose **Approve**, **Reject**, **Return for Correction**, or **Delegate**. Add a comment.
5. The employee receives a notification with your decision.

### 9.2 Plan team coverage for the month

1. Sidebar → **Approvals → Manager Dashboard** to see today's snapshot.
2. Sidebar → **Approvals → Team Members** to inspect each report's leave plan.
3. Look for clashes — multiple approvals overlapping critical work.
4. If you need to adjust shift assignments or off-days, contact HR (the admin portal has the controls).

### 9.3 Delegate while you are away

**Per-task delegation:**

1. **Approvals → Pending Approvals** — for each open task, click **Delegate** and pick another approver (e.g. an acting manager).
2. The system enforces delegation depth — by default, the new approver cannot redelegate more than once further. Cycles (A → B → A) are rejected.

**Standing delegation (set by HR):**

For longer absences, ask HR to create a standing delegation assigning all your incoming tasks to an alternate for a date range.

### 9.4 Handle a "returned for correction" resubmission

If you returned a request and the employee resubmits, the resubmission appears as a new task in **Pending Approvals** with the original audit trail and the corrections clearly highlighted.

Each request type has a maximum-resubmissions cap (default 3); after that, the request must be rejected.

### 9.5 Review a team member's attendance

1. Sidebar → **Approvals → Team Members** → click the member.
2. Open the **Attendance** tab.
3. Review their daily attendance for any range.
4. If you see a pattern (consecutive late days, frequent absences), use it as input to your 1:1 conversation.

You cannot edit a team member's attendance directly — corrections go through them or through HR.

### 9.6 Approve a shift swap involving your team

1. Receive the notification or open **Approvals → Pending Approvals**.
2. Open the swap request. Verify:
   - Both employees have accepted
   - The swap does not break a coverage rule (e.g. minimum staffing)
   - No conflicting on-call assignments
3. Approve, reject, or return for correction.

### 9.7 Manage a remote-work request

1. Open the request.
2. Verify it fits the company's Remote Work Policy:
   - Within the maximum days per period
   - Not in a blackout window
   - Department is eligible
3. Approve, reject, or return for correction.

---

## 10. Notifications

The portal sends real-time notifications for:

| Event | Recipients |
|---|---|
| **Request Submitted** | Approvers and the requester |
| **Approval Pending** | Each newly-routed approver |
| **Request Approved** | The requester (and sometimes their manager) |
| **Request Rejected** | The requester |
| **Request Returned for Correction** | The requester |
| **Delegation Received** | The new approver |
| **Approval Reminder** | Approvers whose tasks are nearing timeout |
| **Letter Ready** | The requester |
| **Onboarding Task Assigned** | The employee |
| **Onboarding Task Overdue** | The employee and HR |
| **Training Session Reminder** | Enrolled employees and their manager |
| **Certification Expiring** | The certified employee |
| **Contract Expiring** | The employee and HR |
| **Visa Expiring** | The employee and HR |
| **Document Expiring** | The employee and HR |
| **Policy Acknowledgement Required** | All employees in scope |
| **Announcement Posted** | Targeted audience |
| **Survey Invitation** | Selected respondents |
| **Vacation Approaching** | The employee (1 day before) |
| **Payslip Available** | The employee |
| **Loan Disbursed** | The employee |
| **Expense Claim Reimbursed** | The employee |

Notifications are **bilingual** (matching your selected language). The bell badge shows the unread count; click any item to mark it read and navigate to the related record.

To mark all as read, click **Mark all as read** at the top of the notification panel.

---

## 11. Frequently Asked Questions

### My password is not accepted

- Confirm Caps Lock is off and you are using the right keyboard layout (some keys differ between English and Arabic).
- New passwords must meet the company minimum length and may require a mix of letters, numbers, and symbols. The exact rule is shown on the change-password screen.
- After several failed attempts your account is locked for a configured duration. Wait it out, or ask HR to unlock.

### Why can't I see my latest payslip?

The corresponding payroll period has not yet reached **Approved** status. Once your payroll administrator approves the period and marks it Paid, payslips become visible. Check back after the announced pay date.

### My vacation balance looks wrong

- Open **My Profile → Leave** (or **Me → My Vacation Requests**) and confirm the visible balance.
- The balance is `entitlement + accrued + carryover − used − pending`. A pending request is held against your balance until it is approved or rejected.
- If you believe a transaction is wrong, raise a **Grievance** with HR or contact your manager.

### Can I edit a request after submitting?

- **Pending request:** open it, click **Cancel**, then submit a new one. Some types support **Edit while pending** — check the actions menu.
- **Returned for correction:** open the request, edit the flagged fields, and resubmit. The audit trail is preserved.
- **Approved request:** generally cannot be edited. Contact HR for after-the-fact changes.

### How do I know who approves my request?

Open the request after submission; the **Workflow** tab shows every step in order — who approved, who is currently responsible, and any pending steps. Approver names are resolved at submission time so you see exactly who needs to act.

### My manager is on leave — will my request be stuck?

The approval workflow has timeout and escalation rules configured by HR. After a step's timeout, the task auto-escalates to the configured fallback approver (typically the manager's manager or HR). Your manager can also delegate the task before going on leave so a colleague can act on their behalf.

### I uploaded a document but it doesn't appear

- Confirm the file size is below the configured limit (typically 10 MB).
- Confirm the file type is supported: **PDF, DOC, DOCX, JPG, JPEG, PNG, XLSX**.
- Refresh the page; large uploads can take a few seconds.
- If still not visible, try a different browser or clear your browser cache.

### The interface is in the wrong language

Click the language switcher in the top bar (top-right) and pick the language you prefer. The choice persists across sessions.

### Notifications stopped arriving

- Click the bell — if older items are visible, the system is reaching you. If brand-new items are missing, check whether your browser is blocking the page from receiving live updates.
- As a fallback, refresh the page; the bell list is also fetched on every navigation.

### I don't see the Approvals area

You only see **Approvals → Pending Approvals** if at least one workflow has routed a task to you. If you are a manager but the area is missing, you may not yet be assigned as a Branch Manager or Department Manager — ask HR to update the org structure.

### I see a "Module Coming Soon" tile

The Module Launcher (gradient logo at top-left) lists all ERP modules. **HR** is the active one — that is this portal. **CRM**, **Sales**, and **Inventory** tiles are placeholders for future modules and are not yet available.

### How do I request to work from home for a single afternoon?

For a partial day, use **Excuse Requests** (hour-based) rather than Remote Work Requests (which are typically full-day). Submit an excuse for the afternoon hours with type "Personal" or whichever applies.

### What happens to my data if I leave the company?

- Your portal access is suspended on offboarding.
- Your employee record is **retained** (not deleted) for legal, audit, and re-hire purposes.
- Your payslips, contracts, certifications, and training records are kept indefinitely (per company retention policy).
- If you re-join, HR can reactivate your record rather than create a new one.

### Can my colleagues see my salary or payslips?

**No.** Salary and payslip information is visible only to:
- You
- HR Manager and Payroll Administrator roles
- Your manager (only your salary range / band, not exact figures, depending on company configuration)
- System Administrator

Peers and other employees in your branch / department cannot see your compensation.

### How do I see who my manager is?

Sidebar → **Me → My Profile → Employment**. Your line manager is listed under "Reports To". Their name and contact appear here.

### My personal email changed — can I update it?

- **Personal email** (not your work login email): yes, edit in **My Profile → Contact**. Some companies require HR approval.
- **Work login email**: no — contact HR. Changing the login email is an HR-controlled action because it affects authentication.

### I forgot to clock out yesterday — what do I do?

Submit an **Attendance Correction** for that day with the correct check-out time. Your manager will approve, and the system will recalculate your hours automatically.

### Can I claim multiple expense items in one claim?

It depends on your company's setup. Most companies prefer one claim per receipt for clarity. Check **Services → My Expenses** — if there is an "Add Item" button on the new-claim form, you can include multiple items.

---

## 12. Status Reference

### 12.1 Request statuses (all request types)

| Status | Meaning |
|---|---|
| **Draft** | You started but did not submit (some types support drafts) |
| **Pending** | Submitted; awaiting approval |
| **Approved** | All required approvals received; effect applied |
| **Rejected** | Rejected by an approver — terminal |
| **Returned for Correction** | Sent back to you with comments — edit and resubmit |
| **Resubmitted** | You resubmitted; back to Pending |
| **Cancelled** | You cancelled (or HR cancelled on your behalf) |

### 12.2 Attendance statuses (per day)

| Status | Meaning |
|---|---|
| **Present** | Worked the shift normally |
| **Absent** | No transaction; not on leave or holiday |
| **Late** | Worked, but checked in past grace period |
| **On Leave** | Approved vacation / excuse / remote work covers the day |
| **Holiday** | Public holiday — no expectation to work |
| **Weekend** | Off day per shift |
| **Remote** | Approved remote work day |
| **Override** | Manual administrator adjustment in effect |

### 12.3 Payroll period statuses (which controls payslip visibility)

| Status | Payslip visible to you? |
|---|---|
| **Draft** | No |
| **Processing** | No |
| **Processed** | No (HR is reviewing) |
| **Approved** | Yes (typically the system reveals payslips at this stage) |
| **Paid** | Yes — record locked, fully final |

### 12.4 Onboarding task statuses (if you are pre-hire)

| Status | Meaning |
|---|---|
| **Not Started** | Task is assigned to you but you have not begun |
| **In Progress** | You started but did not complete |
| **Completed** | Done |
| **Skipped** | HR marked it not applicable |
| **Overdue** | Past target date |

---

## 13. Troubleshooting

### 13.1 Can't sign in

- Confirm you are at https://hrmsportal.tecaxle.com/ (not the admin portal).
- Confirm Caps Lock is off.
- Confirm the email is correct (typically your full company email, not just your username).
- Reset your password using **Forgot password** if you are unsure.

### 13.2 Page is blank / loads forever

- Refresh the page (F5 / Ctrl+R).
- Try a different browser or an Incognito / Private window (rules out browser extensions).
- Clear your browser cache for the site.
- Check whether your internet connection is working — open another website.

### 13.3 Can't submit a form

- Confirm all required fields (marked `*`) are filled in.
- Look for inline error messages in red.
- For dates, confirm start date is before end date.
- If a field says "Pending HR approval", that's not an error — your prior change is awaiting review.

### 13.4 Wrong language

Click the language switcher in the top bar (top-right). The portal will reload in the chosen language.

### 13.5 RTL layout looks wrong in Arabic

The portal supports RTL natively. If something looks misaligned:
- Refresh the page.
- Confirm you are on the latest version (ask IT to clear the application cache for your account).
- Report the specific page to HR / IT.

### 13.6 Notifications not arriving

- Click the bell — see if older items are visible.
- Try refreshing the page; this fetches notifications via a fallback.

### 13.7 Can't see my team's attendance (managers)

- You only see direct reports — peers and senior staff are not visible.
- Confirm you are listed as the manager for the people you are expecting to see. Ask HR if not.

### 13.8 Approval action doesn't appear

- Confirm the request is on a step where **you** are the current approver.
- If a colleague delegated to you, confirm the delegation is still active.
- Refresh the page — task status may have changed.

### 13.9 Lost my 2FA device and used all backup codes

Contact HR immediately. A system administrator can disable 2FA on your account so you can sign in with just your password, after which you can re-enable 2FA with a new device.

---

## 14. Glossary

| Term | Definition |
|---|---|
| **Attendance Correction** | A request to fix a wrong / missing check-in or check-out |
| **Comp-Off** | Compensatory time off, accrued for working on holidays or off-days |
| **Delegation** | Re-assigning your incoming approval task to another approver |
| **Encashment** | Converting unused leave to cash (paid via payslip) |
| **End-of-Service** | A statutory benefit paid on offboarding |
| **Excuse** | Hour-based exit during a working day |
| **Geofence** | A geographic boundary around a branch (used as branch metadata) |
| **Grievance** | A confidential complaint filed with HR |
| **Module Launcher** | The drawer listing ERP modules (HR active; others placeholder) |
| **Performance Improvement Plan (PIP)** | A formal plan to address underperformance |
| **Pre-Hire** | Your status after offer acceptance, before onboarding completes |
| **Remote Work Request** | A request to work from home / off-site |
| **Resubmit** | Re-submitting a request that was returned for correction |
| **Return for Correction** | The approver sent your request back with comments |
| **Self-Service Portal** | This portal — at https://hrmsportal.tecaxle.com/ |
| **Shift Swap** | Exchanging a shift with a colleague |
| **Suspended** | Your portal access is disabled (typically during offboarding) |
| **Timesheet** | Per-period log of hours worked, allocated to projects |
| **TOTP (2FA)** | Time-based One-Time Password — used for two-factor authentication |
| **Workflow** | The approval chain a request goes through |

---

## Reference

| Resource | URL |
|---|---|
| **Self-Service Portal** (this manual) | https://hrmsportal.tecaxle.com/ |
| Admin Portal (HR / administrators) | https://hrms.tecaxle.com/ |

For HR / administrator features (managing employees, payroll, settings, reports), see **`ADMIN_USER_MANUAL.md`**.

For help and questions:
- **Technical issues:** contact your IT helpdesk
- **HR issues:** contact your HR officer
- **Manager / approver questions:** speak to your line manager

---

**Document version:** v14.9
**Last updated:** 2026-04-26
**Owner:** TecAxle HRMS — HR Operations
