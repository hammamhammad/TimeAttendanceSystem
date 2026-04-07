# 14 - Onboarding

## 14.1 Overview

The onboarding module streamlines the process of integrating new hires into the organization. It provides reusable templates with categorized tasks, tracks onboarding process completion, manages required documents, and provides a dashboard for HR to monitor progress.

## 14.2 Features

| Feature | Description |
|---------|-------------|
| Onboarding Templates | Reusable task templates with categories |
| Task Categories | Documentation, IT Setup, HR, Training, Equipment, Access, Introduction |
| Onboarding Processes | Employee-specific instances from templates |
| Task Tracking | Track completion with priorities, due dates, assignees |
| Document Management | Upload and manage onboarding documents |
| Overdue Alerts | Background job for overdue task notifications |
| Dashboard | Active processes, completion rates, overdue tracking |

## 14.3 Entities

| Entity | Key Fields |
|--------|------------|
| OnboardingTemplate | Name, Description, Department, Tasks[] |
| OnboardingTemplateTask | TemplateId, TaskName, Category, Priority, DueDaysFromStart, AssigneeRole, IsMandatory |
| OnboardingProcess | EmployeeId, TemplateId, StartDate, Status, CompletionPercentage |
| OnboardingTask | ProcessId, TaskName, Category, AssignedTo, DueDate, Status, CompletedDate, Notes |
| OnboardingDocument | ProcessId, DocumentName, FilePath, UploadedBy, UploadedAt |

## 14.4 Onboarding Template Creation Flow

```mermaid
graph TD
    A((HR Creates Template)) --> B[Enter Template Info]
    B --> B1[Name: Standard IT Onboarding]
    B1 --> B2[Description]
    B2 --> B3[Target Department: IT]
    
    B3 --> C[Add Tasks by Category]
    
    C --> D[Documentation Tasks]
    D --> D1[Submit ID copy - Day 1 - Mandatory]
    D --> D2[Sign employment contract - Day 1 - Mandatory]
    D --> D3[Submit bank details - Day 3 - Mandatory]
    
    C --> E[IT Setup Tasks]
    E --> E1[Create email account - Day 1 - Mandatory]
    E --> E2[Setup workstation - Day 1 - Mandatory]
    E --> E3[Grant system access - Day 2 - Mandatory]
    E --> E4[Install required software - Day 2]
    
    C --> F[HR Tasks]
    F --> F1[Benefits enrollment briefing - Day 5]
    F --> F2[Policy handbook review - Day 3]
    
    C --> G[Training Tasks]
    G --> G1[Security awareness training - Day 5 - Mandatory]
    G --> G2[System training - Week 2]
    
    C --> H[Introduction Tasks]
    H --> H1[Team introduction meeting - Day 1]
    H --> H2[Department tour - Day 1]
    H --> H3[Buddy assignment - Day 1]
    
    D1 --> I[POST /api/v1/onboarding-templates]
    E1 --> I
    F1 --> I
    G1 --> I
    H1 --> I
    
    I --> J((Template Created))
```

## 14.5 Onboarding Process Initiation Flow

```mermaid
graph TD
    A((New Employee Hired)) --> B[HR Initiates Onboarding]
    B --> C[Select Employee]
    C --> D[Select Onboarding Template]
    D --> E[Set Start Date]
    
    E --> F[POST /api/v1/onboarding-processes]
    F --> G[System Creates OnboardingProcess]
    
    G --> H[Generate Tasks from Template]
    H --> I[For Each Template Task]
    I --> J[Create OnboardingTask]
    J --> K[Calculate Due Date = StartDate + DueDaysFromStart]
    K --> L[Assign to Responsible Person Based on Role]
    
    L --> M{Assignee Type}
    M -->|IT Admin| N[Assign IT Setup Tasks]
    M -->|HR| O[Assign HR Tasks]
    M -->|Manager| P[Assign Team Tasks]
    M -->|Employee| Q[Assign Self-Service Tasks]
    
    N --> R[Notify All Assignees]
    O --> R
    P --> R
    Q --> R
    
    R --> S[Process Status: InProgress]
    S --> T[Completion: 0%]
    
    T --> U((Onboarding Started))
```

## 14.6 Task Completion Flow

```mermaid
graph TD
    A((Assignee Works on Task)) --> B[View Assigned Tasks]
    B --> C[Select Task to Complete]
    
    C --> D{Task Requires Document?}
    D -->|Yes| E[Upload Required Document]
    E --> F[Add Completion Notes]
    D -->|No| F
    
    F --> G[Mark Task as Complete]
    G --> H[PUT /api/v1/onboarding-tasks/{id}]
    H --> I[Status: Completed]
    I --> J[Set CompletedDate]
    
    J --> K[Recalculate Process Completion %]
    K --> L[Completion = CompletedTasks / TotalTasks * 100]
    
    L --> M{All Mandatory Tasks Done?}
    M -->|No| N[Continue Onboarding]
    
    M -->|Yes| O{All Tasks Done?}
    O -->|No| P[Mandatory Complete, Optional Remaining]
    O -->|Yes| Q[Process Status: Completed]
    Q --> R[Notify HR: Onboarding Complete]
    R --> S[Notify Manager: Employee Fully Onboarded]
    
    N --> T((Task Completed))
    P --> T
    S --> T
```

## 14.7 Overdue Task Alert Flow

```mermaid
graph TD
    A((5:00 AM Daily - OnboardingTaskOverdueJob)) --> B[Find All Active Onboarding Processes]
    
    B --> C[For Each Process]
    C --> D[Get Incomplete Tasks]
    
    D --> E[For Each Incomplete Task]
    E --> F{DueDate < Today?}
    
    F -->|No| G[Skip - Not Overdue]
    
    F -->|Yes| H[Mark Task as Overdue]
    H --> I[Notify Task Assignee: Overdue Alert]
    I --> J[Notify HR: Overdue Onboarding Task]
    J --> K{Mandatory Task?}
    
    K -->|Yes| L[High Priority Alert]
    L --> M[Escalate to Manager]
    
    K -->|No| N[Standard Alert]
    
    M --> O((Alerts Sent))
    N --> O
    G --> O
```

## 14.8 Onboarding Dashboard

```
Onboarding Dashboard:
====================
+------------------------------------------+
| Active Onboarding Processes: 5            |
| Completed This Month: 3                  |
| Average Completion Time: 12 days         |
+------------------------------------------+
| Overdue Tasks: 4                          |
|   - IT Setup (2 tasks)                    |
|   - Documentation (1 task)                |
|   - Training (1 task)                     |
+------------------------------------------+
| Task Distribution by Category:            |
|   Documentation: 25%                      |
|   IT Setup: 20%                           |
|   HR: 15%                                 |
|   Training: 15%                           |
|   Equipment: 10%                          |
|   Access: 10%                             |
|   Introduction: 5%                        |
+------------------------------------------+
| Process Status:                           |
|   - Ahmed (IT): 80% complete             |
|   - Sara (Finance): 60% complete          |
|   - Omar (HR): 40% complete              |
|   - Fatima (Ops): 20% complete            |
|   - Khalid (IT): 10% complete            |
+------------------------------------------+
```
