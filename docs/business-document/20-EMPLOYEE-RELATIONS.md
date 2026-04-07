# 20 - Employee Relations

## 20.1 Overview

The employee relations module handles formal employee issues including grievance management, disciplinary actions, investigation cases, and counseling records. It includes SLA tracking for grievances and automated follow-up reminders.

## 20.2 Features

| Feature | Description |
|---------|-------------|
| Grievance Management | File, track, and resolve employee grievances |
| SLA Tracking | Ensure timely grievance resolution |
| Disciplinary Actions | Document and track disciplinary measures |
| Investigations | Manage investigation cases with evidence |
| Counseling Records | Track counseling sessions and outcomes |
| Documentation | Attach evidence and notes to all records |
| Follow-Up Reminders | Automated reminders for pending actions |

## 20.3 Entities

| Entity | Key Fields |
|--------|------------|
| Grievance | EmployeeId, Category, Description, Priority, Status, AssignedTo, ResolutionDeadline |
| GrievanceNote | GrievanceId, Author, Content, CreatedAt |
| GrievanceAttachment | GrievanceId, FileName, FilePath |
| DisciplinaryAction | EmployeeId, ActionType, Reason, Description, IssuedDate, IssuedBy |
| DisciplinaryAttachment | ActionId, FileName, FilePath |
| Investigation | Title, ReportedBy, Subject, Status, AssignedInvestigator |
| InvestigationNote | InvestigationId, Author, Content |
| InvestigationAttachment | InvestigationId, FileName, FilePath |
| CounselingRecord | EmployeeId, CounselorName, SessionDate, Topic, Outcome, FollowUpDate |

## 20.4 Grievance Management Flow

```mermaid
graph TD
    A((Employee Files Grievance)) --> B[Enter Grievance Details]
    B --> B1[Category: Harassment/Discrimination/WorkConditions/Compensation/Management/Policy/Other]
    B1 --> B2[Description of Issue]
    B2 --> B3[Desired Resolution]
    B3 --> B4[Attach Evidence if Any]
    
    B4 --> C[POST /api/v1/grievances]
    C --> D[Status: Open]
    D --> E[Set Priority Based on Category]
    E --> F[Calculate Resolution Deadline SLA]
    
    F --> G{Priority}
    G -->|Critical| H[SLA: 3 business days]
    G -->|High| I[SLA: 5 business days]
    G -->|Medium| J[SLA: 10 business days]
    G -->|Low| K[SLA: 15 business days]
    
    H --> L[Assign to HR Investigator]
    I --> L
    J --> L
    K --> L
    
    L --> M[Notify Assigned HR]
    M --> N[Status: UnderReview]
    
    N --> O[HR Investigates]
    O --> P[Add Investigation Notes]
    P --> Q[Gather Evidence]
    Q --> R[Interview Parties]
    
    R --> S{Resolution Found?}
    S -->|Yes| T[Document Resolution]
    T --> U[Status: Resolved]
    U --> V[Notify Employee of Outcome]
    
    S -->|No| W[Escalate]
    W --> X[Assign to Senior HR/Legal]
    X --> O
    
    V --> Y((Grievance Closed))
    
    subgraph "SLA Alert Job - GrievanceSlaAlertJob"
        Z[Check All Open Grievances]
        Z --> AA{SLA Deadline Approaching?}
        AA -->|< 24 hrs remaining| AB[Send Urgent Alert]
        AA -->|SLA Breached| AC[Escalate to HR Director]
    end
```

## 20.5 Disciplinary Action Flow

```mermaid
graph TD
    A((Manager/HR Reports Violation)) --> B[Document Incident]
    B --> C[Select Employee]
    C --> D[Select Action Type]
    
    D --> E{Action Severity}
    E -->|Verbal Warning| F[Document Conversation]
    E -->|Written Warning| G[Formal Written Notice]
    E -->|Final Warning| H[Last Chance Notice]
    E -->|Suspension| I[Set Suspension Period]
    E -->|Demotion| J[Change Title/Grade]
    E -->|Termination| K[Initiate Termination Process]
    
    F --> L[Record Details]
    G --> L
    H --> L
    I --> L
    J --> L
    K --> L
    
    L --> M[Attach Supporting Evidence]
    M --> N[POST /api/v1/disciplinary-actions]
    
    N --> O[Notify Employee]
    O --> P[Employee Acknowledges]
    P --> Q[Record in Employee File]
    
    Q --> R{Progressive Discipline Check}
    R --> S[Count Warnings in Period]
    S --> T{Warning Count?}
    T -->|3+ Written| U[Recommend Final Warning]
    T -->|Final Warning Exists| V[Consider Termination]
    T -->|Within Limits| W[Standard Follow-Up]
    
    U --> X((Action Recorded))
    V --> X
    W --> X
```

## 20.6 Investigation Flow

```mermaid
graph TD
    A((Incident Reported)) --> B[Create Investigation Case]
    B --> C[Enter Case Details]
    C --> C1[Title, Description]
    C1 --> C2[Reported By]
    C2 --> C3[Subject of Investigation]
    
    C3 --> D[POST /api/v1/investigations]
    D --> E[Status: Open]
    E --> F[Assign Investigator]
    
    F --> G[Investigation Phase]
    G --> H[Collect Evidence]
    H --> I[Interview Witnesses]
    I --> J[Interview Subject]
    J --> K[Add Investigation Notes]
    K --> L[Attach Documents]
    
    L --> M{Finding?}
    M -->|Substantiated| N[Document Findings]
    N --> O[Recommend Action]
    O --> P{Action Type?}
    P --> Q[Disciplinary Action]
    P --> R[Policy Change]
    P --> S[Training Required]
    P --> T[No Further Action]
    
    M -->|Unsubstantiated| U[Close Case]
    U --> V[Status: Closed - Unfounded]
    
    Q --> W[Status: Closed - Action Taken]
    R --> W
    S --> W
    T --> W
    
    W --> X((Investigation Complete))
    V --> X
```

## 20.7 Counseling Session Flow

```mermaid
graph TD
    A((Counseling Need Identified)) --> B[Schedule Session]
    B --> C[Select Employee]
    C --> D[Set Session Date/Time]
    D --> E[Assign Counselor]
    
    E --> F[Conduct Session]
    F --> G[Document Topics Discussed]
    G --> H[Record Employee Feedback]
    H --> I[Document Outcome/Action Items]
    I --> J[Set Follow-Up Date if Needed]
    
    J --> K[POST /api/v1/counseling-records]
    K --> L[Session Recorded]
    
    L --> M{Follow-Up Required?}
    M -->|Yes| N[CounselingFollowUpReminderJob]
    N --> O[Send Reminder on Follow-Up Date]
    O --> P[Schedule Next Session]
    P --> F
    
    M -->|No| Q((Counseling Complete))
```
