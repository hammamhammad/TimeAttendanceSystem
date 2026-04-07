# 19 - Training & Development

## 19.1 Overview

The training and development module manages the organization's learning programs including course creation, program management, session scheduling, employee enrollment, attendance tracking, budget management, certification tracking, and training evaluations.

## 19.2 Features

| Feature | Description |
|---------|-------------|
| Training Categories | Categorize training by type (Technical, Soft Skills, Safety, etc.) |
| Training Courses | Create and manage individual courses |
| Training Programs | Group courses into structured programs |
| Session Scheduling | Schedule training sessions with capacity limits |
| Employee Enrollment | Enroll employees in sessions |
| Attendance Tracking | Track who attended which sessions |
| Budget Management | Allocate and track training budgets |
| Certifications | Track employee certifications with expiry alerts |
| Training Evaluations | Post-training feedback and effectiveness |

## 19.3 Entities

| Entity | Key Fields |
|--------|------------|
| TrainingCategory | Name, Description |
| TrainingCourse | Name, CategoryId, Description, Duration, Provider, Cost |
| TrainingProgram | Name, Description, Courses[], TargetAudience |
| TrainingSession | CourseId, InstructorName, StartDate, EndDate, Location, MaxCapacity, Status |
| TrainingEnrollment | SessionId, EmployeeId, Status, EnrolledBy |
| TrainingAttendance | SessionId, EmployeeId, AttendedDate, Status |
| TrainingBudget | DepartmentId, Year, AllocatedBudget, SpentBudget |
| EmployeeCertification | EmployeeId, CertificationName, IssuedDate, ExpiryDate, Status |
| TrainingEvaluation | SessionId, EmployeeId, ContentRating, InstructorRating, Comments |

## 19.4 Training Program Lifecycle Flow

```mermaid
graph TD
    A((HR Creates Training Program)) --> B[Define Program]
    B --> B1[Name: New Manager Development]
    B1 --> B2[Description & Objectives]
    B2 --> B3[Target Audience: New Managers]
    
    B3 --> C[Add Courses to Program]
    C --> C1[Course 1: Leadership Fundamentals]
    C1 --> C2[Course 2: Effective Communication]
    C2 --> C3[Course 3: Team Management]
    C3 --> C4[Course 4: Performance Coaching]
    
    C4 --> D[Schedule Sessions for Each Course]
    D --> E[Set Dates, Times, Locations]
    E --> F[Set Max Capacity per Session]
    
    F --> G[Open Enrollment]
    G --> H[Employees Enroll or Managers Enroll Team]
    
    H --> I[Session Reminder Notifications]
    I --> J[Conduct Training Sessions]
    J --> K[Track Attendance]
    K --> L[Collect Evaluations]
    L --> M[Issue Certificates if Applicable]
    
    M --> N((Program Complete))
```

## 19.5 Training Session Enrollment Flow

```mermaid
graph TD
    A((Training Session Available)) --> B{Enrollment Method}
    
    B -->|Self-Enrollment| C[Employee Browses Available Sessions]
    C --> D[Select Session]
    D --> E{Capacity Available?}
    E -->|No| F[Waitlisted]
    E -->|Yes| G[POST /api/v1/training-enrollments]
    
    B -->|Manager Enrollment| H[Manager Selects Team Members]
    H --> I[Bulk Enroll for Session]
    I --> G
    
    B -->|HR Enrollment| J[HR Assigns Mandatory Training]
    J --> G
    
    G --> K[Enrollment Status: Enrolled]
    K --> L[Notify Employee]
    L --> M[Add to Calendar]
    
    M --> N{Before Session Date}
    N --> O[TrainingSessionReminderJob]
    O --> P[Send Reminder: 1 day before]
    
    P --> Q[Training Day]
    Q --> R{Employee Attends?}
    R -->|Yes| S[Mark Attendance: Present]
    R -->|No| T[Mark Attendance: Absent]
    T --> U[Notify Manager: No-Show]
    
    S --> V[Post-Training Evaluation]
    V --> W[Rate Content: 1-5]
    W --> X[Rate Instructor: 1-5]
    X --> Y[Rate Relevance: 1-5]
    Y --> Z[Comments & Suggestions]
    Z --> AA[POST /api/v1/training-evaluations]
    
    AA --> AB((Training Complete))
    U --> AB
```

## 19.6 Training Budget Flow

```mermaid
graph TD
    A((Annual Budget Allocation)) --> B[HR Allocates Budget Per Department]
    B --> C[IT: SAR 50,000]
    B --> D[HR: SAR 30,000]
    B --> E[Finance: SAR 25,000]
    B --> F[Operations: SAR 40,000]
    
    C --> G[Track Spending]
    D --> G
    E --> G
    F --> G
    
    G --> H{Training Request Submitted}
    H --> I[Check Department Budget]
    I --> J{Budget Sufficient?}
    
    J -->|Yes| K[Approve & Deduct from Budget]
    K --> L[SpentBudget += Cost]
    
    J -->|No| M[Budget Exceeded]
    M --> N{Request Additional Budget?}
    N -->|Yes| O[Approval from VP]
    N -->|No| P[Training Postponed]
    
    O --> Q{Approved?}
    Q -->|Yes| R[Increase Allocated Budget]
    R --> K
    Q -->|No| P
    
    L --> S((Budget Updated))
```

## 19.7 Certification Tracking Flow

```mermaid
graph TD
    A((Employee Earns Certification)) --> B[Record Certification]
    B --> C[Certification Name]
    C --> D[Issuing Body]
    D --> E[Issue Date]
    E --> F[Expiry Date]
    F --> G[Upload Certificate Document]
    
    G --> H[POST /api/v1/employee-certifications]
    H --> I[Status: Active]
    
    I --> J((Certification Active))
    
    subgraph "Daily Alert Job"
        K[CertificationExpiryAlertJob]
        K --> L[Find Certs Expiring Within 30 Days]
        L --> M[Notify Employee: Renewal Needed]
        M --> N[Notify Manager: Team Cert Expiring]
    end
    
    J --> O{Expiry Date Reached?}
    O -->|No| J
    O -->|Yes| P[Status: Expired]
    P --> Q{Employee Renews?}
    Q -->|Yes| R[Update Expiry Date]
    R --> S[Status: Active]
    Q -->|No| T[Status: Expired]
```
