# 08 - Excuse Management

## 8.1 Overview

The excuse management module allows employees to submit excuses for late arrivals, early departures, or partial absences. Each excuse is governed by configurable policies that define limits, documentation requirements, and approval workflows.

## 8.2 Features

| Feature | Description |
|---------|-------------|
| Excuse Policies | Configurable excuse types and limits per policy |
| Multiple Excuse Types | Sick, Personal, Emergency, Medical, Family, Other |
| Documentation Support | Attach supporting documents to excuse requests |
| Balance Tracking | Track excuse hours/days usage against policy limits |
| Reset Periods | Configure policy reset cycles (Monthly, Quarterly, Yearly) |
| Approval Workflow | Multi-step approval process integration |
| Attendance Integration | Approved excuses update attendance records |

## 8.3 Entities

| Entity | Key Fields |
|--------|------------|
| ExcusePolicy | Name, NameAr, ExcuseType, MaxExcusesPerPeriod, MaxHoursPerExcuse, ResetPeriod, RequiresDocumentation, IsActive |
| EmployeeExcuse | EmployeeId, ExcusePolicyId, Date, StartTime, EndTime, TotalHours, ExcuseType, Reason, Status, DocumentPath |

## 8.4 Excuse Policy Configuration Flow

```mermaid
graph TD
    A((Admin Creates Excuse Policy)) --> B[Enter Policy Details]
    B --> B1[Name EN/AR]
    B1 --> B2[Select Excuse Type: Medical, Personal, etc.]
    
    B2 --> C[Set Limits]
    C --> C1[Max Excuses Per Period: 3]
    C1 --> C2[Max Hours Per Excuse: 2]
    C2 --> C3[Reset Period: Monthly]
    
    C3 --> D[Set Requirements]
    D --> D1[Requires Documentation: Yes for Medical]
    D1 --> D2[Requires Approval: Yes]
    
    D2 --> E[POST /api/v1/excuse-policies]
    E --> F((Policy Created))
```

## 8.5 Excuse Request Submission Flow

```mermaid
graph TD
    A((Employee Submits Excuse)) --> B[Select Excuse Type]
    B --> C[Select Date]
    C --> D[Enter Start Time and End Time]
    D --> E[System Calculates Total Hours]
    E --> F[Enter Reason/Description]
    
    F --> G{Documentation Required?}
    G -->|Yes| H[Upload Supporting Document]
    G -->|No| I[Continue]
    H --> I
    
    I --> J{Validation Checks}
    
    J --> K{Hours <= Max Hours Per Excuse?}
    K -->|No| L[Error: Exceeds Maximum Hours]
    
    K -->|Yes| M{Usage < Max Excuses for Period?}
    M -->|No| N[Error: Excuse Limit Reached for Period]
    
    M -->|Yes| O{Overlaps Existing Excuse?}
    O -->|Yes| P[Error: Time Overlap]
    
    O -->|No| Q[POST /api/v1/employee-excuses]
    
    Q --> R[Create EmployeeExcuse: Status = Pending]
    R --> S[Trigger Approval Workflow]
    S --> T[Notify Manager]
    
    T --> U((Excuse Submitted))
```

## 8.6 Excuse Approval Flow

```mermaid
graph TD
    A((Manager Reviews Excuse)) --> B[View Excuse Details]
    B --> C[See: Employee, Date, Time, Reason, Documents]
    C --> D[View Employee's Excuse History]
    
    D --> E{Decision}
    
    E -->|Approve| F[POST /api/v1/approvals/{id}/approve]
    F --> G[Update Excuse Status: Approved]
    G --> H[Update Attendance Record]
    H --> I{What Was Excused?}
    
    I -->|Late Arrival| J[Reduce Late Minutes on Attendance]
    I -->|Early Departure| K[Reduce Early Departure on Attendance]
    I -->|Partial Absence| L[Mark Excused Hours on Attendance]
    
    J --> M[Recalculate Attendance Metrics]
    K --> M
    L --> M
    
    M --> N[Notify Employee: Excuse Approved]
    
    E -->|Reject| O[Enter Rejection Reason]
    O --> P[Update Excuse Status: Rejected]
    P --> Q[Notify Employee: Excuse Rejected]
    
    N --> R((Excuse Processed))
    Q --> R
```

## 8.7 Excuse Balance Reset Flow

```mermaid
graph TD
    A((Reset Period Reached)) --> B{Reset Period Type}
    
    B -->|Monthly| C[1st of Each Month]
    B -->|Quarterly| D[1st of Jan, Apr, Jul, Oct]
    B -->|Yearly| E[1st of January]
    
    C --> F[Reset Excuse Usage Counter]
    D --> F
    E --> F
    
    F --> G[Employee Can Submit Excuses Again]
    G --> H[Usage Count = 0]
    H --> I((Counters Reset))
```

## 8.8 Excuse Type Reference

| Excuse Type | Typical Policy | Documentation |
|-------------|---------------|---------------|
| Medical | 3/month, 2hrs max | Medical certificate required |
| Personal | 2/month, 1hr max | Not required |
| Emergency | 1/month, 4hrs max | Optional |
| Family | 2/month, 2hrs max | Not required |
| Government/Official | 2/month, 4hrs max | Official letter required |
| Other | 1/month, 1hr max | Optional |
