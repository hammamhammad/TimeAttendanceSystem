# 27 - Analytics & Reporting

## 27.1 Overview

The analytics and reporting module provides comprehensive dashboards, custom report generation, scheduled report delivery, audit logging, and data export capabilities across all system modules.

## 27.2 Features

| Feature | Description |
|---------|-------------|
| Admin Dashboard | Organization-wide statistics and KPIs |
| Custom Reports | User-defined report templates |
| Scheduled Reports | Automated report generation and delivery |
| Audit Logs | Complete audit trail of all system changes |
| Data Export | CSV/Excel export for all reports |
| Analytics Snapshots | Periodic data snapshots for trend analysis |
| Session Reports | Active sessions and login history |
| Saved Dashboards | Custom dashboard configurations |

## 27.3 Entities

| Entity | Key Fields |
|--------|------------|
| AuditLog | UserId, Action, EntityType, EntityId, Timestamp, IpAddress |
| AuditChange | AuditLogId, PropertyName, OldValue, NewValue |
| CustomReportDefinition | Name, DataSource, Columns[], Filters[], CreatedBy |
| ScheduledReport | ReportId, Frequency, Recipients, NextRun, Format |
| AnalyticsSnapshot | SnapshotDate, Module, MetricName, MetricValue |
| SavedDashboard | UserId, Name, Widgets[], Layout |

## 27.4 Admin Dashboard Data Flow

```mermaid
graph TD
    A((Admin Opens Dashboard)) --> B[GET /api/v1/dashboard]
    
    B --> C[Organization Stats]
    C --> C1[Total Employees: 250]
    C --> C2[Active: 240 | Inactive: 10]
    C --> C3[New Hires This Month: 5]
    C --> C4[Departures This Month: 2]
    
    B --> D[Attendance Stats Today]
    D --> D1[Present: 210 85%]
    D --> D2[Late: 15 6%]
    D --> D3[Absent: 8 3%]
    D --> D4[On Leave: 12 5%]
    D --> D5[Remote: 5 2%]
    
    B --> E[Leave Stats]
    E --> E1[Pending Requests: 12]
    E --> E2[Approved This Week: 8]
    E --> E3[Most Requested Type: Annual]
    
    B --> F[Approval Stats]
    F --> F1[Pending Approvals: 18]
    F --> F2[Avg Approval Time: 1.5 days]
    
    B --> G[Weekly Attendance Trend]
    G --> H[Line Chart: Mon-Sun Attendance %]
    
    B --> I[Department Breakdown]
    I --> J[Bar Chart: Attendance by Department]
    
    C1 --> K((Dashboard Rendered))
    D1 --> K
    E1 --> K
    F1 --> K
    H --> K
    J --> K
```

## 27.5 Audit Log Flow

```mermaid
graph TD
    A((Any Data Modification)) --> B[ChangeTrackingService Intercepts]
    B --> C[Capture Before Values]
    C --> D[Capture After Values]
    
    D --> E[Create AuditLog Record]
    E --> E1[User: Who made the change]
    E --> E2[Action: Create/Update/Delete]
    E --> E3[Entity: What was changed]
    E --> E4[Timestamp: When]
    E --> E5[IP Address: From where]
    
    E1 --> F[Create AuditChange Records]
    F --> G[For Each Changed Property]
    G --> H[PropertyName: Status]
    H --> I[OldValue: Pending]
    I --> J[NewValue: Approved]
    
    J --> K((Audit Trail Saved))
    
    subgraph "Viewing Audit Logs"
        L[Admin Opens Audit Logs]
        L --> M[GET /api/v1/audit-logs]
        M --> N[Filter by: Date, User, Entity, Action]
        N --> O[Display Log Entries]
        O --> P[Click Entry for Detail]
        P --> Q[Show Before/After Comparison]
    end
```

## 27.6 Custom Report Creation Flow

```mermaid
graph TD
    A((Admin Creates Custom Report)) --> B[Select Data Source]
    B --> B1[Attendance Records]
    B --> B2[Leave Records]
    B --> B3[Employee Data]
    B --> B4[Payroll Data]
    
    B1 --> C[Select Columns]
    B2 --> C
    B3 --> C
    B4 --> C
    
    C --> D[Employee Name, Department, Date, Status, Hours, etc.]
    
    D --> E[Add Filters]
    E --> E1[Date Range: Required]
    E1 --> E2[Branch: Optional]
    E2 --> E3[Department: Optional]
    E3 --> E4[Status: Optional]
    
    E4 --> F[Add Grouping]
    F --> F1[Group By: Department]
    F1 --> F2[Then By: Employee]
    
    F2 --> G[Add Calculations]
    G --> G1[Sum Working Hours]
    G1 --> G2[Average Late Minutes]
    G2 --> G3[Count Absences]
    
    G3 --> H[Save Report Definition]
    H --> I[POST /api/v1/custom-reports]
    
    I --> J{Schedule?}
    J -->|Yes| K[Set Frequency: Daily/Weekly/Monthly]
    K --> L[Set Recipients: Email List]
    L --> M[Set Format: CSV/PDF]
    M --> N[ScheduledReportExecutionJob Runs It]
    
    J -->|No| O[Run On-Demand]
    O --> P[Generate Report Data]
    P --> Q{Output}
    Q -->|View| R[Display in Browser]
    Q -->|Export| S[Download CSV/Excel]
    
    N --> T((Report Scheduled))
    R --> T
    S --> T
```

## 27.7 Analytics Snapshot Flow

```mermaid
graph TD
    A((AnalyticsSnapshotJob - Nightly)) --> B[Capture Key Metrics]
    
    B --> C[Attendance Metrics]
    C --> C1[Attendance Rate: 92%]
    C --> C2[Average Late Minutes: 12]
    C --> C3[Average Working Hours: 7.8]
    
    B --> D[Leave Metrics]
    D --> D1[Active Leave Requests: 8]
    D --> D2[Average Balance: 14 days]
    
    B --> E[Employee Metrics]
    E --> E1[Headcount: 250]
    E --> E2[Turnover Rate: 5%]
    E --> E3[Avg Tenure: 3.2 years]
    
    B --> F[Payroll Metrics]
    F --> F1[Total Payroll: SAR 2.1M]
    F --> F2[Avg Salary: SAR 8,400]
    
    C1 --> G[Save AnalyticsSnapshot Records]
    D1 --> G
    E1 --> G
    F1 --> G
    
    G --> H((Snapshot Saved))
    
    subgraph "Monthly Rollup"
        I[MonthlyAnalyticsRollupJob]
        I --> J[Aggregate Daily Snapshots]
        J --> K[Calculate Monthly Averages]
        K --> L[Store Monthly Summary]
    end
```

## 27.8 Report Types Reference

| Report | Data Source | Key Metrics |
|--------|-----------|-------------|
| Attendance Summary | AttendanceRecords | Present/Absent/Late counts, working hours |
| Attendance Detail | AttendanceRecords + Transactions | Individual check-in/out times |
| Leave Summary | EmployeeVacations + LeaveBalances | Balances, usage by type |
| Overtime Report | AttendanceRecords | Regular/premium overtime hours |
| Payroll Report | PayrollRecords | Gross/net salary, deductions |
| Headcount Report | Employees | By branch, department, status |
| Turnover Report | Employees + Terminations | Hire/exit rates by period |
| Training Report | TrainingEnrollments | Completion rates, costs |
| Recruitment Report | JobApplications + Offers | Pipeline, time-to-hire |
| Audit Report | AuditLogs | System changes by user/entity |

## 27.9 Session Management & Login History

```mermaid
graph TD
    A((Admin Views Sessions)) --> B[GET /api/v1/sessions/active]
    B --> C[Display Active Sessions Table]
    C --> D[User, IP Address, Device, Started, Last Active]
    
    D --> E{Admin Action}
    E -->|View History| F[GET /api/v1/sessions/history]
    F --> G[Login/Logout History with Timestamps]
    
    E -->|Terminate Session| H[Force Logout Specific User]
    H --> I[Blacklist Their Tokens]
    I --> J[User Must Re-Login]
    
    E -->|Export| K[Download Session Log CSV]
    
    G --> L((Report Generated))
    J --> L
    K --> L
```
