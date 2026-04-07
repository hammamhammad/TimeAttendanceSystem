# 09 - Remote Work Management

## 9.1 Overview

The remote work management module enables organizations to configure remote work policies, allow employees to submit remote work requests, and track remote work through approval workflows. It supports multiple work location types and configurable blackout periods.

## 9.2 Features

| Feature | Description |
|---------|-------------|
| Remote Work Policies | Configure max days per week/month, notice periods |
| Work Location Types | Office, Remote, Field Work, Client Site |
| Remote Work Requests | Submit and track remote work requests |
| Blackout Periods | Define periods when remote work is not allowed |
| Department Eligibility | Configure which departments can work remotely |
| Approval Workflow | Multi-step approval process |
| Calendar Integration | Visual view of remote work days |

## 9.3 Entities

| Entity | Key Fields |
|--------|------------|
| RemoteWorkPolicy | Name, MaxDaysPerWeek, MaxDaysPerMonth, NoticePeriodDays, RequiresApproval, EligibleDepartments, BlackoutPeriods, IsActive |
| RemoteWorkRequest | EmployeeId, PolicyId, RequestedDate, WorkLocationType, Reason, Status |

## 9.4 Remote Work Policy Configuration Flow

```mermaid
graph TD
    A((Admin Creates Policy)) --> B[Enter Policy Details]
    B --> B1[Name: Standard Remote Work Policy]
    B1 --> B2[Max Days Per Week: 2]
    B2 --> B3[Max Days Per Month: 8]
    B3 --> B4[Notice Period: 2 days in advance]
    
    B4 --> C[Set Eligible Departments]
    C --> C1[IT Department: Eligible]
    C1 --> C2[Finance: Eligible]
    C2 --> C3[Operations: Not Eligible]
    
    C3 --> D[Set Blackout Periods]
    D --> D1[Year-End Closing: Dec 25 - Jan 5]
    D1 --> D2[Quarterly Review: Last week of quarter]
    
    D2 --> E[Set Work Location Options]
    E --> E1[Remote - Home]
    E1 --> E2[Field Work]
    E2 --> E3[Client Site]
    
    E3 --> F[POST /api/v1/remote-work-policies]
    F --> G((Policy Created))
```

## 9.5 Remote Work Request Flow

```mermaid
graph TD
    A((Employee Requests Remote Work)) --> B[Select Requested Date]
    B --> C[Select Work Location Type]
    C --> D[Enter Reason]
    
    D --> E{Validation Checks}
    
    E --> F{Department Eligible?}
    F -->|No| G[Error: Department Not Eligible]
    
    F -->|Yes| H{Within Notice Period?}
    H -->|No| I[Error: Insufficient Notice]
    
    H -->|Yes| J{Blackout Period?}
    J -->|Yes| K[Error: Remote Work Not Allowed on This Date]
    
    J -->|No| L{Weekly Limit Reached?}
    L -->|Yes| M[Error: Weekly Limit Exceeded]
    
    L -->|No| N{Monthly Limit Reached?}
    N -->|Yes| O[Error: Monthly Limit Exceeded]
    
    N -->|No| P[POST /api/v1/remote-work-requests]
    
    P --> Q[Request Created: Pending]
    Q --> R[Trigger Approval Workflow]
    R --> S[Notify Manager]
    
    S --> T((Request Submitted))
```

## 9.6 Remote Work Approval Flow

```mermaid
graph TD
    A((Manager Reviews Request)) --> B[View Request Details]
    B --> C[See: Employee, Date, Location, Reason]
    C --> D[View Employee's Remote Work History]
    D --> E[View Team Schedule for Date]
    
    E --> F{Decision}
    
    F -->|Approve| G[Update Status: Approved]
    G --> H[Update Attendance Record: WorkLocation = Remote]
    H --> I[Notify Employee: Approved]
    
    F -->|Reject| J[Enter Rejection Reason]
    J --> K[Update Status: Rejected]
    K --> L[Notify Employee: Rejected]
    
    I --> M((Request Processed))
    L --> M
```

## 9.7 Remote Work Cancellation Flow

```mermaid
graph TD
    A((Employee Cancels Request)) --> B{Current Status?}
    
    B -->|Pending| C[Direct Cancellation]
    C --> D[Status: Cancelled]
    D --> E[Restore Weekly/Monthly Counts]
    
    B -->|Approved - Future Date| F[Request Cancellation]
    F --> G{Within Cancellation Window?}
    G -->|Yes| H[Status: Cancelled]
    H --> I[Revert Attendance Record]
    G -->|No| J[Error: Cannot Cancel - Too Late]
    
    B -->|Approved - Past Date| K[Cannot Cancel Past Remote Work]
    
    E --> L((Cancellation Complete))
    I --> L
    J --> M((Cancellation Denied))
    K --> M
```
