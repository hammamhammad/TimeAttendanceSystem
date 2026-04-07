# ClockN - Time & Attendance System
## Business Document Index

**Version**: 7.0  
**Last Updated**: April 2026  
**System Name**: ClockN Time & Attendance System  
**Document Type**: Business Requirements & Process Flows

---

## Document Index

| # | Document | Description |
|---|----------|-------------|
| 01 | [Executive Summary](01-EXECUTIVE-SUMMARY.md) | System overview, objectives, and stakeholders |
| 02 | [Authentication & Security](02-AUTHENTICATION-SECURITY.md) | Login, 2FA, sessions, permissions, and security flows |
| 03 | [Organization Management](03-ORGANIZATION-MANAGEMENT.md) | Branches, departments, employee structure |
| 04 | [Time & Attendance](04-TIME-ATTENDANCE.md) | Attendance tracking, transactions, calculations |
| 05 | [Mobile Attendance](05-MOBILE-ATTENDANCE.md) | GPS + NFC verification, mobile check-in/out |
| 06 | [Shift Management](06-SHIFT-MANAGEMENT.md) | Shift types, assignments, periods, swap requests |
| 07 | [Leave Management](07-LEAVE-MANAGEMENT.md) | Vacation types, balances, accruals, encashment |
| 08 | [Excuse Management](08-EXCUSE-MANAGEMENT.md) | Excuse policies, requests, balance tracking |
| 09 | [Remote Work](09-REMOTE-WORK.md) | Remote work policies, requests, approvals |
| 10 | [Approval Workflows](10-APPROVAL-WORKFLOWS.md) | Configurable multi-step approval engine |
| 11 | [Employee Self-Service Portal](11-SELF-SERVICE-PORTAL.md) | Employee & manager self-service features |
| 12 | [Notifications & Real-Time](12-NOTIFICATIONS.md) | SignalR, push notifications, announcements |
| 13 | [Recruitment & Hiring](13-RECRUITMENT-HIRING.md) | Requisitions, postings, candidates, interviews, offers |
| 14 | [Onboarding](14-ONBOARDING.md) | Templates, processes, tasks, documents |
| 15 | [Performance Management](15-PERFORMANCE-MANAGEMENT.md) | Reviews, goals, competencies, PIPs, 360 feedback |
| 16 | [Payroll & Compensation](16-PAYROLL-COMPENSATION.md) | Salary structures, payroll periods, allowances |
| 17 | [Employee Lifecycle](17-EMPLOYEE-LIFECYCLE.md) | Contracts, promotions, transfers, salary adjustments |
| 18 | [Offboarding](18-OFFBOARDING.md) | Resignations, terminations, clearance, final settlement |
| 19 | [Training & Development](19-TRAINING-DEVELOPMENT.md) | Courses, programs, enrollments, certifications |
| 20 | [Employee Relations](20-EMPLOYEE-RELATIONS.md) | Grievances, disciplinary actions, investigations |
| 21 | [Asset Management](21-ASSET-MANAGEMENT.md) | Asset inventory, assignments, maintenance |
| 22 | [Expense Management](22-EXPENSE-MANAGEMENT.md) | Expense claims, policies, reimbursements |
| 23 | [Loan Management](23-LOAN-MANAGEMENT.md) | Loan types, applications, repayments |
| 24 | [Benefits Management](24-BENEFITS-MANAGEMENT.md) | Benefit plans, enrollments, claims |
| 25 | [Succession Planning](25-SUCCESSION-PLANNING.md) | Talent profiles, career paths, key positions |
| 26 | [Surveys & Feedback](26-SURVEYS-FEEDBACK.md) | Survey templates, distribution, responses |
| 27 | [Analytics & Reporting](27-ANALYTICS-REPORTING.md) | Dashboards, custom reports, audit logs |
| 28 | [Document Management](28-DOCUMENT-MANAGEMENT.md) | Files, letters, company policies |
| 29 | [Background Jobs](29-BACKGROUND-JOBS.md) | Scheduled tasks, automated processing |
| 30 | [System Architecture](30-SYSTEM-ARCHITECTURE.md) | Technical architecture, deployment, integrations |

---

## Target Audience

- **Business Stakeholders**: Executive summary, feature overviews, and process flows
- **Project Managers**: Feature scope, dependencies, and integration points
- **Development Team**: Technical flows, API references, and architecture
- **QA Team**: Process flows for test case creation
- **End Users**: Feature descriptions and workflow understanding

## Flow Diagram Legend

Throughout these documents, flows are represented using Mermaid syntax:

```
[Action Box]     = Process step
{Decision}       = Decision point
((Start/End))    = Start or end of flow
-->              = Flow direction
```

**Status Color Coding**:
- Green = Success / Approved / Active
- Red = Failed / Rejected / Terminated
- Yellow = Pending / In Progress
- Blue = Informational / System Action
