# 06 - Shift Management

## 6.1 Overview

The shift management module defines work schedules, assigns them to employees, departments, or branches, and drives all attendance calculations. It supports complex shift configurations including multiple work periods, flexible hours, rotating schedules, night shifts, and split shifts.

## 6.2 Features

| Feature | Description |
|---------|-------------|
| Multiple Shift Types | Regular, Flexible, Split, Rotating, Night |
| Shift Periods | Multiple work periods per shift (morning, afternoon, etc.) |
| Break Configuration | Configurable paid/unpaid break times |
| Grace Periods | Late arrival and early departure tolerance |
| Overtime Rules | Per-shift overtime calculation settings |
| Off Days | Configurable weekly off days per shift |
| Core Hours | Mandatory presence hours for flexible shifts |
| Assignment Levels | Assign to employee, department, or branch |
| Priority System | Resolve overlapping assignments by priority |
| Temporary Assignments | Time-bound shift assignments with start/end dates |
| Shift Swap | Employees can request to swap shifts |

## 6.3 Entities

| Entity | Key Fields |
|--------|------------|
| Shift | Name, NameAr, ShiftType, StartTime, EndTime, TotalWorkingHours, LateGracePeriodMinutes, EarlyDepartureGracePeriodMinutes, IsActive |
| ShiftPeriod | ShiftId, PeriodName, StartTime, EndTime, IsBreak |
| ShiftAssignment | ShiftId, EmployeeId/DepartmentId/BranchId, EffectiveFrom, EffectiveTo, Priority, IsTemporary |
| OffDay | ShiftId, DayOfWeek |
| ShiftSwapRequest | RequestingEmployeeId, TargetEmployeeId, RequestDate, SwapDate, Status |

## 6.4 Shift Creation Flow

```mermaid
graph TD
    A((Admin Creates Shift)) --> B[Enter Basic Info]
    B --> B1[Name EN/AR]
    B1 --> B2[Select Shift Type]
    
    B2 --> C{Shift Type?}
    
    C -->|Regular| D[Set Fixed Start/End Time]
    C -->|Flexible| E[Set Core Hours + Flex Range]
    C -->|Split| F[Set Multiple Disjoint Periods]
    C -->|Rotating| G[Set Rotation Pattern]
    C -->|Night| H[Set Cross-Midnight Times]
    
    D --> I[Configure Shift Periods]
    E --> I
    F --> I
    G --> I
    H --> I
    
    I --> J[Add Work Period 1: 08:00 - 12:00]
    J --> K[Add Break Period: 12:00 - 13:00]
    K --> L[Add Work Period 2: 13:00 - 17:00]
    
    L --> M[Configure Grace Periods]
    M --> M1[Late Grace: 15 minutes]
    M1 --> M2[Early Departure Grace: 10 minutes]
    
    M2 --> N[Configure Overtime]
    N --> N1[Enable/Disable Overtime]
    N1 --> N2[Regular Rate: 1.5x]
    N2 --> N3[Premium Rate: 2.0x]
    N3 --> N4[Max Daily Overtime: 4 hours]
    
    N4 --> O[Configure Off Days]
    O --> O1[Select Weekly Off Days: Friday, Saturday]
    
    O1 --> P[POST /api/v1/shifts]
    P --> Q((Shift Created))
```

## 6.5 Shift Assignment Flow

```mermaid
graph TD
    A((Admin Assigns Shift)) --> B{Assignment Level}
    
    B -->|Branch-Wide| C[Select Branch]
    C --> C1[All employees in branch get this shift]
    C1 --> C2[Priority: Low default]
    
    B -->|Department| D[Select Department]
    D --> D1[All employees in department get this shift]
    D1 --> D2[Priority: Medium override]
    
    B -->|Individual| E[Select Employee]
    E --> E1[Specific employee gets this shift]
    E1 --> E2[Priority: High override]
    
    C2 --> F{Temporary Assignment?}
    D2 --> F
    E2 --> F
    
    F -->|Yes| G[Set Effective From/To Dates]
    F -->|No| H[Set Effective From Only - Permanent]
    
    G --> I[POST /api/v1/shift-assignments]
    H --> I
    
    I --> J[Assignment Created]
    J --> K[Future Attendance Uses New Shift]
    
    K --> L((Assignment Active))
```

## 6.6 Effective Shift Resolution Flow

```mermaid
graph TD
    A((Determine Employee's Shift for Date)) --> B[Get All Active Assignments for Employee]
    
    B --> C[Filter by Date Range: EffectiveFrom <= Date <= EffectiveTo]
    
    C --> D{Multiple Assignments?}
    
    D -->|No| E[Use Single Assignment]
    
    D -->|Yes| F[Sort by Priority: Employee > Department > Branch]
    F --> G{Same Priority Level?}
    
    G -->|No| H[Use Highest Priority]
    
    G -->|Yes| I[Use Most Recent EffectiveFrom]
    
    E --> J[Return Effective Shift]
    H --> J
    I --> J
    
    J --> K((Shift Determined))

    subgraph "Priority Hierarchy"
        L[Priority 1: Individual Employee Assignment - Highest]
        M[Priority 2: Department Assignment]
        N[Priority 3: Branch Default Assignment - Lowest]
    end
```

## 6.7 Shift Type Configurations

### Regular Shift
```
Name: Morning Shift
Type: Regular
Start: 08:00 | End: 17:00
Periods:
  - Work: 08:00 - 12:00
  - Break: 12:00 - 13:00 (unpaid)
  - Work: 13:00 - 17:00
Total Working Hours: 8.0
Off Days: Friday, Saturday
Grace: Late 15min, Early 10min
```

### Flexible Shift
```
Name: Flex Schedule
Type: Flexible
Flex Start: 07:00 - 10:00 (arrival window)
Flex End: 16:00 - 19:00 (departure window)
Core Hours: 10:00 - 16:00 (mandatory presence)
Total Required Hours: 8.0
Off Days: Friday, Saturday
```

### Split Shift
```
Name: Split Schedule
Type: Split
Period 1: 06:00 - 10:00 (morning)
Gap: 10:00 - 16:00 (off)
Period 2: 16:00 - 20:00 (evening)
Total Working Hours: 8.0
Off Days: Friday
```

### Night Shift
```
Name: Night Watch
Type: Night
Start: 22:00 | End: 06:00 (next day)
Periods:
  - Work: 22:00 - 02:00
  - Break: 02:00 - 02:30
  - Work: 02:30 - 06:00
Total Working Hours: 7.5
Off Days: Thursday, Friday
```

## 6.8 Shift Swap Request Flow

```mermaid
graph TD
    A((Employee Requests Shift Swap)) --> B[Select Target Employee]
    B --> C[Select Swap Date]
    C --> D[Enter Reason]
    D --> E[POST /api/v1/shift-swap-requests]
    
    E --> F[Request Created: Pending]
    F --> G[Notify Target Employee]
    
    G --> H{Target Employee Response}
    H -->|Accept| I[Notify Manager for Final Approval]
    H -->|Decline| J[Status: Declined]
    J --> K[Notify Requesting Employee]
    
    I --> L{Manager Decision}
    L -->|Approve| M[Swap Shifts for Selected Date]
    M --> N[Create Temporary Assignments]
    N --> O[Update Attendance Records if Generated]
    O --> P[Notify Both Employees: Approved]
    
    L -->|Reject| Q[Notify Both Employees: Rejected]
    
    P --> R((Swap Complete))
    Q --> S((Request Closed))
    K --> S
```

## 6.9 Change Employee Shift Flow

```mermaid
graph TD
    A((HR Changes Employee Shift)) --> B{Change Type}
    
    B -->|Permanent Change| C[Select Employee]
    C --> D[Select New Shift]
    D --> E[Set Effective Date]
    E --> F[End Current Assignment: EffectiveTo = Day Before]
    F --> G[Create New Assignment: EffectiveFrom = Effective Date]
    
    B -->|For Specific Record| H[Select Attendance Record]
    H --> I[Select New Shift]
    I --> J[Update AttendanceRecord.ShiftId]
    J --> K[Recalculate Working Hours with New Shift]
    K --> L[Recalculate Overtime/Late/Early]
    
    G --> M[Future Records Use New Shift]
    L --> N[Historical Record Updated]
    
    M --> O((Shift Changed))
    N --> O
```
