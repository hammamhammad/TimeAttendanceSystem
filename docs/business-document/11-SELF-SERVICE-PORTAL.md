# 11 - Employee Self-Service Portal

## 11.1 Overview

The Employee Self-Service (ESS) Portal is a separate Angular application that enables employees to manage their own HR-related tasks and managers to handle team approvals. It runs independently from the admin portal on a different port/domain.

## 11.2 Portal Features

### For All Employees
| Feature | Description |
|---------|-------------|
| Employee Dashboard | Personal stats, leave balances, recent activity |
| My Attendance | View personal attendance records and history |
| My Profile | View/update personal information |
| Vacation Requests | Create, view, edit, cancel leave requests |
| Excuse Requests | Create and track excuse requests |
| Remote Work Requests | Request and manage remote work days |
| Fingerprint Requests | Request fingerprint enrollment/repair |
| Notifications | Real-time notifications via SignalR |

### For Managers (Additional)
| Feature | Description |
|---------|-------------|
| Manager Dashboard | Team stats, pending approvals count |
| Team Members | View team hierarchy and details |
| Pending Approvals | Approve/reject team member requests |
| Approval History | View past approval decisions |

## 11.3 Employee Dashboard Flow

```mermaid
graph TD
    A((Employee Logs In)) --> B[GET /api/v1/portal/employee-dashboard]
    
    B --> C[Load Dashboard Data]
    C --> D[Attendance Statistics]
    D --> D1[Present Days This Month]
    D --> D2[Absent Days]
    D --> D3[Late Arrivals]
    D --> D4[Average Working Hours]
    
    C --> E[Leave Balances]
    E --> E1[Annual Leave: 13 remaining]
    E --> E2[Sick Leave: 28 remaining]
    E --> E3[Personal Leave: 3 remaining]
    
    C --> F[Recent Activity]
    F --> F1[Last Check-in: Today 08:15]
    F --> F2[Vacation Request: Approved]
    F --> F3[Excuse Request: Pending]
    
    C --> G[Upcoming Events]
    G --> G1[Vacation: Apr 10-12]
    G --> G2[Public Holiday: Apr 23]
    
    C --> H[Pending Requests Count]
    H --> H1[Pending Vacations: 1]
    H --> H2[Pending Excuses: 0]
    
    D1 --> I((Dashboard Displayed))
    E1 --> I
    F1 --> I
    G1 --> I
    H1 --> I
```

## 11.4 Manager Dashboard Flow

```mermaid
graph TD
    A((Manager Logs In)) --> B{Is Manager?}
    B -->|No| C[Show Employee Dashboard Only]
    B -->|Yes| D[GET /api/v1/portal/manager-dashboard]
    
    D --> E[Load Manager Data]
    
    E --> F[Team Statistics]
    F --> F1[Direct Reports: 8]
    F --> F2[Indirect Reports: 15]
    F --> F3[Present Today: 6/8]
    
    E --> G[Pending Approvals]
    G --> G1[Vacation Requests: 3]
    G --> G2[Excuse Requests: 1]
    G --> G3[Remote Work Requests: 2]
    
    E --> H[Team Attendance Today]
    H --> H1[Employee 1: Present 08:00]
    H --> H2[Employee 2: Late 09:30]
    H --> H3[Employee 3: On Leave]
    H --> H4[Employee 4: Absent]
    
    E --> I[Team Members List]
    I --> I1[Name, Department, Status, Actions]
    
    F1 --> J((Manager Dashboard Displayed))
    G1 --> J
    H1 --> J
    I1 --> J
```

## 11.5 Employee Vacation Request Flow (Self-Service)

```mermaid
graph TD
    A((Employee Opens Vacation Requests)) --> B[View My Vacation Requests List]
    B --> C[GET /api/v1/employee-vacations/my-requests]
    C --> D[Display Request History with Status]
    
    D --> E{Action}
    
    E -->|Create New| F[Click Create New Request]
    F --> G[Select Vacation Type]
    G --> H[View Current Balance for Type]
    H --> I[Select Start Date]
    I --> J[Select End Date]
    J --> K[System Shows: Total Days = X business days]
    K --> L[Enter Reason]
    L --> M[POST /api/v1/employee-vacations]
    M --> N[Request Created: Pending]
    N --> O[Notification Sent to Manager]
    
    E -->|View| P[Click on Existing Request]
    P --> Q[View Details: Dates, Status, Approval History]
    Q --> R[See Workflow Steps and Current Step]
    
    E -->|Edit| S{Status = Pending?}
    S -->|Yes| T[Modify Dates/Reason]
    T --> U[PUT /api/v1/employee-vacations/{id}]
    S -->|No| V[Cannot Edit: Already Processed]
    
    E -->|Cancel| W{Can Cancel?}
    W -->|Pending| X[DELETE /api/v1/employee-vacations/{id}]
    X --> Y[Status: Cancelled, Balance Restored]
    W -->|Approved Future| Z[Submit Cancellation Request]
    W -->|Past| AA[Cannot Cancel]
    
    O --> AB((Action Complete))
    R --> AB
    U --> AB
    Y --> AB
```

## 11.6 Manager Approval Flow (Self-Service)

```mermaid
graph TD
    A((Manager Opens Pending Approvals)) --> B[GET /api/v1/portal/pending-approvals]
    B --> C[Display Pending Requests]
    C --> D[Grouped by Type: Vacation, Excuse, Remote Work]
    
    D --> E[Manager Selects a Request]
    E --> F[View Full Request Details]
    F --> G[Employee Name, Dates, Balance, Reason]
    G --> H[View Employee's History for Context]
    
    H --> I{Decision}
    
    I -->|Approve| J[Optional: Add Comment]
    J --> K[POST /api/v1/portal/approve]
    K --> L[Workflow Advances]
    L --> M{Final Step?}
    M -->|Yes| N[Request Fully Approved]
    N --> O[Notify Employee: Approved]
    M -->|No| P[Moves to Next Approver]
    P --> Q[Notify Next Approver]
    
    I -->|Reject| R[Enter Rejection Reason - Required]
    R --> S[POST /api/v1/portal/reject]
    S --> T[Workflow Terminated]
    T --> U[Notify Employee: Rejected with Reason]
    
    O --> V((Approval Complete))
    Q --> V
    U --> V
```

## 11.7 My Attendance View Flow

```mermaid
graph TD
    A((Employee Views My Attendance)) --> B[GET /api/v1/portal/my-attendance]
    B --> C[Select Month/Year]
    
    C --> D[Display Monthly Calendar View]
    D --> E[Color-Coded Days]
    E --> E1[Green: Present]
    E --> E2[Red: Absent]
    E --> E3[Yellow: Late]
    E --> E4[Blue: On Leave]
    E --> E5[Gray: Weekend/Holiday]
    
    D --> F[Display Attendance Table]
    F --> G[For Each Working Day:]
    G --> G1[Date, Status, Check-In Time]
    G --> G2[Check-Out Time, Working Hours]
    G --> G3[Overtime Hours, Late Minutes]
    
    D --> H[Monthly Summary]
    H --> H1[Total Present Days: 20]
    H --> H2[Total Absent Days: 1]
    H --> H3[Total Late Days: 2]
    H --> H4[Total Working Hours: 164.5]
    H --> H5[Total Overtime: 8.5 hours]
    
    G1 --> I((Attendance Displayed))
    H1 --> I
```

## 11.8 My Profile Flow

```mermaid
graph TD
    A((Employee Opens Profile)) --> B[GET /api/v1/portal/my-profile]
    
    B --> C[Display Profile Sections]
    
    C --> D[Personal Information]
    D --> D1[Name, Employee Number, National ID]
    D --> D2[Date of Birth, Gender, Nationality]
    D --> D3[Marital Status, Phone, Email]
    
    C --> E[Job Information Read-Only]
    E --> E1[Job Title, Department, Branch]
    E --> E2[Manager Name, Hire Date]
    E --> E3[Employment Type, Job Grade]
    
    C --> F[Contact Information]
    F --> F1[Phone Number, Personal Email]
    F --> F2[Address]
    
    C --> G{Edit Profile?}
    G -->|Yes| H[Update Allowed Fields]
    H --> H1[Phone Number]
    H --> H2[Personal Email]
    H --> H3[Emergency Contact]
    H --> I[PUT /api/v1/portal/my-profile]
    I --> J[Profile Updated]
    
    G -->|Change Password| K[Open Change Password Modal]
    K --> L[Enter Current Password]
    L --> M[Enter New Password]
    M --> N[Confirm New Password]
    N --> O[PUT /api/v1/auth/change-password]
    O --> P{Success?}
    P -->|Yes| Q[Password Changed]
    P -->|No| R[Show Validation Errors]
    
    J --> S((Profile Action Complete))
    Q --> S
    R --> S
```

## 11.9 Fingerprint Request Flow

```mermaid
graph TD
    A((Employee Needs Fingerprint Service)) --> B[Navigate to Fingerprint Requests]
    B --> C[View Existing Requests]
    
    C --> D[Click Create New Request]
    D --> E[Select Request Type]
    E --> E1[Enrollment - New Employee]
    E --> E2[Update - Change Fingerprint]
    E --> E3[Repair - Device Issue]
    E --> E4[Replacement - Device Replacement]
    
    E1 --> F[Select Preferred Date]
    E2 --> F
    E3 --> F
    E4 --> F
    
    F --> G[Select Preferred Time Slot]
    G --> H[Enter Additional Notes]
    H --> I[POST /api/v1/fingerprint-requests]
    
    I --> J[Request Created: Pending]
    J --> K[HR Notified]
    
    K --> L[HR Assigns Technician]
    L --> M[Status: InProgress]
    M --> N[Technician Completes Service]
    N --> O[Technician Adds Notes]
    O --> P[Status: Completed]
    P --> Q[Notify Employee: Fingerprint Service Complete]
    
    Q --> R((Request Fulfilled))
```

## 11.10 Real-Time Notification Flow in Portal

```mermaid
graph TD
    A((User Logs In to Portal)) --> B[Establish SignalR Connection]
    B --> C[Join User-Specific Notification Group]
    
    C --> D[Listen for Events]
    
    D --> E{Notification Received}
    
    E -->|RequestSubmitted| F[Show: Your request has been submitted]
    E -->|RequestApproved| G[Show: Your request has been approved]
    E -->|RequestRejected| H[Show: Your request has been rejected]
    E -->|ApprovalPending| I[Show: New request awaiting your approval]
    E -->|DelegationReceived| J[Show: Approval delegated to you]
    E -->|ApprovalReminder| K[Show: Reminder - pending approval]
    
    F --> L[Update Badge Count]
    G --> L
    H --> L
    I --> L
    J --> L
    K --> L
    
    L --> M[User Clicks Notification]
    M --> N[Navigate to Related Page via Action URL]
    N --> O[Mark Notification as Read]
    O --> P[Update Unread Count]
    
    P --> D
```

## 11.11 Portal Navigation Structure

```
Self-Service Portal Layout:
===========================

Sidebar Navigation:
+-----------------------------------+
| Employee Name & Photo             |
| Role: Employee / Manager          |
+-----------------------------------+
| Dashboard                         |
| My Attendance                     |
| My Profile                        |
+-----------------------------------+
| Requests                          |
|   - Vacation Requests             |
|   - Excuse Requests               |
|   - Remote Work Requests          |
|   - Fingerprint Requests          |
+-----------------------------------+
| (Manager Only)                    |
|   Manager Dashboard               |
|   Team Members                    |
|   Pending Approvals               |
+-----------------------------------+
| Notifications (with badge count)  |
+-----------------------------------+
| Logout                            |
+-----------------------------------+
```
