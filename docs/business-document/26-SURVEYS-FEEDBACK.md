# 26 - Surveys & Feedback

## 26.1 Overview

The surveys module enables HR to create and distribute surveys to employees, collect responses, and analyze results for organizational insights. It supports multiple question types, targeted distribution, anonymous responses, and automated reminders.

## 26.2 Features

| Feature | Description |
|---------|-------------|
| Survey Templates | Reusable survey templates with multiple question types |
| Targeted Distribution | Send to specific branches, departments, or roles |
| Anonymous Responses | Option for anonymous survey participation |
| Automated Scheduling | Schedule surveys for future distribution |
| Reminders | Automated reminders for incomplete surveys |
| Expiry Management | Auto-close surveys after deadline |
| Results Analysis | Aggregate response data and statistics |

## 26.3 Entities

| Entity | Key Fields |
|--------|------------|
| SurveyTemplate | Name, Description, Questions[], IsAnonymous |
| SurveyQuestion | TemplateId, QuestionText, QuestionType (Rating/MultiChoice/FreeText/YesNo), Options[], IsRequired |
| SurveyDistribution | TemplateId, Title, TargetBranch, TargetDepartment, StartDate, EndDate, Status |
| SurveyParticipant | DistributionId, EmployeeId, Status, CompletedAt |
| SurveyResponse | ParticipantId, QuestionId, Answer, Rating |

## 26.4 Survey Lifecycle Flow

```mermaid
graph TD
    A((HR Creates Survey)) --> B[Design Survey Template]
    B --> C[Add Questions]
    C --> C1[Q1: How satisfied are you? Rating 1-5]
    C1 --> C2[Q2: What could improve? Free Text]
    C2 --> C3[Q3: Would you recommend? Yes/No]
    C3 --> C4[Q4: Best aspect? Multiple Choice]
    
    C4 --> D[Configure Settings]
    D --> D1[Anonymous: Yes/No]
    D1 --> D2[Required Questions: Mark each]
    
    D2 --> E[Create Distribution]
    E --> F[Select Target Audience]
    F --> F1[All Employees]
    F --> F2[Specific Branch]
    F --> F3[Specific Department]
    
    F1 --> G[Set Schedule]
    F2 --> G
    F3 --> G
    G --> G1[Start Date]
    G1 --> G2[End Date/Deadline]
    
    G2 --> H[POST /api/v1/survey-distributions]
    H --> I[Status: Scheduled]
    
    I --> J[SurveyDistributionActivatorJob]
    J --> K{Start Date Reached?}
    K -->|Yes| L[Status: Active]
    L --> M[Create Participant Records]
    M --> N[Notify All Participants]
    
    N --> O[Participants Complete Survey]
    
    O --> P{Deadline Approaching?}
    P -->|Yes| Q[SurveyReminderJob]
    Q --> R[Remind Incomplete Participants]
    
    P --> S{Deadline Reached?}
    S -->|Yes| T[SurveyExpiryJob]
    T --> U[Status: Closed]
    U --> V[Generate Results Summary]
    
    V --> W((Survey Complete))
```

## 26.5 Survey Response Collection Flow

```mermaid
graph TD
    A((Employee Receives Survey Notification)) --> B[Open Survey]
    B --> C[Read Introduction]
    
    C --> D[Answer Questions]
    D --> E[For Each Question]
    
    E --> F{Question Type}
    F -->|Rating| G[Select 1-5 Stars]
    F -->|Free Text| H[Enter Text Response]
    F -->|Yes/No| I[Select Yes or No]
    F -->|Multiple Choice| J[Select Option]
    
    G --> K{More Questions?}
    H --> K
    I --> K
    J --> K
    
    K -->|Yes| E
    K -->|No| L{All Required Answered?}
    
    L -->|No| M[Highlight Missing Required Fields]
    M --> E
    
    L -->|Yes| N[Submit Survey]
    N --> O[POST /api/v1/survey-responses]
    O --> P[Participant Status: Completed]
    P --> Q[Show Thank You Message]
    
    Q --> R((Response Recorded))
```

## 26.6 Survey Results Analysis

```
Survey Results Example: Employee Satisfaction Q1 2026
=====================================================
Distribution: All Employees | Responses: 42/50 (84% rate)

Q1: Overall Satisfaction (Rating 1-5)
  Average: 3.8 / 5.0
  Distribution: 1★(2%) 2★(5%) 3★(25%) 4★(45%) 5★(23%)

Q2: What could improve? (Free Text - Top Themes)
  - Work-life balance (15 mentions)
  - Career development (12 mentions)
  - Communication (8 mentions)

Q3: Would you recommend? (Yes/No)
  Yes: 78% | No: 22%

Q4: Best aspect? (Multiple Choice)
  Team culture: 38%
  Compensation: 25%
  Management: 20%
  Growth opportunities: 17%
```
