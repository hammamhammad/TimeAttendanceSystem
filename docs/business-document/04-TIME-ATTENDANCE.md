# 04 - Time & Attendance

## 4.1 Overview

The Time & Attendance module is the core of the TecAxle HRMS system. It automates daily attendance record generation, tracks employee check-in/check-out transactions, calculates working hours, overtime, late minutes, and early departures, and integrates with shifts, holidays, and leave management.

## 4.2 Features

| Feature | Description |
|---------|-------------|
| Automated Attendance Generation | Background job creates daily records for all active employees at 2:00 AM |
| Transaction Tracking | Check-in, check-out, break start, break end timestamps |
| Working Hours Calculation | Automatic calculation based on shift periods and transactions |
| Overtime Calculation | Regular and premium overtime based on configuration |
| Late/Early Detection | Grace period-aware detection of late arrivals and early departures |
| Status Management | Present, Absent, Late, OnLeave, Holiday, Weekend, etc. |
| Manual Override | HR can edit and override automated calculations |
| Attendance Approval | Multi-step approval workflow for attendance records |
| Finalization | Lock records after approval to prevent further changes |
| Correction Requests | Employees can request corrections to their attendance |

## 4.3 Entities

| Entity | Key Fields |
|--------|------------|
| AttendanceRecord | EmployeeId, Date, ShiftId, Status, CheckInTime, CheckOutTime, WorkingHours, OvertimeHours, LateMinutes, EarlyDepartureMinutes, IsFinalized, IsManualOverride |
| AttendanceTransaction | AttendanceRecordId, TransactionType (CheckIn/CheckOut/BreakStart/BreakEnd), Timestamp, Source (Device/Manual/Mobile) |
| WorkingDay | DayOfWeek, IsWorkingDay, BranchId |
| AttendanceCorrectionRequest | EmployeeId, AttendanceRecordId, Reason, RequestedCheckIn, RequestedCheckOut, Status |

## 4.4 Daily Attendance Generation Flow

```mermaid
graph TD
    A((2:00 AM - Job Triggers)) --> B[DailyAttendanceGenerationJob]
    B --> C[Get All Active Employees]
    C --> D[For Each Employee]
    
    D --> E{Is Today a Holiday?}
    E -->|Yes| F[Create Record: Status = Holiday]
    
    E -->|No| G[Get Employee's Effective Shift]
    G --> H{Is Today an Off Day?}
    H -->|Yes| I[Create Record: Status = Weekend/OffDay]
    
    H -->|No| J{Employee On Approved Leave?}
    J -->|Yes| K[Create Record: Status = OnLeave]
    
    J -->|No| L[Create Record: Status = Absent Initial]
    L --> M[Set Expected CheckIn/CheckOut from Shift]
    
    F --> N[Save AttendanceRecord]
    I --> N
    K --> N
    M --> N
    
    N --> O((Records Generated for All Employees))
```

## 4.5 Employee Check-In Flow

```mermaid
graph TD
    A((Employee Arrives)) --> B{Check-In Method}
    
    B -->|Biometric Device| C[Fingerprint Scan]
    B -->|Mobile App| D[GPS + NFC Verification]
    B -->|Manual Entry| E[HR Enters Time]
    
    C --> F[Create AttendanceTransaction: CheckIn]
    D --> F
    E --> F
    
    F --> G[Find Today's AttendanceRecord]
    G --> H[Update CheckInTime on Record]
    
    H --> I{Compare with Shift Start}
    I --> J[Calculate Grace Period]
    J --> K{Within Grace Period?}
    
    K -->|Yes| L[Status = Present]
    K -->|No| M[Calculate Late Minutes]
    M --> N[Status = Late]
    
    L --> O[Save Updated Record]
    N --> O
    
    O --> P((Check-In Recorded))
```

## 4.6 Employee Check-Out Flow

```mermaid
graph TD
    A((Employee Leaves)) --> B{Check-Out Method}
    
    B -->|Biometric Device| C[Fingerprint Scan]
    B -->|Mobile App| D[GPS + NFC Verification]
    B -->|Manual Entry| E[HR Enters Time]
    
    C --> F[Create AttendanceTransaction: CheckOut]
    D --> F
    E --> F
    
    F --> G[Find Today's AttendanceRecord]
    G --> H[Update CheckOutTime on Record]
    
    H --> I[Calculate Working Hours]
    I --> J[Subtract Break Duration]
    J --> K[Net Working Hours]
    
    K --> L{Left Before Shift End?}
    L -->|Yes| M[Calculate Early Departure Minutes]
    L -->|No| N[No Early Departure]
    
    M --> O{Working Hours > Required Hours?}
    N --> O
    
    O -->|Yes| P[Calculate Overtime]
    P --> Q{Overtime Type?}
    Q -->|Weekday| R[Regular Overtime Rate]
    Q -->|Weekend/Holiday| S[Premium Overtime Rate]
    
    O -->|No| T[No Overtime]
    
    R --> U[Update Record with All Calculations]
    S --> U
    T --> U
    
    U --> V((Check-Out Recorded))
```

## 4.7 Working Hours Calculation Logic

```
Working Hours Calculation:
========================

1. Raw Working Hours = CheckOutTime - CheckInTime
2. Break Duration = Sum of (BreakEnd - BreakStart) for all breaks
3. Net Working Hours = Raw Working Hours - Break Duration

Overtime Calculation:
====================
4. Required Hours = Shift.TotalWorkingHours
5. If Net Working Hours > Required Hours:
   a. Overtime Hours = Net Working Hours - Required Hours
   b. Apply overtime thresholds:
      - Daily Threshold: Max overtime per day
      - Weekly Threshold: Max overtime per week
      - Monthly Threshold: Max overtime per month
   c. Apply overtime rate:
      - Regular: 1.5x (weekday overtime)
      - Premium: 2.0x (weekend/holiday overtime)

Late Minutes Calculation:
========================
6. Grace Period = Shift.LateGracePeriodMinutes
7. Actual Arrival = CheckInTime
8. Expected Arrival = Shift.StartTime
9. If (Actual Arrival - Expected Arrival) > Grace Period:
   Late Minutes = Actual Arrival - Expected Arrival

Early Departure Calculation:
===========================
10. Expected Departure = Shift.EndTime
11. Actual Departure = CheckOutTime
12. If Actual Departure < Expected Departure:
    Early Departure Minutes = Expected Departure - Actual Departure
```

## 4.8 End-of-Day Finalization Flow

```mermaid
graph TD
    A((11:59 PM - Job Triggers)) --> B[EndOfDayAttendanceFinalizationJob]
    B --> C[Get All Today's Attendance Records]
    
    C --> D[For Each Record]
    D --> E{Has CheckIn but No CheckOut?}
    
    E -->|Yes| F[Mark as Incomplete Record]
    F --> G[Flag for HR Review]
    
    E -->|No| H{Has No Transactions at All?}
    H -->|Yes| I{On Leave/Holiday/Weekend?}
    I -->|Yes| J[Keep Current Status]
    I -->|No| K[Confirm Status = Absent]
    
    H -->|No| L[Recalculate All Metrics]
    L --> M[Working Hours, Overtime, Late, Early]
    
    J --> N[Save Final Record]
    K --> N
    M --> N
    G --> N
    
    N --> O((Day Finalized))
```

## 4.9 Attendance Correction Request Flow

```mermaid
graph TD
    A((Employee Notices Error)) --> B[Submit Correction Request]
    B --> C[Select Attendance Date]
    C --> D[Enter Requested CheckIn/CheckOut Times]
    D --> E[Provide Reason/Justification]
    E --> F[POST /api/v1/attendance-corrections]
    
    F --> G[Correction Request Created: Pending]
    G --> H[Trigger Approval Workflow]
    
    H --> I[Notify Manager/HR]
    I --> J{Manager Reviews}
    
    J -->|Approve| K[Update AttendanceRecord]
    K --> L[Recalculate Working Hours]
    L --> M[Recalculate Overtime/Late/Early]
    M --> N[Mark as ManualOverride = true]
    N --> O[Notify Employee: Approved]
    
    J -->|Reject| P[Notify Employee: Rejected with Reason]
    
    O --> Q((Correction Applied))
    P --> R((Request Closed))
```

## 4.10 Attendance Report Flow

```mermaid
graph TD
    A((HR Opens Reports)) --> B[Select Report Type]
    
    B -->|Summary Report| C[Select Date Range]
    B -->|Detailed Report| C
    B -->|Monthly Report| D[Select Month/Year]
    
    C --> E[Apply Filters]
    D --> E
    
    E --> F[Filter by Branch]
    E --> G[Filter by Department]
    E --> H[Filter by Employee]
    E --> I[Filter by Status]
    
    F --> J[GET /api/v1/reports/attendance]
    G --> J
    H --> J
    I --> J
    
    J --> K[Generate Report Data]
    
    K --> L{Output Format?}
    L -->|View| M[Display in DataTable]
    L -->|Export| N[Download CSV File]
    
    M --> O[Show Summary Statistics]
    O --> P[Total Present, Absent, Late, On Leave]
    O --> Q[Average Working Hours]
    O --> R[Total Overtime Hours]
    
    N --> S((File Downloaded))
    P --> T((Report Displayed))
```

## 4.11 Attendance Status Reference

| Status | Description | Trigger |
|--------|-------------|---------|
| Present | Employee checked in and out within acceptable times | Normal check-in/out |
| Absent | No transactions recorded for a working day | No check-in by end of day |
| Late | Employee arrived after shift start + grace period | Late check-in |
| OnLeave | Employee has approved leave for the day | Approved vacation |
| Holiday | Public holiday - no attendance required | Holiday calendar |
| Weekend | Off day - no attendance required | Shift off days |
| Incomplete | Missing check-out (or check-in) | Partial transactions |
| Excused | Absence excused by management | Approved excuse |

## 4.12 Admin Attendance Management Flow

```mermaid
graph TD
    A((HR Views Daily Attendance)) --> B[Select Date and Branch]
    B --> C[GET /api/v1/attendance/daily]
    C --> D[Display All Employee Records]
    
    D --> E{HR Action}
    
    E -->|Edit Record| F[Open Edit Attendance Form]
    F --> G[Modify CheckIn/CheckOut Times]
    G --> H[Override Status if Needed]
    H --> I[Add Reason for Override]
    I --> J[Save - Mark as ManualOverride]
    J --> K[Recalculate Metrics]
    
    E -->|Change Shift| L[Open Change Shift Dialog]
    L --> M[Select New Shift]
    M --> N[Recalculate Based on New Shift]
    
    E -->|View Detail| O[Open Attendance Detail]
    O --> P[Show All Transactions]
    P --> Q[Show Calculation Breakdown]
    
    E -->|Approve| R[Submit for Approval]
    R --> S[Trigger Approval Workflow]
    
    K --> T((Record Updated))
    N --> T
    S --> U((Approval Started))
```
