# 15 - Performance Management

## 15.1 Overview

The performance management module provides a comprehensive framework for evaluating employee performance through structured review cycles, goal setting and tracking, competency assessments, 360-degree feedback, and performance improvement plans (PIPs).

## 15.2 Features

| Feature | Description |
|---------|-------------|
| Review Cycles | Annual, Semi-Annual, Quarterly, Monthly, Probation, Project-Based, 360-Degree |
| Performance Reviews | Structured reviews with ratings, strengths, and areas for improvement |
| Goal Management | SMART goal setting with progress tracking and weight-based scoring |
| Competency Framework | Define competencies with proficiency levels |
| PIPs | Formal improvement plans with milestones and check-ins |
| 360-Degree Feedback | Multi-rater feedback from managers, peers, reports, and self |
| Performance Dashboard | Rating distributions, goal completion, cycle progress |

## 15.3 Entities

| Entity | Key Fields |
|--------|------------|
| PerformanceReviewCycle | Name, CycleType, StartDate, EndDate, Status |
| PerformanceReview | CycleId, EmployeeId, ReviewerId, OverallRating, Strengths, AreasForImprovement, Status |
| GoalDefinition | EmployeeId, CycleId, Title, Description, TargetValue, CurrentValue, Weight, Status, DueDate |
| CompetencyFramework | Name, Description, Competencies[] |
| Competency | FrameworkId, Name, Description, ProficiencyLevels[] |
| CompetencyAssessment | ReviewId, CompetencyId, Rating, Comments |
| PerformanceImprovementPlan | EmployeeId, Reason, StartDate, EndDate, Milestones[], Status |
| FeedbackRequest360 | ReviewId, RequesterId, RespondentId, Relationship, Status |
| Feedback360Response | RequestId, Ratings[], Comments, SubmittedAt |

## 15.4 Performance Review Cycle Flow

```mermaid
graph TD
    A((HR Creates Review Cycle)) --> B[Define Cycle Details]
    B --> B1[Name: 2026 Annual Review]
    B1 --> B2[Type: Annual]
    B2 --> B3[Period: Jan 1 - Dec 31, 2026]
    B3 --> B4[Review Window: Jan 15 - Feb 15, 2027]
    
    B4 --> C[POST /api/v1/review-cycles]
    C --> D[Cycle Status: Draft]
    
    D --> E[Configure Review Settings]
    E --> E1[Include Goals: Yes]
    E --> E2[Include Competencies: Yes]
    E --> E3[Include 360 Feedback: Yes]
    E --> E4[Rating Scale: 1-5]
    
    E4 --> F[Activate Cycle]
    F --> G[Status: Active]
    G --> H[Generate Reviews for All Eligible Employees]
    
    H --> I[For Each Employee]
    I --> J[Create PerformanceReview]
    J --> K[Assign Reviewer = Direct Manager]
    K --> L[Notify Manager: Review Assigned]
    L --> M[Notify Employee: Self-Assessment Due]
    
    M --> N((Review Cycle Active))
```

## 15.5 Individual Performance Review Flow

```mermaid
graph TD
    A((Review Cycle Active)) --> B[Employee Self-Assessment]
    B --> C[Rate Own Performance]
    C --> D[Document Achievements]
    D --> E[Set Development Goals]
    E --> F[Submit Self-Assessment]
    
    F --> G[Manager Begins Review]
    G --> H[Review Employee's Goals & Progress]
    H --> I[Assess Competencies]
    
    I --> J[For Each Competency]
    J --> K[Rate Proficiency: 1-5]
    K --> L[Add Comments]
    
    L --> M[Review 360 Feedback if Available]
    
    M --> N[Set Overall Rating]
    N --> N1[1 = Unsatisfactory]
    N --> N2[2 = Needs Improvement]
    N --> N3[3 = Meets Expectations]
    N --> N4[4 = Exceeds Expectations]
    N --> N5[5 = Outstanding]
    
    N1 --> O[Document Strengths]
    N2 --> O
    N3 --> O
    N4 --> O
    N5 --> O
    
    O --> P[Document Areas for Improvement]
    P --> Q[Recommend Next Steps]
    Q --> Q1[Promotion Consideration]
    Q --> Q2[Development Plan]
    Q --> Q3[Performance Improvement Plan]
    
    Q1 --> R[Submit Review]
    Q2 --> R
    Q3 --> R
    
    R --> S[Status: Submitted]
    S --> T{Review Meeting}
    T --> U[Manager and Employee Discuss]
    U --> V[Employee Acknowledges]
    V --> W[Status: Acknowledged]
    
    W --> X{Rating < 2?}
    X -->|Yes| Y[Trigger PIP Process]
    X -->|No| Z((Review Complete))
    Y --> Z
```

## 15.6 Goal Setting and Tracking Flow

```mermaid
graph TD
    A((Manager/Employee Sets Goals)) --> B[Create Goal]
    B --> C[Enter Goal Details]
    C --> C1[Title: Improve Customer Response Time]
    C1 --> C2[Description: SMART goal description]
    C2 --> C3[Target Value: Reduce from 4hrs to 2hrs]
    C3 --> C4[Weight: 25% of total score]
    C4 --> C5[Due Date: Dec 31, 2026]
    
    C5 --> D[POST /api/v1/goals]
    D --> E[Goal Status: InProgress]
    
    E --> F((Goal Tracking Period))
    
    F --> G[Employee Updates Progress]
    G --> H[Update Current Value: 3.2 hrs]
    H --> I[Add Progress Notes]
    I --> J[System Calculates % Complete]
    J --> K[Progress: 40% (4.0 -> 3.2 vs target 2.0)]
    
    K --> L{Goal Due Date Reached?}
    L -->|No| F
    
    L -->|Yes| M[Manager Reviews Final Progress]
    M --> N{Goal Achieved?}
    
    N -->|Fully Met| O[Status: Achieved, Score = Weight * 100%]
    N -->|Partially Met| P[Status: PartiallyAchieved, Score = Weight * %]
    N -->|Not Met| Q[Status: NotAchieved, Score = 0]
    
    O --> R[Factor into Overall Rating]
    P --> R
    Q --> R
    
    R --> S((Goal Evaluation Complete))
```

## 15.7 360-Degree Feedback Flow

```mermaid
graph TD
    A((HR Initiates 360 Feedback)) --> B[Select Employee Under Review]
    B --> C[Identify Feedback Providers]
    
    C --> D[Manager: Direct Manager]
    C --> E[Peers: 2-3 Same-Level Colleagues]
    C --> F[Direct Reports: Team Members]
    C --> G[Self: Employee Self-Assessment]
    
    D --> H[Create Feedback Requests]
    E --> H
    F --> H
    G --> H
    
    H --> I[POST /api/v1/feedback-requests]
    I --> J[Notify All Respondents]
    
    J --> K[Each Respondent Completes Feedback]
    K --> L[Rate: Leadership Skills 1-5]
    L --> M[Rate: Communication 1-5]
    M --> N[Rate: Teamwork 1-5]
    N --> O[Rate: Technical Skills 1-5]
    O --> P[Open-Ended Comments]
    P --> Q[Submit Anonymously if Peer/Report]
    
    Q --> R{All Responses Collected?}
    R -->|No| S[Send Reminders]
    S --> K
    
    R -->|Yes| T[Aggregate Results]
    T --> U[Calculate Average by Category]
    U --> V[Generate 360 Report]
    V --> W[Include in Performance Review]
    
    W --> X((360 Feedback Complete))
    
    subgraph "Daily Reminder Job"
        Y[ReviewCycleReminderJob - 7:00 AM]
        Y --> Z[Find Pending Feedback Requests]
        Z --> AA[Send Reminder Notifications]
    end
```

## 15.8 Performance Improvement Plan (PIP) Flow

```mermaid
graph TD
    A((Low Performance Identified)) --> B[Manager Initiates PIP]
    B --> C[Document Performance Issues]
    C --> D[Define Improvement Areas]
    
    D --> E[Set PIP Details]
    E --> E1[Duration: 90 days]
    E1 --> E2[Start Date]
    E2 --> E3[End Date]
    
    E3 --> F[Define Milestones]
    F --> F1[Milestone 1: Week 2 - Complete training]
    F1 --> F2[Milestone 2: Week 4 - Demonstrate improvement]
    F2 --> F3[Milestone 3: Week 8 - Meet minimum targets]
    F3 --> F4[Milestone 4: Week 12 - Sustain performance]
    
    F4 --> G[Define Check-In Schedule]
    G --> G1[Weekly 1-on-1 with manager]
    G1 --> G2[Bi-weekly HR check-in]
    
    G2 --> H[POST /api/v1/pips]
    H --> I[PIP Status: Active]
    I --> J[Notify Employee]
    J --> K[Notify HR]
    
    K --> L((PIP Active - Monitoring Period))
    
    L --> M[Regular Check-Ins]
    M --> N[Update Milestone Progress]
    N --> O[Add Check-In Notes]
    
    O --> P{PIP End Date Reached?}
    P -->|No| M
    
    P -->|Yes| Q[Manager Final Assessment]
    Q --> R{Outcome?}
    
    R -->|Improved| S[PIP Status: Successful]
    S --> T[Return to Normal Performance Track]
    
    R -->|Not Improved| U[PIP Status: Failed]
    U --> V{Action}
    V -->|Extend PIP| W[Create New PIP]
    V -->|Terminate| X[Initiate Termination Process]
    V -->|Transfer| Y[Consider Role Change/Transfer]
    
    T --> Z((PIP Complete))
    X --> Z
    Y --> Z
    W --> Z
    
    subgraph "Daily Check - PIPExpiryCheckJob 6:00 AM"
        AA[Find Expired PIPs]
        AA --> AB[Alert Manager: PIP Period Ended]
        AB --> AC[Alert HR: Final Assessment Needed]
    end
```

## 15.9 Performance Rating Scale

| Rating | Label | Description |
|--------|-------|-------------|
| 5 | Outstanding | Consistently exceeds all expectations |
| 4 | Exceeds Expectations | Regularly exceeds most expectations |
| 3 | Meets Expectations | Fully meets all job requirements |
| 2 | Needs Improvement | Partially meets expectations, development needed |
| 1 | Unsatisfactory | Does not meet minimum expectations, PIP required |
